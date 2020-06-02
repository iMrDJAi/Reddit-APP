module.exports = class Strings {
    constructor() {
        this.language_ = 'EN';
    }
    set language(lang) {
        this.language_ = lang;
    }
    get language() {
        return this.language_;
    }
    get strings() {
        return require(`../strings-${this.language_}.json`);
    }
}