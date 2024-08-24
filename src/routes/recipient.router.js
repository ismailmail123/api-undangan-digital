const express = require("express");

const router = express.Router();


const { index, show } = require("../controllers/recipient.controller.js");
const { validateToken } = require("../middlewares/auth")

// /api/babs
router.get("/recipient", validateToken, index);
router.get("/recipient/:id", show);


module.exports = router;