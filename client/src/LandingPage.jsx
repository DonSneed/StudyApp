import "./assets/styles/LandingPage.css"
import { useState , useEffect} from 'react';
import { useLocation } from "react-router-dom"
import User from "./User.js";
import axios from "axios";

function LandingPage() {
    const {state} = useLocation();
    const[currentUser, setCurrentUser] = useState(new User());
    const[katList, setKatList] = useState([]);

    useEffect(() => {
      /* setCurrentUser(state);
      console.log("currentUser: ");
      console.log(currentUser);
      console.log("state: ");
      console.log(state);
      console.log("name: " + currentUser.Username + " Password: " + currentUser.Password); */
    })

    useEffect(() => {
        setCurrentUser(state);
        console.log("currentUser: ");
        console.log(currentUser);
        console.log("state: ");
        console.log(state);
        console.log("name: " + currentUser.Username + " Password: " + currentUser.Password);
        axios.get("http://127.0.0.1:5000/kats", {
            data: { userID: state.NutzerID}
        })
        .then((response) => {
            setKatList(response.data.recordset);
            console.log("test");
            console.log(katList);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [currentUser]);

    return(
        <div className ="LandingPage">
            <h3>LandingPage</h3>
        </div>
    )
}

export default LandingPage