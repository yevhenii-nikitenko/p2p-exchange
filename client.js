'use strict';
const { v4 } = require('uuid')

const createClient = require('./src/createClient');
const { peer } = createClient('http://127.0.0.1:30001');

const order = {
    type: process.argv[2],
    currency: process.argv[4],
    amount: +process.argv[3],
    // simulate some user id
    userId: v4(),
};

peer.map('exchange', order, { timeout: 10000 }, (err, data) => {
    if (err) {
        console.error(err);
        process.exit(-1);
    }
    console.log(data)
});