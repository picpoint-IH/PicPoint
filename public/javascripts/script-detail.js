function getAllplacesFromTheAPI(myMap) {
  axios.get("/post/api")
    .then(response => postspoint([response.data], myMap))
    .catch(error => console.log(error))
}


function postspoint(post, myMap) {
  const center = {
    lat: post[0].location.coordinates[1],
    lng: post[0].location.coordinates[0]
  }

  new google.maps.Marker({
    position: center,
    map: myMap,
    title: elm.picName
  });

  myMap.zoom = 10
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
  console.log(myMap)
}