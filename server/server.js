const express = require("express");
const expressSession = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(
  expressSession({
    secret: "1234567890",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: "auto",
      httpOnly: true,
      maxAge: 3600000,
    },
  })
);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const albumsRouter = require("./routes/albums");
const userRouter = require("./routes/user");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const registerRouter = require("./routes/register");
const oauthCallbackRouter = require("./routes/oauth-callback");

app.use("/albums", albumsRouter);
app.use("/user", userRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/register", registerRouter);
app.use("/oauth-callback", oauthCallbackRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
