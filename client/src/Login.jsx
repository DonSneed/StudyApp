import { useState , useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import User from "./User.js";
import './assets/styles/Login.css';
import appIcon from "./assets/appIcon.png";

function Login() {
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[password2, setPassword2] = useState('');
    const[currentUser, setCurrentUser] = useState(new User());
    const[showRepeatPassword, setShowRepeatPassword] = useState(false);
    const[userList, setUserList] = useState([]);
    const[inputError, setInputError] = useState(false);
    const navigate = useNavigate();

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
      
      if(!showRepeatPassword){
        if(checkLogin(username, password)){
          console.log("Login succesfull");
          navigate("/LandingPage", {state: currentUser});
        }else{
          console.log("wrong Login info");
          setInputError(true);
          setTimeout(() =>{
            setInputError(false);
            document.querySelector(".content h3").textContent = showRepeatPassword ? "Registrieren!" : "Log In!";
          }, 1000);
          document.querySelector("#logPw").value = "";
          //displayLoginError for one second
          //clear input fields
        }
      }else{
        if(checkRegister(username, password, password2)){
          axios.post('http://127.0.0.1:5000/create', {
            username: username,
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
          //rerender Page
          //display notification "Account has succesfully been created"
        }else{
          console.log("wrong Register");
          setInputError(true);
          setTimeout(() =>{
            setInputError(false);
            document.querySelector(".content h3").textContent = showRepeatPassword ? "Registrieren!" : "Log In!";
          }, 1500);
          //display Registererror
          //clea input fields
        } 
      }
    };
    
    const checkLogin = (name, pw) =>{
      for (let i = 0; i < userList.length; i++) {
        if (userList[i].Username === name && userList[i].Password === password) {
          setCurrentUser(new User(userList[i].Username, userList[i].Password, userList[i].id));
          return true; // return true if match found
        }
      }
      document.querySelector(".content h3").textContent = "Unzulässige Eingabe";
      return false; // return false if no match found
    }

    const checkRegister = (name, pw, pw2) =>{
      for (let i = 0; i < userList.length; i++) {  //name already in use
        if (userList[i].Username === name){
          document.querySelector(".content h3").textContent = "Name bereits in Verwendung";
          return false;
        }
      }
      if (name === "" || pw ==="" || pw2 === ""){                //empty name or password
        document.querySelector(".content h3").textContent = "Felder dürfen nicht leer sein";
        return false;
      }
      if (pw !== pw2){                             //passwords dont match
        document.querySelector(".content h3").textContent = "Passwörter müssen übereinstimmen";
        return false;
      }
      return true;
    }
  
    return (
      <div className="Login">
        <div className="card">
          <div className="icon">
            <img src={appIcon}/>
          </div>
          
          <div className="content">
            <h3 className={`${inputError ? 'error' : ''}`}>
              {showRepeatPassword ? "Registrieren!" : "Log In!"}
            </h3>
            <div className={`field ${inputError ? 'error' : ''}`}>
              <input autoComplete="off" id="logUser" placeholder="User" className="inputField" type="text"
                onChange={(event) =>{
                  setUsername(event.target.value);
                }}
              />
            </div>
            <div className={`field ${inputError ? 'error' : ''}`}>
              <input autoComplete="off" id="logPw" placeholder="Passwort" className="inputField" 
                onChange={(event) =>{
                  setPassword(event.target.value);
                }}
              />
            </div>
            {showRepeatPassword && (
              <div className={`field ${inputError ? 'error' : ''}`}>
                <input autoComplete="off" id="logPw2" placeholder="Passwort Wiederholen" className="inputField" type="text"
                onChange={(e) => {
                  setPassword2(e.target.value);
                }}/>
              </div>
            )}
            
            <button onClick={LoginOrRegister}>Submit</button>
            <span className="link" onClick={() => setShowRepeatPassword(!showRepeatPassword)}>
                {showRepeatPassword ? "Du hast bereits einen Account? Hier Klicken zum Einloggen" : "Noch keinen Account? Hier Klicken fürs Registrieren"}
            </span>
          </div>
        </div>
      </div>
    )
  }
  
  export default Login