const { insertingClient, deletingClient, patchingClient } = require('../Storage/clientStorage.js');
const { v4 } = require('uuid');

class Client{
    constructor(firstName, lastName, streetAddress, city, clientID = v4()){
        this.clientID = clientID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.streetAddress = streetAddress;
        this.city = city;
    }

    insertClient(){
        insertingClient(this.clientID, this.firstName, this.lastName, this.streetAddress, this.city);
    }

    deleteThisClient(){
        deletingClient(this.clientID);
    }

    patchThisClient(firstName, lastName, streetAddress, city){
        // note --------- jeg skal lige finde ud af hvordan clientID skal håndteres i dette tilfælde
        patchingClient(this.clientID , firstName, lastName, streetAddress, city);
    }
}

module.exports.Client = Client;