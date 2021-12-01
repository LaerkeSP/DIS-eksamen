var express = require('express');
var router = express.Router();

const { getReservations, postReservation } = require("../Controller/reservationController.js")

// ---------- without id --------------
router.get("/", getReservations); // virker
router.post("/", postReservation); // indsætter ikke altid

// ---------- including id ------------
// router.get("/:id");
// router.delete("/:id");
// router.patch("/:id");


module.exports = router;