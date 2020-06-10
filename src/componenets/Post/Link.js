import React, { Component } from 'react'
import { MDCRipple } from '@material/ripple';
import Icon from '@mdi/react'
import { mdiThumbUp, mdiThumbDown, mdiThumbUpOutline, mdiThumbDownOutline, mdiDotsVertical, mdiBookmark, mdiBookmarkOutline } from '@mdi/js'
import { MDCIconButtonToggle } from '@material/icon-button';

export class Link extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        for (var btn of this.element.querySelectorAll(".toggle")) {
            window.MDCIconButtonToggle = new MDCIconButtonToggle(btn);
        }
    }
    render = () => (
        <div ref={elm => this.element = elm} className="PostCard mdc-card">

            <header className="mdc-card__actions">
                <div className="mdc-card__action-buttons">
                    <img className="UserAvatar" src={this.props.authorData.icon_img.split('?')[0]}></img>
                    <div className="UserName">{this.props.authorData.name}</div>
                </div>
                <div className="mdc-card__action-icons">
                    <button className="mdc-icon-button mdc-card__action mdc-card__action--icon--unbounded" title="Options">
                        <i className="mdc-icon-button__icon"><Icon path={mdiDotsVertical} /></i>
                    </button>
                </div>
            </header>

            <title></title>

            <div className="mdc-card__primary-action demo-card__primary-action" tabIndex="0">
                <div className="mdc-card__media mdc-card__media--16-9 demo-card__media" style={{backgroundImage: 'url("https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/2.jpg")'}}></div>
                <div className="demo-card__secondary mdc-typography mdc-typography--body2">Visit ten places on our planet that are undergoing the biggest changes today.</div>
            </div>

            <footer className="mdc-card__actions">
                <div className="mdc-card__action-buttons">
                    <button className="mdc-icon-button mdc-card__action mdc-card__action--icon--unbounded toggle" title="Like">
                        <i className="mdc-icon-button__icon mdc-icon-button__icon--on"><Icon path={mdiThumbUp} /></i>
                        <i className="mdc-icon-button__icon"><Icon path={mdiThumbUpOutline} /></i>
                    </button>
                    <div className="mdc-card__action mdc-typography mdc-typography--caption">6768</div>
                    <button className="mdc-icon-button mdc-card__action mdc-card__action--icon--unbounded toggle" title="Dislike">
                        <i className="mdc-icon-button__icon mdc-icon-button__icon--on"><Icon path={mdiThumbDown} /></i>
                        <i className="mdc-icon-button__icon"><Icon path={mdiThumbDownOutline} /></i>
                    </button>
                </div>
                <div className="mdc-card__action-icons">
                    <div className="mdc-card__action mdc-typography mdc-typography--caption">947 Comments</div>
                    <button className="mdc-icon-button mdc-card__action mdc-card__action--icon--unbounded toggle" title="Like">
                        <i className="mdc-icon-button__icon mdc-icon-button__icon--on"><Icon path={mdiBookmark} /></i>
                        <i className="mdc-icon-button__icon"><Icon path={mdiBookmarkOutline} /></i>
                    </button>
                </div>
            </footer>

        </div>
    )
}

/*

                    <button className="mdc-icon-button mdc-card__action mdc-card__action--icon--unbounded" title="Share">
                        <i className="mdc-icon-button__icon"><Icon path={mdiShare} /></i>
                    </button>




                    <button className="mdc-icon-button mdc-card__action mdc-card__action--icon--unbounded" title="Comments">
                        <i className="mdc-icon-button__icon"><Icon path={mdiCommentOutline} /></i>
                    </button>
                    <div className="mdc-card__action mdc-typography mdc-typography--caption">200</div>









*/