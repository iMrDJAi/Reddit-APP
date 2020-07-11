import React, { Component } from 'react'
import { banner } from '../../config.json'
import { LinearProgress } from '../MaterialComponents/LinearProgress'
import { LoginButton } from '../MaterialComponents/LoginButton'
import System from '../../classes/System'

export class LoginPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            condition: 'loading'
        }
        this.update = this.update.bind(this)
    }
    async componentDidMount() {
        /*await new Promise(res => setTimeout(() => res(), 5000))
        this.props.events.emit("LoginLinearProgressToggle", false)
        this.update('success', 'condition')
        await new Promise(res => setTimeout(() => res(), 5000))
        this.props.events.emit("LoginLinearProgressToggle", true)
        this.update('login', 'condition')
        await new Promise(res => setTimeout(() => res(), 5000))
        this.update('error', 'condition')*/
        const query = new URLSearchParams(this.props.location.search)
        if (query.get('state') && (query.get('code') || query.get('error'))) {


            if (query.get('state') === window.localStorage.state) { //State Check
                if (query.get('error')) { //Access Denied Check
                    this.error()
                } else {
                    var r = await System.oAuth(query.get('code'))
                    if (r) {
                        console.log("✅")
                        this.success(r)
                    } else {
                        console.log("❌")
                        this.error()
                    }
                }
            } else {
                console.log("❌")
                this.error()
            }

        } else {
            const r = await System.r()
            if (r) {
                this.success(r)
            } else {
                this.login()
            }
        }
    }
    login() {
        if (this.props.location.state) window.localStorage.referrer = this.props.location.state
        this.update(System.loginRequest(), 'loginURL')
        this.props.events.emit("LoginLinearProgressToggle", false)
        this.update('login', 'condition')
    }
    async success(r) {
        await System.init(r)
        this.props.events.emit("LoginLinearProgressToggle", false)
        this.update('success', 'condition')
        await new Promise(res => setTimeout(() => res(), 1500))
        this.props.history.push(window.localStorage.referrer || this.props.location.state || '/home')
        window.localStorage.state = ''
        window.localStorage.referrer = ''
    }
    async error() {
        this.props.events.emit("LoginLinearProgressToggle", false)
        this.update('error', 'condition')
        await new Promise(res => setTimeout(() => res(), 1500))
        this.props.history.push(window.localStorage.referrer || this.props.location.state || '/home')
    }
    render = () => (
        <div className="mdc-layout-grid LoadingPage">
            <div className="mdc-layout-grid__inner">
                <div className="Card mdc-card mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
                    <div className="Stent" />
                    <div className="mdc-card__media mdc-card__media--16-9" style={{backgroundImage: `url('${banner}')`}} />
                    <LinearProgress events={this.props.events} />
                    <div className="Content">
                        {
                            this.state.condition === 'loading' &&
                            <>
                                <div className="Title">{System.strings.LOADING_TITLE_LOADING}</div>
                                <div className="Text">{System.strings.LOADING_TEXT_LOADING}</div>
                            </>
                        }
                        {
                            this.state.condition === 'login' &&
                            <>
                                <div className="Title">{System.strings.LOADING_TITLE_LOGIN}</div>
                                <div className="Text">{System.strings.LOADING_TEXT_LOGIN}</div>
                            </>
                        }
                        {
                            this.state.condition === 'success' &&
                            <>
                                <div className="Title">{System.strings.LOADING_TITLE_SUCCESS}</div>
                                <div className="Text">{System.strings.LOADING_TEXT_SUCCESS}</div>
                            </>
                        }
                        {
                            this.state.condition === 'error' &&
                            <>
                                <div className="Title">{System.strings.LOADING_TITLE_ERROR}</div>
                                <div className="Text">{System.strings.LOADING_TEXT_ERROR}</div>
                            </>
                        }
                    </div>
                    {
                        this.state.condition === 'login' &&
                        <footer className="mdc-card__actions">
                            <div className="mdc-card__action-buttons">
                                <LoginButton loginURL={this.state.loginURL} />
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