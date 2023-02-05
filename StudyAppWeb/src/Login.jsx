import { useEffect } from 'react';
import { useState } from 'react';
import Axios from "axios";
/* import sql from 'msnodesqlv8';
import sql2 from 'mssql'; */
/* import './App.css'; */
import appIcon from "./assets/appIcon.png";
import config  from "./assets/config.js";

export default function App(){
    const[user, setUser] = useState('');
    const[password, setPassword]=useState('');
    const[password2, setPassword2]=useState('');
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const addUser = () => {
        event.preventDefault();
        Axios.post('http://127.0.0.1:5173/create', {
          name: name,
          password: password,
        }).then(() => {
          console.log("success");
        });
      };

    function handleSubmit(event){
        event.preventDefault();
        console.log(user, password);
    }

    const displayInfo = (event) => {
        event.preventDefault();
        console.log(user + password);
    };

    return(
    <div className="card">
        <div className="icon">
            <img src={appIcon} />
        </div>

        <div className="content">
            <h3>Log In!</h3>
            <form >
                <div className='field'>
                <input autoComplete="off" id="logemail" placeholder="Email" className="inputField" 
                onChange={(e) => {
                    setUser(e.target.value);
                }}/>
                </div>
                <div className='field'>
                <input autoComplete="off" id="logpw" placeholder="Password" className="inputField" 
                onChange={(e) => {
                    setPassword(e.target.value);
                }}/>                
                </div>
                {showRepeatPassword && (
                    <div className='field'>
                        <input autoComplete="off" id="logpw2" placeholder="Password2" className="inputField" 
                        onChange={(e) => {
                            setPassword2(e.target.value);
                }       }/>
                    </div>
                )}
                <button type="submit" onClick={addUser}>
                    <span className="button_top">Submit
                    </span>
                </button>
                <a href="#" onClick={() => setShowRepeatPassword(!showRepeatPassword)}>
                    {showRepeatPassword ? 'Register' : 'Login'}
                </a>
            </form>
        </div>
    </div>
    )
}