import {useLocation} from "react-router-dom";
import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./assets/styles/RunKat.css";
import axios from "axios";

function RunKat() {

    const location = useLocation();
    const {Katalog, KatalogID, currentUser} = location.state;
    const[qList, setQList] = useState([]);
    const[shuffledList, setShuffledList] = useState([]);
    const[welcome, setWelcome] = useState(true);
    const[done, setDone] = useState(false);
    const[submitToggle, setSubmitToggle] = useState(true);
    const[currentUserID, setCurrentUserID] = useState({});
    const[currentVersuch, setCurrentVersuch] = useState((0));
    const[qIndex, setIndex] = useState(0);
    const[points, setPoints] = useState(0);
    const[currentQ, setCurrentQ] = useState("");
    const[currentA1, setCurrentA1] = useState("");
    const[currentA2, setCurrentA2] = useState("");
    const[currentA3, setCurrentA3] = useState("");
    const[currentA4, setCurrentA4] = useState("");
    const[currentA5, setCurrentA5] = useState("");
    const[currentA6, setCurrentA6] = useState("");
    const[a1Selected, setA1Selected] = useState(false);
    const[a2Selected, setA2Selected] = useState(false);
    const[a3Selected, setA3Selected] = useState(false);
    const[a4Selected, setA4Selected] = useState(false);
    const[a5Selected, setA5Selected] = useState(false);
    const[a6Selected, setA6Selected] = useState(false);
    const[showCancelWindow, setShowCancelWindow] = useState(false);
    const[cancelAnswer, setCancelAnswer] = useState(null); //???
    const[userList, setUserList] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {        //get data regarding Katalogue from DB. Questions+Answers, Tries, Error%
        axios.get(`http://127.0.0.1:5000/questions/${KatalogID}`, {
            data: { KatalogID: KatalogID}
        })
        .then((response) => {
            setQList(response.data.recordset);
            setShuffledList(setErgebniss(shuffleList(response.data.recordset)));

        })
        .catch((error) => {
            console.log(error);
        });

        axios.get(`http://127.0.0.1:5000/userOfKat/${KatalogID}`, {
            data: { KatalogID: KatalogID}
        })
        .then((response) => {
            setCurrentUserID(response.data.recordset[0]);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    const startQuiz = () => {
        let firstRound = 2;
        const jetzt = new Date().toISOString().slice(0, 19).replace('T', ' ');
        axios.post('http://127.0.0.1:5000/createAttempt', {
                katalogID: KatalogID,
                userID: currentUserID.NutzerID,
                zeitpunkt: jetzt,
                }).then((response) => {
                setCurrentVersuch(response.data.VersuchID);
                
            });
        setWelcome(!welcome);
        setCurrentQ(shuffledList[qIndex].Frage);
        setCurrentA1(shuffledList[qIndex].Antwort1);
        setCurrentA2(shuffledList[qIndex].Antwort2);
        setCurrentA3(shuffledList[qIndex].Antwort3);
        setCurrentA4(shuffledList[qIndex].Antwort4);
        setCurrentA5(shuffledList[qIndex].Antwort5);
        setCurrentA6(shuffledList[qIndex].Antwort6);
        if(shuffledList[qIndex].Antwort3){
            document.querySelector("#aBlock3").style.display = "inline-block";
            firstRound = firstRound + 1;
        }else{
            document.querySelector("#aBlock3").style.display = "none";            
        }
        if(shuffledList[qIndex].Antwort4){
            document.querySelector("#aBlock4").style.display = "inline-block";
            firstRound = firstRound + 1;
        }else{
            document.querySelector("#aBlock4").style.display = "none";            
        }
        if(shuffledList[qIndex].Antwort5){
            document.querySelector("#aBlock5").style.display = "inline-block";
            firstRound = firstRound + 1;
        }else{
            document.querySelector("#aBlock5").style.display = "none";            
        }
        if(shuffledList[qIndex].Antwort6){
            document.querySelector("#aBlock6").style.display = "inline-block";
            firstRound = firstRound + 1;
        }else{
            document.querySelector("#aBlock6").style.display = "none";            
        }
        setPoints(firstRound);
    }

    const submitAnswer = () => {
        if(qIndex >= shuffledList.length){
            //quiz ending
            setDone(true);
            setCurrentQ("Quiz abgeschlossen mit " + points + " Punkten");
            document.querySelector("#aBlock1").style.display = "none";  
            document.querySelector("#aBlock2").style.display = "none";  
            document.querySelector("#aBlock3").style.display = "none";  
            document.querySelector("#aBlock4").style.display = "none";  
            document.querySelector("#aBlock5").style.display = "none";  
            document.querySelector("#aBlock6").style.display = "none";  
            console.log("qindex: " + qIndex)
            console.log("shuffledList: " + shuffledList.length);
            console.log("done");
            //update result in db
            axios.post('http://127.0.0.1:5000/updateAttempt', {
                versuchID: currentVersuch,
                points: points,
                }).then(() => {
                    console.log("attempt updated");
            });
            setTimeout(() =>{
                navigate("/LandingPage", { state: currentUser});
              }, 1500);

        }else{
            //check Answers
            console.log("The correct answers are: " + shuffledList[qIndex].Ergebniss);
            console.log("frageID: ", shuffledList[qIndex].FrageID);
            console.log("versuchID: ", currentVersuch);
            //save Auswertung to db
            checkAnswers();
            //and display content of next object in shuffledList
            console.log((shuffledList.length - qIndex) + " more questions");
        }
        if(qIndex + 1 < qList.length){
            setSubmitToggle(false);
        }
        setIndex(qIndex + 1);
    }

    const nextQuestion = () => {
        let nextRound = 2;
        setCurrentQ(shuffledList[qIndex].Frage);
        setA1Selected(false);
        setCurrentA1(shuffledList[qIndex].Antwort1);
        document.querySelector("#aBlock1").style.backgroundColor = "transparent";
        setA2Selected(false);
        setCurrentA2(shuffledList[qIndex].Antwort2);
        document.querySelector("#aBlock2").style.backgroundColor = "transparent";
        setA3Selected(false);
        setCurrentA3(shuffledList[qIndex].Antwort3);
        document.querySelector("#aBlock3").style.backgroundColor = "transparent";
        setA4Selected(false);
        setCurrentA4(shuffledList[qIndex].Antwort4);
        document.querySelector("#aBlock4").style.backgroundColor = "transparent";
        setA5Selected(false);
        setCurrentA5(shuffledList[qIndex].Antwort5);
        document.querySelector("#aBlock5").style.backgroundColor = "transparent";
        setA6Selected(false);
        setCurrentA6(shuffledList[qIndex].Antwort6);
        document.querySelector("#aBlock6").style.backgroundColor = "transparent";
        if(shuffledList[qIndex].Antwort3){
            document.querySelector("#aBlock3").style.display = "inline-block";
            nextRound = nextRound + 1;
        }else{
            document.querySelector("#aBlock3").style.display = "none";            
        }
        if(shuffledList[qIndex].Antwort4){
            document.querySelector("#aBlock4").style.display = "inline-block";
            nextRound = nextRound + 1;
        }else{
            document.querySelector("#aBlock4").style.display = "none";            
        }
        if(shuffledList[qIndex].Antwort5){
            document.querySelector("#aBlock5").style.display = "inline-block";
            nextRound = nextRound + 1;
        }else{
            document.querySelector("#aBlock5").style.display = "none";            
        }
        if(shuffledList[qIndex].Antwort6){
            document.querySelector("#aBlock6").style.display = "inline-block";
            nextRound = nextRound + 1;
        }else{
            document.querySelector("#aBlock6").style.display = "none";            
        }
        setSubmitToggle(true);
        setPoints(points + nextRound);
    }

    const checkAnswers = () => {
        let noErrors = true;
        let aCounter = 2;
        let correctCounter = 0;
        if(shuffledList[qIndex].Antwort3){
            aCounter = aCounter +1;
        }
        if(shuffledList[qIndex].Antwort4){
            aCounter = aCounter +1;
        }
        if(shuffledList[qIndex].Antwort5){
            aCounter = aCounter +1;
        }
        if(shuffledList[qIndex].Antwort6){
            aCounter = aCounter +1;
        }

        if((shuffledList[qIndex].Ergebniss.includes(shuffledList[qIndex].Antwort1) && a1Selected) || (!shuffledList[qIndex].Ergebniss.includes(shuffledList[qIndex].Antwort1) && !a1Selected)){
            correctCounter = correctCounter + 1;
            document.querySelector("#aBlock1").style.backgroundColor = "#35A148";
            console.log(shuffledList[qIndex].Antwort1 + "richtig");
        }else{
            document.querySelector("#aBlock1").style.backgroundColor = "#A13549";
            console.log(shuffledList[qIndex].Antwort1 + "FALSCH");
        }

        if((shuffledList[qIndex].Ergebniss.includes(shuffledList[qIndex].Antwort2) && a2Selected) || (!shuffledList[qIndex].Ergebniss.includes(shuffledList[qIndex].Antwort2) && !a2Selected)){
            correctCounter = correctCounter + 1;
            document.querySelector("#aBlock2").style.backgroundColor = "#35A148";
            console.log(shuffledList[qIndex].Antwort2 + "richtig");

        }else{
            document.querySelector("#aBlock2").style.backgroundColor = "#A13549";
            console.log(shuffledList[qIndex].Antwort2 + "FALSCH");

        }
        
        if(shuffledList[qIndex].Antwort3 !== ""){
            if((shuffledList[qIndex].Ergebniss.includes(shuffledList[qIndex].Antwort3) && a3Selected) || (!shuffledList[qIndex].Ergebniss.includes(shuffledList[qIndex].Antwort3) && !a3Selected)){
                correctCounter = correctCounter + 1;
                document.querySelector("#aBlock3").style.backgroundColor = "#35A148";
                console.log(shuffledList[qIndex].Antwort3 + "richtig3");
            }else{
                document.querySelector("#aBlock3").style.backgroundColor = "#A13549";
                console.log(shuffledList[qIndex].Antwort3 + "FALSCH");
    
            }
        }

        if(shuffledList[qIndex].Antwort4 !== ""){
            if((shuffledList[qIndex].Ergebniss.includes(shuffledList[qIndex].Antwort4) && a4Selected) || (!shuffledList[qIndex].Ergebniss.includes(shuffledList[qIndex].Antwort4) && !a4Selected)){
                correctCounter = correctCounter + 1;
                document.querySelector("#aBlock4").style.backgroundColor = "#35A148";
                console.log(shuffledList[qIndex].Antwort4 + "richtig4");
            }else{
                document.querySelector("#aBlock4").style.backgroundColor = "#A13549";
                console.log(shuffledList[qIndex].Antwort4 + "FALSCH");
    
        }
        }

        if(shuffledList[qIndex].Antwort5 !== ""){
            if((shuffledList[qIndex].Ergebniss.includes(shuffledList[qIndex].Antwort5) && a5Selected) || (!shuffledList[qIndex].Ergebniss.includes(shuffledList[qIndex].Antwort5) && !a5Selected)){
                correctCounter = correctCounter + 1;
                document.querySelector("#aBlock5").style.backgroundColor = "#35A148";
                console.log(shuffledList[qIndex].Antwort5 + " richtig5");
            }else{
                document.querySelector("#aBlock5").style.backgroundColor = "#A13549";
                console.log(shuffledList[qIndex].Antwort5 + "FALSCH");
    
            }
        }

        if(shuffledList[qIndex].Antwort6 !== ""){
            if((shuffledList[qIndex].Ergebniss.includes(shuffledList[qIndex].Antwort6) && a6Selected) || (!shuffledList[qIndex].Ergebniss.includes(shuffledList[qIndex].Antwort6) && !a6Selected)){
                correctCounter = correctCounter + 1;
                document.querySelector("#aBlock6").style.backgroundColor = "#35A148";
                console.log(shuffledList[qIndex].Antwort6 + " richtig6");
            }else{
                document.querySelector("#aBlock6").style.backgroundColor = "#A13549";
                console.log(shuffledList[qIndex].Antwort6 + "FALSCH");
    
            }
        }

        if(aCounter !== correctCounter){
            noErrors = false;
        }
        console.log("Die Frage hat " + aCounter + " Antworten von denen " + correctCounter + " richtig angekreuzt wurden");
        axios.post('http://127.0.0.1:5000/createResult', {
                richtig: noErrors,
                frageID: shuffledList[qIndex].FrageID,
                versuchID: currentVersuch,
                }).then(() => {
                    console.log("result created");
            });
        setPoints(points + correctCounter);

    }

    const handleAnswerSelection = (aArea) => {
        switch (aArea) {
            case 1:
                setA1Selected(!a1Selected);
                if(a1Selected){
                    document.querySelector("#aBlock1").style.backgroundColor = "transparent"
                }else{
                    document.querySelector("#aBlock1").style.backgroundColor = "#35A148"
                }
                break;
            case 2:
                setA2Selected(!a2Selected);
                if(a2Selected){
                    document.querySelector("#aBlock2").style.backgroundColor = "transparent"
                }else{
                    document.querySelector("#aBlock2").style.backgroundColor = "#35A148"
                }
                break;
            case 3:
                setA3Selected(!a3Selected);
                if(a3Selected){
                    document.querySelector("#aBlock3").style.backgroundColor = "transparent"
                }else{
                    document.querySelector("#aBlock3").style.backgroundColor = "#35A148"
                }
                break;
            case 4:
                setA4Selected(!a4Selected);
                if(a4Selected){
                    document.querySelector("#aBlock4").style.backgroundColor = "transparent"
                }else{
                    document.querySelector("#aBlock4").style.backgroundColor = "#35A148"
                }
                break;
            case 5:
                setA5Selected(!a5Selected);
                if(a5Selected){
                    document.querySelector("#aBlock5").style.backgroundColor = "transparent"
                }else{
                    document.querySelector("#aBlock5").style.backgroundColor = "#35A148"
                }
                break;
            case 6:
                setA6Selected(!a6Selected);
                if(a6Selected){
                    document.querySelector("#aBlock6").style.backgroundColor = "transparent"
                }else{
                    document.querySelector("#aBlock6").style.backgroundColor = "#35A148"
                }
                break;
            default:
                break;
        }
    }

    const shuffleList = (list) => {
        //shuffle Questions
        for(let i = list.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [list[i], list[j]] = [list[j], list[i]];
        }       
        //shufflen
        
        return list;
    };

    const setErgebniss = (list) => {
        //save right answers in e variable
        for(let i = 0; i < list.length; i++){
            let e = [];
            if(list[i].Ergebniss[0]  === 'w'){
                e.push(list[i].Antwort1);
            }
            if(list[i].Ergebniss[1]  === 'w'){
                e.push(list[i].Antwort2);
            }
            if(list[i].Ergebniss[2]  === 'w'){
                e.push(list[i].Antwort3);
            }
            if(list[i].Ergebniss[3]  === 'w'){
                e.push(list[i].Antwort4);
            }
            if(list[i].Ergebniss[4]  === 'w'){
                e.push(list[i].Antwort5);
            }
            if(list[i].Ergebniss[5]  === 'w'){
                e.push(list[i].Antwort6);
            }
            list[i].Ergebniss = e;
        }
        //shuffle answers
        for(let i = 0; i < list.length; i++){
            let max = 2;
            if(list[i].Antwort3){
                max = max + 1;
            }
            if(list[i].Antwort4){
                max = max + 1;
            }
            if(list[i].Antwort5){
                max = max + 1;
            }
            if(list[i].Antwort6){
                max = max + 1;
            }

            const antwortVars = ["Antwort1", "Antwort2", "Antwort3", "Antwort4", "Antwort5", "Antwort6"];
            const filledVars = antwortVars.slice(0, max);

            for(let j = filledVars.length -1; j > 0; j--){
                const rando = Math.floor(Math.random() * (j + 1));
                const temp = list[i][filledVars[j]];
                list[i][filledVars[j]] = list[i][filledVars[rando]];
                list[i][filledVars[rando]] = temp;
            }
        }
        return list;
        
        
    }

    const CancelQuizWindow = () => {
        const handleCancel = () =>{
            axios.get("http://127.0.0.1:5000/users")
                .then((response) => {
                    setUserList(response.data.recordset);
                })
                .catch((error) =>{
                    console.log(error);
            })
            
            //cancelQuiz
            axios.post('http://127.0.0.1:5000/deleteAttempt', {
                versuchID: currentVersuch,
                }).then(() => {
                    console.log("Attempt deleted");
            });
            navigate("/LandingPage", { state: currentUserID});
        };
    
        const handleContinue = () =>{
            //continueQuiz
            setShowCancelWindow(false);
        };
            
        return (
            <div className="cancelQuizWindow">
                <h3>Möchten Sie den aktuellen Versuch wirklich abbrechen?</h3>
                <div>
                    <button onClick={handleCancel} id="confirmCancelQuizB">Ja</button>
                    <button onClick={handleContinue} id="cancelCancelQuizB">Nein</button>
                </div>
            </div>
        );
        
    }

    const cancelQuizAttempt = () => {
        setShowCancelWindow(true);
    }

    
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
                     <div id="infobar">
                        <h5>Punkte: {points}</h5>
                        <button id="cancelQuizB" onClick={cancelQuizAttempt}></button>
                     </div>
                     {showCancelWindow && <CancelQuizWindow />}
                     <textarea id="qBlock" defaultValue={currentQ} readOnly={true}></textarea>
                     <div id="AnswerBlock">
                        <textarea id ="aBlock1" defaultValue={currentA1} readOnly={true} onClick={() => handleAnswerSelection(1)} ></textarea>
                        <textarea id ="aBlock2" defaultValue={currentA2} readOnly={true} onClick={() => handleAnswerSelection(2)} ></textarea>
                        <textarea id ="aBlock3" defaultValue={currentA3} readOnly={true} onClick={() => handleAnswerSelection(3)} ></textarea>
                        <textarea id ="aBlock4" defaultValue={currentA4} readOnly={true} onClick={() => handleAnswerSelection(4)} ></textarea>
                        <textarea id ="aBlock5" defaultValue={currentA5} readOnly={true} onClick={() => handleAnswerSelection(5)} ></textarea>
                        <textarea id ="aBlock6" defaultValue={currentA6} readOnly={true} onClick={() => handleAnswerSelection(6)} ></textarea>
                     </div>
                     <button id="submitAnswerB" onClick={submitToggle? submitAnswer : nextQuestion}>{submitToggle ? "bestätigen" : "nächste Frage"}</button>
                </div>
            </div>
        </div>
    )
}

export default RunKat