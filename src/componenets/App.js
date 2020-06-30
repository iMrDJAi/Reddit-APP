import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";  

import { TopAppBar } from './MaterialComponents/TopAppBar'
import { TabBar } from './MaterialComponents/TabBar'
import { Drawer } from './MaterialComponents/Drawer'
import { Fab } from './MaterialComponents/Fab'

import { LoginPage } from './LoginPage' 
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
                <Route exact path="/login" component={props => {
                    if (!props.location.state) props.location.state = {}
                    return !window.app.r ? <LoginPage {...props} /> : <Redirect to="/posts" />
                }}/>
                <Route exact path={["/posts", "/posts/:sort"]} component={props => (
                    window.app.r ? 
                    <>
                        <TopAppBar />
                        <Drawer />
                        <div className="mdc-drawer-scrim" />
                        <PostsWrapper {...props} />
                        <Fab />
                    </>
                    : <Redirect to={{
                        pathname: "/login",
                        state: { referrer: props.location.pathname + props.location.search }
                      }} />
                )}/>
                {/*404*/}
                <Route>
                    <Redirect to="/login" />
                </Route>
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