// Variables
var workingMinutes = document.getElementById("work-time").value;
var pauseMinutes1 = document.getElementById("pause-time1").value;
var pauseMinutes2 = document.getElementById("pause-time2").value;
var totalSessions = document.getElementById("sessions").value;
var pause2Sessions = document.getElementById("pause-sessions").value.split(",");
var autoplay1 = document.getElementById("autoplay1");
var autoplay2 = document.getElementById("autoplay2");
var ringtone = document.getElementById("ringtone").value;
var volume = document.getElementById("volume").value;


const sessionCounter = document.getElementById("session_counter");
const countdownEl = document.getElementById("countdown");
const start = document.getElementById("start");
const pause = document.getElementById("pause");
const skip = document.getElementById("skip");
const reset = document.getElementById("reset");
const focusHeader = document.getElementById("focus_header");
const progression = document.getElementById("progression");
const start_b = document.getElementById("button_1_start");
const pause_b = document.getElementById("button_1_pause");
const ringtoneEl = document.getElementById("ringtone");
const volumeEl = document.getElementById("volume");
const volumeFieldEl = document.getElementById("volume_field");




var currentSession = 0;
var sessionStatus = 1;
let time = 0
var endDate = 0;
var timeDiff = 0;
var startingMinutes;
var clearIntervalId;
var audio;
var vol = 0.5

//Timer
window.onload = function() {
    updateVariables();
    updateInterface();
}

start.addEventListener("click", () => {
    buttonPause()

    if (time > 0)  {
        endDate = Date.now() + time
        counter()
        clearIntervalId = setInterval(counter, 10);
    } else {
        endDate = Date.now() + Math.abs(startingMinutes) * 60000;
        timeDiff = endDate - Date.now()
        counter()
        clearIntervalId = setInterval(counter, 10);
    }
    
})

pause.addEventListener("click", () => {
    buttonPlay()
    clearInterval(clearIntervalId);
})

skip.addEventListener("click", () => {
    time = 0
    clearInterval(clearIntervalId);

    updateVariables()
    updateInterface()
    startNextSession()
})

reset.addEventListener("click", () => {
    time = 0;
    currentSession = 0;
    sessionStatus = 1;
    clearInterval(clearIntervalId);

    updateProgression()
    updateVariables()
    updateInterface()
    title.innerHTML = "Focus Timer"
})

ringtoneEl.addEventListener("change", () => {
    setRingtone()
    audio.volume = vol
    audio.play()
})

volumeEl.addEventListener("input", () => {
    updateVolume()
})

volumeEl.addEventListener("change", () => {
    audio.volume =vol
    audio.play()
})





//Functions
function updateVariables () {
    workingMinutes = document.getElementById("work-time").value;
    pauseMinutes1 = document.getElementById("pause-time1").value;
    pauseMinutes2 = document.getElementById("pause-time2").value;
    totalSessions = document.getElementById("sessions").value;
    pause2Sessions = document.getElementById("pause-sessions").value.split(",");
    autoplay1 = document.getElementById("autoplay1");
    autoplay2 = document.getElementById("autoplay2");

    ringtone = document.getElementById("ringtone").value
    updateVolume()
    setRingtone()

    nextSession()
}

function updateInterface() { 
    session_counter.innerHTML = `${Math.floor(currentSession)}/${totalSessions}`;
    countdownEl.innerHTML = `${startingMinutes}:00`
}

function updateProgression() {
    var sTime = String(time / timeDiff * 315);
    progression.style.strokeDasharray = sTime + " 315";
}

function updateVolume() {
    volume = document.getElementById("volume").value;
    volumeFieldEl.innerHTML = `${volume}`
    vol = volume * 0.01
}


function counter() {
    time = endDate - Date.now()
    var minutes = Math.floor(time / 60000);
    let seconds = time % 60000;
    seconds = Math.floor(seconds/1000)

    seconds = seconds < 10 ? "0" + seconds : seconds;
    
    countdownEl.innerHTML = `${minutes}:${seconds}`;
    title.innerHTML = `${minutes}:${seconds}  - ${focus_header.innerHTML}`;
    
   updateProgression()

   console.log(time)
    if (time <= 100) {
        audio.volume = vol
        audio.play()

        time = 0
        updateProgression()

        clearInterval(clearIntervalId);
        
        updateVariables()
        updateInterface()
        startNextSession()
    }
}

function nextSession() {

    if (sessionStatus == 1) {
        startingMinutes = workingMinutes;
        currentSession++;
        sessionStatus = 0;
        focus_header.innerHTML = `WORK!`;
        focusHeader.style.fontSize = "50px"
        title.innerHTML = `${startingMinutes}:00  - ${focus_header.innerHTML}`;

    } else if (sessionStatus == 0 && pause2Sessions.indexOf(String(currentSession)) > -1) {
        startingMinutes = pauseMinutes2;
        sessionStatus = 1;
        focus_header.innerHTML = `LONG<br>PAUSE!`;
        focusHeader.style.fontSize = "30px"
        title.innerHTML = `${startingMinutes}:00  - ${focus_header.innerHTML}`;

    } else {
        startingMinutes = pauseMinutes1;
        sessionStatus = 1;
        focus_header.innerHTML = `PAUSE!`;
        focusHeader.style.fontSize = "50px"
        title.innerHTML = `${startingMinutes}:00  - ${focus_header.innerHTML}`;
    }
}

function startNextSession() {
    if ((sessionStatus == 1) && (autoplay2.checked)) {
        buttonPause()
        endDate = Date.now() + Math.abs(startingMinutes) * 60000;
        timeDiff = endDate - Date.now()
        counter()
        clearIntervalId = setInterval(counter, 10);
        return

    } else if ((sessionStatus == 0) && (autoplay1.checked)) {
        buttonPause()
        endDate = Date.now() + Math.abs(startingMinutes) * 60000;
        timeDiff = endDate - Date.now()
        counter()
        clearIntervalId = setInterval(counter, 10);
        return

    } else {
        updateProgression()
        buttonPlay()
        return
    }
}

function setRingtone() {
    ringtone = document.getElementById("ringtone").value
    if(ringtone == "ringtone1"){
        audio = new Audio('/sounds/old-phone-bell.mp3')
    }else if(ringtone == "ringtone2"){
        audio = new Audio('/sounds/beep_beep.mp3')
    }else if(ringtone == "ringtone3"){
        audio = new Audio('/sounds/notification_sound.mp3')
    }

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


module.exports = {
    updateInterface,
    updateVariables
}