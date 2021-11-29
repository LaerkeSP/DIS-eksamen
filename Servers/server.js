const express = require('express');
const server = express();
var host = "localhost";
let port = process.argv.splice(2)[0];

server.get('/', (req, res) => { 
    res.end("Package recieved on port: " + port);
    console.log("Package recieved on port: " + port);
});

server.listen(port, host, function() {
    console.log(`Server is listening on: http://${host}:${port}`);
});