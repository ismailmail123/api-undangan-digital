const { sound: SoundModel, user: UserModel } = require("../models");

const index = async(req, res, _next) => {
    try {
        const sounds = await SoundModel.findAll({
            // include: [{
            //     model: UserModel,
            //     attributes: ["username", "email", "address", "profile_image", "cover_image", "thems_image"],
            //     as: "user",
            // }],
        });

        return res.send({
            message: "Success",
            data: sounds,
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

        const soundUrl = req.file.path; // Cloudinary URL

        if (!title) {
            return res.status(400).send({ message: "Permintaan tidak valid, pastikan semua data diisi" });
        }

        const newSound = await SoundModel.create({
            user_id: currentUser.id,
            title,
            sound_url: soundUrl,
        });

        console.log("New Sound:", newSound);

        return res.send({
            message: "Sound created successfully",
            data: newSound,
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
};



const update = async(req, res, _next) => {
    try {
        const currentUser = req.user;
        const { soundId } = req.params;
        const soundUrl = req.file.path;
        const { title } = req.body;

        // Memastikan themId tidak undefined
        if (!soundId) {
            return res.status(400).send({ message: "sound ID tidak ditemukan" });
        }
        // Memastikan sound milik seller yang sedang login
        const sound = await SoundModel.findOne({
            where: {
                id: soundId,
                user_id: currentUser.id,
            },
        });

        if (!sound) {
            return res.status(404).send({ message: "sound tidak ditemukan atau Anda tidak memiliki izin untuk memperbaruinya" });
        }

        // Memvalidasi inputan dari user
        if (!title) {
            return res.status(400).send({ message: "Tidak ada data yang diperbarui" });
        }

        // Update sound
        const updatedSound = await sound.update({
            title: title,
            sound_url: soundUrl,
        });

        return res.send({
            message: "Sound updated successfully",
            data: updatedSound,
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
        const { soundId } = req.params;

        console.log("id", soundId)
        const sound = await SoundModel.findOne({
            where: {
                id: soundId,
                user_id: currentUser.id, // Memastikan sound milik seller yang sedang login
            },
        });

        if (!sound) {
            return res.status(404).send({ message: "Produk tidak ditemukan atau Anda tidak memiliki izin untuk menghapusnya" });
        }

        await SoundModel.destroy({
            where: {
                id: soundId,
            },
        });

        return res.send({ message: "Sound berhasil dihapus" });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
};



module.exports = { index, create, update, remove };