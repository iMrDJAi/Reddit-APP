import React, { Component } from 'react'
import { MDCDrawer } from '@material/drawer'
import { MDCRipple } from '@material/ripple'
import { MDCList } from '@material/list'

export class Drawer extends Component {
    constructor(props) {
        super(props)
        this.items = window.app.flairs.map(flair => {
            var tabIndex = -1, activated = ''
            if (flair.hash === (this.props.match.params.flair || '')) tabIndex = 0, activated = 'mdc-list-item--activated'
            return (
                <li onClick={() => this.handleClick(flair.hash)} className={'mdc-list-item ' + activated} tabIndex={tabIndex} key={window.app.flairs.indexOf(flair)}>
                    <span className="mdc-list-item__ripple mdc-ripple-surface--accent"></span>
                    <span className="mdc-list-item__text">{flair.text}</span>
                </li>
            )
        })
        this.handleClick = this.handleClick.bind(this)
    }
    async componentDidMount() {
        var drawer = new MDCDrawer(this.element)
        drawer.list.destroy()
        this.props.events.on("DrawerToggle", () => drawer.open = !drawer.open)
        for (var ele of this.element.querySelectorAll('.mdc-list')) {
            var list = new MDCList(ele)
            list.listElements.map(listItemEl => new MDCRipple(listItemEl))
        }
    }
    handleScroll() {
        if (this.scrollable.scrollTop >= this.banner.clientHeight - this.header.offsetHeight - 2) {
            this.header.classList.add('CommunityBar2')
        } else {
            this.header.classList.remove('CommunityBar2')
        }
    }
    handleClick(flairHash) {
        if (flairHash) this.props.history.push(`/home/${this.props.match.params.sort}/${flairHash}`)
        else this.props.history.push(`/home/${this.props.match.params.sort}`)
        this.props.events.emit("DrawerToggle")
    }
    render = () => (
        <aside ref={elem => this.element = elem} className="Drawer mdc-drawer mdc-drawer--modal">
            <header ref={elem => this.header = elem} className="CommunityBar">
                <img className="CommunityIcon" src={window.app.subreddit.community_icon.split('?')[0]}></img>
                <div className="CommunityName">{window.app.subreddit.title}</div>
            </header>
            <div ref={elem => this.scrollable = elem} onScroll={this.handleScroll.bind(this)} className="mdc-drawer__content" >
                <img className="CommunityBanner" src={window.app.subreddit.mobile_banner_image.split('?')[0] || window.app.subreddit.banner_background_image.split('?')[0]} alt="banner" ref={elem => this.banner = elem}></img>
                <div>
                    <nav className="mdc-list">
                        <h3 className="mdc-list-group__subheader">FLAIRS</h3>
                        {this.items}
                    </nav>
                    <nav className="mdc-list">
                        <h3 className="mdc-list-group__subheader">LINKS</h3>
                        <li className="mdc-list-item" tabIndex="0">
                            <span className="mdc-list-item__ripple"></span>
                            <span className="mdc-list-item__text" role="option" aria-selected="false">DISCORD</span>
                        </li>
                        <li className="mdc-list-item" tabIndex="1">
                            <span className="mdc-list-item__ripple"></span>
                            <span className="mdc-list-item__text" role="option" aria-selected="false">FACEBOOK</span>
                        </li>
                    </nav>
                </div>
            </div>
            <footer className="ProfileBar">
                <img className="UserAvatar" src={window.app.user.icon_img.split('?')[0]}></img>
                <div className="UserName">{window.app.user.name}</div>
            </footer>
        </aside>
    )
}