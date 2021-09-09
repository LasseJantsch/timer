import React, {createContext, useContext, useState, useEffect, useRef} from "react"
import { useGlobalContext } from "./GlobalContext"


const TimerContext = createContext()

export const TimerContextProvider = props => {

//===========================CLietSide==============================

    const progressionEl = useRef();

    const [displaySessions, setdisplaySessions] = useState()            //Session number shown in client
    const [displayTime, setDisplayTime] = useState()                    //time shown in client

    const [sessionStatus, setSessionStatus] = useState()                //status of current Session (work/pause )
    const [timerStatus, setTimerStatus] = useState(false)               //status of play/pause button

    const {timerData} = useGlobalContext()

    //<server
        const [time, setTime] = useState()
        const [sessionTime, setSessionTime] = useState()
        const [endDate, setEndDate] = useState(0)
        const [intervallID, setIntervallID] = useState()

        const [sessionCount, setSessionCount] = useState(0)
    //server>


//Test


//Functions

    // sets SessionTime on page load
    useEffect(() => {
        handleSessionTime()
    },[])

    useEffect(() => {
        if (endDate===0) return
        setIntervallID(setInterval(counter, 1000))
    }, [endDate])

    useEffect(()=> {
        if(sessionTime===0)return
        setTime(sessionTime)
        if(sessionCount!==0) {
            if (sessionCount/2 === Math.floor(sessionCount/2)&& timerData.auto_w ) return handlePlay()
            if( timerData.auto_p ) return handlePlay()
        }
    },[sessionTime])

    // updates display time, when time updates
    useEffect(()=> {
        updateTime()
        updateProgression()
        if (time <500) handleNextSession()
    }, [time])

    const updateTime = () => {
        const minutes = Math.floor(time / 60000);
        const seconds = ((time % 60000) / 1000).toFixed(0);
        setDisplayTime(minutes + ":" + (seconds < 10 ? '0' : '') + seconds)
    }

    const updateProgression = () =>{
        const progression = String(time / sessionTime * 315)
        progressionEl.current.style.strokeDasharray = `${progression} 315`
    }
    
    // updates display sessions, when session Count changes
    useEffect(() => {
        if (sessionCount===undefined) return
        setdisplaySessions(Math.floor(sessionCount / 2 + 0.5))
        sessionCount/2 !== Math.floor(sessionCount / 2)? setSessionStatus(true): setSessionStatus(false)
    }, [sessionCount])

    // handles button press in client
    const handleButtons = async (event) => {
        const button = event.target.id
        if (button == null) return
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

    console.log(time)


//Functions

    //counter function
    const counter = () => {
        setTime(endDate-Date.now())
    }

    //setsSessionTime according to current session
    const handleSessionTime = () => {
        if (sessionCount===undefined) return console.log("return")
        if (sessionCount/2 === Math.floor(sessionCount/2)) return (setSessionTime(timerData.work * 60000))
        else return timerData.long_pause_sessions.split(",").includes(Math.floor(sessionCount /2 + 0.5).toString())?
            setSessionTime(timerData.long_pause * 60000):
            setSessionTime(timerData.pause * 60000)
    }    

    //handles next Session 
    const handleNextSession = () => {
        setSessionCount(prevState => prevState + 1)
        setTimerStatus(false)
        clearInterval(intervallID)
        handleSessionTime()
    }

    //handles reset
    const handleReset = () => {
        setSessionCount(0)
        clearInterval(intervallID)
        handleSessionTime()
    }

    //handles play
    const handlePlay = async () => {
        if(time==null) return 
        if(sessionCount === 0) setSessionCount(1)
        setEndDate(Date.now() + time)
    }

    //handles pause
    const handlePause = () => {
        clearInterval(intervallID)
    }



    return(
        <TimerContext.Provider value={{
            progressionEl,
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