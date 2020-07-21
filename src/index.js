//ASSETS
import './assets/cyberpunk-2077.jpg'
//STYLE
import './style/index.scss'
import 'mde-ultimate/dist/bundle.css'

import React from 'react'
import ReactDOM from 'react-dom'
import System from './classes/System'
import { App } from './componenets/App'

System.startup()
ReactDOM.render(<App />, document.querySelector('.App'))
