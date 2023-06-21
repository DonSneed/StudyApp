import { Route, Routes, useLocation } from "react-router-dom"
import Login from "./Login.jsx"
import LandingPage from "./LandingPage.jsx"
import EditKat from "./EditKat.jsx"
import RunKat from "./RunKat.jsx"
import ImportKat from "./ImportKat.jsx"
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
                <Route path="/EditKat/:KatalogID" element={<EditKat/>} />
                <Route path="/RunKat/:KatalogID" element={<RunKat/>} />
                <Route path="/ImportKat/:NutzerID" element={<ImportKat/>} />
            </Routes>
        </div>
    )
}

export default App