import React from "react"

import { useGlobalContext } from "../context/GlobalContext"

export default function Settings() {

    const {timerData,setModal, handleChange} = useGlobalContext()

    return(
        <div className="modalContainer">
            <div className="modal">
                <div className="settingsHeader">
                    <h2>Timer Settings</h2>
                    <button onClick={()=>setModal(false)}><i class="fas fa-times"></i></button>
                    <hr class="hr" />
                </div>
                <table>
                    <tr>
                        <h3>Time (Minutes)</h3>
                    </tr>
                    <tr>
                        <div className="column_3">
                            <label>Work</label>
                            <input name="work" placeholder="Minutes" value={timerData.work} onChange={handleChange}/>
                        </div>
                        <div className="column_3">
                            <label >Pause</label>
                            <input name="pause"  placeholder="Minutes" value={timerData.pause} onChange={handleChange}/>
                        </div>
                        <div className="column_3">
                            <label>Long-Pause</label>
                            <input name="long_pause"  placeholder="Minutes" value={timerData.long_pause} onChange={handleChange}/>
                        </div>
                    </tr>  
                    <tr>
                        <div className="column_2" >
                            <label>Sessions</label>
                            <input name="sessions"  placeholder="Sessions" value={timerData.sessions} onChange={handleChange}/>
                        </div>
                        <div className="column_2" >
                            <label>Long Pause on Session</label>
                            <input name="long_pause_sessions"  placeholder="Example: 4,8" value={timerData.long_pause_sessions} onChange={handleChange}/>
                        </div>
                    </tr>
                    <tr>
                        <input name="auto_w" className="checkbox" type="checkbox" checked={timerData.auto_w}  onChange={handleChange}/>
                        <label>Autoplay Work Sessions</label>
                    </tr>
                    <tr>
                        <input name="auto_p" className="checkbox" type="checkbox"  checked={timerData.auto_p} onChange={handleChange}/> 
                        <label>Autoplay Pause Sessions</label>
                    </tr>
                    <tr>
                        <h3>Sound</h3>
                    </tr>
                    <tr>
                        <label >Ringtone</label>
                        <select name="ringtone" value={timerData.ringtone} onChange={handleChange}>
                            <option value="ringtone1">Old Phone</option>
                            <option value="ringtone2">Beep Beep</option>
                            <option value="ringtone3">Bell Notification</option>
                        </select>
                    </tr>
                    <tr>
                        <label >Volume</label>
                        <input name="volume" className="volume" type="range" min ='0' max='100' value={timerData.volume} onChange={handleChange} />
                        <input name="volume" className="volume_field" value={timerData.volume} onChange={handleChange} ></input>
                    </tr>
                </table>
            </div>
        </div>
    )
}