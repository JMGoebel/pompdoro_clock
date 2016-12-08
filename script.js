var time = 60 * .25; // in seconds;
var transitionEffect = 'stroke-dasharray ' + time + 's linear';
var clockFull = document.getElementById('clockFull');
var clockEmpty = document.getElementById('clockEmpty');
var fullBarColor = '';
var emptyBarColor = '#555';

function start () {
  clockFull.style.transition = transitionEffect;
  clockFull.style.strokeDasharray = '0 628';

  clockEmpty.style.transition = transitionEffect;
  clockEmpty.style.strokeDasharray = '628 628';
}

function sets (a,b,c) {
  clock[0].style.strokeDasharray = a + ' ' + b;
}

function clear () {
  clockFull.style.transition = "none";
  clockFull.style.strokeDasharray = '628 0';
  clockFull.style.stroke = fullBarColor;
  clockEmpty.style.transition = "none";
  clockEmpty.style.strokeDasharray = '0 628';
  clockEmpty.style.stroke = emptyBarColor;
}

//clock[1].addEventListener("transitionend", function(){
//  alert("complete");
//}, false);

clear();

