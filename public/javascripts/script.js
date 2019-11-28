function getAllplacesFromTheAPI(myMap) {
  axios.get("/auth/api")
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
      lat: 41.3977381,
      lng: 2.190471916
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
  getAllplacesFromTheAPI(myMap)
}