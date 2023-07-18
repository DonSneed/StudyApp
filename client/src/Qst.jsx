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
    const[editedAns1, setEditedAns1] = useState(Antwort1 ? Antwort1 : "");
    const[editedAns2, setEditedAns2] = useState(Antwort2 ? Antwort2 : "");
    const[editedAns3, setEditedAns3] = useState(props.Antwort3 ? props.Antwort3 : "");
    const[editedAns4, setEditedAns4] = useState(props.Antwort4 ? props.Antwort4 : "");
    const[editedAns5, setEditedAns5] = useState(props.Antwort5 ? props.Antwort5 : "");
    const[editedAns6, setEditedAns6] = useState(props.Antwort6 ? props.Antwort6 : "");
    const[aBox1, setABox1] = useState(props.Ergebniss.charAt(0) === "w");
    const[aBox2, setABox2] = useState(props.Ergebniss.charAt(1) === "w");
    const[aBox3, setABox3] = useState(props.Ergebniss.charAt(2) === "w");
    const[aBox4, setABox4] = useState(props.Ergebniss.charAt(3) === "w");
    const[aBox5, setABox5] = useState(props.Ergebniss.charAt(4) === "w");
    const[aBox6, setABox6] = useState(props.Ergebniss.charAt(5) === "w");
    const navigate = useNavigate();
    

    const editClick = () => {
        setEditedQst(Frage);

        //reset to original values
        setEditedAns1(props.Antwort1);
        setEditedAns2(props.Antwort2);
        setEditedAns3(props.Antwort3 ? props.Antwort3 : "");
        setEditedAns4(props.Antwort4 ? props.Antwort4 : "");
        setEditedAns5(props.Antwort5 ? props.Antwort5 : "");
        setEditedAns6(props.Antwort6 ? props.Antwort6 : "");
        document.querySelector("#a1Box").checked = props.Ergebniss.charAt(0) === "w";
        document.querySelector("#a2Box").checked = props.Ergebniss.charAt(1) === "w";
        document.querySelector("#a3Box").checked = props.Ergebniss.charAt(2) === "w";
        document.querySelector("#a4Box").checked = props.Ergebniss.charAt(3) === "w";
        document.querySelector("#a5Box").checked = props.Ergebniss.charAt(4) === "w";
        document.querySelector("#a6Box").checked = props.Ergebniss.charAt(5) === "w";
        setABox1(props.Ergebniss.charAt(0) === "w");
        setABox2(props.Ergebniss.charAt(1) === "w");
        setABox3(props.Ergebniss.charAt(2) === "w");
        setABox4(props.Ergebniss.charAt(3) === "w");
        setABox5(props.Ergebniss.charAt(4) === "w");
        setABox6(props.Ergebniss.charAt(5) === "w");
        //reset to original values

        setEditMode(!editMode);
        handleEditClick(FrageID);
    }

    const saveClick = () => {
        if(checkEdit()){

            const ergebniss = 
                (aBox1 ? "w" : "f") +
                (aBox2 ? "w" : "f") +
                (aBox3 ? "w" : "f") +
                (aBox4 ? "w" : "f") +
                (aBox5 ? "w" : "f") +
                (aBox6 ? "w" : "f");

            axios.post(`http://127.0.0.1:5000/updateQst/${props.FrageID}`, {
                frage : editedQst,
                a1: editedAns1,
                a2 : editedAns2,
                a3: editedAns3,
                a4: editedAns4,
                a5: editedAns5,
                a6: editedAns6,
                ergebniss: ergebniss
            }).then(() => {
                console.log("sucessfully updated question");
            })            
        }else{
            console.log("changes deleted");
            //display error of sorts, reset to old values
        }
    }

    const checkEdit = () =>{
        console.log("5: |" + editedAns5 + "|");
        if(!aBox1 && !aBox2 && !aBox3 && !aBox4 && !aBox5 && !aBox6){
            console.log("1: " + aBox1);
            console.log("2: " + aBox2);
            console.log("3: " + aBox3);
            console.log("4: " + aBox4);
            console.log("5: " + aBox5);
            console.log("6: " + aBox6);
            console.log("es muss mindestens eine richtige Antwort geben");
            return false; //keine richtige Anwort dabei
        }else if(editedQst === "" || editedAns1 === "" || editedAns2 === ""){
            console.log("keine Frage oder weniger als 2 Antworten");
            return false; //keine Frage oder weniger als 2 Antworten
        }else if((editedAns1.length === 0 && aBox1)||(editedAns2.length === 0 && aBox2)||(editedAns3.length === 0 && aBox3)||(editedAns4.length === 0 && aBox4)||(editedAns5.length === 0 && aBox5)||(editedAns6.length === 0 && aBox6)){
            console.log("leere Antworten können nicht richtig sein");
            return false; //leere Antwort als richtig markiert
        }else{
            return true;
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
                        <input type="checkbox" id="a1Box" defaultChecked={aBox1} onChange={() => setABox1(!aBox1)}/>
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
                        <input type="checkbox" id="a2Box" defaultChecked={aBox2} onChange={() => setABox2(!aBox2)}/>
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
                        <input type="checkbox" id="a3Box" defaultChecked={aBox3} onChange={() => setABox3(!aBox3)}/>
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
                        <input type="checkbox" id="a4Box" defaultChecked={aBox4} onChange={() => setABox4(!aBox4)}/>
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
                        <input type="checkbox" id="a5Box" defaultChecked={aBox5} onChange={() => setABox5(!aBox5)}/>
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
                        <input type="checkbox" id="a6Box" defaultChecked={aBox6} onChange={() => setABox6(!aBox6)}/>
                    </div>
                    <button className="saveButton" onClick={saveClick} ></button>                 
                </div>
        </div>        
    
    );
}