const express = require('express');
const server = express();
let clientRoutes = require("./Routes/clientRoutes.js");

var host = "localhost";
let port = process.argv.splice(2)[0];

// DER SKAL IMPORTERES ROUTES OG DE SKAL INKLUDERES I .USE FUNKTIONERNE

server.use(express.json());
// server.use(express.urlencoded());


// --------------- Client ------------------
server.use('/client', clientRoutes);

// --------------- Reservation -------------
server.use('/reservation', function(){
    console.log('we still need the connection to the routes!')
});


server.get('/', (req, res) => { 
    res.end("Package recieved on port: " + port);
    console.log("Package recieved on port: " + port);
});

server.listen(port, host, function() {
    console.log(`Server is listening on: http://${host}:${port}`);
});