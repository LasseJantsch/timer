    import { useEffect, useState } from "react"
    import { useGlobalContext } from "../context/GlobalContext"

    const timerData = {
        work: "50",
        pause: "10",
        long_pause: "30",
        sessions: "10",
        long_pause_sessions: "4,8",
        auto_w: false,
        auto_p: false,
        ringtone: "ringtone1",
        volume: "20",
    }
     
    export let time = 0
    let endDate = 0
    let intervallId = 0

    export let sessionCount = 1  


    //Timer Funktion

    const counter = () => {
        time = endDate-Date.now()
        console.log(time)
        if (time <100) handleNextSession()
    }
 

    //Hilfsfunktionen

    export const setSessionTime = () => {
        if (sessionCount== undefined) return
        if (sessionCount/2 !== Math.floor(sessionCount/2)) return time = timerData.work * 60000
        else return timerData.long_pause_sessions.split(",").includes(Math.floor(sessionCount /2 + 0.5).toString())?
            time = timerData.long_pause * 60000:
            time = timerData.pause * 60000
    }


    // handle Actions

    export const handleNextSession = () => {
        sessionCount = sessionCount + 1
        clearInterval(intervallId)
        setSessionTime()
    }

    export const handleReset = () => {
        sessionCount = 1
        clearInterval(intervallId)
        setSessionTime()
    }

    export const handlePlay = () => {
        endDate = Date.now() + time
        intervallId = setInterval(counter, 100)
    }

    export const handlePause = () => {
        clearInterval(intervallId)
    }

    


    // useEffect(() => {
    //     endDate== null? console.log(null): 
    //         setClrInterval(setInterval(counter, 1000))
    // },[endDate])


    // //Checks if pause Session is Long-Pause
    // const checkForLongPause = () => {
    //     const LPSessions = timerData.long_pause_sessions.split(",")
    //     return LPSessions.includes(sessionCount)
    // }

    // //handles Play Press -> checks if resume or play
    // const handlePlay = () => {
    //     setTimerStatus(true)
    //     currentTime != 0?
    //         setEndDate( Date.now() + sessionTime):
    //         setEndDate(Date.now() + currentTime)
    // }

    // const handlePause = () => {
    //     clearInterval(clrInterval)
    //     setTimerStatus(false)
    // }

    // //counter function
    // const counter = () => {
    //     // currentTime < 100? 
    //     //     //nextSession()
    //     //     console.log("nextSession"):        
    //         setCurrenTime(endDate - Date.now())
    // }
        // //handles next Session action
    // const nextSession = () => {
    //     clearInterval(clrInterval)
    //     if (!sessionStatus) {
    //         setSessionCount(prevState => prevState +1)
    //     }
    //     setEndDate(0)
    //     setCurrenTime(0)
    //     setSessionStatus(prevState => !prevState)
    // }