const fs = require('fs');
const path = require('path');
const express = require('express');
const server = express();
const httpProxy = require('http-proxy');
const https = require('https'); 

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

server.use('/', function(req, res){
    let servers = {
        target: urls.shift()
    };

    console.log(`Load balancer sent request to: http://${servers.target.host}:${servers.target.port}`);
    proxy.web(req, res, servers);
    urls.push(servers.target);
});

loadBalancer = server.get('*', function(req, res) {
    let servers = {
        target: urls.shift()
    };
    console.log(`Load balancer sent request to: http://${servers.target.host}:${servers.target.port}`);
    proxy.web(req, res, servers);
    urls.push(servers.target);
});


const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, '../Encryption', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../Encryption', 'cert.pem'))
}, server);



sslServer.listen(port, function() {
    console.log(`Server is listening on: https://${host}:${port}`);
})



// loadBalancer.listen(port, function() {
//     console.log(`Load balancer is listening to: http://${host}:${port}`)
// });