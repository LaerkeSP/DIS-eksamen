// importing class
const { Client } = require('../../Clases/Client.js');
// importing library nedb and getting the database from Storage folder
var Datastore = require('nedb')
  , db = new Datastore({ filename: '../Storage/clientData.db' });


// get request handeling for all clients in database
function getClients(req, res){
    // loading the database to insure that all changes are included
    db.loadDatabase()
    db.find({}, function(err, clients){
    // printing visible statement with the data, to ensure readability in terminal
        console.log(`------------------ Clients found ------------------ \n`, clients);
        res.send(clients);
    })
}

// post request handleing for posting a client to the database
function postClient(req, res){
    // requesting the data sent from user
    let clientData = req.body;
    // declaring a new Client object with the data recieved from user
    let client = new Client(clientData.firstName, clientData.lastName, clientData.streetAddress, clientData.city);
    // using class function
    client.insertClient();
    // printing visible statement with the data, to ensure readability in terminal
    console.log(`------------------ Client has been added to the database ------------------ \n`, client);
    res.send('Client has been added to database');
}

// get request handeling for specific client
function getClient(req, res){
    // requesting the id from the parameter
    let paramID = req.params;
    // loading the database to insure that all changes are included
    db.loadDatabase()
    // finding the specific user by their id 
    db.find({clientID: paramID.id }, function(err, clientData){
        // declaring a new Client object with the data recieved from the database
        let client = new Client(clientData[0].firstName, clientData[0].lastName, clientData[0].streetAddress, clientData[0].city, clientData[0].clientID)
        // printing visible statement with the data, to ensure readability in terminal
        console.log(`------------------ Client found ------------------ \n`, client);
        res.send(client);
    })
}

// delete request handeling for deleting specific client from database
function deleteClient(req, res){
    // requesting the id from the parameter
    let paramID = req.params;
    // declaring a new client, but only with the id
    let deletedClient = new Client("", "", "", "", paramID.id);
    // using class function 
    deletedClient.deleteThisClient();
    // printing visible statement with the data, to ensure readability in terminal
    console.log(`------------------ Client with id: ${paramID.id} has been deleted ------------------`)
    res.send(`Client with id: ${paramID.id} has been deleted`)
}

// patch request handeling for patching specific client in database
function patchClient(req, res){
    // requesting the id from the parameter
    let paramID = req.params;
    // requesting the data sent from user
    let newData = req.body;
    // declaring a new Client object with the data recieved from user
    let patchedClient = new Client(newData.firstName, newData.lastName, newData.streetAddress, newData.city, paramID.id);
    // using class function
    patchedClient.patchThisClient();
    // printing visible statement with the data, to ensure readability in terminal
    console.log(`------------------ Clients data has been changed ------------------ \n`, patchedClient);
    res.send("Client has been patched");
}

// exporting all functions 
module.exports = {
    getClients,
    postClient,
    getClient,
    deleteClient, 
    patchClient
}