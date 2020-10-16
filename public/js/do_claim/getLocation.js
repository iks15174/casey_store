function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pin =  new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude);
      map.setCenter(pin);
      searchDetailAddrFromCoords(pin);
    }, function(error) {
      alert(error.code);
      alert(error.message);
    }, {
      enableHighAccuracy: false,
      maximumAge: 10000,
      timeout: Infinity
    });
  } else {
    alert('You can\'t use GPS');
  }
}
