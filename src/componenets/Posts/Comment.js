import React, { Component } from 'react'
import renderMarkdown from 'imrdjai-mdr'

export class Comment extends Component {
    render = () => (
        <li>
            <div dangerouslySetInnerHTML={{__html: renderMarkdown(this.props.commentData.body)}}></div>
            <ul>{this.props.replies}</ul>
        </li>
    )
}