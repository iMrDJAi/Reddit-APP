import React, { Component } from 'react'
import Icon from '@mdi/react'
import { MDCTabBar } from '@material/tab-bar'

export class TabBar extends Component {
    constructor(props) {
        super(props)
        this.items = window.app.sorts.map(sort => (
            <button onClick={() => this.handleClick(sort.id)} className="mdc-tab" tabIndex="-1" key={window.app.sorts.indexOf(sort)}>
                <span className="mdc-tab__content">
                    <span className="mdc-tab__icon"><Icon path={sort.icon} /></span>
                    <span className="mdc-tab__text-label">{sort.text}</span>
                    <span className="mdc-tab-indicator">
                        <span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
                    </span>
                </span>
                <span className="mdc-tab__ripple"></span>
            </button>
        ))
        this.handleClick = this.handleClick.bind(this)
    }
    componentDidMount() {
        const tabBar = new MDCTabBar(this.element)
        tabBar.focusOnActivate = false
        var tabIndex = 0
        if (window.app.sorts.findIndex(sort => this.props.match.params.sort === sort.id) >= 0) tabIndex = window.app.sorts.findIndex(sort => this.props.match.params.sort === sort.id)
        tabBar.activateTab(tabIndex)
    }
    handleClick(sortID) {
        if (this.props.match.params.flair) this.props.history.push(`/home/${sortID}/${this.props.match.params.flair}`)
        else this.props.history.push(`/home/${sortID}`)
    }
    render = () => (
        <div ref={elm => this.element = elm} className="mdc-tab-bar">
            <div className="mdc-tab-scroller">
                <div className="mdc-tab-scroller__scroll-area">
                    <div className="mdc-tab-scroller__scroll-content">
                        {this.items}
                    </div>
                </div>
            </div>
        </div>
    )
}