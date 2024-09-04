'use strict';

const { v4 } = require('uuid');

const createService = require('./src/createService');
const { service, link } = createService('http://127.0.0.1:30001', 9111);
const exchange = require('./src/exchange');

setInterval(function () {
    link.announce('exchange', service.port, {})
}, 1000);

// order book storage to track users activity
const orderBook = {};
// queue for the tasks
const queue = [];

service.on('request', (rid, key, payload, handler) => {

    const order = {
        ...payload,
        id: v4(),
    }

    const clientOrderBook = orderBook[payload.userId] || [];
    clientOrderBook.push(order);
    orderBook[payload.userId] = clientOrderBook;
    queue.push(order);
    handler.reply(null, { result: 'your order is accepted' })
});

// poll queue for matching orders
setInterval(function () {
    exchange(queue, orderBook);
}, 1000);

setInterval(function () {
    console.log('queue', queue);
    console.log('orderBook', orderBook);
}, 10000);