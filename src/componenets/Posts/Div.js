import React, { Component } from 'react'

export class Div extends Component {
    constructor() {
        super()
        this.random = Math.random()
    }
    render = () => (
        <div id={this.props.config.id} className='PostsContainer' style={{display: 'none'}}>
            {`${this.props.config.sort}\n${this.props.config.flair}\n${this.random}`}
        </div>
    )
}