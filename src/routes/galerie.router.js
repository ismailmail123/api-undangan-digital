const express = require("express");

const router = express.Router();
const { storage } = require("../storage/storage");
const multer = require("multer");

const upload = multer({ storage: storage });

const { validateToken } = require("../middlewares/auth")
const { create, update, remove } = require("../controllers/galerie.controller")


router.post("/galeries", validateToken, upload.single("image"), create);
router.delete("/galeries/:galerieId", validateToken, remove);
router.put("/galeries/:galerieId", validateToken, upload.single("image"), update);


module.exports = router;