const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User.models");
const Post = require("../models/Post.models")
const {
    ensureLoggedIn,
    ensureLoggedOut
} = require('connect-ensure-login');

let auxPost

router.get('/api', (req, res, next) => {
    res.status(200).json({
        post: auxPost
    })
});

router.get('/:id', ensureLoggedIn('/auth/login'), (req, res) => {
    console.log(req.params.id)

    Post.find({
            creatorId: req.params.id
        })
        .populate("creatorId")
        .then(allPosts => {
            auxPost = allPosts
            res.render('Visit/userDetail', {
                post: auxPost
            })
        })
        .catch(error => console.log(error, "error find visit/:id"))
});

router.get('/profile/:id', (req, res) => {
    Post.findById(req.params.id)
        .populate('creatorId')
        .then(thePost => {
            auxPost = [thePost]
            res.render('Visit/postUserDetail', thePost)
        })
        .catch(err => console.log("Error consultando la BBDD", err))
})

module.exports = router;