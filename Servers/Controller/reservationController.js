// importing class
const { Reservation } = require('../../Clases/Reservation.js');
// importing library nedb and getting the database from Storage folder
var Datastore = require('nedb')
  , db = new Datastore({ filename: '../Storage/reservationData.db' });

// get request handeling for all reservations in database
function getReservations(req, res){
    // loading the database to insure that all changes are included
    db.loadDatabase();
    db.find({}, function(err, reservations){
        // printing visible statement with the data, to ensure readability in terminal
        console.log('------------------ Reservations found ------------------ \n', reservations);
        res.send(reservations);
    })
}

// post request handleing for posting a reservation to the database
function postReservation(req, res){
    // requesting the data sent from user
    let reservationData = req.body;
    // declaring a new Reservation object with the data recieved from user
    let reservation = new Reservation(reservationData.clientID, reservationData.date, reservationData.hotelName, reservationData.price, reservationData.balance);
    // using class functions
    reservation.calculateBalance();
    reservation.insertReservation();
    // printing visible statement with the data, to ensure readability in terminal
    console.log("------------------ Reservation has been added to database ------------------ \n", reservation);
    res.send("Reserveation has been added to the database")
}

// get request handeling for specific reservation
function getReservation(req, res){
    // requesting the id from the parameter
    let paramID = req.params;
    // loading the database to insure that all changes are included
    db.loadDatabase();
    // finding the specific reservation by the id 
    db.find({reservationID: paramID.id }, function(err, reservationData){
        // declaring a new reservation object with the data recieved from the database
        let reservation = new Reservation(reservationData[0].clientID, reservationData[0].date, reservationData[0].hotelName, reservationData[0].price, reservationData[0].balance, reservationData[0].reservationID)
        // printing visible statement with the data, to ensure readability in terminal
        console.log("------------------ Reservation found ------------------ \n", reservation);
        // console.log(reservation);
        res.send(reservation);
    })
}

// delete request handeling for deleting specific reservation from database
function deleteReservation(req, res){
    // requesting the id from the parameter
    let paramID = req.params;
    // declaring a new reservation, but only with the id
    let deletedReservation = new Reservation("", "", "", "", "", paramID.id);
    // using class function 
    deletedReservation.deleteReservation();
    // printing visible statement with the data, to ensure readability in terminal
    console.log(`------------------ Reservation with id: ${paramID.id} has been deleted ------------------`)
    res.send(`Reservation with id: ${paramID.id} has been deleted`)
}

// patch request handeling for patching specific reservation in database
function patchReservation(req, res){
    // requesting the id from the parameter
    let paramID = req.params;
    // requesting the data sent from user
    let newData = req.body;
    // declaring a new Reservation object with the data recieved from user
    let patchedReservation = new Reservation(newData.clientID, newData.date, newData.hotelName, newData.price, newData.balance, paramID.id);
    // using class functions
    patchedReservation.calculateBalance();
    patchedReservation.patchReservation();
    // printing visible statement with the data, to ensure readability in terminal
    console.log("------------------ Reservation data has been changed to ------------------ \n", patchedReservation);
    res.send("Reservation has been patched");
}

// exporting all functions 
module.exports = {
    getReservations,
    postReservation,
    getReservation,
    deleteReservation,
    patchReservation
}