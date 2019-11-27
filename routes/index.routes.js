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

router.get('/main', (req, res) => {
  Post.find()
    .populate('creatorId')
    .then(allPosts => res.render('main', {
      post: allPosts
    }));
})
router.get('/main2', (req, res) => {
  Post.find()
    .populate('creatorId')
    .then(allPosts => res.render('main2', {
      post: allPosts
    }));
})
router.get('/api', (req, res, next) => {
  Post.find()
    .populate()
    .then(placesFromDB => res.status(200).json({
      post: placesFromDB
    }))
    .catch(err => next(err))
});

module.exports = router;

module.exports = router;
