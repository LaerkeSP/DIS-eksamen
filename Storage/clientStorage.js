var Datastore = require('nedb')
  , db = new Datastore({ filename: '../Storage/clientData.db' });
db.loadDatabase(function (err) {});


// ------------ insert client -------------------
function insertingClient(clientID, firstName, lastName, streetAddress, city){
    let data = {clientID, firstName, lastName, streetAddress, city}
    db.insert(data);
}

// ----------- deleting client ------------------
function deletingClient(clientID){
    db.remove({clientID: clientID}, {}, function(err, clientRemoved){});
}


// ---------- patching client ------------------
function patchingClient(clientID, firstName, lastName, streetAddress, city){
    // let data = {clientID, firstName, lastName, streetAddress, city}
    deletingClient(clientID);
    insertingClient(clientID, firstName, lastName, streetAddress, city);
}


module.exports = {
    insertingClient,
    deletingClient,
    patchingClient
}