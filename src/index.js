//ASSETS
require('./assets/cyberpunk-2077.jpg')
//STYLE
require('./style/index.scss')

import React from 'react'
import ReactDOM from 'react-dom'
import System from './classes/System'
import { App } from './componenets/App'

System.startup()
ReactDOM.render(<App />, document.querySelector('.App'))
