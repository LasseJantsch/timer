import React from "react"
import { Link } from "react-router-dom"

import { useGlobalContext } from "../context/GlobalContext"

export default function Header() {

    const {setModal} = useGlobalContext()

    return(
        <div className= "headerContainer">
            <div className= "header">
                <h1>Focus Timer</h1>    
                <div>
                    <Link to="/profile">
                        <button type="button">
                            <i className="fas fa-user"></i></button>
                    </Link>
                    <Link to="/statistics">
                        <button type="button">
                            <i className="fas fa-chart-line"></i></button>
                    </Link>
                    <Link to="/">
                        <button  type="button" onClick={()=> setModal(true)}>
                            <i className="fas fa-cog"></i></button>
                    </Link>
                </div>
                <div className="hr"></div>
            </div>
        </div>
    )
}