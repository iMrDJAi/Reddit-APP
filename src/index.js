//ASSETS
import './assets/banner.jpg'
import './assets/logo.png'
//STYLE
import './style/index.scss'
import 'mde-ultimate/dist/bundle.css'

//MWC
import '@material/mwc-top-app-bar'
import '@material/mwc-icon-button'
import '@material/mwc-tab-bar'
import '@material/mwc-tab'
import '@material/mwc-drawer'
import '@material/mwc-list/mwc-list.js'
import '@material/mwc-list/mwc-list-item.js'

import React from 'react'
import ReactDOM from 'react-dom'
import System from './classes/System'
import { App } from './componenets/App'

System.start()
ReactDOM.render(<App />, document.querySelector('.App'))
