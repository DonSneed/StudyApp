import "./assets/styles/LandingPage.css"
import { useState , useEffect} from 'react';
import { useLocation } from "react-router-dom"
import Kat from "./Kat.jsx";
import axios from "axios";


function LandingPage() {
    const {state} = useLocation();
    const[currentUser, setCurrentUser] = useState(state);
    const[katList, setKatList] = useState([]);
    const[error, setError] = useState(false);
    const[katalog, setKatalog] = useState("");
    const[showCreateKatWindow, setShowCreateKatWindow] = useState(false);

    useEffect(() => {
        setCurrentUser(state);
        
        axios.get(`http://127.0.0.1:5000/kats/${state.NutzerID}`, {
            data: { userID: state.NutzerID}
        })
        .then((response) => {
            setKatList(response.data.recordset);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [state]);

    const kats = katList.map(item => {
        return (
            <Kat
                key={item.KatalogID}create
                {...item}
                setKatalog={(newContent) => {
                    setKatalog(newContent);
                }}
                katList={katList}
            />
        )
    })

    const addKat = () => {
        if(showCreateKatWindow){
            setShowCreateKatWindow(false);
        }else{
            setShowCreateKatWindow(true);
        }
        
    }

    

    const deleteKat = () => {
        //placeholder
        console.log(katList);
    }

    const CreateKatWindow = () => {

        const[showImportKatWindow, setShowImportKatWindow] = useState(false);

        const addEmptyKat = () => {
            setShowCreateKatWindow(false);
            const newID = Math.max(...katList.map(kat => kat.KatalogID)) + 1;
            const newKat = {
                Katalog: "Neuer Katalog",
                KatalogID: newID,
                Oeffentlich: false,
                MaxScore: null,
                QuestionCount: null
            }
            axios.post('http://127.0.0.1:5000/createKat', {
                katName: newKat.Katalog,
                creator: currentUser.NutzerID,
                }).then(() => {
                console.log("success");
            });
            setKatList([newKat, ...katList]); 
        }
        
    
        const importKat = () =>{
            if(showImportKatWindow){
                setShowImportKatWindow(false);
            }else{
                setShowImportKatWindow(true);
            }
            
        };

        const ImportKatWindow = () => {
            
            return (
                <div className="importKatWindow">
                    <h4>Sie können einen öffentlich gestellten Katalog der anderen Spieler auswählen oder eine Excel Datei von ihrem Gerät hochladen</h4>
                    <div>
                        <div className="publicKatList"></div>
                        <div className="fileImportField"></div>
                    </div>
                </div>               
            )
        }
            
        return (
            <div className="createKatWindow">
                {showImportKatWindow && <ImportKatWindow />}
                <h3>Möchten Sie einen neuen Katalog erstellen oder einen existierenden importieren?</h3>
                <div>
                    <button onClick={addEmptyKat} id="createQuizB">Erstellen</button>
                    <button onClick={importKat} id="importQuizB">Importieren</button>
                </div>
            </div>
        );
        
    }

    return(
        <div className ="LandingPage">
            <div className="KatList">
                <header>
                    <h3>Kataloge</h3>
                    <div className="ActionIcons">
                        <button className="AddButton" onClick={addKat}></button>
                        <button className="DeleteButton" onClick={deleteKat}></button>
                    </div>
                </header>
                <main>
                    {showCreateKatWindow && <CreateKatWindow />}
                    {kats}
                </main>
                
            </div>
        </div>
    )
}

export default LandingPage