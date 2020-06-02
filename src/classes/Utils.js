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
}