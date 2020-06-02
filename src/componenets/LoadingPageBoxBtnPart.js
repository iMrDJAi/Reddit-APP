import React, { Component } from 'react'
import Icon from '@mdi/react'
import { mdiLoading, mdiReddit, mdiAlertCircle } from '@mdi/js'
import { MDCRipple } from '@material/ripple'
import Strings from '../classes/Strings'
const strings = new Strings().strings

export class Loading extends Component {
    constructor() {
        super()
    }
    render = () => (
        <div className="ButtonPart">
            <div className="Title">{strings.LOGINBOX_TITLE_LOADING}</div>
            <Icon className="LoadingIcon" path={mdiLoading} spin={1} />
        </div>
    )
}

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

export class Error extends Component {
    constructor(props) {
        super(props)
    }
    render = () => (
        <div className="ButtonPart">
            <div className="Title">{strings.LOGINBOX_TITLE_ERROR}</div>
            <Icon className="ErrorIcon" path={mdiAlertCircle} />
            <p className="Error">{this.props.errorCode}</p>
        </div>
    )
}

export class Success extends Component {
    constructor(props) {
        super(props)
    }
    render = () => (
        <div className="ButtonPart">
            <div className="Title">{strings.LOGINBOX_TITLE_SUCCESS}</div>
            <img src={this.props.avatarUrl} className="Avatar" ></img>
            <div className="Username">{this.props.username}</div>
        </div>
    )
}