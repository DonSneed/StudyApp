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
    const[editedAns1, setEditedAns1] = useState(Antwort1 ? Antwort1 : " ");
    const[editedAns2, setEditedAns2] = useState(Antwort2 ? Antwort2 : " ");
    const[editedAns3, setEditedAns3] = useState(props.Antwort3 ? props.Antwort3 : " ");
    const[editedAns4, setEditedAns4] = useState(props.Antwort4 ? props.Antwort4 : " ");
    const[editedAns5, setEditedAns5] = useState(props.Antwort5 ? props.Antwort5 : " ");
    const[editedAns6, setEditedAns6] = useState(props.Antwort6 ? props.Antwort6 : " ");

    const ergebniss = props.Ergebniss;
    

    const editClick = () => {
        setEditMode(!editMode);
        handleEditClick(FrageID);
        /* setEditMode(!editMode); */
    }

    const saveClick = () => {
        if(checkEdit()){
            //save edited question information
        }else{
            //display error of sorts, reset to old values
        }
    }

    const checkEdit = () =>{
        const checkboxes = document.querySelectorAll("input[type='checkbox']");
        const uncheckedCheckboxes = [...checkboxes].filter((checkbox) => !checkbox.checked);
        if (uncheckedCheckboxes.length === checkboxes.length) {
            return false;
        }else{
            
        }
    }

    
    return (
        <div className="Qst" style={{ display: show ? "flex" : "none"}}>
            <main>
                <textarea 
                    id="qArea"
                    rows="2"
                    cols="50"
                    readOnly={!editMode}
                    value={editedQst}
                    onChange={(e) => setEditedQst(e.target.value)}>
                        
                </textarea>
                <button className="qEditB" onClick={editClick}></button>
            </main>
                <div className="EditWindow" style={{ display: editMode ? "flex" : "none"}}>
                    <div className="editRow">
                        <textarea 
                            id="a1Area"
                            rows="2"
                            cols="50"
                            readOnly={!editMode}
                            value={editedAns1}
                            onChange={(e) => setEditedAns1(e.target.value)}>
                                
                        </textarea>
                        <input type="checkbox" id="a1Box" defaultChecked={ergebniss.charAt(0) === "w"}/>
                    </div>
                    <div className="editRow">
                        <textarea 
                            id="a2Area"
                            rows="2"
                            cols="50"
                            readOnly={!editMode}
                            value={editedAns2}
                            onChange={(e) => setEditedAns2(e.target.value)}>
                                
                        </textarea>
                        <input type="checkbox" id="a2Box" defaultChecked={ergebniss.charAt(1) === "w"}/>
                    </div>
                    <div className="editRow">
                        <textarea 
                            id="a3Area"
                            rows="2"
                            cols="50"
                            readOnly={!editMode}
                            value={editedAns3}
                            onChange={(e) => setEditedAns3(e.target.value)}>
                                
                        </textarea>
                        <input type="checkbox" id="a3Box" defaultChecked={ergebniss.charAt(2) === "w"}/>
                    </div>
                    <div className="editRow">
                        <textarea 
                            id="a4Area"
                            rows="2"
                            cols="50"
                            readOnly={!editMode}
                            value={editedAns4}
                            onChange={(e) => setEditedAns4(e.target.value)}>
                                
                        </textarea>
                        <input type="checkbox" id="a4Box" defaultChecked={ergebniss.charAt(3) === "w"}/>
                    </div>
                    <div className="editRow">
                        <textarea 
                        id="a5Area"
                            rows="2"
                            cols="50"
                            readOnly={!editMode}
                            value={editedAns5}
                            onChange={(e) => setEditedAns5(e.target.value)}>
                                
                        </textarea>
                        <input type="checkbox" id="a5Box" defaultChecked={ergebniss.charAt(4) === "w"}/>
                    </div>
                    <div className="editRow">
                        <textarea 
                            id="a6Area"
                            rows="2"
                            cols="50"
                            readOnly={!editMode}
                            value={editedAns6}
                            onChange={(e) => setEditedAns6(e.target.value)}>
                                
                        </textarea>
                        <input type="checkbox" id="a6Box" defaultChecked={ergebniss.charAt(5) === "w"}/>
                    </div>
                    <button className="saveButton" onClick={saveClick} ></button>                 
                </div>
        </div>        
    
    );
}