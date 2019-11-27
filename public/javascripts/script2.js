var marker;
var coords = {};

initMap = function () {
    initialize()
    navigator.geolocation.getCurrentPosition(
        function (position) {
            coords = {
                lng: position.coords.longitude,
                lat: position.coords.latitude
            };
            setMapa(coords);
        },
        function (error) {
            console.log(error);
        });
}

function setMapa(coords) {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: new google.maps.LatLng(coords.lat, coords.lng),

    });

    marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(coords.lat, coords.lng),
    });

    marker.addListener('click', toggleBounce);
    marker.addListener('dragend', function (event) {
        document.getElementById("lat").value = this.getPosition().lat()
        document.getElementById("lng").value = this.getPosition().lng()

        let latlng = new google.maps.LatLng(this.getPosition().lat(), this.getPosition().lng());
        //console.log(geocoder)
        geocoder.geocode({
            'latLng': latlng
        }, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results) {
                    document.getElementById("country").value = results[results.length - 1].address_components[0].long_name
                    document.getElementById("province").value = results[results.length - 2].address_components[0].long_name
                    document.getElementById("city").value = results[results.length - 3].address_components[0].long_name
                } else {
                    alert('No results found');
                }
            } else {
                alert('Geocoder failed due to: ' + status);
            }
        });
    });

}

function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

let geocoder;

function initialize() {
    geocoder = new google.maps.Geocoder();
}