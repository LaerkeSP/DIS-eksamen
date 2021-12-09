var express = require('express');
var router = express.Router();

// importing functions from controller folder 
const { getClients, postClient, getClient, deleteClient, patchClient } = require("../Controller/clientController.js");

// CRUD request handleling 
// ---------- without id --------------
router.get("/", getClients);
router.post("/", postClient);


// ---------- including id ------------
router.get("/:id", getClient);
router.delete("/:id", deleteClient);
router.patch("/:id", patchClient);

module.exports = router;