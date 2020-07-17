import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { MDCTopAppBar } from '@material/top-app-bar';
import Icon from '@mdi/react'
import { mdiArrowLeft, mdiReload } from '@mdi/js'

export class TopAppBarSubmit extends Component {
    componentDidMount() {
        this.MDCTopAppBar = new MDCTopAppBar(this.element)
    }
    render = () => (
        <header ref={elem => this.element = elem} className="mdc-top-app-bar">
            <div className="mdc-top-app-bar__row">
                <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                    <Link to='/home'>
                        <button href='/home' className="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button" aria-label="Back"><Icon path={mdiArrowLeft} /></button>
                    </Link>
                    <span className="mdc-top-app-bar__title">Submit</span>
                </section>
            </div>
        </header>
    )
}