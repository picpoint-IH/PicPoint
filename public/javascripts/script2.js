var marker;
var coords = {};

initMap = function () {
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
        document.getElementById("lng").value = this.getPosition().lng();
    });
}

function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}