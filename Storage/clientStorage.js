// importing nedb library and declaring the database
var Datastore = require('nedb')
  , db = new Datastore({ filename: '../Storage/clientData.db' });
// loading the database to ensure it is up to date
db.loadDatabase(function (err) {});

// ------------ insert client -------------------
function insertingClient(clientID, firstName, lastName, streetAddress, city){
    // creating an object from the given data
    let data = {clientID, firstName, lastName, streetAddress, city}
    // inserting the data in the database
    db.insert(data);
}

// ----------- deleting client ------------------
function deletingClient(clientID){
    // removing the client by using their id
    db.remove({clientID: clientID}, {}, function(err, clientRemoved){});
}

// ---------- patching client ------------------
function patchingClient(clientID, firstName, lastName, streetAddress, city){
    // patching client needs to be done manually 
    // deleting client by their id using function
    deletingClient(clientID);

    // timer needed to make sure previous task is finised before continuing 
    setTimeout(function() {
        // inserting the updated client in the database
        insertingClient(clientID, firstName, lastName, streetAddress, city);
    }, 1000);
}

// expoting all the functions
module.exports = {
    insertingClient,
    deletingClient,
    patchingClient
}