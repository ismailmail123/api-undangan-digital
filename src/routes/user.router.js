// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../storage/storage");
const upload = multer({ storage });

const { index, update } = require("../controllers/user.controller.js");
const { validateToken } = require("../middlewares/auth");

// Rute untuk mendapatkan daftar pengguna
router.get("/users", validateToken, index);

// Rute untuk memperbarui data pengguna, termasuk gambar
// Menggunakan upload.fields untuk menangani beberapa field gambar
router.put("/users/:id", validateToken, upload.fields([
    { name: 'profile_image', maxCount: 1 },
    { name: 'cover_image', maxCount: 1 },
    // { name: 'thems_image', maxCount: 1 }
]), update);

module.exports = router;