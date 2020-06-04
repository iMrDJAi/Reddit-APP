import React, { Component } from 'react'
import Icon from '@mdi/react'
import { mdiHeart } from '@mdi/js'
import { MDCTabBar } from '@material/tab-bar';

export class TabBar extends Component {
    constructor() {
        super()
    }
    componentDidMount() {
        new MDCTabBar(this.element);
    }
    render = () => (
        <div ref={elem => this.element = elem} className="mdc-tab-bar mdc-tab--stacked" role="tablist">
            <div className="mdc-tab-scroller">
                <div className="mdc-tab-scroller__scroll-area">
                    <div className="mdc-tab-scroller__scroll-content">
                        <button className="mdc-tab" role="tab" aria-selected="false" tabIndex="-1">
                            <span className="mdc-tab__content">
                                <span className="mdc-tab__icon" aria-hidden="true"><Icon path={mdiHeart} /></span>
                                <span className="mdc-tab__text-label">Favorites</span>
                                <span className="mdc-tab-indicator">
                                    <span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
                                </span>
                            </span>
                            <span className="mdc-tab__ripple"></span>
                        </button>
                        <button className="mdc-tab" role="tab" aria-selected="false" tabIndex="-1">
                            <span className="mdc-tab__content">
                                <span className="mdc-tab__icon" aria-hidden="true"><Icon path={mdiHeart} /></span>
                                <span className="mdc-tab__text-label">Favorites</span>
                                <span className="mdc-tab-indicator">
                                    <span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
                                </span>
                            </span>
                            <span className="mdc-tab__ripple"></span>
                        </button>
                        <button className="mdc-tab" role="tab" aria-selected="false" tabIndex="-1">
                            <span className="mdc-tab__content">
                                <span className="mdc-tab__icon" aria-hidden="true"><Icon path={mdiHeart} /></span>
                                <span className="mdc-tab__text-label">Favorites</span>
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