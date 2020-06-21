import React, { Component } from 'react'
import { RegularPostCard } from './Posts/RegularPostCard'
import { CrossPostCard } from './Posts/CrossPostCard'
import System from '../classes/System'

export class PostsWrapper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
        this.push = this.push.bind(this)
    }
    async componentDidMount() {
        var postsObj = await window.app.subreddit.getNew({ 'limit': 10 });
        postsObj = await Promise.all(postsObj.map(async post => {
            post.author = await System.userData(post.author.name);
            return post;
        }))
        console.log(posts);
        var posts = postsObj.map(postObj => {
            if (!postObj.crosspost_parent) { //regular post
                return <RegularPostCard postData={postObj} key={postObj.id} />;
            } else { //cross post
                return <CrossPostCard postData={postObj} key={postObj.id} />;
            }
        });
        this.push(posts, 'posts')
    }
    render = () => (
        <div className="mdc-layout-grid PostsContainer">
            <div className="mdc-layout-grid__inner">
                {this.state.posts}
            </div>
        </div>
    )
    push = (data, key) => this.setState(oldState => {
        oldState[key].push(data);
        return oldState;
    })
}