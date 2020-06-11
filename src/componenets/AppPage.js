import React, { Component } from 'react'
import { TopAppBar } from './AppPageParts/TopAppBar'
import { TabBar } from './AppPageParts/TabBar'
import { Drawer } from './AppPageParts/Drawer'
import { Fab } from './AppPageParts/Fab'
import { PostsWrapper } from './AppPageParts/PostsWrapper'

export class AppPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
        this.update = this.update.bind(this)
    }
    componentDidMount() {
        var update = this.update;
        var posts = [];
        window.app.events.on('PostPush', data => {
            posts.push(data.element)
            update(posts, 'posts')
            console.log(posts)
        });
    }
    render = () => (
        <div className="AppPage">
            <TopAppBar />
            <Drawer />
            <div className="mdc-drawer-scrim"></div>
            <PostsWrapper />
            <Fab />
        </div>
    )
    update = (data, key) => this.setState(oldState => {
        oldState[key] = data;
        return oldState;
    })
}

/*            <div className="PostsPart">
                <div className="Posts"></div>
            </div>
            
            
            
            
            
            <div className="mdc-layout-grid">
                <div className="mdc-layout-grid__inner">
                    <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
                        <div className="Posts" />
                    </div>
                </div>
            </div>
            
            
            
            
            
            */