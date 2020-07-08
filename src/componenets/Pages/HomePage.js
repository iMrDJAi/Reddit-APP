import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom"

import { TopAppBarHome } from '../MaterialComponents/TopAppBarHome'
import { TabBar } from '../MaterialComponents/TabBar'
import { Drawer } from '../MaterialComponents/Drawer'
import { Fab } from '../MaterialComponents/Fab'

import { Submission } from './Submission'
import { PostsWrapper } from '../Posts/PostsWrapper'

export class HomePage extends Component {
    render = () => (
        <>  
            <div className='Home'>
                <TopAppBarHome events={this.props.events} />
                <Drawer events={this.props.events} />
                <div className="mdc-drawer-scrim" />
                <PostsWrapper {...this.props} />
                <Fab />
            </div>
            <Route exact path={["/home"]}>
                <Redirect to={{
                    pathname: "/home/new/all"
                }} />
            </Route>
            <Route exact path={["/submission/:id"]} component={props => (
                <Submission {...props} />
            )}/>
        </>
    )
}