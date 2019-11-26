const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User.models");
const Post = require("../models/Post.models")
const {ensureLoggedIn, ensureLoggedOut} = require('connect-ensure-login');
const uploadCloud = require('../configs/cloudinary.js');

router.get("/login", (req, res) => {
  res.render("auth/login", {
    "message": req.flash("error"),
    layout: false
  });
});

router.post("/login", ensureLoggedOut(), passport.authenticate("local-login", {
  successRedirect: "/main",
  failureRedirect: "/auth/login",
  failureFlash: true,
}));

router.get("/signup", ensureLoggedOut(), (req, res) => {
  res.render("auth/signup", {
    layout: false,
    message: req.flash('error')
  });
});


router.post('/signup', [ensureLoggedOut(), uploadCloud.single('imgFile')], passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/auth/signup',
  failureFlash: true
}))

router.get("/logout", ensureLoggedIn('/auth/login'), (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get('/profile', ensureLoggedIn('/auth/login'), (req, res) => {
  Post.find({creatorId: req.user._id})
  .populate('creatorId')
  .then(allPosts => res.render('auth/profile', {
    user: req.user, post: allPosts
  }));
});

router.get('/edit', (req, res, next) => {
  res.render('authentication/upload')
});

router.post('/edit', uploadCloud.single('imgFile'), (req, res, next) => {
  const path = req.file.url
  User.findByIdAndUpdate(req.user._id, {
      path
    })
    .then(us => res.redirect('/'))
    .catch(error => console.log(error))
});

router.get('/api', (req, res, next) => {
  Post.find({creatorId: req.user._id})
    .populate('creatorId')
    .then(placesFromDB => res.status(200).json({
      post: placesFromDB
    }))
    .catch(err => next(err))
});

module.exports = router;