import React, { Component } from 'react'
import { PostCardFull } from '../Posts/PostCardFull'
import { TopAppBar } from '../MaterialComponents/TopAppBar'
export class Submission extends Component {
    constructor(props) {
        super(props)
        this.state = {
            PostCardFull: ''
        }
        this.update = this.update.bind(this)
    }
    async componentDidMount() {
        const postData = await window.app.r.getSubmission(this.props.match.params.id).fetch()
        this.update(<PostCardFull {...this.props} postData={postData} />, 'PostCardFull')
        console.log(window.app.r.ratelimitRemaining)
    }
    render = () => (
        <>
            <TopAppBar />
            <div className="mdc-layout-grid Submission">
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