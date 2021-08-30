import React from "react"
import {Link} from "react-router-dom"

export default function Profile() {

    return(
        <div className="profile">
            <Link to="/">
                <button className="closeBtn"><i class="fas fa-times"></i></button>             
            </Link>
            <div>
                <i class="fas fa-tools"></i>
                <h2>Coming Soon...</h2>
            </div>
        </div>
    )
}