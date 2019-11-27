function getAllplacesFromTheAPI(myMap) {
  axios.get("/api")
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
    zoom: 4,
    center: {
      lat: 41.3977381,
      lng: 2.190471916
    }
  })
  getAllplacesFromTheAPI(myMap)
}