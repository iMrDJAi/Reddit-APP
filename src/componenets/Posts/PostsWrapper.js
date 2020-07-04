import React, { Component } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { PostCardPreview } from './PostCardPreview'
import System from '../../classes/System'

export class PostsWrapper extends Component {
    constructor() {
        super()
        this.state = {
            postsObj: [],
            posts: []      
        }
        this.push = this.push.bind(this)
        this.update = this.update.bind(this)
        this.pushPosts = this.pushPosts.bind(this)
    }
    async pushPosts() {
        if (!this.state.postsObj[0]) var postsObj = await window.app.subreddit.getNew({ 'limit': 15 })
        else var postsObj = await this.state.postsObj.fetchMore({ 'amount': 15 }).catch()
        /*postsObj = await Promise.all(postsObj.map(async post => {
            post.author = await System.userData(post.author.name)
            return post
        }))*/
        console.log(postsObj)
        this.update(postsObj, 'postsObj')
    }
    render = () => {
        var posts = this.state.postsObj.map(postObj =>
            <PostCardPreview {...this.props} postData={postObj} key={postObj.id} />
        )
        return <div className="mdc-layout-grid PostsContainer">
            <InfiniteScroll
                className="mdc-layout-grid__inner"
                loadMore={this.pushPosts}
                hasMore={true}
                loader={<div key={0}>Loading ...</div>}
            >
                {posts}
            </InfiniteScroll>
        </div>
    }
    push = (data, key) => this.setState(oldState => {
        oldState[key].push(data);
        return oldState;
    })
    update = (data, key) => this.setState(oldState => {
        oldState[key] = data;
        return oldState;
    })
}