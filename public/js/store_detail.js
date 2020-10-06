function sendDelete(event, store){
  event.preventDefault();
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      var status = JSON.parse(this.responseText);
      if(!status.logined){
        document.location.href = `/login/login/?previous=/main/detail/${store}`;
      }
      else{
        document.location.href = "/main";
      }
    }
  }

  xhttp.open("DELETE", `/admin/store/delete/${store}`, true);
  xhttp.send();
}

document.getElementById("store_detail_delete").addEventListener("click", function(){
  var name = document.getElementById("store_detail_delete").getAttribute("data-name");
  sendDelete(event, name);
});
