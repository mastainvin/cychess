const express = require("express");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");

require("dotenv").config({ path: "./config/.env" });
require("./config/db");

const { checkUser, requireAuth } = require("./middleware/auth.middleware");

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
    res.status(200).send(res.Locals.user._id);
});

//routes
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes)

//server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
