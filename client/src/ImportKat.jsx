import { useLocation, useNavigate } from "react-router-dom"
import {useState, useEffect, useCallback} from "react";
import { useDropzone } from 'react-dropzone';
import "./assets/styles/ImportKat.css";
import axios from "axios";


function ImportKat() {
    const location = useLocation();
    const {nutzerID} = location.state;
    const {state} = useLocation();
    const[currentUser, setCurrentUser] = useState(state);
    const[publicQList, setPublicQList] = useState([]);
    const[importDone, setImportDone] = useState(false);
    const navigate = useNavigate();
     

    useEffect(() => {        
        axios.get(`http://127.0.0.1:5000/publicKats/${state.NutzerID}`, {
        })
        .then((response) => {
            setPublicQList(response.data.recordset);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    const PublicImport = () => {
        const PublicKat = ({ KatalogID, Katalog, Ersteller, isChecked, onCheck }) => {
          return (
            <div className="publicKat">
              <p>{KatalogID}</p>
              <p>{Katalog}</p>
              <p>{Ersteller}</p>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={onCheck}
              />
            </div>
          );
        };

        const ImportSuccessDisplay = () => {
          return (
            <div className="ImportSuccessDisplay">
              <p>Kataloge wurden importiert</p>
            </div>
          )
        }
    
        const handleCheck = (katalogID) => {
          setPublicQList((prevPublicQList) =>
            prevPublicQList.map((item) =>
              item.KatalogID === katalogID
                ? { ...item, isChecked: !item.isChecked }
                : item
            )
          );
        };
    
        const handleConfirmPImport = () => {
          const checkedKats = publicQList.filter((publicKat) => publicKat.isChecked);
          const checkedKatNames = checkedKats.map((publicKat) => publicKat.KatalogID);

          for(let i = 0; i < checkedKatNames.length; i++) {

            axios.post("http://127.0.0.1:5000/importPublicKat", {
                ersteller: state.NutzerID,
                katalogID: checkedKatNames[i]
            })
            .then(function(response) {
                console.log(response.data.KatalogID);
                
                axios.post("http://127.0.0.1:5000/importPublicKatQ", {
                    originalKat: checkedKatNames[i],
                    newKat: response.data.KatalogID
                }).then(() => {
                    console.log("success");
                    setImportDone(true);
                    setTimeout(() =>{
                        navigate("/LandingPage", { state: state});
                      }, 1500);
                });
            })
            .catch(function(error) {
                console.log(error);
            })

            
          }
        };

        const handleCancelImport = () => {
          navigate("/LandingPage", { state: state});
        }
    
        const publicKats = publicQList.map((item) => (
          <PublicKat
            key={item.KatalogID}
            {...item}
            onCheck={() => handleCheck(item.KatalogID)}
          />
        ));
    
        return (
          <div className="publicImports">
            <div className="publicImportHeader">
              <textarea placeholder="Katalognamen suchen"></textarea>
              <button className="searchPublicKatB"></button>
              <button className="confirmPublicKatImportB" onClick={handleConfirmPImport}></button>
              <button className="cancelKatImportB" onClick={handleCancelImport}></button>
            </div>
            {importDone && <ImportSuccessDisplay/>}
            {!importDone && <div className="publicImportList">{publicKats}</div>}
          </div>
        );
      }

    const ExcelImport = () => {
        const onDrop = useCallback((acceptedFiles) => {
            //accepted files nimmt die gedroppten excel dateien auf
            //datei in katalog umwandeln und für den nutzer abspeichern

        }, []);

        const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

        return(
            <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
                <input {...getInputProps()} accept=".xlsx,  .xls" />
                {isDragActive ? (
                    <p>Drop the Excel file here</p>
                ) : (
                    <p>Drag and drop Excel file here or click to select from your device</p>
                )
                }
            </div>
        )
    }

    return(
        <div className="ImportKat">
            <div className="ImportContainer">
                <header>
                    <h3>Öffentliche Kataloge</h3>
                </header>
                    <p>Markieren Sie die Kataloge, die Sie importieren möchten aus der Liste. 
                        Alternativ können Sie eine Katalog als Excel Datei mit Hilfe der unteren Fläche hochladen
                    </p>
                        <PublicImport/>
                        <ExcelImport/>
            </div>
            
        </div>
    )
    
}

export default ImportKat