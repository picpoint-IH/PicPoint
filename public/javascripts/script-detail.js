  axios.get("/post/like/api")
    .then(response => {
      document.getElementById('like').innerHTML = `${response.data.length}`
      console.log(response.data.length)
    })
    
    .catch(error => console.log("Es aqui ", error))

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
    .then(response => {
      data = [response.data]
      myMap = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        center: {
          lat: data[0].location.coordinates[1],
          lng: data[0].location.coordinates[0]
        },
        styles: [
          {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#ff9400"
              }
            ]
          },
          {
            "featureType": "administrative.province",
            "elementType": "all",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
              {
                "saturation": -100
              },
              {
                "lightness": 65
              },
              {
                "visibility": "on"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
              {
                "saturation": -100
              },
              {
                "lightness": 51
              },
              {
                "visibility": "simplified"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
              {
                "saturation": -100
              },
              {
                "visibility": "simplified"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "all",
            "stylers": [
              {
                "saturation": -100
              },
              {
                "lightness": 30
              },
              {
                "visibility": "on"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#ff9400"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "all",
            "stylers": [
              {
                "saturation": -100
              },
              {
                "lightness": 40
              },
              {
                "visibility": "on"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#ff9400"
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
              {
                "saturation": -100
              },
              {
                "visibility": "simplified"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#C0C0C0"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#92998d"
              }
            ]
          }
        ]
      })
    })
    .then(x => postspoint(data, myMap))
    .catch(error => console.log(error))
}