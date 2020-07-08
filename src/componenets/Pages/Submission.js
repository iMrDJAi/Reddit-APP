import React, { Component } from 'react'
import { PostCardFull } from '../Posts/PostCardFull'
import { TopAppBarSubmission } from '../MaterialComponents/TopAppBarSubmission'
export class Submission extends Component {
    constructor(props) {
        super(props)
        this.state = {
            PostCardFull: ''
        }
        this.update = this.update.bind(this)
    }
    async componentDidMount() {
        if (window.app.cache.posts[this.props.match.params.id]) {
            const element = document.getElementById(this.props.match.params.id).cloneNode(true)
            element.className = "Main Markdown"
            this.update(<PostCardFull 
                {...this.props} 
                postData={window.app.cache.posts[this.props.match.params.id]} 
                mainElement={element} 
            />, 'PostCardFull')
        } else {
            const postData = await window.app.r.getSubmission(this.props.match.params.id).fetch()
            this.update(<PostCardFull {...this.props} postData={postData} mainElement='' />, 'PostCardFull')
        }
    }
    render = () => (
        <>
            <TopAppBarSubmission />
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