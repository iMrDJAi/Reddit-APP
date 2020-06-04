import React, { Component } from 'react'
import { MDCTopAppBar } from '@material/top-app-bar';
import { MDCDrawer } from '@material/drawer'
import Icon from '@mdi/react'
import { mdiMenu, mdiBell, mdiDotsVertical, mdiMagnify, mdiHeart, mdiPlus } from '@mdi/js'
import { MDCRipple } from '@material/ripple';
import { MDCTabBar } from '@material/tab-bar';
import { MDCList } from '@material/list';

export class TopAppBar extends Component {
    constructor() {
        super()
    }
    componentDidMount() {
        this.MDCTopAppBar = new MDCTopAppBar(this.element);
        this.MDCTopAppBar.listen('MDCTopAppBar:nav', () => window.app.events.emit("DrawerToggle"));
    }
    render = () => (
        <header ref={elem => this.element = elem} className="mdc-top-app-bar">
            <div className="mdc-top-app-bar__row">
                <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                    <button className="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button" aria-label="Open navigation menu"><Icon path={mdiMenu} /></button>
                    <span className="mdc-top-app-bar__title"></span>
                </section>
                <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
                    {/*<button className="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Search"><Icon path={mdiMagnify} /></button>*/}
                    <button className="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Notifications"><Icon path={mdiBell} /></button>
                    <button className="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Options"><Icon path={mdiDotsVertical} /></button>
                </section>
            </div>
        </header>
    )
}

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


export class Drawer extends Component {
    constructor() {
        super()
        this.items = window.app.flairs.map(flair => {
            if (flair === window.app.flairs[0]) var i = 0, cls = "mdc-list-item mdc-list-item--activated"; 
            else var i = -1, cls = "mdc-list-item";
            return (
                <li className={cls} key={flair.id} tabIndex={i}>
                    <span className="mdc-list-item__text" role="option" aria-selected="false">{flair.text}</span>
                </li>
            )
        })
    }
    async componentDidMount() {
        var drawer = new MDCDrawer(this.element);
        drawer.list.destroy();
        window.app.events.on("DrawerToggle", () => drawer.open = !drawer.open);
        for (var ele of this.element.querySelectorAll('.mdc-list')) new MDCList(ele);
        for (var ele of this.element.querySelectorAll('.mdc-list-item')) new MDCRipple(ele);
    }
    handleScroll() {
        if (this.scrollable.scrollTop >= this.banner.clientHeight - this.header.offsetHeight) {
            this.header.classList.add('CommunityBar2'); 
        } else {
            this.header.classList.remove('CommunityBar2');
        }
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
                        <div className="mdc-list-group">
                            <h3 className="mdc-list-group__subheader">FLAIRS</h3>
                            {this.items}
                        </div>
                    </nav>
                    <nav className="mdc-list">
                        <div className="mdc-list-group">
                            <h3 className="mdc-list-group__subheader">LINKS</h3>
                            <li className="mdc-list-item" tabIndex="0">
                                <span className="mdc-list-item__text" role="option" aria-selected="false">DISCORD</span>
                            </li>
                            <li className="mdc-list-item" tabIndex="1">
                                <span className="mdc-list-item__text" role="option" aria-selected="false">FACEBOOK</span>
                            </li>
                        </div>
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

export class Fab extends Component {
    constructor() {
        super()
    }
    componentDidMount() {
        new MDCRipple(this.element);
    }
    render = () => (
        <button ref={elem => this.element = elem} className="mdc-fab" aria-label="Favorite">
            <div className="mdc-fab__ripple"></div>
            <span className="mdc-fab__icon"><Icon path={mdiPlus} /></span>
        </button>
    )

}