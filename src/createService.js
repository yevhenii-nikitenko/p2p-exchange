const { PeerRPCServer } = require('grenache-nodejs-http');
const Link = require('grenache-nodejs-link');

const service = (grape, port) => {
    const link = new Link({
        grape
    });

    link.start();

    const peer = new PeerRPCServer(link, {
        timeout: 300000
    });

    peer.init();

    const service = peer.transport('server');

    service.listen(port);

    return {
        service,
        link
    };
}

module.exports = service;