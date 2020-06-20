import React, { Component } from 'react'
import { MDCRipple } from '@material/ripple';
import Icon from '@mdi/react'
import { mdiThumbUp, mdiThumbDown, mdiThumbUpOutline, mdiThumbDownOutline, mdiDotsVertical, mdiBookmark, mdiBookmarkOutline } from '@mdi/js'
import { MDCIconButtonToggle } from '@material/icon-button';
var Strings = require('../../classes/Strings');
var renderMarkdown = require('imrdjai-mdr');

export class PostPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: ''
        }
        this.update = this.update.bind(this)
    }
    componentDidMount() {
        var update = this.update;
        /*window.app.events.on('PostPage', data => {
            console.log(data)
            update(data.content, 'page')
            update(data.content.parentElement, 'parent')
            update(data.postData, 'postData')
            this.element.appendChild(data.content.cloneNode(true))
            this.element.classList.add('PostPageUnhidden')
        });*/
    }
    handleClick() {

    }
    render = () => (
        <div className="PostPage" ref={ele => this.element = ele}>

        </div>
    )
    update = (data, key) => this.setState(oldState => {
        oldState[key] = data;
        return oldState;
    })
}