const mongoose = require("mongoose");

mongoose
    .connect("mongodb+srv://admin:admin123@cluster0.y6rem.mongodb.net/test", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Failed to connect to MongoDB", err));
