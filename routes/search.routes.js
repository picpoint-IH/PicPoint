const express = require('express');
const router = express.Router();
const Post = require("../models/Post.models")

router.get('/', (req, res, next) => {
    res.render('search')
});

let auxPost

router.post('/', (req, res) => {
let search = req.body.search
Post.find({$or: [{'country': search}, {'provice': search}, {'city': search}]})
.then(post => {
    auxPost = post
    res.render('search', {post: post})
})
.catch(err => console.log(err))
})

router.get('/api', (req, res, next) => {res.status(200).json({post: auxPost})
});

module.exports = router;