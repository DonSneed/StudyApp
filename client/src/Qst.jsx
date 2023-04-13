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
                {/* <p  id={`qstName-${FrageID}`}>
                {content}</p> */}
                <textarea 
                    rows="2"
                    cols="50"
                    readOnly={!editMode}>
                        {content}
                </textarea>
                <button className="qEditB" onClick={editClick}></button>
            </main>
                <div className="EditWindow" style={{ display: editMode ? "flex" : "none"}}>
                    <div className="editRow">
                        <textarea 
                            rows="2"
                            cols="50"
                            readOnly={!editMode}>
                                {props.Antwort1}
                        </textarea>
                        <input type="checkbox"/>
                    </div>
                    <div className="editRow">
                        <textarea 
                            rows="2"
                            cols="50"
                            readOnly={!editMode}>
                                {props.Antwort2}
                        </textarea>
                        <input type="checkbox"/>
                    </div>
                    <div className="editRow">
                        <textarea 
                            rows="2"
                            cols="50"
                            readOnly={!editMode}>
                                {props.Antwort3}
                        </textarea>
                        <input type="checkbox"/>
                    </div>
                    <div className="editRow">
                        <textarea 
                            rows="2"
                            cols="50"
                            readOnly={!editMode}>
                                {props.Antwort4}
                        </textarea>
                        <input type="checkbox"/>
                    </div>
                    <div className="editRow">
                        <textarea 
                            rows="2"
                            cols="50"
                            readOnly={!editMode}>
                                {props.Antwort5}
                        </textarea>
                        <input type="checkbox"/>
                    </div>
                    <div className="editRow">
                        <textarea 
                            rows="2"
                            cols="50"
                            readOnly={!editMode}>
                                {props.Antwort6}
                        </textarea>
                        <input type="checkbox"/>
                    </div>
                    <button className="saveButton"></button>                 
                </div>
        </div>
        
    );
}