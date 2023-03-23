import {useLocation} from "react-router-dom";
import {useState, useEffect} from "react";
import "./assets/styles/EditKat.css";


function EditKat() {
    const location = useLocation();
    const {Katalog, KatalogID} = location.state;
    const[qList, setQList] = useState([]);

    useEffect(() => {        
        axios.get(`http://127.0.0.1:5000/kats/${state.NutzerID}`, {
            data: { userID: state.NutzerID}
        })
        .then((response) => {
            setQList(response.data.recordset);
            console.log(response.data.recordset);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

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

                </main>
            </div>
        </div>
    )
    
}

export default EditKat