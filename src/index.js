//ASSETS
require('./assets/cyberpunk-2077.jpg')
//STYLE
require('./style/index.scss')

//Global app object
window.app = {}

//Language
window.app.language = 'EN';

import React from 'react'
import ReactDOM from 'react-dom'

import { App } from './componenets/App'

ReactDOM.render(<App />, document.querySelector('.App'));
