const { PeerRPCClient } = require('grenache-nodejs-http');
const Link = require('grenache-nodejs-link');

const client = (grape) => {
    const link = new Link({
        grape,
    });

    link.start();

    const peer = new PeerRPCClient(link, {});

    peer.init();

    return { link, peer };
}

module.exports = client;
