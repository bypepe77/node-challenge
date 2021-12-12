const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { checkUsernameAndPasswordAndNameNotEmpty } = require("../middlewares");


const bcryptSalt = 10;

const router = express.Router();

// Comprobar si estoy logeado
router.get("/me", (req, res, next) => {
  if (req.session.currentUser) {
    res.status(200).json(req.session.currentUser);
  } else {
    res.status(401).json({ code: "unauthorized" });
  }
});

router.post(
  "/signup",
  checkUsernameAndPasswordAndNameNotEmpty,
  async (req, res, next) => {
    console.log(req.body)
    const {username, password, name } = req.body;
    try {
      const user = await User.findOne({ name });
      if (user) {
        return res.status(422).json({ code: "username-not-unique" });
      }
      const salt = await bcrypt.genSaltSync(bcryptSalt);
      const hashedPassword = await bcrypt.hashSync(password, salt);
      const newUser = await User.create({
        username,
        hashedPassword,
        name,
      });
      user_new = await User.findById(newUser._id).select("-hashedPassword") // prevenir enviar el password
      console.log(user_new);
      req.session.currentUser = user_new;
      return res.json(user_new);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  "/login",
  checkUsernameAndPasswordAndNameNotEmpty,
  async (req, res, next) => {
    const { username, password } = res.locals.auth;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ code: "user-not-found" });
      }
      if (bcrypt.compareSync(password, user.hashedPassword)) {
        const user_new = await User.findOne({ username }).select("-hashedPassword");
        req.session.currentUser = user_new;

        return res.json(user_new);
      }
      return res.status(404).json({ code: "not-found" });
    } catch (error) {
      next(error);
    }
  }
);

router.get("/logout", (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      next(err);
    }
    return res.status(204).send();
  });
});

module.exports = router;