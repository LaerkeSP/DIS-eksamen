const express = require('express');
const server = express();

const router = express.Router();

// ---------- without id --------------
router.get("/");
router.post("/");

// ---------- including id ------------
router.get("/:id");
router.delete("/:id");
router.patch("/:id");




module.exports.router = router;