import React, {createContext, useContext, useState, useEffect} from "react"
import { useGlobalContext } from "./GlobalContext"

const TimerContext = createContext()

export const TimerContextProvider = props => {

    const {timerData} = useGlobalContext()


    const [sessionCount, setSessionCount] = useState("1")            //Number of current Session
    const [sessionStatus, setSessionStatus] = useState(true)         //Work or Pause Status (true -> work Session, false -> pause Session)

    const [displayTime, setDisplayTime] = useState("0:00")
    const [currentTime, setCurrenTime] = useState(0)           //current Time in ms
    const [sessionTime, setSessionTime] = useState(timerData.work)          //Start time of current Session
    const [endDate, setEndDate] = useState()                                //End date of Timer

    const [clrInterval, setClrInterval] = useState()                        //stores IntervalId, to clear Interval

    const [timerStatus, setTimerStatus] = useState(false)                   //timerStatus ( true -> currently in play-mode, false-> currently in pause mode

    console.log(currentTime)
    console.log(endDate)
    console.log(Date.now())


    //update sessionTime depending on sessionStatus and longPauseSessions
    useEffect(() => {
        sessionStatus? 
            setSessionTime(timerData.work * 60000):
            checkForLongPause()? 
                setSessionTime(timerData.long_pause * 60000):
                setSessionTime(timerData.pause * 60000)
    }, [sessionStatus])

    useEffect(()=> {
        const minutes = Math.floor(currentTime / 60000);
        const seconds = ((currentTime % 60000) / 1000).toFixed(0);
        setDisplayTime(minutes + ":" + (seconds < 10 ? '0' : '') + seconds)
    }, [currentTime])

    useEffect(() => {
        endDate== null? console.log(null): 
            setClrInterval(setInterval(counter, 1000))
    },[endDate])


    //Checks if pause Session is Long-Pause
    const checkForLongPause = () => {
        const LPSessions = timerData.long_pause_sessions.split(",")
        return LPSessions.includes(sessionCount)
    }

    //handles Play Press -> checks if resume or play
    const handlePlay = () => {
        setTimerStatus(true)
        currentTime != 0?
            setEndDate( Date.now() + sessionTime):
            setEndDate(Date.now() + currentTime)
    }

    const handlePause = () => {
        clearInterval(clrInterval)
        setTimerStatus(false)
    }

    //counter function
    const counter = () => {
        // currentTime < 100? 
        //     //nextSession()
        //     console.log("nextSession"):        
            setCurrenTime(endDate - Date.now())
    }
    
    //handles next Session action
    const nextSession = () => {
        clearInterval(clrInterval)
        if (!sessionStatus) {
            setSessionCount(prevState => prevState +1)
        }
        setEndDate(0)
        setCurrenTime(0)
        setSessionStatus(prevState => !prevState)
    }

    const handleButtons = async (event) => {
        const button = event.target.id
        if (button === "start_pause") {
            timerStatus? handlePause(): handlePlay()
        } else if (button === "skip") {
            nextSession()
        } else if (button=== "reset") {
            console.log(button)
        }
    }


    return(
        <TimerContext.Provider value={{
            sessionCount,
            sessionStatus,
            displayTime,
            timerStatus,
            handleButtons,
        }}>
            {props.children}
        </TimerContext.Provider>
    )
}

export const useTimerContext = () => {
    return useContext(TimerContext)
}