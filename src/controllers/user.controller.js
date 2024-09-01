const { user: UserModel } = require("../models");
const { storage } = require("../storage/storage");
const multer = require("multer");
const upload = multer({ storage: storage });

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} _next
 */
const index = async(req, res, _next) => {
    try {
        const currentUser = req.user;

        // Fetch user data based on the logged-in user
        const users = await UserModel.findAll({
            where: {
                id: currentUser.id,
            },
            attributes: ["id", "username", "profile_image", "cover_image", "thems_image", "thems_image1"],

        });

        return res.send({
            message: "Success",
            data: users,
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
};

const show = async(req, res, _next) => {

    const { id } = req.params;
    try {
        const users = await UserModel.findByPk(id, {
            attributes: ["username", "email", "address", "profile_image", "cover_image", "thems_image", "thems_image1"],
            // include: [{
            //     model: UserModel,
            //     attributes: ["username", "email", "address", "profile_image", "cover_image", "thems_image", "thems_image1"],
            //     as: "user",
            //     include: [{
            //             model: GalerieModel,
            //             as: "galerie",
            //         },
            //         {
            //             model: WeddingModel,
            //             as: "wedding",
            //         },
            //         {
            //             model: Card_paymentModel,
            //             as: "cardpayment",
            //         }
            //     ],
            // }],
        });

        return res.send({
            message: "Success",
            data: users,
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
};

const update = async(req, res) => {
    const { id } = req.params;
    const { thems_image, thems_image1 } = req.body;

    // Mendapatkan URL gambar dari upload
    const profile_image = req.files['profile_image'] ? req.files['profile_image'][0].path : null;
    const cover_image = req.files['cover_image'] ? req.files['cover_image'][0].path : null;
    // const thems_image = req.files['thems_image'] ? req.files['thems_image'][0].path : null;

    try {
        // Menyusun data pembaruan
        const updateData = {};
        if (profile_image) updateData.profile_image = profile_image;
        if (cover_image) updateData.cover_image = cover_image;
        if (thems_image) updateData.thems_image = thems_image;
        if (thems_image1) updateData.thems_image1 = thems_image1;

        // Update data pengguna
        const [updated] = await UserModel.update(updateData, {
            where: { id },
        });

        if (updated) {
            const updatedUser = await UserModel.findOne({
                where: { id },
                attributes: ["username", "profile_image", "cover_image", "thems_image", "thems_image"],
            });

            return res.send({
                message: "User updated successfully",
                data: updatedUser,
            });
        } else {
            return res.status(404).send({ message: "User not found or no changes made" });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
};


module.exports = { index, show, update };