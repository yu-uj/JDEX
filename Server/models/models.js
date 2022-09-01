const mongoose = require('mongoose');
const Defs = require('../constants/constants');

module.exports = class MongoDB {
    constructor(target) {
        this.conn = mongoose.model(target);
    }

    static initializeCollection() {
        mongoose.connect(Defs.URL_DB, (err) => {
            if (err) {
                throw new Error('initializeDB: Connect mongodb failed');
            }

            mongoose.model(Defs.NAME_DB_ACCOUNT, new mongoose.Schema(Defs.DEFINITION_DB_ACCOUNT));
            console.log('initializeCollection: Connection mongodb And Set Schema');
        })
    }

    insertData(id, account) {
        const _conn = new this.conn({
            id: id,
            account_address: account,
            klay_amount: 0,
            token_amount: 0
        })

        _conn.save().then(() => {
            console.log('Insert Data!')
        })
    }

    lastId() {
        return new Promise(resolve => {
            this.conn.find({}, 'id', (err, id) => {
                if (err) { throw new Error(`getAllList Error: ${err}`); }
                resolve(id);
            }).sort({
                id: -1
            }).limit(1)
        })

    }

}