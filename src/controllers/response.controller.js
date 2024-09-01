const { response: ResponseModel, recipient: RecipientModel } = require("../models");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} _next
 */

const index = async(req, res, _next) => {
    try {
        // const currentUser = req.user;
        const responses = await ResponseModel.findAll({
            // where: {
            //     id: currentUser.id
            // },
            include: [{
                model: RecipientModel,
                as: "recipient",
            }],
        });

        return res.send({
            message: "Success",
            data: responses,
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
};


const create = async(req, res, _next) => {
    try {
        const { id } = req.params;
        const { recipient_id, absen, message, name } = req.body;

        console.log("ini params", id)

        console.log("Request body:", req.body);

        if (!absen || !message || !name) {
            return res.status(400).send({ message: "Permintaan tidak valid, pastikan semua data diisi" });
        }

        const newResponse = await ResponseModel.create({
            recipient_id,
            absen,
            message,
            name
        });
        return res.send({
            message: "Message created successfully",
            data: newResponse,
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
};

module.exports = { index, create };