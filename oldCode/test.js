//Timer
var start = document.getElementById("start");
var pause = document.getElementById("pause");
var countdown = document.getElementById("countdown");
const countdownEl = document.getElementById("countdown");
var progression = document.getElementById("progression");
var background = document.getElementById("background");
var focus_header = document.getElementById("focus_header");
var title = document.getElementById("title");
const start_b = document.getElementById("button_1_start");
const pause_b = document.getElementById("button_1_pause");
const totalSessions = document.getElementById("sessions");
const session_counter = document.getElementById("session_counter")
console.log(typeof(progression));
console.log(progression);
let time = 0;
var timer_status = 0;
var currentSession = 0;


window.onload = function() {
  sessionCounter();
};    

//start timer function
start.addEventListener("click", function() {
  var startingMinutes = document.getElementById("work-time").value;
  Button_1_pause()
              
  //continu if time != 0
  if (timer_status == 0) {
    timer_status = 1;
    focus_header.innerHTML = `FOKUS!`;
    sessionCounter()
    if ((time !== 0) && !(time < 0) ) {
      var clearIntervalId = setInterval(updateCountdown, 10);
    }  else {
      time = startingMinutes * 60;
      if (time < 0) {
        time = Math.abs(time);
      }

      updatProgression()
      var clearIntervalId = setInterval(updateCountdown, 10);
    }
  }
  
  // pause button
  pause.addEventListener("click", function(){
    focus_header.innerHTML = `PAUSE!`;
    title.innerHTML = `${countdown.innerHTML}  - ${focus_header.innerHTML}`
    clearInterval(clearIntervalId);
    timer_status = 0;
    Button_1_play()
    return timer_status;
  })

  // countdown fuction
  function updateCountdown() {

    var minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? "0" + seconds : seconds;
    
    countdownEl.innerHTML = `${minutes}:${seconds}`;
    title.innerHTML = `${minutes}:${seconds}  - ${focus_header.innerHTML}`;
    updatProgression()
    time--;        
    if (time < 0) {
      nextSession()
    }
    
  }

 

  //Change Button function
  function Button_1_pause() {
    start_b.style.transform = "scale(0)"
    start_b.style.position = "absolute"
    pause_b.style.transform = "scale(1)"
    pause_b.style.position = "relative"
  }

  function Button_1_play() {
    pause_b.style.transform = "scale(0)"
    pause_b.style.position = "absolute"
    start_b.style.transform = "scale(1)"
    start_b.style.position = "relative"
  }

  //progression function
  function updatProgression(){
    var sTime = String(time / startingMinutes / 60 * 315 );
    progression.style.strokeDasharray = sTime + " 315";
  }

  //reset button
  reset.addEventListener("click", function(){
    time = 0
    updatProgression()
    clearInterval(clearIntervalId);
    title.innerHTML = "Focus Timer"
    focus_header.innerHTML = `LETS GO!`;
    countdownEl.innerHTML = `0:00`;
    timer_status = 0;
    background.style.fill = "#6DC0D5";
    Button_1_play()
    return timer_status;
  })
})

//Set Session counter function
function sessionCounter() { 
  console.log(currentSession)
  console.log(totalSessions.value)
  session_counter.innerHTML = `${Math.floor(currentSession)}/${totalSessions.value}`
}
 

//Next Session function
function nextSession() {
  currentSession ++;
  if(currentSession % 2 == 0){
    time
  }
  
  

}