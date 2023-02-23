import { useState , useEffect} from 'react'
import axios from "axios"
import User from "./User.js"
import './Login.css'
import appIcon from "./assets/appIcon.png"

function Login() {
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[password2, setPassword2] = useState('');
    const[currentUser, setCurrentUser] = useState(new User());
    const[showRepeatPassword, setShowRepeatPassword] = useState(false);
    const[userList, setUserList] = useState([]);

    useEffect(() => {
      axios.get("http://127.0.0.1:5000/users")
      .then((response) => {
        setUserList(response.data.recordset);
      })
      .catch((error) =>{
        console.log(error);
      })
    })

    const LoginOrRegister = () => {
      /* axios.get("http://127.0.0.1:5000/users")
        .then((response) => {
          setUserList(response.data.recordset); */
    
          if(!showRepeatPassword){
            if(checkLogin(username, password)){
              console.log("Login succesfull");
            }else{
              console.log("wrong Login info");
              //displayLoginError for one second
              //clear input fields
            }
          }else{
            if(checkRegister){
              axios.post('http://127.0.0.1:5000/create', {
                user: username,
                password: password,
              }).then(() => {
                setUserList([
                  ...userList,
                  {
                    username: username,
                    password: password,
                  },
                ]);
                console.log("success");
              });
            }else{
              //display Registererror
              //clea input fields
            } 
          }
        /* })
        .catch((error) => {
          console.log(error);
        }); */
    };
    
    const checkLogin = (name, pw) =>{
      for (let i = 0; i < userList.length; i++) {
        if (userList[i].Username === name && userList[i].Password === password) {
          setCurrentUser(new User(userList[i].Username, userList[i].Password, userList[i].id));
          return true; // return true if match found
        }else{

        }
      }
      return false; // return false if no match found
    }

    const checkRegister = (user, password, password2) =>{
      if(password === username === password2){
        return false;
      }else{
        return true;
      }
    }

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
                  setUsername(event.target.value);
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