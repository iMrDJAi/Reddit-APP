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


            <div className="mdc-layout-grid PostsContainer">
                <div className="mdc-layout-grid__inner">
                </div>
            </div>

            <Fab />
        </div>
    )
}

/*            <div className="PostsPart">
                <div className="Posts"></div>
            </div>
            
            
            
            
            
            <div className="mdc-layout-grid">
                <div className="mdc-layout-grid__inner">
                    <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
                        <div className="Posts" />
                    </div>
                </div>
            </div>
            
            
            
            
            
            */