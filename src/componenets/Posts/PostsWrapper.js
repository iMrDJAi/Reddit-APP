import React, { Component } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { PostCardPreview } from './PostCardPreview'
import { CircularProgress } from '../MaterialComponents/CircularProgress'
import System from '../../classes/System'

export class PostsWrapper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            postsData: [],
            hasMore: true,
            isLoading: false
        }
        this.update = this.update.bind(this)
    }
    shouldComponentUpdate = () => !this.state.isLoading
    async pushPosts() {
        this.update(true, 'isLoading')
        if (!this.state.postsData[0]) var postsData = await System.fetchPosts(this.props.config.sort, this.props.config.flair)
        else var postsData = await System.fetchMorePosts(this.state.postsData, 15)
        if (postsData.length === this.state.postsData.length) this.update(false, 'hasMore')
        else this.update(postsData, 'postsData')
        this.update(false, 'isLoading')
    }
    render = () => {
        var posts = this.state.postsData.map(postObj =>
            <PostCardPreview {...this.props} postData={postObj} key={postObj.id} />
        )
        return <div className="mdc-layout-grid PostsContainer" id={`${this.props.config.id || ''}`}>
            <InfiniteScroll
                className="mdc-layout-grid__inner"
                loadMore={this.pushPosts.bind(this)}
                hasMore={this.state.hasMore}
                loader={<CircularProgress key={0} />}
            >
                {posts}
            </InfiniteScroll>
        </div>
    }
    update = (data, key) => this.setState(oldState => {
        oldState[key] = data
        return oldState
    })
}