const mongoose = require('mongoose')
const Picture = require('../models/Post.models')
require('dotenv').config()

const dbtitle = 'PicPoint'
mongoose.connect(`${process.env.DB}`, { useUnifiedTopology: true, useNewUrlParser: true })

Picture.collection.drop()


const pictures = [
  {
    location: { coordinates: [134.79511304375, 34.36120948789266], type: "Point" },
    picPath: "/images/Awaji.jpg",
    picName: "Awaji Arc",
    creatorId: "5ddd7d374dc60040fa79f29a",
    country: "Japan",
    province: "Hyogo",
    city: "Awaji",
  },
  {
    location: { coordinates: [-71.06121089843748, 42.3795258308998], type: "Point" },
    picPath: "/images/boston.jpeg",
    picName: "Boston Street",
    creatorId: "5ddd7d374dc60040fa79f29a",
    country: "USA",
    province: "Massachusetts",
    city: "Boston",
  },
  {
    location: { coordinates: [-121.42047318691402, 41.109041898924175], type: "Point" },
    picPath: "/images/burneyFalls.jpeg",
    picName: "Burney Falls",
    creatorId: "5ddd7d374dc60040fa79f29a",
    country: "USA",
    province: "California",
    city: "Burney Falls",
  },
  {
    location: { coordinates: [-73.93893632167965, 40.65427185321438], type: "Point" },
    picPath: "/images/ChinatownNY.jpg",
    picName: "China Town NY",
    creatorId: "5ddd7d374dc60040fa79f29a",
    country: "USA",
    province: "New York",
    city: "New York",
  },

  {
    location: { coordinates: [-104.87643632167965, 38.26264828874974], type: "Point" },
    picPath: "/images/colorado.jpeg",
    picName: "Colorado Canyon",
    creatorId: "5ddd7d374dc60040fa79f29a",
    country: "USA",
    province: "Colorado",
    city: "Cañon City",
  },
  {
    location: { coordinates: [135.78386387499995, 34.55594705439137], type: "Point" },
    picPath: "/images/kyoto.jpeg",
    picName: "Kyoto Views",
    creatorId: "5ddd7d374dc60040fa79f29a",
    country: "Japan",
    province: "Kyoto",
    city: "Ichijoji",
  },
  {
    location: { coordinates: [19.416676374999952, -31.095681937957718], type: "Point" },
    picPath: "/images/lavander.jpg",
    picName: "Lavander Fields",
    creatorId: "5ddd7d374dc60040fa79f29a",
    country: "South Africa",
    province: "Franschhoek",
    city: "Franschhoek",
  },
  {
    location: { coordinates: [-0.3587142500000482, 51.58701670440745], type: "Point" },
    picPath: "/images/london.jpeg",
    picName: "London Street",
    creatorId: "5ddd7d374dc60040fa79f29a",
    country: "United Kingdom",
    province: "England",
    city: "London",
  },
  {
    location: { coordinates: [-123.05402675000005, 44.61750842888611], type: "Point" },
    picPath: "/images/portland.jpg",
    picName: "Portland Views",
    creatorId: "5ddd7d374dc60040fa79f29a",
    country: "USA",
    province: "Oregon",
    city: "Portland",
  },
  {
    location: { coordinates: [113.54753574999995, 23.03380859595198], type: "Point" },
    picPath: "/images/rainbowStairsJeremy.jpeg",
    picName: "Rainbow Stairs",
    creatorId: "5ddd7d374dc60040fa79f29a",
    country: "Hong Kong",
    province: "Hong Kong",
    city: "Hong Kong Island",
  },
  {
    location: { coordinates: [76.72136387499995, 9.990503791515824], type: "Point" },
    picPath: "/images/rammakal.jpg",
    picName: "Rammakal Views",
    creatorId: "5ddd7d374dc60040fa79f29a",
    country: "India",
    province: "Kerala",
    city: "Ramakkalmedu",
  },
  {
    location: { coordinates: [128.66472324999995, 35.84860488417732], type: "Point" },
    picPath: "/images/southKorea.jpeg",
    picName: "Busan Views",
    creatorId: "5ddd7d374dc60040fa79f29a",
    country: "South Korea",
    province: "South Korea",
    city: "Busan",
  },
]
Picture.deleteMany()
Picture.create(pictures)
  .then(allPictures => console.log(`Se han cargado ${allPictures.length} fotos`))
  .then(x => mongoose.connection.close())
  .catch(err => console.log("Error cargando fotos", err))