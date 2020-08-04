import React, { Component } from 'react'
import { MDCTopAppBar } from '@material/top-app-bar';
import Icon from '@mdi/react'
import { mdiArrowLeft } from '@mdi/js' //

export class TopAppBarSubmit extends Component {
    componentDidMount() {
        this.MDCTopAppBar = new MDCTopAppBar(this.element)
    }
    handleClick = () => this.props.history.goBack()
    render = () => (
        <header ref={elem => this.element = elem} className="mdc-top-app-bar">
            <div className="mdc-top-app-bar__row">
                <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                    <button onClick={this.handleClick.bind(this)} className="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button" aria-label="Back"><Icon path={mdiArrowLeft} /></button>
                    <span className="mdc-top-app-bar__title">Submit</span>
                </section>
            </div>
        </header>
    )
}