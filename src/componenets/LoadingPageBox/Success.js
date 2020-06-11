import React, { Component } from 'react'
import Strings from '../../classes/Strings'
const strings = Strings.strings

export class Success extends Component {
    constructor() {
        super()
    }
    render = () => (
        <div className="ButtonPart">
            <div className="Title">{strings.LOGINBOX_TITLE_SUCCESS}</div>
            <img src={this.props.avatarUrl} className="Avatar" ></img>
            <div className="Username">{this.props.username}</div>
        </div>
    )
}