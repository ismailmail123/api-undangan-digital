const { user: UserModel, card_payment: Card_paymentModel } = require("../models");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} _next
 */

const index = async(req, res, _next) => {
    try {
        const cardpayments = await Card_paymentModel.findAll({
            include: [{
                model: UserModel,
                attributes: ["username", "email", "address", "profile_image", "cover_image", "thems_image"],
                as: "user",
            }],
        });

        return res.send({
            message: "Success",
            data: cardpayments,
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
        const cardpayments = await Card_paymentModel.findByPk(id, {
            include: [{
                model: UserModel,
                attributes: ["username", "email", "address", "profile_image", "cover_image", "thems_image"],
                as: "user",
            }],
        });

        return res.send({
            message: "Success",
            data: cardpayments,
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
};

const create = async(req, res, _next) => {
    try {
        const currentUser = req.user;
        const { title, name, number } = req.body;

        console.log("Request body:", req.body);

        if (!title || !name || !number) {
            return res.status(400).send({ message: "Permintaan tidak valid, pastikan semua data diisi" });
        }

        const newPayment = await Card_paymentModel.create({
            user_id: currentUser.id,
            title,
            name,
            number,
        });
        return res.send({
            message: "Product created successfully",
            data: newPayment,
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
        const { title, name, number, } = req.body;

        if (!id) {
            return res.status(400).send({ message: "Payment ID tidak ditemukan" });
        }

        const payment = await Card_paymentModel.findOne({
            where: {
                id: id,
                user_id: currentUser.id,
            },
        });

        if (!payment) {
            return res.status(404).send({ message: "Payment tidak ditemukan atau Anda tidak memiliki izin untuk memperbaruinya" });
        }

        // Memvalidasi inputan dari user
        if (!title || !name || !number) {
            return res.status(400).send({ message: "Tidak ada data yang diperbarui" });
        }


        const updatedPayment = await payment.update({
            title,
            name: name,
            number: number,
        });

        return res.send({
            message: "Product updated successfully",
            data: updatedPayment,
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

        const payment = await Card_paymentModel.findOne({
            where: {
                id: id,
                user_id: currentUser.id,
            },
        });

        if (!payment) {
            return res.status(404).send({ message: "payment tidak ditemukan atau Anda tidak memiliki izin untuk menghapusnya" });
        }

        await Card_paymentModel.destroy({
            where: {
                id: id,
            },
        });

        return res.send({ message: "payment berhasil dihapus" });
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