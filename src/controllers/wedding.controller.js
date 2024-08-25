const { user: UserModel, wedding: WeddingModel } = require("../models");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} _next
 */

const index = async(req, res, _next) => {
    try {
        const weddings = await WeddingModel.findAll({
            include: [{
                model: UserModel,
                attributes: ["username", "email", "address", "profile_image", "cover_image", "thems_image"],
                as: "user",
            }],
        });

        return res.send({
            message: "Success",
            data: weddings,
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

const show = async(req, res, _next) => {

    const { id } = req.params;
    try {
        const weddings = await WeddingModel.findByPk(id, {
            include: [{
                model: UserModel,
                attributes: ["username", "email", "address", "profile_image", "cover_image", "thems_image"],
                as: "user",
            }],
        });

        return res.send({
            message: "Success",
            data: weddings,
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
};

const create = async(req, res, _next) => {
    try {
        const currentUser = req.user;
        const { name, parthner_name, date, time, address, sound } = req.body;

        console.log("Request body:", req.body);

        if (!name || !parthner_name || !date || !time || !address || !sound) {
            return res.status(400).send({ message: "Permintaan tidak valid, pastikan semua data diisi" });
        }

        // URL file suara yang telah diupload ke Cloudinary
        // const soundUrl = req.file.path;

        const newWedding = await WeddingModel.create({
            user_id: currentUser.id,
            name,
            parthner_name,
            date,
            time,
            address,
            sound
        });

        return res.send({
            message: "Product created successfully",
            data: newWedding,
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
};




const update = async(req, res, _next) => {
    try {
        const currentUser = req.user;
        const { id } = req.params;
        const { name, parthner_name, date, time, address, sound } = req.body;

        console.log("ini id", id)

        if (!id) {
            return res.status(400).send({ message: "wedding ID tidak ditemukan" });
        }

        const wedding = await WeddingModel.findOne({
            where: {
                id: id,
                user_id: currentUser.id,
            },
        });

        if (!wedding) {
            return res.status(404).send({ message: "wedding tidak ditemukan atau Anda tidak memiliki izin untuk memperbaruinya" });
        }

        // Memvalidasi inputan dari user
        if (!name || !parthner_name || !date || !time || !address || !sound) {
            return res.status(400).send({ message: "Tidak ada data yang diperbarui" });
        }

        // const soundUrl = req.file.path;

        const updatedWedding = await wedding.update({
            name,
            parthner_name,
            date,
            time,
            address,
            sound
        });

        return res.send({
            message: "Product updated successfully",
            data: updatedWedding,
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
        const { id } = req.params;

        const wedding = await WeddingModel.findOne({
            where: {
                id: id,
                user_id: currentUser.id,
            },
        });

        if (!wedding) {
            return res.status(404).send({ message: "Wedding tidak ditemukan atau Anda tidak memiliki izin untuk menghapusnya" });
        }

        await WeddingModel.destroy({
            where: {
                id: id,
            },
        });

        return res.send({ message: "Wedding berhasil dihapus" });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
};



module.exports = {
    index,
    show,
    create,
    update,
    remove
};