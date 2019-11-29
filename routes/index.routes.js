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
    .then(post =>{
    auxPost = post.sort(() => Math.random() - 0.5)
    res.render('main', {post: auxPost})
  })
    .catch(err => next(err))
})

router.get('/api', (req, res, next) => {
      res.status(200).json({
        post: auxPost
      })
});

module.exports = router;