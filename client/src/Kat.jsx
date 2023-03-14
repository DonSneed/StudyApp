import React, { useState } from "react";
import "./assets/styles/Kat.css";

export default function Kat(props) {
    const[editMode, setEditMode] = useState(false);
    const[content, setContent] = useState(props.Katalog);

    const makeEditable = () => {
        setEditMode(true);
    };

    const submitEdit = () => {
        setEditMode(false);
        props.updateContent(content);
    };

    const handleEdit = (e) => {
        setContent(e.target.textContent);
    };

    return (
        <div className="Kat">
            <p
                contentEditable={editMode}
                onClick={makeEditable}
                onBlur={submitEdit}
                onInput={handleEdit}
            >{content}</p>
        </div>
    )
}