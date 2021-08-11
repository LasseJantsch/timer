// Variables
const workingMinutes = document.getElementById("work-time").value;
const pauseMinutes1 = document.getElementById("pause-time1").value;
const pauseMinutes2 = document.getElementById("pause-time2").value;
const totalSessions = document.getElementById("sessions").value;
const pause2Sessions = document.getElementById("pause-sessions").value.split(".");
const autoplay1 = document.getElementById("autoplay1");
const autoplay2 = document.getElementById("autoplay2");

const sessionCounter = document.getElementById("session_counter")
const countdownEl = document.getElementById("countdown");
const start = document.getElementById("start");
const pause = document.getElementById("pause");
const skip = document.getElementById("skip");
const reset = document.getElementById("reset");
const focusHeader = document.getElementById("focus_header");
const progression = document.getElementById("progression");
const start_b = document.getElementById("button_1_start");
const pause_b = document.getElementById("button_1_pause");


var currentSession = 0;
var sessionStatus = 1;
let time = 0
var startingMinutes;




window.onload = function() {
    updateInterface()
}

start.addEventListener("click", function startCounter (){
    var workingMinutes = document.getElementById("work-time").value;
    var pauseMinutes1 = document.getElementById("pause-time1").value;
    var pauseMinutes2 = document.getElementById("pause-time2").value;
    var totalSessions = document.getElementById("sessions").value;
    var pause2Sessions = document.getElementById("pause-sessions").value.split(",");
    var autoplay1 = document.getElementById("autoplay1");
    var autoplay2 = document.getElementById("autoplay2");
    buttonPause()
    console.log(sessionStatus)
    
    if (time > 0)  {
        var clearIntervalId = setInterval(counter, 10);
    } else {
        if (sessionStatus == 1) {
            sessionStatus = 0;
            currentSession++;
            session_counter.innerHTML = `${Math.floor(currentSession)}/${totalSessions}`
            focus_header.innerHTML = `FOKUS!`;
            startingMinutes = workingMinutes;
            console.log(startingMinutes)
            time = Math.abs(workingMinutes) * 60;
            var clearIntervalId = setInterval(counter, 10);

        } else if (sessionStatus == 0 && pause2Sessions.indexOf(String(currentSession)) > -1) {
            console.log("Long")
            sessionStatus = 1;
            focus_header.innerHTML = `LONG PAUSE!`;
            startingMinutes = pauseMinutes2;
            time = Math.abs(pauseMinutes2) * 60;
            var clearIntervalId = setInterval(counter, 10);

        } else {
            console.log("short")
            sessionStatus = 1
            focus_header.innerHTML = `PAUSE!`;
            var startingMinutes = pauseMinutes1;
            time = Math.abs(pauseMinutes1) * 60;
            var clearIntervalId = setInterval(counter, 10);
        }
    }

    function updatProgression(){
        var sTime = String(time / startingMinutes / 60 * 315 );
        progression.style.strokeDasharray = sTime + " 315";
    }

    function counter() {
        var minutes = Math.floor(time / 60);
        let seconds = time % 60;
    
        seconds = seconds < 10 ? "0" + seconds : seconds;
        
        countdownEl.innerHTML = `${minutes}:${seconds}`;
        title.innerHTML = `${minutes}:${seconds}  - ${focus_header.innerHTML}`;
        
       updatProgression()
    
        time--;
        if (time < 0) {
            clearInterval(clearIntervalId);
            nextSession() 
        }
    }

    function nextSession() {
        if ((sessionStatus == 1) && (autoplay1.checked)) {
            startCounter()
            return
        } else if ((sessionStatus == 0) && (autoplay2.checked)) {
            startCounter()
            return
        } else {
            buttonPlay()
            return
        }
    }

    pause.addEventListener("click", () => {
        clearInterval(clearIntervalId);
        buttonPlay()
    })

    reset.addEventListener("click", () => {
        time = 0
        currentSession = 0
        sessionStatus = 1

        updatProgression()
        session_counter.innerHTML = `${Math.floor(currentSession)}/${totalSessions}`;
        
        clearInterval(clearIntervalId);
        title.innerHTML = "Focus Timer"
        focus_header.innerHTML = `LETS GO!`;
        countdownEl.innerHTML = `${workingMinutes}:00`;
        background.style.fill = "#6DC0D5";
        buttonPlay()
    })

    skip.addEventListener("click", () => {
        time = 0
        updatProgression()
        
        clearInterval(clearIntervalId);
        countdownEl.innerHTML = `0:00`;
        nextSession()
    })
      
})



// Functions


function updateInterface() { 
    session_counter.innerHTML = `${Math.floor(currentSession)}/${totalSessions}`;
    countdownEl.innerHTML = `${workingMinutes}:00`
}


function buttonPause() {
    start_b.style.transform = "scale(0)"
    start_b.style.position = "absolute"
    pause_b.style.transform = "scale(1)"
    pause_b.style.position = "relative"
}

function buttonPlay() {
    pause_b.style.transform = "scale(0)"
    pause_b.style.position = "absolute"
    start_b.style.transform = "scale(1)"
    start_b.style.position = "relative"
}


