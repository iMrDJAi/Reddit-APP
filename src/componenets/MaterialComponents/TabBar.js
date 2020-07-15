import React, { Component } from 'react'
import Icon from '@mdi/react'
import { mdiDecagram, mdiFire, mdiTrendingUp } from '@mdi/js'
import { MDCTabBar } from '@material/tab-bar'

export class TabBar extends Component {
    constructor() {
        super()
    }
    componentDidMount() {
        const tabBar = new MDCTabBar(this.element)
        tabBar.focusOnActivate = false
        tabBar.activateTab(0)
        console.log(tabBar)
    }
    render = () => (
        <div ref={elm => this.element = elm} className="mdc-tab-bar">
            <div className="mdc-tab-scroller">
                <div className="mdc-tab-scroller__scroll-area">
                    <div className="mdc-tab-scroller__scroll-content">

                        <button className="mdc-tab" tabIndex="-1">
                            <span className="mdc-tab__content">
                                <span className="mdc-tab__icon"><Icon path={mdiDecagram} /></span>
                                <span className="mdc-tab__text-label">New</span>
                                <span className="mdc-tab-indicator">
                                    <span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
                                </span>
                            </span>
                            <span className="mdc-tab__ripple"></span>
                        </button>

                        <button className="mdc-tab" tabIndex="-1">
                            <span className="mdc-tab__content">
                                <span className="mdc-tab__icon"><Icon path={mdiFire} /></span>
                                <span className="mdc-tab__text-label">Hot</span>
                                <span className="mdc-tab-indicator">
                                    <span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
                                </span>
                            </span>
                            <span className="mdc-tab__ripple"></span>
                        </button>

                        <button className="mdc-tab" tabIndex="-1">
                            <span className="mdc-tab__content">
                                <span className="mdc-tab__icon"><Icon path={mdiTrendingUp} /></span>
                                <span className="mdc-tab__text-label">Top</span>
                                <span className="mdc-tab-indicator">
                                    <span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
                                </span>
                            </span>
                            <span className="mdc-tab__ripple"></span>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}