import React, { Component } from 'react'
import { brandName, brandLogo } from '../config.json'
import { Loading } from './LoadingPageBox/Loading'
import { Login } from './LoadingPageBox/Login'
import { Success } from './LoadingPageBox/Success'
import { Error } from './LoadingPageBox/Error'

export class LoadingPageBox extends Component {
    constructor() {
        super()
        this.state = {
            'type': 'loading',
        }
        this.update = this.update.bind(this)
    }
    componentDidMount() {
        var update = this.update;
        window.app.events.on('LoadingPageBox', data => {
            update(data);
        });
    }
    render = () => (
        <div className="LoginBox">
            <div className="BrandPart">
                <div className="BrandLogo" style={{"background": brandLogo}}></div>
                <div className="BrandName">{brandName}</div>
            </div>
            {this[this.state.type]}
        </div>
    )
    update = data => this.setState(data)
    get loading() {
        return <Loading />;
    }
    get login() {
        return <Login url={this.state.url} />;
    }
    get success() {
        return <Success avatarUrl={this.state.avatarUrl} username={this.state.username} />;
    }
    get error() {
        return <Error errorCode={this.state.errorCode} />;
    }
}