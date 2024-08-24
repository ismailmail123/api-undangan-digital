const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { user: UserModel } = require("../models");

const register = async(req, res, next) => {
    const { username, email, password, address } = req.body;

    try {
        //pengecekan email
        const userExist = await UserModel.findOne({ where: { email } });
        if (userExist) {
            return res.status(401).json({ message: "Email already exist" });
        } else {
            //create new user
            const passwordHash = await bcrypt.hash(password, 10);

            const user = await UserModel.create({
                username,
                email,
                address,
                password: passwordHash,
            });


            if (!user) {
                return res.status(500).send({
                    message: "Failed to register user",
                    data: null,
                });
            }

            return res.send({
                message: "User successfully registered",
                data: null,
            });
        }
    } catch (err) {
        next(err);
    }
};

const login = async(req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: "Invalid email/password" });
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(401).json({ message: "Invalid email/password" });
        }

        const data = {
            id: user.id,
            username: user.username,
            email: user.email,
            address: user.address,
        };
        const token = jwt.sign(data, process.env.JWT_SECRET);

        return res.send({
            message: "Login successful",
            data: {
                data,
                token: token,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    login,
    register,
};