const express = require("express");

const router = express.Router();


const { index, show, create, update, remove } = require("../controllers/card_payment.controller");
const { validateToken } = require("../middlewares/auth")

// /api/babs
router.get("/cardpayments", validateToken, index);
router.get("/cardpayments/:id", validateToken, show);
router.post("/cardpayments", validateToken, create);
router.put("/cardpayments/:id", validateToken, update);
router.delete("/cardpayments/:id", validateToken, remove);


module.exports = router;