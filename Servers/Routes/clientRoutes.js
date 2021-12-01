var express = require('express')
var router = express.Router()

const { getClients, postClient, getClient, deleteClient } = require("../Controller/clientController.js")

// ---------- without id --------------
router.get("/", getClients);
router.post("/", postClient);


// ---------- including id ------------
router.get("/:id", getClient);
router.delete("/:id", deleteClient);
// router.patch("/:id");

module.exports = router;