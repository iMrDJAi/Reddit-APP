import React, { Component } from 'react'
import { MDCRipple } from '@material/ripple';
import Icon from '@mdi/react'
import { mdiThumbUp, mdiThumbDown, mdiThumbUpOutline, mdiThumbDownOutline, mdiDotsVertical, mdiBookmark, mdiBookmarkOutline } from '@mdi/js'
import { MDCIconButtonToggle } from '@material/icon-button';
const renderMarkdown = require('imrdjai-mdr');
console.log();

export class Text extends Component {
    constructor(props) {
        super(props)
        this.state = {
            likes: this.props.postData.score
        }
        this.markdown = renderMarkdown(this.props.postData.selftext)
        this.update = this.update.bind(this)
    }
    componentDidMount() {
        var likeBtn = new MDCIconButtonToggle(this.like)
        var dislikeBtn = new MDCIconButtonToggle(this.dislike)
        this.handleVotes(likeBtn, dislikeBtn)

        var saveBtn = new MDCIconButtonToggle(this.save)
        if (this.props.postData.saved === true) saveBtn.on = true; else saveBtn.on = false
        var tries = 0
        var current = ''
        var blocked = false
        saveBtn.listen("MDCIconButtonToggle:change", async (e) => {
            if (e.detail.isOn) {
                current = 'save'
            } else {
                current = 'unsave'
            }
            if (tries < 3) {
                tries++
                await new Promise(res => setTimeout(() => res(), tries * 1000))
                this.props.postData[current]()
            } else {
                if (!blocked) blocked = true, setTimeout(() => {
                    blocked = false
                    tries = 1
                    this.props.postData[current]()
                }, 30000)
            }
            console.log(tries, current, blocked)
        })
    }
    handleVotes(likeBtn, dislikeBtn) {
        var tries = 0
        var current = ''
        var blocked = false
        if (this.props.postData.likes === true) likeBtn.on = true
        if (this.props.postData.likes === false) dislikeBtn.on = true
        likeBtn.listen("MDCIconButtonToggle:change", async (e) => {
            if (e.detail.isOn) {
                if (dislikeBtn.on) {
                    dislikeBtn.on = false;
                    this.update(this.state.likes + 2, 'likes')
                } else {
                    this.update(this.state.likes + 1, 'likes')
                }
                current = 'upvote'
            } else {
                this.update(this.state.likes - 1, 'likes')
                current = 'unvote'
            }
            if (tries < 3) {
                tries++
                await new Promise(res => setTimeout(() => res(), tries * 1750));
                this.props.postData[current]()
            } else {
                if (!blocked) blocked = true, setTimeout(() => {
                    blocked = false
                    tries = 1
                    this.props.postData[current]()
                }, 30000)
            }
            console.log(tries, current, blocked)
        })
        dislikeBtn.listen("MDCIconButtonToggle:change", async (e) => {
            if (e.detail.isOn) {
                if (likeBtn.on) {
                    likeBtn.on = false;
                    this.update(this.state.likes - 2, 'likes')
                } else {
                    this.update(this.state.likes - 1, 'likes')
                }
                current = 'downvote'
            } else {
                this.update(this.state.likes + 1, 'likes')
                current = 'unvote'
            }
            if (tries < 3) {
                tries++
                await new Promise(res => setTimeout(() => res(), tries * 1750));
                this.props.postData[current]()
            } else {
                if (!blocked) blocked = true, setTimeout(() => {
                    blocked = false
                    tries = 1
                    this.props.postData[current]()
                }, 30000)
            }
            console.log(tries, current, blocked)
        })
    }
    render = () => (
        <div ref={elm => this.element = elm} className="PostCard mdc-card">

            <header className="mdc-card__actions">
                <div className="mdc-card__action-buttons">
                    <img className="UserAvatar mdc-card__action" src={this.props.authorData.icon_img.split('?')[0]}></img>
                    <div className="UserName mdc-card__action">{this.props.authorData.name}</div>
                </div>
                <div className="mdc-card__action-icons">
                    <button className="mdc-icon-button mdc-card__action mdc-card__action--icon--unbounded" title="Options">
                        <i className="mdc-icon-button__icon"><Icon path={mdiDotsVertical} /></i>
                    </button>
                </div>
            </header>

            <div className="mdc-card__primary-action Content Markdown" tabIndex="0">
                <title>{this.props.postData.title}</title>
                <div dangerouslySetInnerHTML={{__html: this.markdown}} />
            </div>

            <footer className="mdc-card__actions">
                <div className="mdc-card__action-buttons">
                    <button ref={elm => this.like = elm} className="mdc-icon-button mdc-card__action mdc-card__action--icon--unbounded toggle" title="Like">
                        <i className="mdc-icon-button__icon mdc-icon-button__icon--on"><Icon path={mdiThumbUp} /></i>
                        <i className="mdc-icon-button__icon"><Icon path={mdiThumbUpOutline} /></i>
                    </button>
                    <div className="mdc-typography mdc-typography--caption">{this.state.likes}</div>
                    <button ref={elm => this.dislike = elm} className="mdc-icon-button mdc-card__action mdc-card__action--icon--unbounded toggle" title="Dislike">
                        <i className="mdc-icon-button__icon mdc-icon-button__icon--on"><Icon path={mdiThumbDown} /></i>
                        <i className="mdc-icon-button__icon"><Icon path={mdiThumbDownOutline} /></i>
                    </button>
                </div>
                <div className="mdc-card__action-icons">
                    <div className="mdc-typography mdc-typography--caption">{this.props.postData.num_comments} Comments</div>
                    <button ref={elm => this.save = elm} className="mdc-icon-button mdc-card__action mdc-card__action--icon--unbounded toggle" title="Save">
                        <i className="mdc-icon-button__icon mdc-icon-button__icon--on"><Icon path={mdiBookmark} /></i>
                        <i className="mdc-icon-button__icon"><Icon path={mdiBookmarkOutline} /></i>
                    </button>
                </div>
            </footer>

        </div>
    )
    update = (data, key) => this.setState(oldState => {
        var newState = oldState;
        newState[key] = data;
        return newState;
    })
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