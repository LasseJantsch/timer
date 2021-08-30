import React, {createContext, useContext, useState} from "react"
import { useGlobalContext } from "./GlobalContext"

const TimerContext = createContext()

export const TimerContextProvider = props => {

    const {timerData} = useGlobalContext()

    



    return(
        <TimerContext.Provider value={{
        }}>
            {props.children}
        </TimerContext.Provider>
    )
}

export const useTimerContext = () => {
    return useContext(TimerContext)
}