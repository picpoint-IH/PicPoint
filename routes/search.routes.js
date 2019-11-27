const express = require('express');
const router = express.Router();
const Post = require("../models/Post.models")

router.get('/', (req, res, next) => {
    res.render('search')
});

router.post('/', (req, res) => {
    let search = req.body.search
    Post.find({ 'country': search })
        .then(post => {
            console.log(post)
            res.render('search', { post: post })
        })

        .catch(err => console.log(err))
})



module.exports = router;