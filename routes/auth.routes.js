const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User.models");
const {ensureLoggedIn, ensureLoggedOut} = require('connect-ensure-login');


// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get("/login", (req, res) => {
  res.render("auth/login", { "message": req.flash("error"), layout: false });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/signup", (req, res) => {
  let data ={
    layout: false
  }
  res.render("auth/signup", data);
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass
    });

    newUser.save()
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      res.render("auth/signup", { message: "Something went wrong" });
    })
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
  res.render('auth/profile', {
    user: req.user
  });
});

router.get('/edit', (req, res, next) => {
  res.render('authentication/upload')
});

router.post('/edit',/* uploadCloud.single('imgFile'),*/ (req, res, next) => {
  const path = req.file.url
  User.findByIdAndUpdate(req.user._id, {
      path
    })
    .then(us => res.redirect('/'))
    .catch(error => console.log(error))
});

module.exports = router;
