const express = require('express');
const router = express.Router();
const User = require('../models/User.models')
const Post = require('../models/Post.models')
const multer = require('multer')
const uploadCloud = require('../configs/cloudinary');
const {ensureLoggedIn, ensureLoggedOut} = require('connect-ensure-login');

// Nuevo Post: renderizar formulario
router.get('/new', ensureLoggedIn('/auth/login'), (req, res) => {
    Post.find()
        .then(thePost => res.render('post/newPost', {
            post: thePost
        }))
})

// Nuevo Post enviar formulario
router.post('/new', uploadCloud.single('picPath'), (req, res) => {
    const picPath = req.file.url
    let location = {
        type: 'Point',
        coordinates: [req.body.latitude, req.body.longitude]
    }
    const {
        picName, country, province, city
    } = req.body

    Post.create({
            creatorId: req.user._id,
            picPath,
            picName,
            location,
            country,
            province,
            city
        })
        .then(x => res.redirect('/auth/profile'))
        .catch(err => 'error: ' + err)
})

let post

router.get('/details/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(thePost => {
            post = thePost
            res.render('Post/detailPost', {post})
    })
        .catch(err => console.log("Error consultando la BBDD", err))
})

router.get('/api', (req, res, next) => {res.status(200).json({post: post})
});

module.exports = router;