import {useLocation} from "react-router-dom";
import {useState, useEffect} from "react";
import "./assets/styles/RunKat.css";
import axios from "axios";

function RunKat() {

    const location = useLocation();
    const {Katalog, KatalogID} = location.state;

    useEffect(() => {        
        axios.get(`http://127.0.0.1:5000/questions/${KatalogID}`, {
            data: { KatalogID: KatalogID}
        })
        .then((response) => {
            setQList(response.data.recordset);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);
    
    return(
        <div className="RunKat">

        </div>
    )
}

export default RunKat