const express = require('express');
const router = express.Router();
const Post = require("../models/Post.models")

/* GET home page */
router.get('/', (req, res, next) => {
  let data = {
    layout: false
  }
  res.render('index', data)
});

let auxPost

router.get('/main', (req, res) => {
  Post.find()
    .then(allPosts =>{
    auxPost = allPosts
    res.render('main', {post: auxPost})
  })
    .catch(err => next(err))
})

router.get('/api', (req, res, next) => {res.status(200).json({post: auxPost})
});

module.exports = router;