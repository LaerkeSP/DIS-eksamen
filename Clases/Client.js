// importing functions that interact with database form Storage folder
const { insertingClient, deletingClient, patchingClient } = require('../Storage/clientStorage.js');
// importing library for id generator
const { v4 } = require('uuid');

class Client{
    constructor(firstName, lastName, streetAddress, city, clientID = v4()){
        // declaring all attributes - if clientID not given in input, it will be generated by library
        this.clientID = clientID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.streetAddress = streetAddress;
        this.city = city;
    }

    insertClient(){
        // method for inserting a client in the database
        insertingClient(this.clientID, this.firstName, this.lastName, this.streetAddress, this.city);
    }

    deleteThisClient(){
        // method for deleting client in database
        deletingClient(this.clientID);
    }

    patchThisClient(){
        // method for patching client in database
        patchingClient(this.clientID, this.firstName, this.lastName, this.streetAddress, this.city);
    }
}

module.exports.Client = Client;