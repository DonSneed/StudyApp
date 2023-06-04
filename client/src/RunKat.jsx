import {useLocation} from "react-router-dom";
import {useState, useEffect} from "react";
import "./assets/styles/RunKat.css";
import axios from "axios";

function RunKat() {

    const location = useLocation();
    const {Katalog, KatalogID} = location.state;
    const[qList, setQList] = useState([]);
    const[shuffledList, setShuffledList] = useState([]);
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
    const[a1Selected, setA1Selected] = useState(false);
    const[a2Selected, setA2Selected] = useState(false);
    const[a3Selected, setA3Selected] = useState(false);
    const[a4Selected, setA4Selected] = useState(false);
    const[a5Selected, setA5Selected] = useState(false);
    const[a6Selected, setA6Selected] = useState(false);

    let versuch = {
        richtige: 0,
        insgesamt: 0
    }


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
        versuch.insgesamt = checkAnswerAmount(shuffledList);
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
        }else{
            document.querySelector("#aBlock3").style.display = "none";            
        }
        if(shuffledList[qIndex].Antwort4){
            document.querySelector("#aBlock4").style.display = "inline-block";
        }else{
            document.querySelector("#aBlock4").style.display = "none";            
        }
        if(shuffledList[qIndex].Antwort5){
            document.querySelector("#aBlock5").style.display = "inline-block";
        }else{
            document.querySelector("#aBlock5").style.display = "none";            
        }
        if(shuffledList[qIndex].Antwort6){
            document.querySelector("#aBlock6").style.display = "inline-block";
        }else{
            document.querySelector("#aBlock6").style.display = "none";            
        }
    }

    const submitAnswer = () => {
        if(qIndex >= shuffledList.length){
            //quiz ending
            setDone(true);
            console.log("qindex: " + qIndex)
            console.log("shuffledList: " + shuffledList.length);
            console.log("done");
        }else{
            //check Answers
            console.log("The correct answers are: " + shuffledList[qIndex].Ergebniss);
            checkAnswers();
            //save Auswertung to db 
            //and display content of next object in shuffledList
            console.log((shuffledList.length - qIndex) + " more questions");

            setIndex(qIndex+1);
        }
    }

    const checkAnswers = () => {
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
            console.log(shuffledList[qIndex].Antwort1 + "richtig");
        }
        if((shuffledList[qIndex].Ergebniss.includes(shuffledList[qIndex].Antwort2) && a2Selected) || (!shuffledList[qIndex].Ergebniss.includes(shuffledList[qIndex].Antwort2) && !a2Selected)){
            correctCounter = correctCounter + 1;
            console.log(shuffledList[qIndex].Antwort2 + "richtig");

        }
        if(shuffledList[qIndex].Antwort3){
            if((shuffledList[qIndex].Ergebniss.includes(shuffledList[qIndex].Antwort3) && a3Selected) || (!shuffledList[qIndex].Ergebniss.includes(shuffledList[qIndex].Antwort3) && !a3Selected)){
                correctCounter = correctCounter + 1;
                console.log(shuffledList[qIndex].Antwort3 + "richtig3");
            }
        }
        if(shuffledList[qIndex].Antwort4){
            if((shuffledList[qIndex].Ergebniss.includes(shuffledList[qIndex].Antwort4) && a4Selected) || (!shuffledList[qIndex].Ergebniss.includes(shuffledList[qIndex].Antwort4) && !a4Selected)){
                correctCounter = correctCounter + 1;
                console.log(shuffledList[qIndex].Antwort4 + "richtig4");
            }
        }
        if(shuffledList[qIndex].Antwort5){
            if((shuffledList[qIndex].Ergebniss.includes(shuffledList[qIndex].Antwort5) && a5Selected) || (!shuffledList[qIndex].Ergebniss.includes(shuffledList[qIndex].Antwort5) && !a5Selected)){
                correctCounter = correctCounter + 1;
                console.log(shuffledList[qIndex].Antwort5 + " richtig5");
            }
        } 
        if(shuffledList[qIndex].Antwort6){
            if((shuffledList[qIndex].Ergebniss.includes(shuffledList[qIndex].Antwort6) && a6Selected) || (!shuffledList[qIndex].Ergebniss.includes(shuffledList[qIndex].Antwort6) && !a6Selected)){
                correctCounter = correctCounter + 1;
                console.log(shuffledList[qIndex].Antwort6 + " richtig6");
            }
        }
        console.log("Die Frage hat " + aCounter + " Antworten von denen " + correctCounter + " richtig angekreuzt wurden");
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

    const checkAnswerAmount = (list) =>{
        let amount = list.length * 2;
        for(let i = 0; i < list.length; i++){
            if(list[i].Antwort3){
                amount++;
            }
            if(list[i].Antwort4){
                amount++;
            }
            if(list[i].Antwort5){
                amount++;
            }
            if(list[i].Antwort6){
                amount++;
            }
        }
        return amount;
    }

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
                        <textarea id ="aBlock1" defaultValue={currentA1} readOnly={true} onClick={() => handleAnswerSelection(1)} /* style={{background: a1Selected? "#35A148" : "transparent"}} */ ></textarea>
                        <textarea id ="aBlock2" defaultValue={currentA2} readOnly={true} onClick={() => handleAnswerSelection(2)} ></textarea>
                        <textarea id ="aBlock3" defaultValue={currentA3} readOnly={true} onClick={() => handleAnswerSelection(3)} ></textarea>
                        <textarea id ="aBlock4" defaultValue={currentA4} readOnly={true} onClick={() => handleAnswerSelection(4)} ></textarea>
                        <textarea id ="aBlock5" defaultValue={currentA5} readOnly={true} onClick={() => handleAnswerSelection(5)} ></textarea>
                        <textarea id ="aBlock6" defaultValue={currentA6} readOnly={true} onClick={() => handleAnswerSelection(6)} ></textarea>
                     </div>
                     <button onClick={submitAnswer}>submit</button>
                     
                </div>
            </div>
        </div>
    )
}

export default RunKat