import "./assets/styles/LandingPage.css"
import { useState , useEffect} from 'react';
import { useLocation } from "react-router-dom"
import User from "./User.js";

function LandingPage() {
    const {state} = useLocation();
    const[currentUser, setCurrentUser] = useState(new User());

    useEffect(() => {
      setCurrentUser(state);
      console.log("currentUser: ");
      console.log(currentUser);
      console.log("state: ")
      console.log(state);
      console.log("name: " + currentUser.Username + " Password: " + currentUser.Password)
    })

    return(
        <div className ="LandingPage">
            <h3>LandingPage</h3>
        </div>
    )
}

export default LandingPage