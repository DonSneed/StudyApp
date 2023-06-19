import {useLocation} from "react-router-dom";
import {useState, useEffect} from "react";
import "./assets/styles/ImportKat.css";
import axios from "axios";


function ImportKat() {
    const location = useLocation();
    const {Katalog, KatalogID} = location.state;
    const[qList, setQList] = useState([]);
    const[editedFrageID, setEditedFrageID] = useState(-1);
    const[qHighlight, setQHighlight] = useState(false);
    

    useEffect(() => {        
        axios.get(`http://127.0.0.1:5000/questions/${KatalogID}`, {
            data: { KatalogID: KatalogID}
        })
        .then((response) => {
/*             setQList(response.data.recordset);
 */        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    return(
        <div className="ImportKat">
            <header>
                <h3>Öffentliche Kataloge</h3>
                <h5>Markieren Sie die Kataloge, die Sie importieren möchten aus der Liste. 
                    Alternativ können Sie eine Katalog als Excel Datei mit Hilfe der unteren Fläche hochladen</h5>
                <div className="ImportContainer">
                    <div className="PublicImportField"></div>
                    <div className="ExcelImportField"></div>
                </div>
            </header>
            <main>
                {qs}
            </main>
        </div>
    )
    
}

export default ImportKat