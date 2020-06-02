var Utils = require('./Utils');
var UI = require('./UI');
var config = require('../config.json');
var snoowrap = require('snoowrap');

module.exports = class Login {
    constructor() {
        this.refreshToken = window.localStorage.refreshToken || '';
        this.state = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
        this.utils = new Utils();
        this.ui = new UI();
    }
    async r() {
        var r_ = new snoowrap({
            clientId: config.clientId,
            clientSecret: '',
            refreshToken: this.refreshToken
        });
        const online = await this.utils.clientOnline;
        const test = await r_.getMe().name.catch(console.error);
        console.log("⚠ Login Test: " + online, test);
        if (test) {
            return r_;
        } else if (!test && !online) {
            this.ui.error('LOGIN_OFFLINE');
            await new Promise(res => setTimeout(() => res(), 30000));
            return this.r();
        } else if (!test && online) {
            return;
        }
    }
    loginRequest() {
        window.sessionStorage.state = this.state;
        var authenticationUrl = snoowrap.getAuthUrl({
            clientId: config.clientId,
            scope: config.scope,
            redirectUri: config.redirectUri,
            permanent: true,
            state: this.state
        });
        console.log(this.state);
        return authenticationUrl;
    }
    async oAuth(code) {
        try {
            var r_ = await snoowrap.fromAuthCode({
                code: code,
                clientId: config.clientId,
                clientSecret: '',
                redirectUri:  config.redirectUri,
            });
            var test = await r_.getMe().name.catch(console.error);
        } catch {
            var test = false;
        }
        const online = await this.utils.clientOnline;
        console.log("⚠ OAuth Test: " + online, test);
        if (test) {
            window.localStorage.refreshToken = r_.refreshToken;
            window.sessionStorage.state = '';
            return r_;
        } else if (!test && !online) {
            this.ui.error('LOGIN_OAUTH_OFFLINE');
            await new Promise(res => setTimeout(() => res(), 30000));
            return this.oAuth();
        } else if (!test && online) {
            return;
        }
    }
}