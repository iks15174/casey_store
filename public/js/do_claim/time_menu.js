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
  formrow1.style.display = null;
  formrow2.style.display = null;
  formrow3.style.display = null;
  icon_up.style.display = null;
});
icon_up.addEventListener('click', function(){
  formrow1.style.display = 'none';
  formrow2.style.display = 'none';
  formrow3.style.display = 'none';
  icon_down.style.display = 'block';
});
