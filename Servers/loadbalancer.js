const fs = require('fs');
const path = require('path');
const express = require('express');
const server = express();
const httpProxy = require('http-proxy');
const https = require('https'); 

let host = 'localhost'
let port = 3000

const proxy = httpProxy.createServer();

// declaring the urls that the servers are using
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

// reacting to a request and redirecting to a server
server.use('/', function(req, res){
    // finding the next server to relocate to
    let servers = {
        target: urls.shift()
    };

    console.log(`Load balancer sent request to: http://${servers.target.host}:${servers.target.port}`);
    proxy.web(req, res, servers);
    urls.push(servers.target);
});

// declaring a https server
const sslServer = https.createServer({
    // getting the pem files from the folder Encryption 
    key: fs.readFileSync(path.join(__dirname, '../Encryption', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../Encryption', 'cert.pem'))
}, server);


// strarting listening to port
sslServer.listen(port, function() {
    console.log(`Server is listening on: https://${host}:${port}`);
});