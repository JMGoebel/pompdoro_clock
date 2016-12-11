var time = 60 * 1; // in seconds;
var transitionEffect = 'stroke-dasharray ' + time + 's linear';
var clockFull = document.getElementById('clockFull');
var clockEmpty = document.getElementById('clockEmpty');
var emptyBarColor = 'darkcyan';
var timerDisplay = document.getElementById('displayTimer');
var timeRemaining;
var timer;

function start () {
  clockFull.style.transition = transitionEffect;
  clockFull.style.strokeDasharray = '0 628';

  clockEmpty.style.transition = transitionEffect;
  clockEmpty.style.strokeDasharray = '628 628';

  // Updates timer every second
  timer = setInterval(tickTock, 1000);
}

// displays time, undates everysecond
function tickTock() {
  timeDisplay();
}

function timeDisplay () {
  var min = parseInt(timeRemaining / 60);
  var sec = timeRemaining % 60;

  if (min < 10){
    min = '0' + min;
  }
  if (sec < 10){
    sec = '0' + sec;
  }

  timeRemaining -= 1;

  if (timeRemaining < 0){
    clearInterval(timer);
  }

  timerDisplay.textContent = min+":"+sec;
}

function pause () {
  // store current time remaining
  // clear interval
  // start for setinterval and send in time remaning
}


// Initialize is called at load and on reseting the timer
function init () {
  clockFull.style.transition = "none";
  clockFull.style.strokeDasharray = '628 0';
  clockEmpty.style.transition = "none";
  clockEmpty.style.strokeDasharray = '0 628';
  clockEmpty.style.stroke = emptyBarColor;
  timeRemaining = time;
  clearInterval(timer);
  timeDisplay();
}

//clock[1].addEventListener("transitionend", function(){
//  alert("complete");
//}, false);

init();



