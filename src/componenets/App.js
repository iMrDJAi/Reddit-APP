import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"
import { HomePage } from './Pages/HomePage'
import { LoginPage } from './Pages/LoginPage' 
import EventEmitter from 'events'

export class App extends Component {
    events = new EventEmitter()
    render = () => (
        <Router>
            <Switch>
                <Route exact path="/login" component={props => (
                    !window.app.r ?
                    <LoginPage {...props} events={this.events} /> :
                    <Redirect to="/home" />
                )}/>
                <Route exact path={["/home/:sort?/:flair?", "/comments/:id", "/submit"]} component={props => (
                    window.app.r ?
                    <HomePage {...props} events={this.events} /> :
                    <Redirect to={{
                        pathname: "/login",
                        state: props.location.pathname + props.location.search
                    }} />
                )}/>
                <Route exact path="/privacypolity" component={props => (
                    <h1>PRAVACY POLITY</h1>
                )}/>
                <Route exact path="/about" component={props => (
                    <h1>ABOUT US</h1>
                )}/>
                <Route exact path="/contact" component={props => (
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

/*

            <nav>
                <Link to="/comments/2np694">Submission </Link>
                <Link to="/home/new/invalid">Invalid </Link>
                <Link to="/home">Home </Link>
            </nav>
            <nav>
                <Link to="/home">Home </Link>
                <Link to="/home/new">Home-New </Link>
                <Link to="/home/new/all">Home-New-All </Link>
                <Link to="/home/new/news">Home-New-News </Link>
                <Link to="/home/new/videos">Home-New-Videos </Link>
                <Link to="/home/hot/videos">Home-Hot-Videos </Link>
                <Link to="/comments/2np694">Submission </Link>
            </nav>
*/