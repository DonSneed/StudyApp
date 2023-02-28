import { Link } from "react-router-dom";
import userIcon from "./assets/userIcon.png";
import "./assets/styles/Navbar.css"


function Navbar () {
    return(
        <div className="Navbar">
            <ul>
                <li>
                    <Link to="/">Back to Login</Link>
                </li>
            </ul>
            <img src={userIcon}/>
        </div>
    )
}

export default Navbar