import React, { useState } from "react";
import axios from "axios";
import "./assets/styles/Kat.css";
import { useEffect } from "react";
import {Navigate, useNavigate} from "react-router-dom";

export default function Kat(props) {
    const[editMode, setEditMode] = useState(false);
    const[content, setContent] = useState(props.Katalog);
    const[katNameError, setKatNameError] = useState(false);
    const[isPublic, setIsPublic] = useState(props.Oeffentlich);
    const[currentUser, setCurrentUser] = useState(props.currentUser);
    const[delBoxChecked, setDelBoxChecked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        /* console.log("content: " + content); */
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
    
    const goEdit = () =>{
        navigate(`/EditKat/${props.KatalogID}`, {state: {Katalog: props.Katalog, KatalogID: props.KatalogID}});
    }

    const goPlay = () =>{
/*         navigate(`/RunKat/${props.KatalogID}`, {state: {Katalog: props.Katalog, KatalogID: props.KatalogID}});
 */        navigate(`/RunKat/${props.KatalogID}`, {state: {Katalog: props.Katalog, KatalogID: props.KatalogID, currentUser: currentUser}});
    }

    const togglePublic = () => {
        axios.post('http://127.0.0.1:5000/togglePublic', {
            katalogID: props.KatalogID,
            oeffentlich: isPublic,
            }).then(() => {
            console.log("success");
        });
        console.log(props.KatalogID)
        console.log(isPublic? "ye" : "no");
        setIsPublic(!isPublic);
    }

    const handleDelBoxChange = () => {
        setDelBoxChecked(!delBoxChecked);
        if(!delBoxChecked){
            props.setDelSelection((prevSelection) => [...prevSelection, props.KatalogID]);
        }else{
            props.setDelSelection((prevSelection) =>
                prevSelection.filter((id) => id !== props.KatalogID))
        }
    }

    
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
                <div className="KatActionIcons">
                    <button id="publicB" onClick={togglePublic} className={`${isPublic ? 'public' : 'notPublic'}`}></button>
                    <button id="editB" onClick={goEdit}></button>
                    <button id="playB" onClick={goPlay}></button>
                    {props.deleteMode && (
                        <input 
                            type="checkbox"
                            checked={delBoxChecked}
                            onChange={handleDelBoxChange}
                        />
                    )}
                </div>
        </div>
    )
}