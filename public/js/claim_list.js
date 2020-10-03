function LoadSearchResult(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      var str = "";
      for(var i = 0; i < data.length; i++){
        str = str + `<a class="list-group-item text-center" href="/claim_detail/${data[i].id}">${data[i].title}</a>
        <small>${data[i].created}</small>`
      }
      document.getElementById("list-group").innerHTML = str;
    }
  }
  var select = document.getElementById("claim_list").value;
  xhttp.open("GET", `/search_list?name=${select}`);
  xhttp.send();
}
