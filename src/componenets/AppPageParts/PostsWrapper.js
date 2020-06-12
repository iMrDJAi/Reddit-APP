import React, { Component } from 'react'
import { RegularPost } from '../Post/RegularPost'
import { CrossPost } from '../Post/CrossPost'
import Utils from '../../classes/Utils'

export class PostsWrapper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
        this.push = this.push.bind(this)
    }
    componentDidMount() {
        var push = this.push;
        window.app.events.on('PostsPush', data => {
            var posts = data.postsObj.map(postObj => {
                if (!postObj.crosspost_parent) { //regular post
                    return <RegularPost postData={postObj} key={postObj.id} />;
                } else { //cross post
                    return <CrossPost postData={postObj} key={postObj.id} />;
                }
            });
            push(posts, 'posts')
        });
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