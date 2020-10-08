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
                <Route exact path={"/home"} component={props => (
                    window.app.r ?
                    <>
                        <br/>
                        <br/>
                        <h1>NEWS??</h1>
                        <Link to={`/home/${window.app.sorts[0].id}`}>
                            SKIP TO FEED
                        </Link>
                    </> :
                    <Redirect to={{
                        pathname: "/login",
                        state: props.location.pathname + props.location.search
                    }} />
                )}/>
                <Route exact path={["/home/:sort?/:flair?/:name?", "/comments/:id/:title?", "/submit"]} component={props => (
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