const { galerie: GalerieModel, user: UserModel } = require("../models");

const create = async(req, res, _next) => {
    try {
        const currentUser = req.user;
        const { title } = req.body;

        if (!req.file) {
            return res.status(400).send({ message: "Gambar tidak ditemukan, pastikan gambar diunggah dengan benar" });
        }

        const image = req.file.path; // Cloudinary URL

        if (!title) {
            return res.status(400).send({ message: "Permintaan tidak valid, pastikan semua data diisi" });
        }

        const newGalerie = await GalerieModel.create({
            user_id: currentUser.id,
            title,
            image: image,
        });

        console.log("New Galerie:", newGalerie);

        return res.send({
            message: "Galerie created successfully",
            data: newGalerie,
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
};



const update = async(req, res, _next) => {
    try {
        const currentUser = req.user;
        const { galerieId } = req.params;
        const image = req.file.path;
        const { title } = req.body;

        // Memastikan productId tidak undefined
        if (!galerieId) {
            return res.status(400).send({ message: "Product ID tidak ditemukan" });
        }
        // Memastikan galerie milik seller yang sedang login
        const galerie = await GalerieModel.findOne({
            where: {
                id: galerieId,
                user_id: currentUser.id,
            },
        });

        if (!galerie) {
            return res.status(404).send({ message: "Produk tidak ditemukan atau Anda tidak memiliki izin untuk memperbaruinya" });
        }

        // Memvalidasi inputan dari user
        if (!title) {
            return res.status(400).send({ message: "Tidak ada data yang diperbarui" });
        }

        // Update produk
        const updatedGalerie = await galerie.update({
            title: title,
            image: image,
        });

        return res.send({
            message: "Galerie updated successfully",
            data: updatedGalerie,
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
};


/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} _next
 */

const remove = async(req, res, _next) => {
    try {
        const currentUser = req.user;
        const { galerieId } = req.params;

        console.log("id", galerieId)
        const galerie = await GalerieModel.findOne({
            where: {
                id: galerieId,
                user_id: currentUser.id, // Memastikan produk milik seller yang sedang login
            },
        });

        if (!galerie) {
            return res.status(404).send({ message: "Produk tidak ditemukan atau Anda tidak memiliki izin untuk menghapusnya" });
        }

        await GalerieModel.destroy({
            where: {
                id: galerieId,
            },
        });

        return res.send({ message: "Galeri berhasil dihapus" });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
};



module.exports = { create, update, remove };