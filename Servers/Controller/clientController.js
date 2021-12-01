const { Client } = require('../../Clases/Client.js');
var Datastore = require('nedb')
  , db = new Datastore({ filename: '../Storage/clientData.db' });


function getClients(req, res){
    db.loadDatabase()
    db.find({}, function(err, clients){
        console.log("clients found:");
        console.log(clients);
        res.send(clients);
    })
}


function postClient(req, res){
    let clientData = req.body;
    let client = new Client(clientData.firstName, clientData.lastName, clientData.streetAddress, clientData.city);
    client.insertClient();
    console.log("Client has been added to the database");
    console.log(client);
    res.send('Client has been added to database');
}

module.exports = {
    getClients,
    postClient
}