import React, { Component } from 'react'
import { useHistory } from "react-router-dom";  
import { MDCRipple } from '@material/ripple';
import Icon from '@mdi/react'
import { mdiReddit } from '@mdi/js'
import { banner } from '../config.json'
import Strings from '../classes/Strings'
import config from '../config.json'
import { LinearProgress } from './MaterialComponents/LinearProgress'
var Api = require('../classes/Api');

export class LoadingPage extends Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            condition: 'loading'
        }
        this.update = this.update.bind(this)
        this.api = new Api()
    }
    async componentDidMount() {
        //new MDCRipple(this.loginBtn)
        /*await new Promise(res => setTimeout(() => res(), 5000))
        this.update('login', 'condition')
        await new Promise(res => setTimeout(() => res(), 5000))
        this.update('success', 'condition')
        await new Promise(res => setTimeout(() => res(), 5000))
        this.update('error', 'condition')*/
        const query = new URLSearchParams(this.props.location.search)
        console.log(query)

        if (query.get('state') && (query.get('code') || query.get('error'))) {
            if (query.get('state') === window.sessionStorage.state) { //State Check
                if (query.get('error')) { //Access Denied Check
                    this.update('error', 'condition')
                } else {
                    var r = await this.api.oAuth(query.get('code'))
                    if (r) {
                        console.log("✅")
                        await this.api.init(r)
                        this.update('success', 'condition')
                        await new Promise(res => setTimeout(() => res(), 3000))
                        this.props.history.push('posts')
                    } else {
                        console.log("❌")
                        this.update('error', 'condition')
                        await new Promise(res => setTimeout(() => res(), 3000))
                        this.update(this.api.loginRequest(), 'loginURL')
                        this.update('login', 'condition')
                    }
                }
            } else {
                this.update('error', 'condition')
            }
        } else {
            const r = await this.api.r();
            console.log(r);
            if (r) {
                console.log("✅")
                await this.api.init(r)
                this.update('success', 'condition')
                await new Promise(res => setTimeout(() => res(), 3000))
                this.props.history.push('posts')
            } else {
                console.log("❌");
                this.update(this.login.loginRequest(), 'loginURL')
                this.update('login', 'condition')
            }
        }
    }
    render = () => (
        <div className="mdc-layout-grid LoadingPage">
            <div className="mdc-layout-grid__inner">
                <div className="Card mdc-card mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
                    <div className="Stent" />
                    <div className="mdc-card__media mdc-card__media--16-9" style={{backgroundImage: `url('${banner}')`}} />
                    {
                        this.state.condition === 'loading' &&
                        <LinearProgress />
                    }

                    <div className="Content">
                        {
                            this.state.condition === 'loading' &&
                            <>
                                <div className="Title">{Strings.strings.LOADING_TITLE_LOADING}</div>
                                <div className="Text">{Strings.strings.LOADING_TEXT_LOADING}</div>
                            </>
                        }
                        {
                            this.state.condition === 'login' &&
                            <>
                                <div className="Title">{Strings.strings.LOADING_TITLE_LOGIN}</div>
                                <div className="Text">{Strings.strings.LOADING_TEXT_LOGIN}</div>
                            </>
                        }
                        {
                            this.state.condition === 'success' &&
                            <>
                                <div className="Title">{Strings.strings.LOADING_TITLE_SUCCESS}</div>
                                <div className="Text">{Strings.strings.LOADING_TEXT_SUCCESS}</div>
                            </>
                        }
                        {
                            this.state.condition === 'error' &&
                            <>
                                <div className="Title">{Strings.strings.LOADING_TITLE_ERROR}</div>
                                <div className="Text">{Strings.strings.LOADING_TEXT_ERROR}</div>
                            </>
                        }
                    </div>
                    {
                        this.state.condition === 'login' &&
                        <footer className="mdc-card__actions">
                            <div className="mdc-card__action-buttons">
                                <a ref={elem => this.loginBtn = elem} href={this.state.loginURL} className="Button mdc-button mdc-button--outlined mdc-card__action mdc-card__action--button" title="Login">
                                    <Icon className="mdc-button__icon" path={mdiReddit} size="24px"/>
                                    <span className="mdc-button__label">{Strings.strings.LOADING_BUTTON_LOGIN}</span>
                                    <div className="mdc-button__ripple"></div>
                                </a>
                            </div>
                        </footer>
                    }
                </div>
            </div>
        </div>
    )
    update = (data, key) => this.setState(oldState => {
        oldState[key] = data;
        return oldState;
    })
}