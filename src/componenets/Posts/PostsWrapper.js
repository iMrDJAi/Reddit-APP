import React, { Component } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { PostCardPreview } from './PostCardPreview'
import System from '../../classes/System'

export class PostsWrapper extends Component {
    constructor() {
        super()
        this.state = {
            postsData: [],
            hasMore: true      
        }
        this.update = this.update.bind(this)
    }
    async pushPosts() {
        if (!this.state.postsData[0]) var postsData = await window.app.subreddit.getNew({ 'limit': 15 })
        else var postsData = await this.state.postsData.fetchMore({ 'amount': 15 })
        if (postsData.length === this.state.postsData.length) this.update(false, 'hasMore')
        else this.update(postsData, 'postsData')
        /*for (let postData of postsData) {
            postData.author = await postData.author.fetch()
        }*/
        console.log(postsData)
    }
    render = () => {
        var posts = this.state.postsData.map(postObj =>
            <PostCardPreview {...this.props} postData={postObj} key={postObj.id} />
        )
        return <div className="mdc-layout-grid ContentContainer">
            <InfiniteScroll
                className="mdc-layout-grid__inner"
                loadMore={this.pushPosts.bind(this)}
                hasMore={this.state.hasMore}
                loader={<div key={0}>Loading ...</div>}
            >
                {posts}
            </InfiniteScroll>
        </div>
    }
    update = (data, key) => this.setState(oldState => {
        oldState[key] = data;
        return oldState;
    })
}