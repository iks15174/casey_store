var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 1 // 지도의 확대 레벨
    };

// 지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);

// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();

var marker = new kakao.maps.Marker(), // 클릭한 위치를 표시할 마커입니다
    infowindow = new kakao.maps.InfoWindow({zindex:1}); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

var search_place = document.getElementById('search_place');
search_place.addEventListener('click', function(){
  setTimeout(function(){
    map.relayout();
  }, 1000);
})

// 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
    searchDetailAddrFromCoords(mouseEvent.latLng);
});


function searchAddrFromCoords(coords, callback) {
    // 좌표로 행정동 주소 정보를 요청합니다
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
}

function searchDetailAddrFromCoords(coords) {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    var lng = document.getElementById('lng');
    var lat = document.getElementById('lat');
    lng.value = coords.getLng();
    lat.value = coords.getLat();
    geocoder.coord2Address(coords.getLng(), coords.getLat(), function (result, status){
      if (status === kakao.maps.services.Status.OK) {
          var detailAddr = !!result[0].road_address ? '<div id="road">도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
          detailAddr += '<div id="ground">지번 주소 : ' + result[0].address.address_name + '</div>';

          var content = '<div id="bAddr" class="bAddr" style="padding:5px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">' + detailAddr + '</div>';

          // 마커를 클릭한 위치에 표시합니다
          marker.setPosition(coords);
          marker.setMap(map);

          // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
          infowindow.setContent(content);
          infowindow.open(map, marker);
        }
      });
}
