var snoowrap = require('snoowrap')
var config = require('../config.json')

export default class System {
    static get refreshToken() {
        return window.localStorage.refreshToken || ''
    }
    static async r() {
        var requester = new snoowrap({
            clientId: config.clientId,
            clientSecret: '',
            refreshToken: this.refreshToken
        })
        console.log(requester)
        try {
            var test = await requester.getMe().name.catch(console.error)
        } catch {
            var test = false
        }
        if (test) {
            return requester
        } else {
            const online = await this.clientOnline
            if (online) {
                return
            } else {
                await new Promise(res => setTimeout(() => res(), 30000))
                return this.r()
            }
        }
    }
    static loginRequest() {
        const state = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
        window.sessionStorage.state = state
        var authenticationUrl = snoowrap.getAuthUrl({
            clientId: config.clientId,
            scope: config.scope,
            redirectUri: config.redirectUri,
            permanent: true,
            state: state
        })
        return authenticationUrl
    }
    static async oAuth(code) {
        try {
            var requester = await snoowrap.fromAuthCode({
                code: code,
                clientId: config.clientId,
                clientSecret: '',
                redirectUri:  config.redirectUri
            })
            var test = await requester.getMe().name.catch(console.error)
        } catch {
            var test = false
        }
        if (test) {
            window.localStorage.refreshToken = requester.refreshToken
            window.sessionStorage.state = ''
            return requester
        } else {
            const online = await this.clientOnline
            if (online) {
                return
            } else {
                await new Promise(res => setTimeout(() => res(), 30000))
                return this.oAuth(code)
            }
        }
    }
    static async init(r) {
        window.app.r = r
        window.app.user = r._ownUserInfo
        window.app.subreddit = await r.getSubreddit(config.subreddit).fetch().catch(console.error)
        await window.app.subreddit.subscribe().catch(console.error)
        window.app.flairs = await r.oauthRequest({ uri: `r/${config.subreddit}/api/link_flair_v2` })
        window.app.isLoggedIn = true
        return
    }
    static async userData(userName) {
        try {
            var data = await fetch(`https://www.reddit.com/user/${userName}/about.json?raw_json=1`)
            if (data.status === 200) {
                return (await data.json()).data
            } else if (data.status === 404) {
                return {
                    name: 'DELETED',
                    icon_img: window.app.subreddit.community_icon.split('?')[0]
                };
            } else {
                return await this.userData(userName)
            }
        } catch {
            return await this.userData(userName)
        }
    }
    static get clientOnline() {
        return new Promise(async (resolve) => {
            //resolve(true);
            setTimeout(() => resolve(false), 1000)
            try {
                await fetch(config.pingURL, { mode: "no-cors" })
                resolve(true)
            } catch {
                resolve(false)
            }
        });
    }
    static get strings() {
        return require(`../strings-${window.app.language}.json`)
    }
    static timeSince(timeStamp) {
        var now = new Date(),
            secondsPast = (now.getTime() - timeStamp.getTime()) / 1000
        if (secondsPast < 60) {
            return parseInt(secondsPast) + 's'
        }
        if (secondsPast < 3600) {
            return parseInt(secondsPast / 60) + 'm'
        }
        if (secondsPast <= 86400) {
            return parseInt(secondsPast / 3600) + 'h'
        }
        if (secondsPast > 86400) {
            var day = timeStamp.getDate(),
            month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ", ""),
            year = timeStamp.getFullYear() == now.getFullYear() ? "" : " " + timeStamp.getFullYear()
            return day + " " + month + year
        }
    }
}