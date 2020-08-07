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
        console.log(props)
    }
    shouldComponentUpdate = () => !this.state.isLoading
    test = () => [
        {
            text: Math.random()
        }, 
        {
            text: Math.random()
        }, 
        {
            text: Math.random()
        }, 
        {
            text: Math.random()
        }, 
        {
            text: Math.random()
        }, 
        {
            text: Math.random()
        }, 
        {
            text: Math.random()
        }, 
        {
            text: Math.random()
        }, 
        {
            text: Math.random()
        }, 
        {
            text: Math.random()
        }, 
        {
            text: Math.random()
        }, 
        {
            text: Math.random()
        }
    ]
    async pushPosts() {
        this.update(true, 'isLoading')
        console.log('new call')
        if (!this.state.postsData[0]) var postsData = await System.fetchPosts(this.props.config.sort, this.props.config.flair)
        else var postsData = await this.state.postsData.fetchMore({ 'amount': 15 })
        if (postsData.length === this.state.postsData.length) this.update(false, 'hasMore')
        else this.update(postsData, 'postsData')
        console.log(postsData)
        /*await new Promise(res => setTimeout(() => res(), 2000))
        var postsData = this.state.postsData.copyWithin()
        postsData.push(...this.test())
        this.update(postsData, 'postsData')
        console.log(postsData)*/
        this.update(false, 'isLoading')
    }
    render = () => {
        var posts = this.state.postsData.map(postObj =>
            <PostCardPreview {...this.props} postData={postObj} key={postObj.id} />
            /*<div style={{height: '300px'}} className="PostCard PostCardPreview mdc-card mdc-layout-grid__cell mdc-layout-grid__cell--span-12" key={postObj.text}>
                {this.props.config.sort + ' ' + this.props.config.flair}
                <br/>
                {postObj.text}
            </div>*/
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

//id={`${this.props.match.params.sort}-${this.props.match.params.flair}`}