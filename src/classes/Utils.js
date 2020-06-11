var config = require('../config.json');
module.exports = class Utils {
    constructor() {
        this.href = new URL(window.location.href);
        this.pathname = this.href.pathname.slice(1).split('/');
        this.params = Object.fromEntries(this.href.searchParams);
    }
    get clientOnline() {
        return new Promise(async (resolve) => {
            //resolve(true);
            setTimeout(() => resolve(false), 1000);
            try {
                await fetch(config.pingURL, { mode: "no-cors" });
                resolve(true);
            } catch {
                resolve(false);
            }
        });
    }
    get urlState() {
        return [this.pathname, this.params];
    }
    urlStatePush(url) {
        window.history.pushState("", "", url);
    }
    urlStateReplace(url) {
        window.history.replaceState("", "", url);
    }
    static async userData(userName) {
        try {
            var data = await fetch(`https://www.reddit.com/user/${userName}/about.json?raw_json=1`);
            if (data.status === 200) {
                return (await data.json()).data;
            } else if (data.status === 404) {
                return {
                    name: 'DELETED',
                    icon_img: window.app.subreddit.community_icon.split('?')[0]
                };
            } else {
                return await this.userData(userName);
            }
        } catch {
            return await this.userData(userName);
        }
    }
}