const express = require("express");

const router = express.Router();


const { index, create } = require("../controllers/response.controller.js");
const { validateToken } = require("../middlewares/auth.js")

// /api/babs
router.get("/responses", index);
// router.get("/recipients/:id", show);
router.post("/responses", create);
// router.put("/recipients/:id", validateToken, update);
// router.delete("/recipients/:id", validateToken, remove);


module.exports = router;