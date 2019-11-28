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

let auxPost

router.get('/profile', ensureLoggedIn('/auth/login'), (req, res) => {
  Post.find({creatorId: req.user._id})
  .then(allPosts => {
    auxPost = allPosts
    res.render('auth/profile', {
    user: req.user, post: auxPost})
});
});

router.get('/edit/:id', ensureLoggedIn('/auth/login'), (req, res) => {
  User.findById(req.params.id)
    .then(user => res.render('auth/edit', user))
    .catch(err => console.log("Error consultando la BBDD", err))
})

router.post('/edit/:id', uploadCloud.single('imgFile'), (req, res, next) => {
  const path = req.file.url
  User.findByIdAndUpdate(req.user._id, {
      path
    })
    .then(us => res.redirect('/'))
    .catch(error => console.log(error))
});

router.get('/api', (req, res, next) => {res.status(200).json({post: auxPost})});

module.exports = router;



router.post('/:id/edit', (req, res) => {
  const {
    name,
    description,
    inversions,
    length,
    active,
  } = req.body
  Coaster.findByIdAndUpdate(req.params.id, {
      name,
      description,
      inversions,
      length,
      active,
    })
    .then(() => {
      res.redirect('/coasters')
    })
    .catch(err => console.log('Error consultando la BBDD', err))
})