import React, { Component } from 'react'
import { MDCTopAppBar } from '@material/top-app-bar';
import Icon from '@mdi/react'
import { mdiArrowLeft, mdiReload } from '@mdi/js' //

export class TopAppBarSubmission extends Component {
    componentDidMount() {
        this.MDCTopAppBar = new MDCTopAppBar(this.element)
    }
    handleClick = () => this.props.history.goBack()
    render = () => (
        <header ref={elem => this.element = elem} className="mdc-top-app-bar">
            <div className="mdc-top-app-bar__row">
                <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                    <button onClick={this.handleClick.bind(this)} className="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button" aria-label="Back"><Icon path={mdiArrowLeft} /></button>
                    <span className="mdc-top-app-bar__title">Submission</span>
                </section>
                <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
                    <button className="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Reload"><Icon path={mdiReload} /></button>
                </section>
            </div>
        </header>
    )
}