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





module.exports = {
    getReservations,
    postReservation
}