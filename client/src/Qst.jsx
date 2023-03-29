import React, { useState } from "react";
import axios from "axios";
import "./assets/styles/Qst.css";
import { useEffect } from "react";
import {Navigate, useNavigate} from "react-router-dom";

export default function Qst(props) {

    const[content, setContent] = useState(props.Frage);
    const[editMode, setEditMode] = useState(false);
    const[editedQst, setEditedQst] = useState(props.Frage);
    const[editedAns1, setEditedAns1] = useState(props.Antwort1);
    const[editedAns2, setEditedAns2] = useState(props.Antwort2);

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleCancelClick = () => {
        setEditMode(false);
        setEditedQst(props.Frage);
        setEditedAns1(props.Antwort1);
        setEditedAns2(props.Antwort2);
    }

    const handleSaveClick = () => {
        setEditMode(false);
    }

    
    return (
        <div className="Qst">
            {/* <p>
            {props.KatalogID} 
            </p> */}
            <header>
                <p  id={`qstName-${props.FrageID}`}>
                {content}</p>
                <button>edit</button>
            </header>
            {editMode ? (
                <div className="EditWindow">
                    <textarea value={editedQst} cols="30" rows="10" 
                    onChange={(event) => setEditedQst(event.target.value)}>
                        
                    </textarea>
                    
                </div>
            ) : (
                <div className="QCard">
                    <p>{Antwort1}</p>
                    <p>{Antwort2}</p>
                </div>
            )}
        </div>
    );
}