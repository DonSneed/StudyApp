import React, { useState } from "react";
import axios from "axios";
import "./assets/styles/Kat.css";
import { useEffect } from "react";

export default function Kat(props) {
    const[editMode, setEditMode] = useState(false);
    const[content, setContent] = useState(props.Katalog);
    const[katNameError, setKatNameError] = useState(false);

    useEffect(() => {
        console.log("content: " + content);
    }, [content]);

    const handleEdit = () =>{
        setEditMode(true);
        console.log("editable");
    };

    const handleSave = (event) => {
    const newContent = event.target.innerText;
    if (newContent === "Neuer Katalog") {
        setContent(props.Katalog);
        document.querySelector(`#katName-${props.KatalogID}`).innerText = content;
        props.setKatalog(props.Katalog);
    } else if (props.katList.some(item => item.Katalog === newContent)){
        setContent(props.Katalog);
        document.querySelector(`#katName-${props.KatalogID}`).innerText = content;
        props.setKatalog(props.Katalog);
    } else {
        setContent(newContent);
        axios.post('http://127.0.0.1:5000/changeKatName', {
            katName: newContent,
            katalogID: props.KatalogID,
            }).then(() => {
            props.setKatalog(newContent);
            console.log("success");
        });
        setEditMode(false);
    }
};
    
    return (
        <div className="Kat">
            {/* <p>
            {props.KatalogID} 
            </p> */}
            <p  
                id={`katName-${props.KatalogID}`}
                className={`${katNameError ? 'error' : ''}`}
                contentEditable={editMode}
                suppressContentEditableWarning={true}
                onClick={handleEdit}
                onBlur={handleSave}
            >
                {content}</p>
        </div>
    )
}