const express = require("express");

const router = express.Router();
const { storage } = require("../storage/storage");
const multer = require("multer");

const upload = multer({ storage: storage });


const { index, show, create, update, remove } = require("../controllers/wedding.controller.js");
const { validateToken } = require("../middlewares/auth")

// /api/babs
router.get("/weddings", validateToken, index);
router.get("/weddings/:id", show);
router.post("/weddings", validateToken, upload.single("sound"), create);
router.put("/weddings/:id", validateToken, upload.single("sound"), update);
router.delete("/weddings/:id", validateToken, remove);


module.exports = router;