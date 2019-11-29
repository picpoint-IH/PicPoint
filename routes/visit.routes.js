const express = require("express");
const router = express.Router();
const Post = require("../models/Post.models")
const Like = require('../models/Like.models')

const {
    ensureLoggedIn,
    ensureLoggedOut
} = require('connect-ensure-login');

let auxPost
let postId

router.get('/api', (req, res, next) => {
    res.status(200).json({
        post: auxPost
    })
});

router.get('/like/api', (req, res, next) => {
    Like.find({'postId': postId})
        .then(x => res.status(200).json(x))
        .catch(err => console.log("Ni uno solo ", err))
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
            postId = req.params.id
            auxPost = [thePost]
            res.render('Visit/postUserDetail', thePost)
        })
        .catch(err => console.log("Error consultando la BBDD", err))
})

router.get('/like/:id', (req, res) => {
    Like.find(({
            'postId': postId,
            'creatorId': req.user._id
        }))
        .then(result => {
            if (result.length == 0) {
                Like.create({
                        creatorId: req.user._id,
                        postId: postId
                    })
                    .catch(err => console.log("Error ", err))
            }
        })
        .then(() => res.redirect(`/visit/profile/${req.params.id}`))
        .catch(err => console.log("Error", err))
})

module.exports = router;