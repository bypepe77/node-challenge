/*
    Your solution should go here
*/

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors")({ origin: true, credentials: true });
const logger = require("morgan");
require("dotenv").config();
const createError = require("http-errors");

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to: ", process.env.MONGO_URL);
  })
  .catch((error) => {
    console.error(error);
  });

const authRouter = require("./routes/Auth");
const listRouter = require("./routes/list");
const app = express();

app.set("trust proxy", true);
app.use(cors);
app.options("*", cors);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60, // 1 day
    }),
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    name: "NodeChallenge-ih", // configuracion del nombre de la cookie
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "Strict", // configuración para que no se pueda acceder a la cookie desde otro dominio
      path: "/",
      secure: process.env.NODE_ENV === "production",
    },
  })
);
app.use((req, res, next) => {
  app.locals.currentUser = req.session.currentUser;
  next();
});

app.use("/auth", authRouter);
app.use("/list", listRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });

module.exports = app;  