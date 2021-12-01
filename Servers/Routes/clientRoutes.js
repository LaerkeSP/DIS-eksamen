var express = require('express')
var router = express.Router()

const { getClients, postClient } = require("../Controller/clientController.js")

// ---------- without id --------------
router.get("/", getClients);
router.post("/", postClient);


// ---------- including id ------------
// router.get("/:id");
// router.delete("/:id");
// router.patch("/:id");

module.exports = router;