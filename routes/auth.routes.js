const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User.models");
const Post = require("../models/Post.models")
const Like = require('../models/Like.models')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
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
  Post.find({ creatorId: req.user._id })
    .then(allPosts => {
      auxPost = allPosts
      console.log(auxPost)
      res.render('auth/profile', {
        user: req.user, post: auxPost
      })
    })
    .catch(error => console.log(error))
});

router.get('/liked', ensureLoggedIn('/auth/login'), (req, res) => {
  Like.find({
    'creatorId': req.user._id
  })
    .populate('postId')
    .then(allPosts => {
      auxPost = []
      const myLikedPost = allPosts
      for (let i = 0; i < myLikedPost.length; i++) {
        auxPost.push(myLikedPost[i].postId)
      }
      res.render('auth/profileLiked', {
        user: req.user,
        post: myLikedPost
      })
    })
    .catch(error => console.log(error))
});

router.get('/edit/:id', ensureLoggedIn('/auth/login'), (req, res) => {
  User.findById(req.params.id)
    .then(user => res.render('auth/edit', user))
    .catch(err => console.log("Error consultando la BBDD", err))
})

router.post('/edit/:id', uploadCloud.single('path'), (req, res) => {
  const { username,
    email,
    aboutMe } = req.body
  if (req.file) {
    const path = req.file.url
    User.findByIdAndUpdate(req.user.id, {
      username,
      email,
      aboutMe,
      path
    })
      .then(us => res.redirect('/auth/profile'))
      .catch(error => console.log(error))
  } else {
    User.findByIdAndUpdate(req.user.id, {
      username,
      email,
      aboutMe,
    })
      .then(us => res.redirect('/auth/profile'))
      .catch(error => console.log(error))
  }
});

router.get('/api', (req, res, next) => { res.status(200).json({ post: auxPost }) });

module.exports = router;