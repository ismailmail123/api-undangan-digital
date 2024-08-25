// require("dotenv").config({ path: path.join(__dirname, "../.env") });
require('dotenv').config()

const express = require("express");

const app = express();

const authRouter = require("./routes/auth.router")
const recipientRouter = require("./routes/recipient.router")
const userRouter = require("./routes/user.router")
const galerieRouter = require("./routes/galerie.router")
const responseRouter = require("./routes/response.router")
const weddingRouter = require("./routes/wedding.router")
const cardpaymentRouter = require("./routes/cardpayment.router")
const themRouter = require("./routes/them.router")
const soundRouter = require("./routes/sound.router")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const cors = require("cors");

if (!process.env.JWT_SECRET) {
    console.error(
        "JWT_SECRET is not provided, fill it with random string or generate it using 'openssl rand -base64/-hex 32'"
    );
    process.exit(1);
}

app.use(cors());

app.use("/api/auth", authRouter)
app.use("/api", recipientRouter)
app.use("/api", userRouter)
app.use("/api", galerieRouter)
app.use("/api", responseRouter)
app.use("/api", weddingRouter)
app.use("/api", cardpaymentRouter)
app.use("/api", themRouter)
app.use("/api", soundRouter)

app.listen(process.env.SERVER_PORT || 3000, () => {
    console.log("Server Running");
});