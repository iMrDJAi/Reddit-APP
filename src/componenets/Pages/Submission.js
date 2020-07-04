import React, { Component } from 'react'
import { PostCardFull } from '../Posts/PostCardFull'
export class Submission extends Component {
    constructor(props) {
        super(props)
        console.log(props)
    }
    componentDidMount() {
        
    }
    render = () => (
        <div>
            <PostCardFull {...this.props} postData={this.props.location.state} />
        </div>
    )
}