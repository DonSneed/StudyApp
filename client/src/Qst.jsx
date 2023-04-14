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
    const[editedAns3, setEditedAns3] = useState(props.Antwort3);
    const[editedAns4, setEditedAns4] = useState(props.Antwort4);
    const[editedAns5, setEditedAns5] = useState(props.Antwort5);
    const[editedAns6, setEditedAns6] = useState(props.Antwort6);
    

    const editClick = () => {
        setEditMode(!editMode);
        handleEditClick(FrageID);
        setEditMode(!editMode);
    }

    
    return (
        <div className="Qst" style={{ display: show ? "flex" : "none"}}>
            <main>
                <textarea 
                    rows="2"
                    cols="50"
                    readOnly={!editMode}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}>
                        
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