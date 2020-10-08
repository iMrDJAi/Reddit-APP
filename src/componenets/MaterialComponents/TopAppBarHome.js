import React, { Component } from 'react'
import { MDCTopAppBar } from '@material/top-app-bar'
import Icon from '@mdi/react'
import { mdiMenu, mdiBell, mdiDotsVertical } from '@mdi/js'
import { TabBar } from './TabBar'

export class TopAppBarHome extends Component {
    componentDidMount() {
        this.MDCTopAppBar = new MDCTopAppBar(this.element)
        this.MDCTopAppBar.listen('MDCTopAppBar:nav', () => this.props.events.emit("DrawerToggle"))
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
                    <mwc-icon-button slot="actionItems"><Icon path={mdiBell} /></mwc-icon-button>
                    <button className="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Notifications"><Icon path={mdiBell} /></button>
                    <button className="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Options"><Icon path={mdiDotsVertical} /></button>
                </section>
            </div>
            <TabBar {...this.props} />
        </header>
    )
}


/* Waiting for an update
    <mwc-top-app-bar>
        <mwc-icon-button slot="navigationIcon" onClick={this.handleClick.bind(this)}><Icon path={mdiMenu} /></mwc-icon-button>
        <div slot="title">Title</div>
        <mwc-icon-button slot="actionItems"><Icon path={mdiBell} /></mwc-icon-button>
        <mwc-icon-button slot="actionItems"><Icon path={mdiDotsVertical} /></mwc-icon-button>
        <mwc-tab-bar>
            <mwc-tab label="New" hasImageIcon></mwc-tab>
            <mwc-tab label="Hot" hasImageIcon></mwc-tab>
            <mwc-tab label="Top" hasImageIcon></mwc-tab>
        </mwc-tab-bar>
    </mwc-top-app-bar>
*/