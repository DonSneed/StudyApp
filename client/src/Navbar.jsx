import { useNavigate } from "react-router-dom"
import "./assets/styles/Navbar.css"


function Navbar () {
    const navigate = useNavigate();

    const logout = () => {
        navigate("/");
    }
    
    return(
        <div className="Navbar">
            <button className="UserIcon" onClick={logout}></button>
        </div>
    )
}

export default Navbar