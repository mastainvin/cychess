const express = require("express");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");

const { checkUser } = require("./middleware/auth.middleware");

const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");

const app = express();
app.user(cookieParser());

// jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (reg, res) => {
    res.status(200).send(res.Locals.user._id);
});
//routes
app.use("/api/user", userRoutes);

//server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
