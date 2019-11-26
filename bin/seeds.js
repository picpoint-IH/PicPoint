const mongoose = require('mongoose')
const Picture = require('../models/Post.models')
require('dotenv').config()

const dbtitle = 'PicPoint'
mongoose.connect(`${process.env.DB}`, { useUnifiedTopology: true, useNewUrlParser: true })

Picture.collection.drop()


const pictures = [
  {
    location: { coordinates: [134.5595039, 34.3986579], type: "Point" },
    picPath: "/images/Awaji.jpg",
    picName: "Awaji",
    creatorId: "5ddc1f93df1da017609c1aa3",
  },
  {
    location: { coordinates: [71.0573459, 42.3521919], type: "Point" },
    picPath: "/images/boston.jpeg",
    picName: "Boston",
    creatorId: "5ddc1f93df1da017609c1aa3",
  },
  {
    location: { coordinates: [-121.6615197, 41.0107315], type: "Point" },
    picPath: "/images/burneyFalls.jpeg",
    picName: "Burney Falls",
    creatorId: "5ddc1f93df1da017609c1aa3",
  },
  {
    location: { coordinates: [-74.0012583, 40.7160897], type: "Point" },
    picPath: "/images/ChinatownNY.jpg",
    picName: "China Town NY",
    creatorId: "5ddc1f93df1da017609c1aa3",
  },

  {
    location: { coordinates: [-107.7945225, 38.9807154], type: "Point" },
    picPath: "/images/colorado.jpeg",
    picName: "Colorado",
    creatorId: "5ddc1f93df1da017609c1aa3",
  },
  {
    location: { coordinates: [135.4386761, 35.0984796], type: "Point" },
    picPath: "/images/kyoto.jpeg",
    picName: "Kyoto",
    creatorId: "5ddc1f93df1da017609c1aa3",
  },
  {
    location: { coordinates: [-0.1703148, 51.334524], type: "Point" },
    picPath: "/images/lavander.jpg",
    picName: "Lavander",
    creatorId: "5ddc1f93df1da017609c1aa3",
  },
  {
    location: { coordinates: [-0.3817856, 51.5287352], type: "Point" },
    picPath: "/images/london.jpeg",
    picName: "London",
    creatorId: "5ddc1f93df1da017609c1aa3",
  },
  {
    location: { coordinates: [-122.7944128, 45.5428679], type: "Point" },
    picPath: "/images/portland.jpg",
    picName: "Portland",
    creatorId: "5ddc1f93df1da017609c1aa3",
  },
  {
    location: { coordinates: [28.9841518, 41.0291259], type: "Point" },
    picPath: "/images/rainbowStairsJeremy.jpeg",
    picName: "Rainbow Stairs",
    creatorId: "5ddc1f93df1da017609c1aa3",
  },
  {
    location: { coordinates: [77.2447658, 9.8116627], type: "Point" },
    picPath: "/images/rammakal.jpg",
    picName: "Rammakal",
    creatorId: "5ddc1f93df1da017609c1aa3",
  },
  {
    location: { coordinates: [-117.3891776, 32.8248175], type: "Point" },
    picPath: "/images/sanDiego.jpeg",
    picName: "San Diego",
    creatorId: "5ddc1f93df1da017609c1aa3",
  },
  {
    location: { coordinates: [123.3791174, 35.7443033], type: "Point" },
    picPath: "/images/southKorea.jpeg",
    picName: "South Korea",
    creatorId: "5ddc1f93df1da017609c1aa3",
  },
]
Picture.deleteMany()
Picture.create(pictures)
  .then(allPictures => console.log(`Se han cargado ${allPictures.length} fotos`))
  .then(x => mongoose.connection.close())
  .catch(err => console.log("Error cargando fotos", err))