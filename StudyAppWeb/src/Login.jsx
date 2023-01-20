import { useEffect } from 'react';
import { useState } from 'react'
/* import sql from 'mssql' */
import './App.css'
import appIcon from "./assets/appIcon.png"
import config  from "./assets/config.js"

export default function App(){
    const[user, setUser] = useState('');
    const[password, setPassword]=useState('');

    function handleSubmit(event){
        event.preventDefault();
        console.log(user, password);
    }

    return(
    <div className="card">
        <div className="icon">
            <img src={appIcon} />
        </div>

        <div className="content">
            <h3>Log In!</h3>
            <form onSubmit={handleSubmit}>
                <div className='field'>
                <input autoComplete="off" id="logemail" placeholder="Email" className="inputField" onChange={e => setUser(e.target.value)}></input>
                </div>
                <div className='field'>
                <input autoComplete="off" id="logpw" placeholder="Password" className="inputField" onChange={e => setPassword(e.target.value)}></input>
                </div>
                <button type="submit">
                    <span className="button_top">Submit
                    </span>
                </button>
            </form>
        </div>
    </div>
    )
}