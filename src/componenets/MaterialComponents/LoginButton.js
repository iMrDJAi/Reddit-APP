import React, { Component } from 'react'
import { MDCRipple } from '@material/ripple';
import Icon from '@mdi/react'
import { mdiReddit } from '@mdi/js'
import System from '../../classes/System'

export class LoginButton extends Component {
    componentDidMount() {
        new MDCRipple(this.element);
    }
    render = () => (
        <a ref={elem => this.element = elem} href={this.props.loginURL} className="Button mdc-button mdc-button--outlined mdc-card__action mdc-card__action--button" title="Login">
            <Icon className="mdc-button__icon" path={mdiReddit} size="24px"/>
            <span className="mdc-button__label">{System.strings.LOADING_BUTTON_LOGIN}</span>
            <div className="mdc-button__ripple"></div>
        </a>
    )
}