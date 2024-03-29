import React, { Component } from 'react'
import { Route, matchPath } from "react-router-dom"

import { TopAppBarHome } from '../MaterialComponents/TopAppBarHome'
import { Drawer } from '../MaterialComponents/Drawer'
import { Fab } from '../MaterialComponents/Fab'

import { Submission } from './Submission'
import { PostsWrapper } from '../Posts/PostsWrapper'
import { SubmitPage } from './SubmitPage'


export class HomePage extends Component {
    constructor(props) {
        super(props)
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
            if (match.params.sort && !window.app.sorts.some(sort => sort.id === match.params.sort)) {
                setTimeout(() => this.props.history.push(`/home/${window.app.sorts[0].id}`), 0) //Redirect at the next tick
                document.title = `${window.app.sorts[0].id} - all`
            } else if (match.params.flair && !window.app.flairs.some(flair => flair.hash === match.params.flair)) {
                setTimeout(() => this.props.history.push(`/home/${match.params.sort}`), 0) //Redirect at the next tick
                document.title = `${match.params.sort} - all`
            } else {
                if (match.params.flair) {
                    const flair = window.app.flairs.find(flair => flair.hash === match.params.flair)
                    window.history.replaceState('', '', `/home/${match.params.sort}/${match.params.flair}/${flair.name}`)
                    document.title = `${match.params.sort} - ${flair.name}`
                    var flairTxt = flair.text
                } else {
                    match.params.flair = ''
                    var flairTxt = ''
                    if (match.params.sort) document.title = `${match.params.sort} - all`
                    else document.title = 'home'
                }
                if (!document.getElementById(`${match.params.sort}-${match.params.flair}`)) {
                    this.push({sort: match.params.sort, flair: flairTxt, id: `${match.params.sort}-${match.params.flair}`}, 'postsWrappers')
                }
                this.update(`
                    #${match.params.sort}-${match.params.flair} {
                        display: block !important;
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
            <Route exact path={["/comments/:id/:title?"]} component={props => (
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