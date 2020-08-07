import React, { Component } from 'react'
import Icon from '@mdi/react'
import { mdiDecagram, mdiFire, mdiTrendingUp } from '@mdi/js'
import { MDCTabBar } from '@material/tab-bar'

export class TabBar extends Component {
    constructor(props) {
        super(props)
        /*this.items = window.app.flairs.map(flair => {
            return (
                <li onClick={() => this.handleClick(flair.hash)} className="mdc-list-item" tabIndex={-1} key={Math.random()}>
                    <span className="mdc-list-item__ripple mdc-ripple-surface--accent"></span>
                    <span className="mdc-list-item__text">{flair.text}</span>
                </li>
            )
        })*/
        this.handleClick = this.handleClick.bind(this)
    }
    componentDidMount() {
        const tabBar = new MDCTabBar(this.element)
        tabBar.focusOnActivate = false
        tabBar.activateTab(0)
    }
    handleClick(sortName) {
        if (this.props.match.params.flair) this.props.history.push(`/home/${sortName}/${this.props.match.params.flair}`)
        else this.props.history.push(`/home/${sortName}`)
    }
    render = () => (
        <div ref={elm => this.element = elm} className="mdc-tab-bar">
            <div className="mdc-tab-scroller">
                <div className="mdc-tab-scroller__scroll-area">
                    <div className="mdc-tab-scroller__scroll-content">

                        <button onClick={() => this.handleClick('new')} className="mdc-tab" tabIndex="-1">
                            <span className="mdc-tab__content">
                                <span className="mdc-tab__icon"><Icon path={mdiDecagram} /></span>
                                <span className="mdc-tab__text-label">New</span>
                                <span className="mdc-tab-indicator">
                                    <span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
                                </span>
                            </span>
                            <span className="mdc-tab__ripple"></span>
                        </button>

                        <button onClick={() => this.handleClick('hot')} className="mdc-tab" tabIndex="-1">
                            <span className="mdc-tab__content">
                                <span className="mdc-tab__icon"><Icon path={mdiFire} /></span>
                                <span className="mdc-tab__text-label">Hot</span>
                                <span className="mdc-tab-indicator">
                                    <span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
                                </span>
                            </span>
                            <span className="mdc-tab__ripple"></span>
                        </button>

                        <button onClick={() => this.handleClick('top')} className="mdc-tab" tabIndex="-1">
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