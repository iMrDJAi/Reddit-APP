import snoowrap from 'snoowrap'
import config from '../config.json'
import slug from 'slug'
import stringHash from 'string-hash'
import { mdiDecagram, mdiFire, mdiTrendingUp } from '@mdi/js'

export default class System {
    static async start() {
        if (!window.localStorage.language) window.localStorage.language = config.defaultLanguage
        window.submissions = {}
        /*window.app = {
            r: {
                oauthRequest: () =>  [
                    require("../assets/post.json")
                ]
            },
            user: {
                icon_img: '/assets/logo.png',
                name: 'iMrDJAi'
            },
            subreddit: {
                community_icon: '/assets/logo.png',
                mobile_banner_image: '/assets/cyberpunk-2077.jpg',
                title: 'Dz Gamers Community'
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
                },
                {
                    text: 'Games - ألعاب'
                },
                {
                    text: 'Community - المجتمع'
                },
                {
                    text: 'Random - عشوائيات'
                },
                {
                    text: 'Hardware - عتاد'
                }
            ],
            sorts: [
                {
                    id: 'new',
                    text: 'New',
                    icon: mdiDecagram
                },
                {
                    id: 'hot',
                    text: 'Hot',
                    icon: mdiFire
                },
                {
                    id: 'top',
                    text: 'Top',
                    icon: mdiTrendingUp
                }
            ],
            cache: {
                posts: {},
                users: {}
            }
        }
        window.app.flairs = window.app.flairs.map(flair => {
            flair.name = slug(flair.text)
            flair.hash = stringHash(flair.text).toString(36)
            return flair
        })
        window.app.flairs = [{ text: "All", name: "", hash: "" }, ...window.app.flairs]*/

        window.app = {
            r: null,
            user: null,
            subreddit: null,
            flairs: [],
            sorts: [
                {
                    id: 'new',
                    text: 'New',
                    icon: mdiDecagram
                },
                {
                    id: 'hot',
                    text: 'Hot',
                    icon: mdiFire
                },
                {
                    id: 'top',
                    text: 'Top',
                    icon: mdiTrendingUp
                }
            ],
            cache: {
                posts: {},
                users: {}
            }
        }
    }
    static async init(r) {
        window.app.r = r
        window.app.user = r._ownUserInfo
        window.app.subreddit = await r.getSubreddit(config.subreddit).fetch().catch(console.error)
        if (!window.app.subreddit.user_is_subscriber) await window.app.subreddit.subscribe().catch(console.error)
        window.app.flairs = await r.oauthRequest({ uri: `r/${config.subreddit}/api/link_flair_v2` })
        window.app.flairs = window.app.flairs.map(flair => {
            flair.name = slug(flair.text)
            flair.hash = stringHash(flair.text).toString(36)
            return flair
        })
        window.app.flairs = [{ text: "ALL", name: "", hash: "" }, ...window.app.flairs]
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
    static async fetchPosts(sort, flair) {
        if (!flair) {
            var posts = await this.request(window.app.r.oauthRequest({uri: `r/${window.app.subreddit.display_name}/${sort}/`, method: 'get'}))
        } else {
            var posts = await this.request(window.app.r.search({
                query: `flair_name:"${flair}"`,
                subreddit: window.app.subreddit.display_name,
                sort: sort
            }))
        }
        for (let post of posts) window.app.cache.posts[post.id] = post
        return posts
    }
    static async fetchMorePosts(obj, amount) {
        var posts = await this.request(obj.fetchMore({ 'amount': amount }))
        for (let post of posts) window.app.cache.posts[post.id] = post
        return posts
    }
    static async fetchPostAuthor(author) {
        try {
            var user = await author.fetch()
            window.app.cache.users[user.name] = user
            return user
        } catch(e) {
            //console.error(e)
            //console.log(author)
        }
    }
    static async request(method) {
        try {
            await method
            return method
        } catch(e) {
            console.error('[Error]: Request Error!', e)
            //e.message
            //"snoowrap refused to continue because reddit's ratelimit was exceeded. For more information about reddit's ratelimit, please consult reddit's API rules at https://github.com/reddit/reddit/wiki/API."
            //"404"
            await new Promise(res => setTimeout(() => res(), 10000))
            return await this.request(method)
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
}