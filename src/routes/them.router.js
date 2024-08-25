const express = require("express");

const router = express.Router();
const { storage } = require("../storage/storage");
const multer = require("multer");

const upload = multer({ storage: storage });

const { validateToken } = require("../middlewares/auth")
const { create, update, remove, index } = require("../controllers/them.controller")


router.get("/thems", validateToken, index);
router.post("/thems", validateToken, upload.single("img_url"), create);
router.delete("/thems/:themId", validateToken, remove);
router.put("/thems/:themId", validateToken, upload.single("img_url"), update);


module.exports = router;