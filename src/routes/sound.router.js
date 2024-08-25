const express = require("express");

const router = express.Router();
const { storage } = require("../storage/storage");
const multer = require("multer");

const upload = multer({ storage: storage });

const { validateToken } = require("../middlewares/auth")
const { create, update, remove, index } = require("../controllers/sound.controller")


router.get("/sounds", validateToken, index);
router.post("/sounds", validateToken, upload.single("sound_url"), create);
router.delete("/sounds/:soundId", validateToken, remove);
router.put("/sounds/:soundId", validateToken, upload.single("sound_url"), update);


module.exports = router;