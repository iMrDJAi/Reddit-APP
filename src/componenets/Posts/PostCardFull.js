import React, { Component } from 'react'
import Icon from '@mdi/react'
import { mdiThumbUp, mdiThumbDown, mdiThumbUpOutline, mdiThumbDownOutline, mdiDotsVertical, mdiBookmark, mdiBookmarkOutline } from '@mdi/js' //
import { MDCIconButtonToggle } from '@material/icon-button'
import { MDCRipple } from '@material/ripple'
import { Comment } from './Comment'
import System from '../../classes/System'
import renderMarkdown from 'imrdjai-mdr'

export class PostCardFull extends Component {
    constructor(props) {
        super(props)
        this.state = {
            postData: props.postData,
            authorData: {
                icon_img: window.app.subreddit.community_icon
            },
            mainElement: props.mainElement,
            likes: props.postData.score,
            comments: props.postData.comments
        }
        this.update = this.update.bind(this)
    }
    /*componentDidUpdate() {
        var postData = this.state.postData
        postData.score = this.state.likes
        postData.comments = this.state.comments
        window.app.cache.posts[postData.id] = postData
    }*/
    async componentDidMount() {
        if (this.state.mainElement) this.mainElm.replaceWith(this.state.mainElement)

        var likeBtn = new MDCIconButtonToggle(this.like)
        var dislikeBtn = new MDCIconButtonToggle(this.dislike)
        this.handleVotes(likeBtn, dislikeBtn)

        var saveBtn = new MDCIconButtonToggle(this.save)
        this.handleSave(saveBtn)

        var options = new MDCRipple(this.options)
        options.unbounded = true

        if (this.state.postData.author.name !== '[deleted]') {
            var author = await System.fetchPostAuthor(this.state.postData.author)
            if (author && !author.is_suspended) this.update(author, 'authorData')
        }
    }
    handleVotes(likeBtn, dislikeBtn) {
        var tries = 0
        var current = ''
        var blocked = false
        if (this.state.postData.likes === true) likeBtn.on = true
        if (this.state.postData.likes === false) dislikeBtn.on = true
        likeBtn.listen("MDCIconButtonToggle:change", async (e) => {
            if (e.detail.isOn) {
                if (dislikeBtn.on) {
                    dislikeBtn.on = false
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
                await new Promise(res => setTimeout(() => res(), tries * 1750))
                System.request(this.state.postData[current]())
            } else {
                if (!blocked) blocked = true, setTimeout(() => {
                    blocked = false
                    tries = 1
                    System.request(this.state.postData[current]())
                }, 30000)
            }
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
                System.request(this.state.postData[current]())
            } else {
                if (!blocked) blocked = true, setTimeout(() => {
                    blocked = false
                    tries = 1
                    System.request(this.state.postData[current]())
                }, 30000)
            }
        })
    }
    handleSave(saveBtn) {
        if (this.state.postData.saved === true) saveBtn.on = true; else saveBtn.on = false
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
                System.request(this.state.postData[current]())
            } else {
                if (!blocked) blocked = true, setTimeout(() => {
                    blocked = false
                    tries = 1
                    System.request(this.state.postData[current]())
                }, 30000)
            }
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
    render = () => {
        var commentsArray = []
        function renderComment(object) {
            return <Comment key={object.id} commentData={object} replies={(() => {
                if (object.replies) {
                    var replies = []
                    for (let reply of object.replies) {
                        replies.push(renderComment(reply))
                    }
                    return replies
                }
            })()}/>
        }
        for (let comment of this.state.comments) commentsArray.push(renderComment(comment))
        return <div ref={elm => this.element = elm} className="PostCard mdc-card mdc-layout-grid__cell mdc-layout-grid__cell--span-12">

            <header className="mdc-card__actions">
                <div className="mdc-card__action-buttons">
                    <img className="UserAvatar mdc-card__action" src={this.state.authorData.icon_img.split('?')[0]}></img>
                    <div className="Container">
                        <div className="Name mdc-card__action">{this.state.postData.author.name}</div>
                        <div className="Info">{System.timeSince(new Date(this.state.postData.created_utc * 1000))}</div>
                    </div>
                </div>
                <div className="mdc-card__action-icons">
                    <button ref={elm => this.options = elm} className="mdc-icon-button mdc-card__action mdc-card__action--icon--unbounded" title="Options">
                        <i className="mdc-icon-button__icon"><Icon path={mdiDotsVertical} /></i>
                    </button>
                </div>
            </header>

            {
                !this.state.mainElement ?
                <>
                    {
                        this.props.postData.crosspost_parent ?
                        <div className="Main Markdown" tabIndex="0">
                            <title>{this.state.postData.title}</title>
                            <div className='Content ContentCrossPost'>
                                <div className="mdc-card mdc-card--outlined">
                                    <header className="mdc-card__actions">
                                        <div className="mdc-card__action-buttons">
                                            <div className="Container">
                                                <div className="Name mdc-card__action">{this.state.postData.crosspost_parent_list[0].subreddit_name_prefixed}</div>
                                                <div className="Info">Posted By {this.state.postData.crosspost_parent_list[0].author.name} • {System.timeSince(new Date(this.state.postData.crosspost_parent_list[0].created_utc * 1000))}</div>
                                            </div>
                                        </div>
                                    </header>
                                    <div className="Main Markdown" tabIndex="0">
                                        <title>{this.state.postData.crosspost_parent_list[0].title}</title>
                                        <div dangerouslySetInnerHTML={{__html: this.handleMarkdown(this.state.postData)}} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        : <div className="Main Markdown" tabIndex="0">
                            <title>{this.state.postData.title}</title>
                            <div className='Content' dangerouslySetInnerHTML={{__html: this.handleMarkdown(this.state.postData)}} />           
                        </div>
                    }
                </>   
                : <div ref={ele => this.mainElm = ele}/>
            }

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
            <ul>
                {commentsArray}
            </ul>
        </div>
    }
    update = (data, key) => this.setState(oldState => {
        oldState[key] = data
        return oldState
    })
}