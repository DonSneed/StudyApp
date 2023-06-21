import {useLocation} from "react-router-dom";
import {useState, useEffect, useCallback} from "react";
import { useDropzone } from 'react-dropzone';
import "./assets/styles/ImportKat.css";
import axios from "axios";


function ImportKat() {
    const location = useLocation();
    const {nutzerID} = location.state;
    const[publicQList, setPublicQList] = useState([]);
    

    useEffect(() => {        
        axios.get(`http://127.0.0.1:5000/publicKats/${nutzerID}`, {
        })
        .then((response) => {
            const updatedPublicQList = response.data.recordset.map((item) => ({
                ...item,
                isChecked: false,
            }));
            setPublicQList(response.data.recordset);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    const PublicImport = () =>{

        const publicKats = publicQList.map(item => {

            const PublicKat = (props) => {
                const[isChecked, setIsChecked] = useState(false);

                const handleCheckboxChange = (event) => {
                    setIsChecked(event.target.checked);
                }

                return(
                    <div className="publicKat">
                        <p>{props.KatalogID}</p>
                        <p>{props.Katalog}</p>
                        <p>{props.Ersteller}</p>
                        <input
                            type="checkbox"
                            checkbox={isChecked.toString()}
                            onChange={() => handleCheckboxChange(props.KatalogID)}
                        />
                    </div>
                )
            }
            return (
                <PublicKat
                    key={item.KatalogID}
                    {...item}   
                />
            )
        })

        return(
            <div className="publicImports">
                <div className="publicImportHeader">
                    <textarea placeholder="Katalognamen suchen"></textarea>
                    <button className="searchPublicKatB"></button>
                    <button className="confirmPublicKatImportB"></button>
                    <button className="cancelKatImportB"></button>
                </div>
                <div className="publicImportList">
                    {publicKats}
                </div> 
            </div>
        )
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
                    <p>Drag and drop Excel file here or click to select from our device</p>
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