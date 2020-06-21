import React, { Component } from 'react'
import { MDCRipple } from '@material/ripple'
import Icon from '@mdi/react'
import { mdiThumbUp, mdiThumbDown, mdiThumbUpOutline, mdiThumbDownOutline, mdiDotsVertical, mdiBookmark, mdiBookmarkOutline } from '@mdi/js'
import { MDCIconButtonToggle } from '@material/icon-button'
import System from '../../classes/System'
var renderMarkdown = require('imrdjai-mdr');

export class RegularPostCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            postData: props.postData,
            likes: props.postData.score
        }
        this.update = this.update.bind(this)
    }
    componentDidMount() {
        var likeBtn = new MDCIconButtonToggle(this.like)
        var dislikeBtn = new MDCIconButtonToggle(this.dislike)
        this.handleVotes(likeBtn, dislikeBtn)

        var saveBtn = new MDCIconButtonToggle(this.save)
        this.handleSave(saveBtn)

        var main = new MDCRipple(this.main)

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
    handleSave(saveBtn) {
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
    handleMarkdown(postObj) {
        if (postObj.is_self) {
            return renderMarkdown(this.state.postData.selftext)
        } else {
            if (postObj.post_hint === "image") {
                var url = postObj.preview.images[0].source.url
            } else {
                var url = postObj.url
            }
            return `<p align="center"><img src="${url}" style="display: block;" onerror="mrdjaEmbeds(this)" /></p>`
        }
    }
    handleClick() {
        window.app.events.emit('PostPage', {
            content: this.content,
            postData: this.state.postData
        });
    }
    render = () => (
        <div ref={elm => this.element = elm} className="PostCard mdc-card mdc-layout-grid__cell mdc-layout-grid__cell--span-12 ">

            <header className="mdc-card__actions">
                <div className="mdc-card__action-buttons">
                    <img className="UserAvatar mdc-card__action" src={this.state.postData.author.icon_img.split('?')[0]}></img>
                    <div className="Container">
                        <div className="Name mdc-card__action">{this.state.postData.author.name}</div>
                        <div className="Info">{System.timeSince(new Date(this.state.postData.created_utc * 1000))}</div>
                    </div>
                </div>
                <div className="mdc-card__action-icons">
                    <button className="mdc-icon-button mdc-card__action mdc-card__action--icon--unbounded" title="Options">
                        <i className="mdc-icon-button__icon"><Icon path={mdiDotsVertical} /></i>
                    </button>
                </div>
            </header>

            <div ref={elm => this.main = elm} onClick={this.handleClick.bind(this)} className="mdc-card__primary-action Main Markdown" tabIndex="0">
                <title>{this.state.postData.title}</title>
                <div ref={elm => this.content = elm} className='Content' dangerouslySetInnerHTML={{__html: this.handleMarkdown(this.state.postData)}} />
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
                    <div className="mdc-typography mdc-typography--caption">{this.state.postData.num_comments} Comments</div>
                    <button ref={elm => this.save = elm} className="mdc-icon-button mdc-card__action mdc-card__action--icon--unbounded toggle" title="Save">
                        <i className="mdc-icon-button__icon mdc-icon-button__icon--on"><Icon path={mdiBookmark} /></i>
                        <i className="mdc-icon-button__icon"><Icon path={mdiBookmarkOutline} /></i>
                    </button>
                </div>
            </footer>

        </div>
    )
    update = (data, key) => this.setState(oldState => {
        oldState[key] = data;
        return oldState;
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