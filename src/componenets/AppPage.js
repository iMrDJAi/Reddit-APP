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
            <TopAppBar />
            <Drawer />
            <div className="mdc-drawer-scrim"></div>

            <div class="mdc-layout-grid">
                <div class="mdc-layout-grid__inner">
                    <div class="mdc-layout-grid__cell">
                        <div className="Posts" />
                    </div>
                    <div class="mdc-layout-grid__cell"></div>
                    <div class="mdc-layout-grid__cell"></div>
                </div>
            </div>
            
            <Fab />
        </div>
    )
}

/*            <div className="PostsPart">
                <div className="Posts"></div>
            </div>*/