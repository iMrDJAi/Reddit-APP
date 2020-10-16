import React, { Component } from 'react'
import { PostCardFull } from '../Posts/PostCardFull'
import { TopAppBarSubmission } from '../MaterialComponents/TopAppBarSubmission'
import slug from 'slug'
import System from '../../classes/System'
export class Submission extends Component {
    constructor(props) {
        super(props)
        this.state = {
            PostCardFull: ''
        }
        this.update = this.update.bind(this)
    } ///${slug(this.state.postData.title)}
    async componentDidMount() {
        const postData = await System.fetchPost(this.props.match.params.id)
        window.history.replaceState('', '', `/comments/${postData.id}/${slug(postData.title)}`)
        document.title = postData.title
        if (postData && postData.subreddit.display_name === window.app.subreddit.display_name) {
            var element = document.getElementById(this.props.match.params.id)
            if (element) {
                element = element.cloneNode(true)
                element.className = "Main Markdown"
                element.removeAttribute('tabindex')
            } else {
                element = ''
            }
            this.update(<PostCardFull 
                {...this.props} 
                postData={postData} 
                mainElement={element} 
            />, 'PostCardFull')
        } else {
            this.props.history.goBack()
        }
    }
    render = () => (
        <>
            <TopAppBarSubmission {...this.props} />
            <div className="mdc-layout-grid ContentContainer">
                <div className="mdc-layout-grid__inner">
                    {this.state.PostCardFull}
                </div>
            </div>
            <style>{`
                .Home {
                    display: none;
                }
            `}</style>           
        </>
    )
    update = (data, key) => this.setState(oldState => {
        oldState[key] = data;
        return oldState;
    })
}