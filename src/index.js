//Dev
require('./assets/logo.png');
//STYLE
require('./style/index.scss');

//Global app object
window.app = {}

//Global Events
var EventEmitter = require('events')
window.app.events = new EventEmitter()

//Language
window.app.language = 'EN';

//Dependencies
var Utils = require('./classes/Utils');
var UI = require('./classes/UI');
var Login = require('./classes/Login');
var config = require('./config.json');

var utils = new Utils();
var ui  = new UI();

var urlState = utils.urlState;
console.log(urlState);

init();
async function init() {
    ui.loadingPage();
    var login = new Login();
    if (urlState[0][0].toLowerCase() === "login" && urlState[1].state && (urlState[1].code || urlState[1].error)) { //Login callback check
        if (urlState[1].state === window.sessionStorage.state) { //State check
            if (!urlState[1].error) { //Access denied check
                var r = await login.oAuth(urlState[1].code);
                if (r) {
                    console.log("✅");
                    var me = await r.getMe().catch(console.error);
                    ui.loginBoxSuccess(me.name, me.icon_img);
                    await new Promise(res => setTimeout(() => res(), 3000));
                    app(r);
                } else {
                    console.log("❌");
                    ui.loginBoxError('LOGIN_CODE_ERROR');
                    await new Promise(res => setTimeout(() => res(), 3000));
                    ui.loginBoxRequest(login.loginRequest());
                }
            } else {
                ui.loginBoxError('LOGIN_ACCESS_DENIED');
                await new Promise(res => setTimeout(() => res(), 3000));
                ui.loginBoxRequest(login.loginRequest());
            }
        } else {
            ui.loginBoxError('LOGIN_STATE_ERROR');
            await new Promise(res => setTimeout(() => res(), 3000));
            ui.loginBoxRequest(login.loginRequest());
        }
    } else {
        var r = await login.r();
        console.log(r);
        if (r) {
            console.log("✅");
            app(r);
        } else {
            console.log("❌");
            ui.loginBoxRequest(login.loginRequest());
        }
    }
}

async function app(r) {
    //window.localStorage.refreshToken = '';
    window.app.r = r
    window.app.user = r._ownUserInfo
    window.app.subreddit = await r.getSubreddit(config.subreddit).fetch().catch(console.error)
    window.app.subreddit.subscribe().catch(console.error)
    window.app.flairs = await r.oauthRequest({ uri: `r/${config.subreddit}/api/link_flair_v2` })

    await ui.appPage();
    var posts = await window.app.subreddit.getNew({ 'limit': 1000 });
    posts = await Promise.all(posts.map(async post => {
        post.author = await Utils.userData(post.author.name);
        return post;
    }))
    console.log(posts);
    ui.pushPosts(posts);
}