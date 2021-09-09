import React, {createContext, useContext, useState, useEffect} from "react"
import { useGlobalContext } from "./GlobalContext"


const TimerContext = createContext()

export const TimerContextProvider = props => {

//===========================CLietSide==============================

    const [displaySessions, setdisplaySessions] = useState()            //Session number shown in client
    const [displayTime, setDisplayTime] = useState()                    //time shown in client

    const [sessionStatus, setSessionStatus] = useState()                //status of current Session (work/pause )
    const [timerStatus, setTimerStatus] = useState(false)               //status of play/pause button

    const {timerData} = useGlobalContext()

    //<server
        const [time, setTime] = useState()
        const [endDate, setEndDate] = useState()
        const [intervallID, setIntervallID] = useState()

        const [sessionCount, setSessionCount] = useState(1)
    //server>


//Test


//Functions

    // sets SessionTime on page load
    useEffect(() => {
        setSessionTime()
    },[])

    // updates display time, when time updates
    useEffect(()=> {
        const minutes = Math.floor(time / 60000);
        const seconds = ((time % 60000) / 1000).toFixed(0);
        setDisplayTime(minutes + ":" + (seconds < 10 ? '0' : '') + seconds)
    }, [time])
    
    // updates display sessions, when session Count changes
    useEffect(() => {
        if (sessionCount==undefined) return
        setdisplaySessions(Math.floor(sessionCount / 2 + 0.5))
        sessionCount/2 !== Math.floor(sessionCount / 2)? setSessionStatus(true): setSessionStatus(false)
    }, [sessionCount])

    // handles button press in client
    const handleButtons = async (event) => {
        const button = event.target.id
        if (button == 0) return
        if (button === "play") {
            setTimerStatus(true)
            return handlePlay()}
        setTimerStatus(false)
        if (button === "pause") return handlePause()
        if (button === "skip") return handleNextSession()
        if (button=== "reset") return handleReset()
    }

//===========================ServerSide==============================
    	

//Test

    console.log({time:time})
    console.log({endDate:endDate})

//Functions

    //counter function
    const counter = () => {
        setTime(endDate-Date.now())
        // if (time <100) handleNextSession()
    }

    //setsSessionTime according to current session
    const setSessionTime = () => {
        if (sessionCount== undefined) return console.log("return")
        if (sessionCount/2 !== Math.floor(sessionCount/2)) return (setTime(timerData.work * 60000))
        else return timerData.long_pause_sessions.split(",").includes(Math.floor(sessionCount /2 + 0.5).toString())?
            setTime(timerData.long_pause * 60000):
            setTime(timerData.pause * 60000)
    }

    //handles next Session 
    const handleNextSession = () => {
        setSessionCount(prevState => prevState + 1)
        clearInterval(intervallID)
        setSessionTime()
    }

    //handles reset
    const handleReset = () => {
        setSessionCount(1)
        clearInterval(intervallID)
        setSessionTime()
    }

    //handles play
    const handlePlay = () => {
        if(time==null) return console.log("Time is 0")
        setEndDate(Date.now() + time)
        setIntervallID(setInterval(counter, 1000))
    }

    //handles pause
    const handlePause = () => {
        clearInterval(intervallID)
    }



    return(
        <TimerContext.Provider value={{
            sessionStatus,
            timerStatus,
            displayTime,
            displaySessions,
            handleButtons,
        }}>
            {props.children}
        </TimerContext.Provider>
    )
}

export const useTimerContext = () => {
    return useContext(TimerContext)
}