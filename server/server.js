const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
  origin: true,
  credentials: true
}));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});

const albumsRouter = require("./routes/albums");
const userRouter = require("./routes/user");
const loginRouter = require("./routes/login");

app.use("/albums", albumsRouter);
app.use("/user", userRouter);
app.use("/login", loginRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});