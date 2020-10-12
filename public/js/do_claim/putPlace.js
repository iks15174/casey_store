function putPlace() {
  var addr = '';
  var road = '';
  if(document.getElementById('road')) {
    road = document.getElementById('road').innerHTML;
  }
  var ground = document.getElementById('ground').innerHTML;
  addr = addr + ground;
  if(road !== ''){
    addr = addr + ' ' + road;
  }
  document.getElementById('place').value = addr;
}
