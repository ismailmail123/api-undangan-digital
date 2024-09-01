const { recipient: RecipientModel, user: UserModel, wedding: WeddingModel, galerie: GalerieModel, card_payment: Card_paymentModel } = require("../models");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} _next
 */

const index = async(req, res, _next) => {
    try {
        const currentUser = req.user;

        const recipients = await RecipientModel.findAll({
            where: {
                user_id: currentUser.id,
            },
            include: [{
                model: UserModel,
                attributes: ["username", "email", "address", "profile_image", "cover_image", "thems_image", "thems_image1"],
                as: "user",
            }],
        });

        return res.send({
            message: "Success",
            data: recipients,
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
        const recipients = await RecipientModel.findByPk(id, {
            include: [{
                model: UserModel,
                attributes: ["username", "email", "address", "profile_image", "cover_image", "thems_image", "thems_image1"],
                as: "user",
                include: [{
                        model: GalerieModel,
                        as: "galerie",
                    },
                    {
                        model: WeddingModel,
                        as: "wedding",
                    },
                    {
                        model: Card_paymentModel,
                        as: "cardpayment",
                    }
                ],
            }],
        });

        return res.send({
            message: "Success",
            data: recipients,
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
};

const create = async(req, res, _next) => {
    try {
        const currentUser = req.user;
        const { name, number } = req.body;

        console.log("Request body:", req.body);

        if (!name || !number) {
            return res.status(400).send({ message: "Permintaan tidak valid, pastikan semua data diisi" });
        }

        const newRecipient = await RecipientModel.create({
            user_id: currentUser.id,
            name,
            number,
        });
        return res.send({
            message: "Product created successfully",
            data: newRecipient,
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
        const { name, number, } = req.body;

        console.log("ini id", id)

        if (!id) {
            return res.status(400).send({ message: "Recipient ID tidak ditemukan" });
        }

        const recipient = await RecipientModel.findOne({
            where: {
                id: id,
                user_id: currentUser.id,
            },
        });

        if (!recipient) {
            return res.status(404).send({ message: "Produk tidak ditemukan atau Anda tidak memiliki izin untuk memperbaruinya" });
        }

        // Memvalidasi inputan dari user
        if (!name || !number) {
            return res.status(400).send({ message: "Tidak ada data yang diperbarui" });
        }


        const updatedRecipient = await recipient.update({
            name: name,
            number: number,
        });

        return res.send({
            message: "Product updated successfully",
            data: updatedRecipient,
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
};
const status = async(req, res, _next) => {
    try {
        const currentUser = req.user;
        const { id } = req.params;
        const { status } = req.body;

        console.log("ini id", id)

        if (!id) {
            return res.status(400).send({ message: "Recipient ID tidak ditemukan" });
        }

        const recipient = await RecipientModel.findOne({
            where: {
                id: id,
                user_id: currentUser.id,
            },
        });

        if (!recipient) {
            return res.status(404).send({ message: "Produk tidak ditemukan atau Anda tidak memiliki izin untuk memperbaruinya" });
        }

        // Memvalidasi inputan dari user
        if (!status) {
            return res.status(400).send({ message: "Tidak ada data yang diperbarui" });
        }


        const updatedRecipient = await recipient.update({
            status,
        });

        return res.send({
            message: "Product updated successfully",
            data: updatedRecipient,
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

        const recipient = await RecipientModel.findOne({
            where: {
                id: id,
                user_id: currentUser.id,
            },
        });

        if (!recipient) {
            return res.status(404).send({ message: "recipient tidak ditemukan atau Anda tidak memiliki izin untuk menghapusnya" });
        }

        await RecipientModel.destroy({
            where: {
                id: id,
            },
        });

        return res.send({ message: "recipient berhasil dihapus" });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
};



module.exports = { index, show, create, update, remove, status };