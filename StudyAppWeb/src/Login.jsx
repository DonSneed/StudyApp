//import { useState } from 'react'
import './App.css'
import appIcon from "./assets/appIcon.png"

export default function App(){
    return(
    <div className="card">
        <div className="icon">
            <img src={appIcon} />
        </div>

        <div className="content">
            <h3>Log In!</h3>
            <form>
                <div className='field'>
                <input autocomplete="off" id="logemail" placeholder="Email" className="inputField"></input>
                </div>
                <div className='field'>
                <input autocomplete="off" id="logpw" placeholder="Password" className="inputField"></input>
                </div>
            </form>
        </div>
    </div>
    )
}