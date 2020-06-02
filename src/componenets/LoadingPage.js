import React, { Component } from 'react'
import { LoadingPageBox } from './LoadingPageBox.js'

export class LoadingPage extends Component {
    constructor() {
        super()
    }
    render = () => (
        <div className="LoadingPage">
            <LoadingPageBox />
        </div>
    )
}