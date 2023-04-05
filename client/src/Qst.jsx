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
        setEditMode(!editMode);
        handleEditClick(FrageID);
    }

    
    return (
        <div className="Qst" style={{ display: show ? "flex" : "none"}}>
            <main>
                <p  id={`qstName-${FrageID}`}>
                {content}</p>
                <button className="qEditB" onClick={editClick}></button>
            </main>
                <div className="EditWindow" style={{ display: editMode ? "flex" : "none"}}>
                    <div className="editRow">
                        <textarea value={Antwort1}></textarea>
                        <input type="checkbox"/>
                    </div>
                    <div className="editRow">
                        <textarea value={Antwort2}></textarea>
                        <input type="checkbox"/>
                    </div>
                    <div className="editRow">
                        <textarea value={props.Antwort3}></textarea>
                        <input type="checkbox"/>
                    </div>
                    <div className="editRow">
                        <textarea value={props.Antwort4}></textarea>
                        <input type="checkbox"/>
                    </div>
                    <div className="editRow">
                        <textarea value={props.Antwort5}></textarea>
                        <input type="checkbox"/>
                    </div>
                    <div className="editRow">
                        <textarea value={props.Antwort6}></textarea>
                        <input type="checkbox"/>
                    </div>
                    <button className="saveButton"></button>                 
                </div>
        </div>
        
    );
}