const express = require("express");

const router = express.Router();


const { index, show, create, update, remove, status } = require("../controllers/recipient.controller.js");
const { validateToken } = require("../middlewares/auth")

// /api/babs
router.get("/recipients", validateToken, index);
router.get("/recipients/:id", show);
router.post("/recipients", validateToken, create);
router.put("/recipients/:id", validateToken, update);
router.put("/recipients/:id/status", validateToken, status);
router.delete("/recipients/:id", validateToken, remove);


module.exports = router;