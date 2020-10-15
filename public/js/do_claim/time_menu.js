var icon_down = document.getElementById('down_icon');
var icon_up = document.getElementById('up_icon');
var width = window.innerWidth;
var formrow1 = document.getElementById('form-row1');
var formrow2 = document.getElementById('form-row2');
var formrow3 = document.getElementById('form-row3');
if(width < 576){
  icon_down.style.display = 'none';
  icon_up.style.display = 'inline';
}
else{
  icon_down.style.display = 'none';
  icon_up.style.display = 'none';
}
window.addEventListener('resize', function() {
  width = window.innerWidth;
  if(width < 576){
    icon_down.style.display = 'none';
    icon_up.style.display = 'inline';
  }
  else{
    icon_down.style.display = 'none';
    icon_up.style.display = 'none';
    formrow1.style.display = null;
    formrow2.style.display = null;
    formrow3.style.display = null;
  }
}, true);

icon_down.addEventListener('click', function(){
  formrow2.style.display = null;
  formrow3.style.display = null;
  icon_up.style.display = null;
  icon_down.style.display = 'none';
});
icon_up.addEventListener('click', function(){
  formrow2.style.display = 'none';
  formrow3.style.display = 'none';
  icon_down.style.display = null;
  icon_up.style.display = 'none';
});

//button for unfold page

var mon = document.getElementById('mon');
var tue = document.getElementById('tue');
var wen = document.getElementById('wen');
var thu = document.getElementById('thu');
var fri = document.getElementById('fri');
var sat = document.getElementById('sat');
var sun = document.getElementById('sun');

mon.oninput = function(){
  tue.value = mon.value;
  wen.value = mon.value;
  thu.value = mon.value;
  fri.value = mon.value;
  sat.value = mon.value;
  sun.value = mon.value;
}
