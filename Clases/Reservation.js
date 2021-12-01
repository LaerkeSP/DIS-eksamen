const { insertingReservation, deletingReservation, patchingReservation } = require('../Storage/reservationStorage.js');
const { v4 } = require('uuid');

class Reservation{
    constructor(clientID, date, hotelName, price, balance, reservationID = v4()){
        this.reservationID = reservationID;
        this.clientID = clientID;
        this.date = date
        this.hotelName = hotelName;
        this.price = price;
        this.balance = balance;
    }

    calculateBalance(){
        this.balance += this.price;
    }

    insertReservation(){
        insertingReservation(this.reservationID, this.clientID, this.date, this.hotelName, this.price, this.balance);
    }

    deleteReservation(){
        deletingReservation(this.reservationID);
    }

    patchReservation(clientID, date, hotelName, price, balance){
        patchingReservation(this.reservationID, clientID, date, hotelName, price, balance);
    }
}

module.exports.Reservation = Reservation;