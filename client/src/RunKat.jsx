import {useLocation} from "react-router-dom";
import {useState, useEffect} from "react";
import "./assets/styles/RunKat.css";
import axios from "axios";

function RunKat() {

    const location = useLocation();
    const {Katalog, KatalogID} = location.state;
    const[qList, setQList] = useState([]);
    const[tryList, setTryList] = useState([]);
    const[welcome, setWelcome] = useState(true);
    const[done, setDone] = useState(false);
    const[qIndex, setIndex] = useState(0);
    const[currentQ, setCurrentQ] = useState("");
    const[currentA1, setCurrentA1] = useState("");
    const[currentA2, setCurrentA2] = useState("");
    const[currentA3, setCurrentA3] = useState("");
    const[currentA4, setCurrentA4] = useState("");
    const[currentA5, setCurrentA5] = useState("");
    const[currentA6, setCurrentA6] = useState("");

    let shuffledList;

    useEffect(() => {        //get data regarding Katalogue from DB. Questions+Answers, Tries, Error%
        axios.get(`http://127.0.0.1:5000/questions/${KatalogID}`, {
            data: { KatalogID: KatalogID}
        })
        .then((response) => {
            setQList(response.data.recordset);
        })
        .catch((error) => {
            console.log(error);
        });


        axios.get(`http://127.0.0.1:5000/tries/${KatalogID}`, {
            data: { KatalogID: KatalogID}
        })
        .then((response) => {
            setTryList(response.data.recordset);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    const startQuiz = () => {
        setWelcome(!welcome);
        shuffledList = shuffleList(qList);
        setCurrentQ(shuffledList[qIndex].Frage);
        setCurrentA1(shuffledList[qIndex].Antwort1);
        setCurrentA2(shuffledList[qIndex].Antwort2);
        setCurrentA3(shuffledList[qIndex].Antwort3);
        setCurrentA4(shuffledList[qIndex].Antwort4);
        setCurrentA5(shuffledList[qIndex].Antwort5);
        setCurrentA6(shuffledList[qIndex].Antwort6);
        setIndex(qIndex + 1);
        console.log(shuffledList);
        
    }

    const submitAnswer = () => {
        console.log("list: " + shuffledList);
        /* if(qIndex >= shuffledList.length){
            //quiz ending
            setDone(true);
            console.log("qindex: " + qIndex)
            console.log("shuffledList: " + shuffledList.length);
            console.log("done");
        }else{
            console.log((shuffledList.length - qIndex) + " more questions");
            setIndex(qIndex+1);

        } */
    }

    const shuffleList = (list) => {
        for(let i = list.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [list[i], list[j]] = [list[j], list[i]];
        }
        return list;
    };


    
    return(
        <div className="RunKat">
            <div className="RunCard">
                <div id="WelcomeWindow" className="Window" style={{ display: welcome ? "flex" : "none"}}>
                    <h3>{Katalog}</h3>
                    <div className="KatInfo">
                        <p>Fragen: {qList.length}</p>
                        <p>Versuche: </p>
                        <p>Fehlerquote: </p>
                    </div>
                    <button id="startQuizB"
                        onClick={startQuiz}></button>
                </div>
                <div id="MainWindow" className="Window" style={{ display: welcome ? "none" : "flex"}}>
                     <textarea defaultValue={currentQ} readOnly={true}></textarea>
                     <div id="AnswerBlock">
                        <textarea defaultValue={currentA1} readOnly={true}></textarea>
                        <textarea defaultValue={currentA2} readOnly={true}></textarea>
                        <textarea defaultValue={currentA3} readOnly={true}></textarea>
                        <textarea defaultValue={currentA4} readOnly={true}></textarea>
                        <textarea defaultValue={currentA5} readOnly={true}></textarea>
                        <textarea defaultValue={currentA6} readOnly={true}></textarea>
                     </div>
                     <button onClick={submitAnswer}>submit</button>
                     
                </div>
            </div>
        </div>
    )
}

export default RunKat