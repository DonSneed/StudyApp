import { Route, Routes, useLocation } from "react-router-dom"
import Login from "./Login.jsx"
import LandingPage from "./LandingPage.jsx"
import Navbar from "./Navbar.jsx"
import "./assets/styles/App.css"

function App() {
    const location = useLocation();

    return (
        <div className="App">
            {location.pathname !== "/" && <Navbar/>}
            <Routes>
                <Route path ="/" element={ <Login/> }/>
                <Route path="/LandingPage" element={ <LandingPage/> } />
            </Routes>
        </div>
    )
}

export default App