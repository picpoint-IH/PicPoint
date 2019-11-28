function getAllplacesFromTheAPI(myMap) {
  axios.get("/visit/api")
    .then(response => postspoint(response.data.post, myMap))
    .catch(error => console.log(error))
}

function postspoint(post, myMap) {
  post.forEach(elm => {
    const center = {
      lat: elm.location.coordinates[1],
      lng: elm.location.coordinates[0]
    }
    new google.maps.Marker({
      position: center,
      map: myMap,
      title: elm.picName
    });
  })
}

function initMap() {
  const myMap = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: {
      lat: 30,
      lng: 0
    }
  })
  getAllplacesFromTheAPI(myMap)
}