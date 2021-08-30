import React from "react"
import { useGlobalContext } from "../context/GlobalContext"
import { useTimerContext } from "../context/TimerContext"

export default function Timer() {

    const {timerData} = useGlobalContext()

    return(

        <div class="timer">
            <div class="timerHeader">
                <h2>{"Work"}</h2>
            </div>
                <div class ="clock">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"> 
                        <circle class ="background" r="97" cx="100" cy="100" />
                        <circle class ="background" id = "background" r="97" cx="100" cy="100" />
                        <circle class ="progression" id="progression" r="50" cx="100" cy="100" />
                        <circle class ="overlay"  r="97" cx="100" cy="100" />
                        <circle class ="center" r="5" cx="100" cy="100" />
                    </svg>
                </div>
            <h2 class="countdown" id="countdown">{"0:00"}</h2>
            <div class="UI" >
                <button class= "button_2" id="skip" type="button">
                    <i class="fas fa-step-forward"></i></button>
                <button class= "button_1 act" id="start" type="button">
                    <i class={false?"fas fa-pause":"fas fa-play"}></i></button>
                <button class= "button_2" id="reset" type="button">
                    <i class="fas fa-redo-alt"></i></button>
            </div> 
            <h2  class="sessionCounter" id="sessionCounter">{"1"}/{"10"}</h2>
        </div>
    )
}