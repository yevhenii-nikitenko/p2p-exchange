const resersedOrderType = {
    buy: 'sell',
    sell: 'buy'
}
const exchange = (queue, orderBook) => {
    if (!queue.length) return;

    const order = queue[0];
    const reversedOrderIndex = queue.findIndex(o => o.userId !== order.userId && o.type === resersedOrderType[order.type] && o.currency === order.currency);

    if (reversedOrderIndex === -1) return;

    const reversedOrder = queue[reversedOrderIndex];

    if (!reversedOrder) return;

    queue.splice(reversedOrderIndex, 1);
    queue.splice(0, 1);

    orderBook[order.userId] = orderBook[order.userId].filter(o => o.id !== order.id);
    orderBook[reversedOrder.userId] = orderBook[reversedOrder.userId].filter(o => o.id !== reversedOrder.id);

    let updatedOrder;

    if (order.amount > reversedOrder.amount) {
        updatedOrder = { ...order, amount: order.amount - reversedOrder.amount };
        orderBook[updatedOrder.userId].push(updatedOrder);
    }

    if (order.amount < reversedOrder.amount) {
        updatedOrder = { ...reversedOrder, amount: reversedOrder.amount - order.amount };
        orderBook[updatedOrder.userId].push(updatedOrder);
    }

    // some logic to notify clients here, update account balance, db/3-rd party requests

    updatedOrder && queue.push(updatedOrder);
}

module.exports = exchange;
