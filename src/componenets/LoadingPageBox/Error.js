import React, { Component } from 'react'
import Icon from '@mdi/react'
import { mdiAlertCircle } from '@mdi/js'
import Strings from '../../classes/Strings'
const strings = Strings.strings

export class Error extends Component {
    constructor() {
        super()
    }
    render = () => (
        <div className="ButtonPart">
            <div className="Title">{strings.LOGINBOX_TITLE_ERROR}</div>
            <Icon className="ErrorIcon" path={mdiAlertCircle} />
            <p className="Error">{this.props.errorCode}</p>
        </div>
    )
}