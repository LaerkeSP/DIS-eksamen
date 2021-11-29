const { deletingClient } = require('./clientStorage');

var Datastore = require('nedb')
  , db = new Datastore({ filename: '../Storage/reservationData.db' });
db.loadDatabase(function (err) {});


// --------------- insert reservation ------------------------
function insertingReservation(reservationID, clientID, date, hotelName, price, balance){
    let data = {reservationID, clientID, date, hotelName, price, balance};
    db.insert(data);
}


// --------------- delete reservation -----------------------
function deletingReservation(reservationID){
    db.remove({reservationID: reservationID}, {}, function(err, reservationRemoved){});
}


// --------------- patch reservation -----------------------
function patchingReservation(reservationID, clientID, date, hotelName, price, balance){
    deletingReservation(reservationID);
    insertingReservation(reservationID, clientID, date, hotelName, price, balance);
}


module.exports = {
    insertingReservation,
    deletingReservation,
    patchingReservation
}