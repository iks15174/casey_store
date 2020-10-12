function LoadSearchResult(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      var str = "";
      for(var i = 0; i < data.length ; i++){
        str = str + `<tr onclick="window.location='/claim/detail/${data[i].id}'">
          <td>${data[i].id}</td>
          <td>${data[i].title}</td>
          <td>${data[i].created}</td>
        </tr>`
      }
      document.getElementById("list-group").innerHTML = str;
    }
  }
  var select = document.getElementById("claim_list").value;
  xhttp.open("GET", `/search_list?name=${select}`);
  xhttp.send();
}
