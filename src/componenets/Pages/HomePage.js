import React, { Component } from 'react'
import { Route, matchPath, Redirect } from "react-router-dom"

import { TopAppBarHome } from '../MaterialComponents/TopAppBarHome'
import { TabBar } from '../MaterialComponents/TabBar'
import { Drawer } from '../MaterialComponents/Drawer'
import { Fab } from '../MaterialComponents/Fab'

import { Submission } from './Submission'
import { PostsWrapper } from '../Posts/PostsWrapper'
import { SubmitPage } from './SubmitPage'
import { Div } from '../Posts/Div'


export class HomePage extends Component {
    constructor() {
        super()
        this.state = {
            postsWrappers: [],
            style: ''
        }
        this.push = this.push.bind(this)
        this.update = this.update.bind(this)
    }
    componentDidMount() {
        this.handleHistoryUpdates(this.props.location.pathname)
        this.props.history.listen(location => {
            this.handleHistoryUpdates(location.pathname)
        })
    }
    async handleHistoryUpdates(pathname) {
        const match = matchPath(pathname, {
            path: "/home/:sort?/:flair?",
            exact: true
        })
        if (match) {
            console.log(pathname, match, match.params.sort, match.params.flair) 
            if (!window.app.submissions.sorts.find(sort => sort === match.params.sort) || (match.params.flair && !window.app.flairs.find(flair => flair.name === match.params.flair))) {
                await new Promise(res => setTimeout(() => res(), 0))
                this.props.history.replace('/home/new')
            } else {
                if (match.params.flair) {
                    var flair = window.app.flairs.find(flair => flair.name === match.params.flair).text
                } else {
                    match.params.flair = ''
                    var flair = ''
                }
                if (!document.getElementById(`${match.params.sort}_${match.params.flair}`)) {
                    this.push({sort: match.params.sort, flair: flair, id: `${match.params.sort}_${match.params.flair}`}, 'postsWrappers')
                }
                this.update(`
                    #${match.params.sort}_${match.params.flair} {
                        display: block !important;
                    }
                `, 'style')
            }
        }
    }
    render = () => {
        var wrappers = this.state.postsWrappers.map(config => {
            return <PostsWrapper {...this.props} config={config} key={`${config.sort}_${config.flair}`} />
            //return <Div config={config} key={config.id} />
        })
        return <> 
            <div className='Home'>
                <TopAppBarHome events={this.props.events} />
                <Drawer events={this.props.events} />
                <div className="mdc-drawer-scrim" />
                {wrappers}
                <Fab />
            </div>
            <style>{this.state.style}</style>
            <Route exact path={["/comments/:id"]} component={props => (
                <Submission {...props} />
            )}/>
            <Route exact path={["/submit"]} component={props => (
                <SubmitPage {...props} />
            )}/>
        </>
    }
    push = (data, key) => this.setState(oldState => {
        oldState[key].push(data)
        return oldState
    })
    update = (data, key) => this.setState(oldState => {
        oldState[key] = data
        return oldState
    })
}