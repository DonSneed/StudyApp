import {useLocation} from "react-router-dom";
import {useState, useEffect} from "react";
import Qst from "./Qst.jsx";
import "./assets/styles/EditKat.css";
import axios from "axios";


function EditKat() {
    const location = useLocation();
    const {Katalog, KatalogID} = location.state;
    const[qList, setQList] = useState([]);

    useEffect(() => {        
        axios.get(`http://127.0.0.1:5000/questions/${KatalogID}`, {
            data: { KatalogID: KatalogID}
        })
        .then((response) => {
            setQList(response.data.recordset);
            console.log(response.data.recordset);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    const qs = qList.map(item => {
        return (
            <Qst
                key={item.FrageID}
                {...item}
                /* setKatalog={(newContent) => {
                    setKatalog(newContent);
                }}
                qList={qList} */
            />
        )
    })

    return(
        <div className="EditKat">
            <div className="EditCard">
                <header>
                    <h3>{Katalog}:</h3>
                    <div className="ActionIcons">
                        <button className="AddButton"></button>
                        <button className="DeleteButton"></button>
                    </div>
                </header>
                <main>
                    {qs}
                </main>
            </div>
        </div>
    )
    
}

export default EditKat