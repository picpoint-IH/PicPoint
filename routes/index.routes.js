const express = require('express');
const router = express.Router();
// const fetch = require('node-fetch');
// global.fetch = fetch;


/* GET home page */
router.get('/', (req, res, next) => {
  let data = {
    layout: false
  }
  res.render('index', data)
});

router.get('/main', (req, res) => {
  res.render('main')
})

router.get('/api', (req, res, next) => {
  Post.find()
    .populate('creatorId')
    .then(placesFromDB => res.status(200).json({
      post: placesFromDB
    }))
    .catch(err => next(err))
});

module.exports = router;

module.exports = router;
