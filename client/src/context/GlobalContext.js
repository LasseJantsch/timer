import React, {createContext, useContext, useState} from "react"

const GlobalContext = createContext()

export const GlobalContextProvider = props => {

    const [modal, setModal] = useState()
    const [timerData, setTimerData] = useState({
        work: "0.1",
        pause: "0.05",
        long_pause: "30",
        sessions: "10",
        long_pause_sessions: "",
        auto_w: false,
        auto_p: false,
        ringtone: "ringtone1",
        volume: "20",
    })

    const handleChange = (event) => {
        const key = event.target.name
        const value = event.target.value
        const className = event.target.className

        className === "checkbox"?
        setTimerData(prevState => {
            const newObj = Object.assign({}, prevState)
            newObj[key] = !newObj[key]
            return(newObj)
        }):
        setTimerData(prevState => {
            const newObj = Object.assign({}, prevState)
            newObj[key] = value
            return(newObj)
        })
    }

    return(
        <GlobalContext.Provider value={{
            timerData,
            modal,
            setModal,
            handleChange,
        }}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}