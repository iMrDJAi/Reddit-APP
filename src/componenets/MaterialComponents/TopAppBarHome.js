import React, { Component } from 'react'
import { MDCTopAppBar } from '@material/top-app-bar';
import Icon from '@mdi/react'
import { mdiMenu, mdiBell, mdiDotsVertical, mdiMagnify } from '@mdi/js'
import { TabBar } from './TabBar'

export class TopAppBarHome extends Component {
    constructor() {
        super()
    }
    componentDidMount() {
        this.MDCTopAppBar = new MDCTopAppBar(this.element)
        this.MDCTopAppBar.listen('MDCTopAppBar:nav', () => this.props.events.emit("DrawerToggle"));
    }
    render = () => (
        <header ref={elem => this.element = elem} className="mdc-top-app-bar">
            <div className="mdc-top-app-bar__row">
                <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                    <button className="mdc-top-app-bar__navigation-icon mdc-icon-button"><Icon path={mdiMenu} /></button>
                    <span className="mdc-top-app-bar__title">Home</span>
                </section>
                <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
                    {/*<button className="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Search"><Icon path={mdiMagnify} /></button>*/}
                    <button className="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Notifications"><Icon path={mdiBell} /></button>
                    <button className="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Options"><Icon path={mdiDotsVertical} /></button>
                </section>
            </div>
            <TabBar/>
        </header>
    )
}