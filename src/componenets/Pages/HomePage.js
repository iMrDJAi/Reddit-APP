import React, { Component } from 'react'
import { Route } from "react-router-dom"

import { TopAppBar } from '../MaterialComponents/TopAppBar'
import { TabBar } from '../MaterialComponents/TabBar'
import { Drawer } from '../MaterialComponents/Drawer'
import { Fab } from '../MaterialComponents/Fab'

import { Submission } from './Submission'
import { PostsWrapper } from '../Posts/PostsWrapper'

export class HomePage extends Component {
    render = () => (
        <>
            <TopAppBar events={this.props.events} />
            <Drawer events={this.props.events} />
            <div className="mdc-drawer-scrim" />
            <PostsWrapper {...this.props} />
            <Fab />
            <Route exact path={["/submission/:id"]} component={props => (
                <Submission {...props} />
            )}/>
        </>
    )
}