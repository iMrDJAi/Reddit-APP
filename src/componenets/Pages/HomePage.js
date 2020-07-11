import React, { Component } from 'react'
import { Route, matchPath, Redirect } from "react-router-dom"

import { TopAppBarHome } from '../MaterialComponents/TopAppBarHome'
import { TabBar } from '../MaterialComponents/TabBar'
import { Drawer } from '../MaterialComponents/Drawer'
import { Fab } from '../MaterialComponents/Fab'

import { Submission } from './Submission'
import { PostsWrapper } from '../Posts/PostsWrapper'

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
        this.handleHistoryUpdates(this.props.location)
        this.props.history.listen(location => {
            this.handleHistoryUpdates(location)
        })
    }
    handleHistoryUpdates(location) {
        const match = matchPath(location.pathname, {
            path: "/home/:sort?/:flair?",
            exact: true,
            strict: false
        })
        if (match) {
            //console.log(this.props)
            //console.log(location)
            //console.log(match)
            if (!match.params.flair || !window.app.flairs.find(flair => flair.name === match.params.flair)) window.app.submissions.flair = ''
            else window.app.submissions.flair = match.params.flair
            window.history.pushState('', '', `/home/${window.app.submissions.sort}/${window.app.submissions.flair}`)
            if (!document.getElementById(`${window.app.submissions.sort}-${window.app.submissions.flair}`)) {
                //console.log(`${window.app.submissions.sort}-${window.app.submissions.flair}`)
                this.push({sort: window.app.submissions.sort, flair: window.app.submissions.flair}, 'postsWrappers')
            }
            this.update(<style>{`
                #${window.app.submissions.sort}-${window.app.submissions.flair} {
                    display: block !important;
                }
            `}</style>, 'style')         
        }
    }
    render = () => {
        var wrappers = this.state.postsWrappers.map(config => {
            console.log(config)
            return <PostsWrapper {...this.props} config={config} key={`${config.sort}-${config.flair}`} />
        })
        return <> 
            <div className='Home'>
                <TopAppBarHome events={this.props.events} />
                <Drawer events={this.props.events} />
                <div className="mdc-drawer-scrim" />
                {wrappers}
                {this.state.style}
                <Fab />
            </div>
            <Route exact path={["/comments/:id"]} component={props => (
                <Submission {...props} />
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
    /*


    
    shouldComponentUpdate(nextProps, nextState) {
        const match = matchPath(this.props.location.pathname, {
            path: "/home/:sort?/:flair?",
            exact: true,
            strict: false
        })
        console.log(this.props.location.pathname, !match)
        if (match) return false
        else return true
    }*/
}



/*

            <Route exact path={["/home/:sort?/:flair?"]} component={props => {
                if (props.match.params.sort) window.app.submissions.sort = props.match.params.sort
                if (props.match.params.flair) window.app.submissions.flair = props.match.params.flair
                //window.history.pushState('', '', `/home/${window.app.submissions.sort}/${window.app.submissions.flair}`)
                console.log(`${window.app.submissions.sort}-${window.app.submissions.flair}`)
                return <style>{`
                    #${window.app.submissions.sort}-${window.app.submissions.flair} {
                        display: block;
                    }
                `}</style>
            }}/>









*/