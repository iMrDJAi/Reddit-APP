import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";  

import { TopAppBar } from './MaterialComponents/TopAppBar'
import { TabBar } from './MaterialComponents/TabBar'
import { Drawer } from './MaterialComponents/Drawer'
import { Fab } from './MaterialComponents/Fab'

import { LoadingPage } from './LoadingPage' 
import { PostsWrapper } from './PostsWrapper'

export class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
        this.update = this.update.bind(this)
    }
    render = () => (
        <Router>
            <nav>
                <Link to="/">Home </Link>
                <Link to="/posts">Posts </Link>
                <Link to="/login">Login </Link>
            </nav>
            <Switch>
                <Route exact path="/login" component={(props)=> (
                   <LoadingPage {...props} />
                )}/>
                <Route path="/posts"  component={(props) => (
                    window.app.isLoggedIn ? 
                    <>
                        <TopAppBar />
                        <Drawer />
                        <div className="mdc-drawer-scrim" />
                        <PostsWrapper />
                        <Fab />
                    </>
                    : <Redirect to="/login" />
                )}/>
                <Route component={()=> (
                   <Redirect to="/login" />
                )}/>
            </Switch>
        </Router>
    )
    update = (data, key) => this.setState(oldState => {
        oldState[key] = data;
        return oldState;
    })
}

/*
    <PostsWrapper />


*/