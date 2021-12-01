const { Client } = require('../../Clases/Client.js');
const { patchingClient } = require('../../Storage/clientStorage.js');
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


function getClient(req, res){
    let paramID = req.params;
    db.loadDatabase()
    db.find({clientID: paramID.id }, function(err, clientData){
        let client = new Client(clientData[0].firstName, clientData[0].lastName, clientData[0].streetAddress, clientData[0].city, clientData[0].clientID)
        console.log("client found:");
        console.log(client);
        res.send(client);
    })
}


function deleteClient(req, res){
    let paramID = req.params;
    let deletedClient = new Client("", "", "", "", paramID.id);
    deletedClient.deleteThisClient();
    console.log(`Client with id: ${paramID.id} has been deleted`)
    res.send(`Client with id: ${paramID.id} has been deleted`)
}


function patchClient(req, res){
    let paramID = req.params;
    let newData = req.body;
    console.log(newData)
    let patchedClient = new Client(newData.firstName, newData.lastName, newData.streetAddress, newData.city, paramID.id);
    patchedClient.patchThisClient();
    console.log("Clients data has been changed to:");
    console.log(patchedClient);
    res.send("Client has been patched");
}


module.exports = {
    getClients,
    postClient,
    getClient,
    deleteClient, 
    patchClient
}