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


router.get('/profile/:id', (req, res) => {
    Post.findById(req.params.id)
        .populate('creatorId')
        .then(thePost => {
            res.render('Post/profilePost', thePost)
        })
        .catch(err => console.log("Error consultando la BBDD", err))
})

router.get('/profile/delete/:id', (req, res) => {
    Post.findByIdAndRemove(req.params.id)
        .then(res.redirect('/auth/profile'))
        .catch(err => console.log('error!!', err))
})

router.get('/profile/edit/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(thePost => res.render('Post/profileEditPost', thePost))
        .catch(err => console.log(err))
})

router.post('/profile/edit/:id', (req, res) => {
    const { country, city, province, picName } = req.body
    let location = {
        type: "Point",
        coordinates: [req.body.latitude, req.body.longitude]
    }
    Post.findByIdAndUpdate(req.params.id, { country, city, province, picName, location })
        .then(() => res.redirect(`/auth/profile`))
        .catch(err => console.log(err))
})
















module.exports = router;