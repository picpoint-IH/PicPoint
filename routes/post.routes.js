const express = require('express');
const router = express.Router();
const User = require('../models/User.models')
const Post = require('../models/Post.models')
const multer = require('multer')
const uploadCloud = require('../configs/cloudinary');
const {ensureLoggedIn, ensureLoggedOut} = require('connect-ensure-login');

// Lista de Posts
router.get('/', (req, res) => {
    Post.find()
        .populate('creatorId')
        .then(allPosts => res.render('post/posts-index', {
            posts: allPosts
        }))
        .catch(err => console.log("Error consultando la BBDD: ", err))
});

// Nuevo Post: renderizar formulario
router.get('/new', ensureLoggedIn('/post'), (req, res) => {
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
        content,
        picName
    } = req.body

    Post.create({
            content,
            creatorId: req.user._id,
            picPath,
            picName,
            location
        })
        .then(x => res.redirect('/auth/profile'))
        .catch(err => 'error: ' + err)
})


module.exports = router;