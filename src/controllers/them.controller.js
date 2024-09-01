const { them: ThemModel, user: UserModel } = require("../models");
const { Op } = require("sequelize");

const index = async(req, res, _next) => {
    try {

        const currentUser = req.user;
        const thems = await ThemModel.findAll({

            where: {
                [Op.or]: [
                    { user_id: null },
                    { user_id: currentUser.id }, // Tema yang dimiliki oleh user yang sedang login
                ],
            },
            // include: [{
            //     model: UserModel,
            //     attributes: ["username", "email", "address", "profile_image", "cover_image", "thems_image"],
            //     as: "user",
            // }],
        });

        return res.send({
            message: "Success",
            data: thems,
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
};


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

        const newThem = await ThemModel.create({
            user_id: currentUser.id,
            title,
            img_url: image,
        });

        console.log("New Them:", newThem);

        return res.send({
            message: "Them created successfully",
            data: newThem,
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
};



const update = async(req, res, _next) => {
    try {
        const currentUser = req.user;
        const { themId } = req.params;
        const image = req.file.path;
        const { title } = req.body;

        // Memastikan themId tidak undefined
        if (!themId) {
            return res.status(400).send({ message: "them ID tidak ditemukan" });
        }
        // Memastikan them milik seller yang sedang login
        const them = await ThemModel.findOne({
            where: {
                id: themId,
                user_id: currentUser.id,
            },
        });

        if (!them) {
            return res.status(404).send({ message: "Them tidak ditemukan atau Anda tidak memiliki izin untuk memperbaruinya" });
        }

        // Memvalidasi inputan dari user
        if (!title) {
            return res.status(400).send({ message: "Tidak ada data yang diperbarui" });
        }

        // Update Them
        const updatedThem = await them.update({
            title: title,
            img_url: image,
        });

        return res.send({
            message: "Them updated successfully",
            data: updatedThem,
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
        const { themId } = req.params;

        console.log("id", themId)
        const them = await ThemModel.findOne({
            where: {
                id: themId,
                user_id: currentUser.id, // Memastikan Them milik seller yang sedang login
            },
        });

        if (!them) {
            return res.status(404).send({ message: "Produk tidak ditemukan atau Anda tidak memiliki izin untuk menghapusnya" });
        }

        await ThemModel.destroy({
            where: {
                id: themId,
            },
        });

        return res.send({ message: "Tema berhasil dihapus" });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
};



module.exports = { index, create, update, remove };