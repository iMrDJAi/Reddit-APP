import React, { Component } from 'react'
import Icon from '@mdi/react'
import { mdiLoading } from '@mdi/js'
import Strings from '../../classes/Strings'
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