import React, { Component } from 'react'
import { RegularPost } from '../Post/RegularPost'
import Utils from '../../classes/Utils'

export class PostsWrapper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
        this.update = this.update.bind(this)
    }
    componentDidMount() {
        var update = this.update;
        window.app.events.on('PostsPush', data => {
            var posts = data.postsObj.map(postObj => {
                if (!postObj.crosspost_parent) { //regular post
                    return <RegularPost postData={postObj} key={postObj.id} />;
                } else { //cross post
        
                }
            });
            update(posts, 'posts')
            console.log(posts)
        });
    }
    render = () => (
        <div className="mdc-layout-grid PostsContainer">
            <div className="mdc-layout-grid__inner">
                {this.state.posts}
            </div>
        </div>
    )
    update = (data, key) => this.setState(oldState => {
        oldState[key] = data;
        return oldState;
    })
}