import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";  
import EventEmitter from 'events'

import { TopAppBar } from './MaterialComponents/TopAppBar'
import { TabBar } from './MaterialComponents/TabBar'
import { Drawer } from './MaterialComponents/Drawer'
import { Fab } from './MaterialComponents/Fab'

import { LoginPage } from './Pages/LoginPage' 
import { PostsWrapper } from './Posts/PostsWrapper'
import { Submission } from './Pages/Submission'

export class App extends Component {
    events = new EventEmitter()
    render = () => (
        <Router>
            <nav>
                <Link to="/">Root </Link>
                <Link to="/login">Login </Link>
                <Link to="/home">Home </Link>
                <Link to="/home/new">Home-New </Link>
                <Link to="/home/new/news">Home-New-News </Link>
                <Link to="/submission/2np694">Submission </Link>
                <Link to="/submit">Submit </Link>
                <Link to="/wiki">Wiki </Link>
                <Link to="/privacypolity">Privacy-Polity </Link>
                <Link to="/contactus">Contact-Us </Link>
                <Link to="/aboutus">About-Us </Link>

            </nav>
            <Switch>
                <Route exact path="/login" component={props => (
                    !window.app.r ?
                    <LOGIN {...props} /> :
                    <Redirect to="/home" />
                )}/>
                <Route exact path={["/home/:sort?/:flair?", "/submission/:id", "/submit", "/wiki"]} component={props => (
                    window.app.r ?
                    <HOME {...props} /> :
                    <Redirect to={{
                        pathname: "/login",
                        state: props.location.pathname + props.location.search
                    }} />
                )}/>
                <Route exact path="/privacypolity" component={props => (
                    <h1>PRAVACY POLITY</h1>
                )}/>
                <Route exact path="/aboutus" component={props => (
                    <h1>ABOUT US</h1>
                )}/>
                <Route exact path="/contactus" component={props => (
                    <h1>CONTACT US</h1>
                )}/>
                {/*404*/}
                <Route>
                    <Redirect to="/login" />
                </Route>
            </Switch>
        </Router>
    )
}

function LOGIN(props) {
    setTimeout(() => {
        window.app.r = {}
        props.history.push(props.location.state || '/home')
        console.log("FAKE LOGIN")
    }, 2000)
    console.log(props)
    return <h1>LOGIN</h1>
}

function HOME(props) {
    console.log(props)
    return (
        <>
            <h1>HOME</h1>
            <Route exact path={["/submission/:id"]} component={props => (
                <h1>SUBMISSION</h1>
            )}/>
            <Route exact path={["/submit"]} component={props => (
                <h1>SUBMIT</h1>
            )}/>
        </>
    )
}
/*
export class App extends Component {
    events = new EventEmitter()
    render = () => (
        <Router>
            <nav>
                <Link to="/">/ </Link>
                <Link to="/home">Home </Link>
                <Link to="/submission/2np694">Submission </Link>
                <Link to="/login">Login </Link>
            </nav>
            <Switch>
                <Route exact path="/login" component={props => (
                    !window.app.r ? <LoginPage {...props} /> : <Redirect to="/home" />
                )}/>
                <Route exact path={["/home", "/home/:sort", "/home/:sort/:flair", "/submission/:id"]} component={props => (
                    window.app.r ? 
                    <>
                        <TopAppBar events={this.events} />
                        <Drawer events={this.events} />
                        <div className="mdc-drawer-scrim" />
                        <PostsWrapper {...props} />
                        <Fab />
                        <Route exact path={["/submission/:id"]} component={props => (
                            <Submission {...props} />
                        )}/>
                    </>
                    : <Redirect to={{
                        pathname: "/login",
                        state: { referrer: props.location.pathname + props.location.search }
                      }} />
                )}/>
                <Route>
                    <Redirect to="/login" />
                </Route>
            </Switch>
        </Router>
    )
}*/