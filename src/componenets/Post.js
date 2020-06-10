import React, { Component } from 'react'
import { brandName, brandLogo } from '../config.json'
import { Text } from './Post/Text'
import { Link } from './Post/Link'
import { Cross } from './Post/Cross'

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
        <div className="PostCard">
            {this[this.state.type]}
        </div>
    )
    update = data => this.setState(data)
    get text() {
        return <Text url={this.state.url} />;
    }
    get link() {
        return <Link avatarUrl={this.state.avatarUrl} username={this.state.username} />;
    }
    get cross() {
        return <Cross errorCode={this.state.errorCode} />;
    }
}