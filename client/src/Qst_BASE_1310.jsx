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
    }
    
    const toggleShow = () => {
        setShow(a => !a);
    }

    const handleCancelEdit = () => {
        cancelEdit();
        setEditMode(false);
        setEditedQst(Frage);
        setEditedAns1(Antwort1);
        setEditedAns2(Antwort2);
    }

    const handleSaveClick = () => {
        setEditMode(false);
    }

    
    return (
        <div className="Qst" style={{ display: show ? "block" : "none"}}>
        <header>
            <p  id={`qstName-${FrageID}`}>
            {content}</p>
            <button onClick={editClick}>edit</button>
        </header>
        {editMode ? (
            <div className="EditWindow">
                <textarea value={editedQst} cols="30" rows="10" 
                onChange={(event) => setEditedQst(event.target.value)}>
                    
                </textarea>
                
            </div>
        ) : (
            <div className="QCard">
                {/* <p>{props.Antwort1}</p>
                <p>{props.Antwort2}</p> */}
            </div>
        )}
    </div>
        
    );
}