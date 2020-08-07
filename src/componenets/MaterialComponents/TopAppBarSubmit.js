import React, { Component } from 'react'
import Icon from '@mdi/react'
import { mdiArrowLeft } from '@mdi/js'

export class TopAppBarSubmit extends Component {
    handleClick = () => this.props.history.goBack()
    render = () => (
        <mwc-top-app-bar>
            <mwc-icon-button slot="navigationIcon" onClick={this.handleClick.bind(this)}><Icon path={mdiArrowLeft} /></mwc-icon-button>
            <div slot="title">Submit</div>
            <div></div>
        </mwc-top-app-bar>
    )
}