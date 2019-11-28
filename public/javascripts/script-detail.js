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
}

let data
let myMap
function initMap() {
  axios.get("/post/api")
  .then(response =>{
    data = [response.data]
      myMap = new google.maps.Map(document.getElementById('map'),{
        zoom: 3,
          center: {
            lat: data[0].location.coordinates[1],
            lng: data[0].location.coordinates[0]
          }
      })
    })
    .then(x => postspoint(data, myMap))
    .catch(error => console.log(error))
}