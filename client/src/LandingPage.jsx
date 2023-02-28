import "./assets/styles/LandingPage.css"
import { useState , useEffect} from 'react';
import { useLocation } from "react-router-dom"

function LandingPage() {
    const location = useLocation();
    const currentUser = location.state;

    /* useEffect(() => {
        axios.get("http://127.0.0.1:5000/userCatalogs")
        .then((response) => {
          setUserList(response.data.recordset);
        })
        .catch((error) =>{
          console.log(error);
        })
      }) */

    return(
        <div className ="LandingPage">
            <h3>LandingPage</h3>
        </div>
    )
}

export default LandingPage