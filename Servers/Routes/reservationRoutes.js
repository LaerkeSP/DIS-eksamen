var express = require('express');
var router = express.Router();

const { getReservations, postReservation, getReservation, deleteReservation, patchReservation } = require("../Controller/reservationController.js")

// ---------- without id --------------
router.get("/", getReservations); // virker
router.post("/", postReservation); // indsætter ikke altid

// ---------- including id ------------
router.get("/:id", getReservation);
router.delete("/:id", deleteReservation);
router.patch("/:id", patchReservation);


module.exports = router;