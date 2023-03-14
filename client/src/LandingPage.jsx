import "./assets/styles/LandingPage.css"
import { useState , useEffect} from 'react';
import { useLocation } from "react-router-dom"
import User from "./User.js";
import Kat from "./Kat.jsx";
import axios from "axios";


function LandingPage() {
    const {state} = useLocation();
    const[currentUser, setCurrentUser] = useState(new User());
    const[katList, setKatList] = useState([]);
    const[newKat, setNewKat] = useState({
        Katalog: "Neuer Katalog",
        KatalogID: "",
        MaxScore: null,
        QuestionCount: null
    });
    const[error, setError] = useState(false);

    useEffect(() => {
        setCurrentUser(state);
        console.log("id: " + state.NutzerID)
        axios.get(`http://127.0.0.1:5000/kats/${state.NutzerID}`, {
            data: { userID: state.NutzerID}
        })
        .then((response) => {
            setKatList(response.data.recordset);
            
        })
        .catch((error) => {
            console.log(error);
        });
    }, [currentUser]);

    const kats = katList.map(item => {
        return (
            <Kat
                key={item.KatalogID}
                {...item}
                onEdit={() => {
                    //
                }}
            />
        )
    })

    const addNewKat = () => {
        const newID = Math.max(...katList.map(kat => kat.KatalogID)) + 1;
        const newKat = {
            Katalog: "Neuer Katalog",
            KatalogID: newID,
            MaxScore: null,
            QuestionCount: null
        }
        setNewKat(newKat);
        setKatList([newKat, ...katList]);
    }

    return(
        <div className ="LandingPage">
            <div className="KatList">
                <header>
                    <h3>Kataloge</h3>
                    <div className="ActionIcons">
                        <button className="AddButton" onClick={addNewKat}></button>
                        <button className="DeleteButton"></button>
                    </div>
                </header>
                <main>
                    {kats}
                </main>
                
            </div>
        </div>
    )
}

export default LandingPage