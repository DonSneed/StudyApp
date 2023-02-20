import { useState } from 'react'
import axios from "axios"
import './Login.css'
import appIcon from "./assets/appIcon.png"

function Login() {
    const[user, setUser] = useState('');
    const[password, setPassword] = useState('');
    const[password2, setPassword2] = useState('');
    const[showRepeatPassword, setShowRepeatPassword] = useState(false);
    const[userList, setUserList] = useState([]);

    const LoginOrRegister = () => {
      /* preventDefault(); */
      if(!showRepeatPassword){
        axios.get("http://127.0.0.1:5000/users").then((response) => {
          setUserList(response.data);
          console.log(userList);
        })
      }else{
        axios.post('http://127.0.0.1:5000/create', {
          user: user,
          password: password,
        }).then(() => {
          setUserList([
            ...userList,
            {
              user: user,
              password: password,
            },
          ]);
          console.log("success");
        });
      }
      
    };
    

    const hitBackend = () => {
        axios.get('http://localhost:5000/test')
        .then((response) => {
          console.log(response.data);
        })
      }
  
    return (
      <div className="Login">
        <div className="card">
          <div className="icon">
            <img src={appIcon}/>
          </div>
          
          <div className="content">
            <h3>{showRepeatPassword ? "Registrieren!" : "Log In!"}</h3>
            <div className="field">
              <input autoComplete="off" id="logUser" placeholder="User" className="inputField" type="text"
                onChange={(event) =>{
                  setUser(event.target.value);
                }}
              />
            </div>
            <div className="field">
              <input autoComplete="off" id="logPw" placeholder="Passwort" className="inputField" 
                onChange={(event) =>{
                  setPassword(event.target.value);
                }}
              />
            </div>
            {showRepeatPassword && (
              <div className="field">
                <input autoComplete="off" id="logPw2" placeholder="Passwort Wiederholen" className="inputField" type="text"
                onChange={(e) => {
                  setPassword2(e.target.value);
                }}/>
              </div>
            )}
            
            <button onClick={LoginOrRegister}>Submit</button>
            <a href="#" onClick={() => setShowRepeatPassword(!showRepeatPassword)}>
              {showRepeatPassword ? "Du hast bereits einen Account? Hier Klicken zum Einloggen" : "Noch keinen Account? Hier Klicken fürs Registrieren"}
            </a>
          </div>
          {/* <button onClick={hitBackend}>
            hit Backend
          </button> */}
        </div>
      </div>
    )
  }
  
  export default Login