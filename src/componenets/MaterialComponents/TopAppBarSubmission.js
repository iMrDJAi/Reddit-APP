import React, { Component } from 'react'
import Icon from '@mdi/react'
import { mdiArrowLeft, mdiReload } from '@mdi/js' //

export class TopAppBarSubmission extends Component {
    handleClick = () => this.props.history.goBack()
    render = () => (
        <mwc-top-app-bar>
            <mwc-icon-button slot="navigationIcon" onClick={this.handleClick.bind(this)}><Icon path={mdiArrowLeft} /></mwc-icon-button>
            <div slot="title">Title</div>
            <mwc-icon-button slot="actionItems"><Icon path={mdiReload} /></mwc-icon-button>
        </mwc-top-app-bar>
    )
}