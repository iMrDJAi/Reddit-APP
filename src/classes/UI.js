var React = require("react");
var ReactDOM = require('react-dom');
var Strings = require('./Strings');
var Utils = require('./Utils');
import { LoadingPage } from '../componenets/LoadingPage';
import { App } from '../componenets/App'

module.exports = class UI {
    constructor() {
        this.strings = Strings.strings;
        this.utils = new Utils();
    }
    error(id) {
        console.error(this.strings[id]);
    }
    loadingPage() {
        ReactDOM.render(<LoadingPage />, document.querySelector('.App'));
    }
    loginBoxRequest(url) {
        window.app.events.emit("LoadingPageBox", {
            'type': 'login',
            'url': url,
        });
        this.utils.urlStateReplace('/login');
    }
    loginBoxSuccess(username, avatarUrl) {
        window.app.events.emit("LoadingPageBox", {
            'type': 'success',
            'username': username,
            'avatarUrl': avatarUrl,
        });
        this.utils.urlStatePush('/');
    }
    loginBoxError(errorCode) {
        window.app.events.emit("LoadingPageBox", {
            'type': 'error',
            'errorCode': errorCode,
        });
    }
    appPage() {
        return new Promise(async (resolve) => {
            ReactDOM.render(<App />, document.querySelector('.App'));
            await new Promise(res => setTimeout(() => res(), 500));
            resolve(true);
        });
    }
    async pushPosts(postsObj) {
        window.app.events.emit("PostsPush", {
            postsObj: postsObj
        });
    }
}