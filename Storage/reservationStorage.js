// importing nedb library and declaring the database
var Datastore = require('nedb')
  , db = new Datastore({ filename: '../Storage/reservationData.db' });
// loading the database to ensure it is up to date
  db.loadDatabase(function (err) {});

// --------------- insert reservation ------------------------
function insertingReservation(reservationID, clientID, date, hotelName, price, balance){
    // creating an object from the given data
    let data = {reservationID, clientID, date, hotelName, price, balance};
    // inserting the data in the database
    db.insert(data);
}

// --------------- delete reservation -----------------------
function deletingReservation(reservationID){
    // removing the reservation by using their id
    db.remove({reservationID: reservationID}, {}, function(err, reservationRemoved){});
}

// --------------- patch reservation -----------------------
function patchingReservation(reservationID, clientID, date, hotelName, price, balance){
    // patching reservation needs to be done manually 
    // deleting reservation by their id using function
    deletingReservation(reservationID);
    
    // timer needed to make sure previous task is finised before continuing 
    setTimeout(function() {
        // inserting the updated reservation in the database
        insertingReservation(reservationID, clientID, date, hotelName, price, balance);
    }, 1000);
}

// expoting all the functions
module.exports = {
    insertingReservation,
    deletingReservation,
    patchingReservation
}