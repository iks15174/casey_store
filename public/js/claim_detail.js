function sendDelete(event, id){
  event.preventDefault();
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      var status = JSON.parse(this.responseText);
      if(!status.logined){
        document.location.href = `/login/login/?previous=/claim/detail/${id}`;
      }
      else{
        document.location.href = "/claim/list";
      }
    }
  }
  xhttp.open("DELETE", `/admin/claim/delete/${id}`, true);
  xhttp.send();
}
