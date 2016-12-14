var time;
var emptyBarColor = 'darkcyan';
var clockFull = document.getElementById('clockFull');
var clockEmpty = document.getElementById('clockEmpty');
var timerDisplay = document.getElementById('displayTimer');
var slideBar = document.getElementById('slideBar');
var slider = document.getElementById('slider');
var innerCircle = document.getElementById('innerCircle');
var clockText = document.getElementById('clockText');
var startPos = 0;
var sliderStartPosition = 0;
var sliderCurPosition = 0;
var timeRemaining;
var timer;
var state; // 0-setup, 1-running, 2-end

function start () {
  var transitionEffect = 'stroke-dasharray ' + (time + 1) + 's linear'; // added 1 to offest
  clockFull.style.transition = transitionEffect;
  clockFull.style.strokeDasharray = '0 628';

  clockEmpty.style.transition = transitionEffect;
  clockEmpty.style.strokeDasharray = '628 628';

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

// slider functionality
function startMove () {
  startPos = event.clientX;
  sliderCurPosition = (event.clientX - startPos) + sliderStartPosition;
  document.addEventListener('mousemove', moveSlider, false);
}

function stopMove () {
  document.removeEventListener('mousemove', moveSlider, false);
  sliderStartPosition = sliderCurPosition;
  time = timeRemaining;
}

function moveSlider () {
  if(sliderCurPosition >= 0 && sliderCurPosition <= 234){ // only move if in range
    slider.style.left = sliderCurPosition;
    sliderCurPosition = parseInt(((event.clientX - startPos) + sliderStartPosition) / 6 ) * 6 ;  // causes changes in increments of 6 allowing 40 min of time

    if (sliderCurPosition < 0){ // stop from locking is range exceded
      sliderCurPosition = 0;
    } else if (sliderCurPosition > 234){  // stop from locking is range exceded
      sliderCurPosition = 234;
    }
    timeRemaining = ((sliderCurPosition / 6)+1) * 60;
    timeDisplay();
  }
}

function actionButton () {
  if(state === 0){
    state = 1;
    clockText.textContent = "Click to Reset";
    start();
    slider.removeEventListener('mousedown', startMove, false);
    slideBar.style.opacity = "0.3";
  } else if (state === 1){
    init();
    slideBar.style.opacity = "1";
  }
}


// Initialize is called at load and on reseting the timer
function init () {
  state = 0;
  time = 60 * 20; // default to 20min

  // event listeners
  slider.addEventListener('mousedown', startMove, false);
  document.addEventListener('mouseup', stopMove, false);
  innerCircle.addEventListener('click', actionButton, false);

  // Prepping clock
  innerCircle.style.backgroundColor = "black";
  clockFull.style.transition = "none";
  clockFull.style.strokeDasharray = '628 0';
  clockEmpty.style.transition = "none";
  clockEmpty.style.strokeDasharray = '0 628';
  clockEmpty.style.stroke = emptyBarColor;
  timeRemaining = time;
  clearInterval(timer);
  timeDisplay();
  clockText.textContent = "Click to Start";

  //Set slider position on load
  sliderStartPosition = ((time/60) * 6) - 1 ;
  slider.style.left = sliderStartPosition;
}

// Actions to take when time is up
clockFull.addEventListener("transitionend", function(){
  innerCircle.style.transition = "1s";
  innerCircle.style.backgroundColor = "darkred";
  slideBar.style.opacity = "1";
  clockText.textContent = "Click to Reset";
}, false);

init();




