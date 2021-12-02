const express = require('express');
const server = express();
let clientRoutes = require("./Routes/clientRoutes.js");
let reservationRoutes = require("./Routes/reservationRoutes.js");

var host = "localhost";
let port = process.argv.splice(2)[0];

server.use(express.json());

// --------------- Client ------------------
server.use('/client', clientRoutes);

// --------------- Reservation -------------
server.use('/reservation', reservationRoutes);


server.get('/', (req, res) => { 
    res.end("Request recieved on port: " + port);
    console.log("Request recieved on port: " + port);
});


server.listen(port, host, function() {
    console.log(`Server is listening on: http://${host}:${port}`);
});