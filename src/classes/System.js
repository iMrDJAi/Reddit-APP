import snoowrap from 'snoowrap'
import config from '../config.json'
import slug from 'slug'
import stringHash from 'string-hash'

export default class System {
    static async startup() {
        if (!window.localStorage.language) window.localStorage.language = config.defaultLanguage
        window.submissions = {}
        /*window.app = {
            r: {},
            user: {
                icon_img: 'assets/cyberpunk-2077.807ced6bdeab5763d15c780643808bbc.jpg'
            },
            subreddit: {
                community_icon: 'subreddit',
                mobile_banner_image: 'assets/cyberpunk-2077.807ced6bdeab5763d15c780643808bbc.jpg'
            },
            flairs: [
                {
                    text: 'Announcments - إعلامات'
                },
                {
                    text: 'General - عام'
                },
                {
                    text: 'News - أخبار'
                },
                {
                    text: 'Memes - ميمز'
                },
                {
                    text: 'Videos - فيديوهات'
                },
                {
                    text: 'Meta - ميتا'
                }
            ],
            cache: {
                posts: {},
                users: {}
            },
            submissions: {
                sorts: ['new', 'hot', 'top'],
                flairs: []
            }
        }*/
        window.app = {
            r: null,
            user: null,
            subreddit: null,
            flairs: [],
            cache: {
                posts: {},
                users: {}
            },
            submissions: {
                sorts: ['new', 'hot', 'top'],
                flairs: []
            }
        }
        window.app.flairs = window.app.flairs.map(flair => {
            flair.name = slug(flair.text) + '-' + stringHash(flair.text).toString(16)
            return flair
        })
    }
    static async init(r) {
        window.app.r = r
        window.app.user = r._ownUserInfo
        window.app.subreddit = await r.getSubreddit(config.subreddit).fetch().catch(console.error)
        if (!window.app.subreddit.user_is_subscriber) await window.app.subreddit.subscribe().catch(console.error)
        window.app.flairs = (await r.oauthRequest({ uri: `r/${config.subreddit}/api/link_flair_v2` })).map(flair => {
            flair.name = slug(flair.text) + '-' + stringHash(flair.text).toString(16)
            return flair
        })
        return
    }
    static async r() {
        var requester = new snoowrap({
            clientId: config.clientId,
            clientSecret: '',
            refreshToken: window.localStorage.refreshToken || ''
        })
        try {
            var test = await requester.getMe().name
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
        window.localStorage.state = state
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
    static async fetchPosts(sort, flair) {
        console.log(sort, flair)
        if (!flair) {
            const posts = await window.app.r.oauthRequest({uri: `r/${window.app.subreddit.display_name}/${sort}/`, method: 'get'})
            return posts
        } else {
            const posts = await window.app.r.search({
                query: `flair_name:"${flair}"`,
                subreddit: window.app.subreddit.display_name,
                sort: sort
            })
            return posts
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
        return require(`../strings-${window.localStorage.language}.json`)
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
    static async request(method) {
        try {
            await method
            return method
        } catch(e) {
            console.error('[Error]: Request Error!', e)
            window.err = e
            //e.message
            //"snoowrap refused to continue because reddit's ratelimit was exceeded. For more information about reddit's ratelimit, please consult reddit's API rules at https://github.com/reddit/reddit/wiki/API."
            //"404"
            await new Promise(res => setTimeout(() => res(), 10000))
            return await this.request(method)
        }
    }
}