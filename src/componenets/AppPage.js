import React, { Component } from 'react'
import { TopAppBar } from './AppPageParts/TopAppBar'
import { TabBar } from './AppPageParts/TabBar'
import { Drawer } from './AppPageParts/Drawer'
import { Fab } from './AppPageParts/Fab'

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