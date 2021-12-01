const express = require('express');
const server = express();
let httpProxy = require('http-proxy');
let host = 'localhost'
let port = 3000

const proxy = httpProxy.createServer();

let urls = [
    {
        host: host,
        port: 3001
    },
    {
        host: host,
        port: 3002
    },
    {
        host: host,
        port: 3003
    },
    {
        host: host,
        port: 3004
    }
];

// server.use('/client', function(){
//     console.log('hello')
// })

loadBalancer = server.get('*', function(req, res) {
    let servers = {
        target: urls.shift()
    };
    console.log(`Load balancer sent request to: http://${servers.target.host}:${servers.target.port}`);
    proxy.web(req, res, servers);
    urls.push(servers.target);
});

loadBalancer.listen(port, function() {
    console.log(`Load balancer is listening to: http://${host}:${port}`)
});