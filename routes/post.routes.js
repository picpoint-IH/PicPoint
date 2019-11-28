const express = require('express');
const router = express.Router();
const Post = require('../models/Post.models')
const uploadCloud = require('../configs/cloudinary');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

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

let auxPost

router.get('/details/:id', (req, res) => {
    Post.findById(req.params.id)
        .populate('creatorId')
        .then(thePost => {
            auxPost = thePost
            res.render('Post/detailPost', auxPost)
        })
        .catch(err => console.log("Error consultando la BBDD", err))
})

router.get('/api', (req, res, next) => {
    res.status(200).json(auxPost)
});


router.get('/detail/:id', (req, res) => {
    Post.findById(req.params.id)
        .populate('creatorId')
        .then(thePost => {
            res.render('Post/profileEditPost', thePost)
        })
        .catch(err => console.log("Error consultando la BBDD", err))
})

router.get('/delete', (req, res) => {
    Post.findByIdAndDelete(req.query.id)
        .then(() => res.redirect('/auth/profile'))
        .catch(err => console.log(err))
})



module.exports = router;