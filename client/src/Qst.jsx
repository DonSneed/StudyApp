import React, { useState } from "react";
import axios from "axios";
import "./assets/styles/Qst.css";
import { useEffect } from "react";
import {Navigate, useNavigate} from "react-router-dom";

export default function Qst(props) {

    const {FrageID, Frage, Antwort1, Antwort2, show, handleEditClick} = props;

    const[content, setContent] = useState(Frage);
    const[editMode, setEditMode] = useState(false);
    const[editedQst, setEditedQst] = useState(Frage);
    const[editedAns1, setEditedAns1] = useState(Antwort1);
    const[editedAns2, setEditedAns2] = useState(Antwort2);
    

    const editClick = () => {
        handleEditClick(FrageID);
        setEditMode(!editMode);
    }

    
    return (
        <div className="Qst" style={{ display: show ? "block" : "none"}}>
        <header>
            <p  id={`qstName-${FrageID}`}>
            {content}</p>
            <button onClick={editClick}>edit</button>
        </header>
            <div className="EditWindow">
                <textarea 
                    value={editedQst} 
                    cols="50" 
                    rows="2"
                    id="qArea"
                    onChange={(event) => setEditedQst(event.target.value)}>
                    
                </textarea>
                
            </div>
        
    </div> 
    );
}