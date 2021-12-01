const { Reservation } = require('../../Clases/Reservation.js');
var Datastore = require('nedb')
  , db = new Datastore({ filename: '../Storage/reservationData.db' });


function getReservations(req, res){
    db.loadDatabase();
    db.find({}, function(err, reservations){
        console.log('Reservations found:');
        console.log(reservations);
        res.send(reservations);
    })
}


function postReservation(req, res){
    let reservationData = req.body;
    let reservation = new Reservation(reservationData.clientID, reservationData.date, reservationData.hotelName, reservationData.price, reservationData.balance);
    reservation.calculateBalance();
    reservation.insertReservation();
    console.log("Reservation has been added to database");
    console.log(reservation);
    res.send("Reserveation has been added to the database")
}

function getReservation(req, res){
    let paramID = req.params;
    db.loadDatabase();
    db.find({reservationID: paramID.id }, function(err, reservationData){
        let reservation = new Reservation(reservationData[0].clientID, reservationData[0].date, reservationData[0].hotelName, reservationData[0].price, reservationData[0].balance, reservationData[0].reservationID)
        console.log("Reservation found:");
        console.log(reservation);
        res.send(reservation);
    })
}

function deleteReservation(req, res){
    let paramID = req.params;
    let deletedReservation = new Reservation("", "", "", "", "", paramID.id);
    deletedReservation.deleteReservation();
    console.log(`Reservation with id: ${paramID.id} has been deleted`)
    res.send(`Reservation with id: ${paramID.id} has been deleted`)
}

function patchReservation(req, res){
    let paramID = req.params;
    let newData = req.body;
    let patchedReservation = new Reservation(newData.clientID, newData.date, newData.hotelName, newData.price, newData.balance, paramID.id);
    patchedReservation.calculateBalance();
    patchedReservation.patchReservation();
    console.log("Reservation data has been changed to:");
    console.log(patchedReservation);
    res.send("Reservation has been patched");
}


module.exports = {
    getReservations,
    postReservation,
    getReservation,
    deleteReservation,
    patchReservation
}