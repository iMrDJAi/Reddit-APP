import React, { Component } from 'react'
import { TopAppBar, TabBar, Drawer, Fab } from './AppPageParts'

export class AppPage extends Component {
    constructor() {
        super()
    }
    render = () => (
        <div className="AppPage">
            <Drawer />
            <div className="mdc-drawer-scrim"></div>
            <TopAppBar />
            <div className="PostsPart">
                <div className="Posts"></div>
            </div>
            <Fab />
        </div>
    )
}