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

module.exports = router;
