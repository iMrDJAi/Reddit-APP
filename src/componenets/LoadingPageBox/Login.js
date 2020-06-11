import React, { Component } from 'react'
import Icon from '@mdi/react'
import { mdiReddit } from '@mdi/js'
import { MDCRipple } from '@material/ripple'
import Strings from '../../classes/Strings'
const strings = Strings.strings

export class Login extends Component {
    constructor() {
        super()
    }
    componentDidMount() {
        new MDCRipple(this.element);
    }
    render = () => (
        <div className="ButtonPart">
            <div className="Title">{strings.LOGINBOX_TITLE_LOGIN}</div>
            <p className="Paragraph">{strings.LOGINBOX_PARAGRAPH}</p>
            <a ref={elem => this.element = elem} href={this.props.url} className="Button mdc-button mdc-button--raised">
                <span><Icon path={mdiReddit} /> I  </span>
                <span className="mdc-button__label">{strings.LOGINBOX_BUTTON}</span>
                <div className="mdc-button__ripple"></div>
            </a>
        </div>
    )
}