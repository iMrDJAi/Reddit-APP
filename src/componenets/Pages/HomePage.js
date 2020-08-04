import React, { Component } from 'react'
import { Route, matchPath, Redirect } from "react-router-dom"

import { TopAppBarHome } from '../MaterialComponents/TopAppBarHome'
import { Drawer } from '../MaterialComponents/Drawer'
import { Fab } from '../MaterialComponents/Fab'

import { Submission } from './Submission'
import { PostsWrapper } from '../Posts/PostsWrapper'
import { SubmitPage } from './SubmitPage'


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
    handleHistoryUpdates(pathname) {
        const match = matchPath(pathname, {
            path: "/home/:sort?/:flair?/:name?",
            exact: true
        })
        if (match) {
            console.log(pathname, match, match.params.sort, match.params.flair) 
            if ((match.params.sort && !window.app.submissions.sorts.some(sort => sort === match.params.sort)) || (match.params.flair && !window.app.flairs.some(flair => flair.hash === match.params.flair))) {
                this.props.history.push(`/home/${window.app.submissions.sorts[0]}`)
            } else {
                if (match.params.flair) {
                    const flair = window.app.flairs.find(flair => flair.hash === match.params.flair)
                    window.history.replaceState('', '', `/home/${match.params.sort}/${match.params.flair}/${flair.name}`)
                    var flairTxt = flair.text
                } else {
                    match.params.flair = ''
                    var flairTxt = ''
                }
                if (!document.getElementById(`${match.params.sort}-${match.params.flair}`)) {
                    this.push({sort: match.params.sort, flair: flairTxt, id: `${match.params.sort}-${match.params.flair}`}, 'postsWrappers')
                }
                this.update(`
                    #${match.params.sort}-${match.params.flair} {
                        display: block !important;
                        height: 110vh;
                    }
                `, 'style')
            }
        }
    }
    render = () => {
        var wrappers = this.state.postsWrappers.map(config => {
            return <PostsWrapper {...this.props} config={config} key={`${config.sort}_${config.flair}`} />
        })
        return <> 
            <div className='Home'>
                <TopAppBarHome {...this.props} />
                <Drawer {...this.props} />
                <div className="mdc-drawer-scrim" />
                {wrappers}
                <Fab />
                <style>{this.state.style}</style>
            </div>
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