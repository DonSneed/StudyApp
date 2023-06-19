const express = require("express");
const path = require("path");
const cors = require('cors');
const mssql = require('mssql');
const { request } = require("http");

const app = express();

const config = require("./config");
const { rmSync } = require("fs");
app.use(express.json());

app.use(cors());

/* const config = {
    user:  "Enrico",
    password: "Sneed1",
    server:"DESKTOP-7JDPGSU",
    database:"StudyAppDB",
    options:{
        trustServerCertificate: true,
        trustedConnection: true,
        encrypt: true,
        enableArithAbort: true,
        instancename: "MSSQLSERVER"
    },
    port: 1433
}; */

app.post('/create', (req, res) =>{
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;

    const request = new mssql.Request();
    const sqlQuery = `INSERT INTO [Nutzer] (Username, password) VALUES ('${username}','${password}')`;

    request.query(sqlQuery, function(err, result){
        if(err) {
            console.log(err);
            return res.status(500).send("Failes to insert record");
        }
        res.send(result);
    })
})

app.post("/changeKatName", (req, res) => {
    const katName = req.body.katName;
    const katalogID = req.body.katalogID;

    const request = new mssql.Request();
    const sqlQuery = `UPDATE [Katalog] SET Katalog = '${katName}' WHERE KatalogID = ${katalogID}`;

    request.query(sqlQuery, function(err, result){
        if(err) {
            console.log(err);
            return res.status(500).send("Failes to update record");
        }
        res.send(result);
    })
})

app.post("/updateQst/:frageID", (req, res) => {
    const frageID = req.params.frageID;
    const frage = req.body.frage;
    const a1 = req.body.a1;
    const a2 = req.body.a2;
    const a3 = req.body.a3;
    const a4 = req.body.a4;
    const a5 = req.body.a5;
    const a6 = req.body.a6;
    const ergebniss = req.body.ergebniss;

    const request = new mssql.Request();
    const sqlQuery = `UPDATE Frage
    SET
        Frage = '${frage}',
        Antwort1 = '${a1}',
        Antwort2 = '${a2}',
        Antwort3 = '${a3}',
        Antwort4 = '${a4}',
        Antwort5 = '${a5}',
        Antwort6 = '${a6}',
        Ergebniss ='${ergebniss}'
    WHERE FrageID = ${frageID};
    
    `;

    request.query(sqlQuery, function(err, result){
        if(err){
            console.log(err);
            return res.status(500).send("failed to update qst");
        }
        res.send(result);
    })
})

app.post("/createKat", (req, res) => {
    const katName = req.body.katName;
    const creator = req.body.creator;

    const request = new mssql.Request();
    const sqlQuery = `INSERT INTO Katalog (KatalogID, Katalog, Ersteller, Oeffentlich) VALUES ('${katName}', ${creator}, 0)`;

    request.query(sqlQuery, function(err, result){
        if(err) {
            console.log(err);
            return res.status(500).send("Failes to update record");
        }
        res.send(result);
    })
})

app.post("/createAttempt", (req, res) => {
    const katID = req.body.katalogID;
    const userID = req.body.userID;
    const zeitpunkt = req.body.zeitpunkt;

    const request = new mssql.Request();
    const sqlQuery = `INSERT INTO Versuch (Punktestand, KatalogID, UserID, Zeitpunkt) OUTPUT inserted.VersuchID VALUES (0,'${katID}', '${userID}', '${zeitpunkt}')`;

    request.query(sqlQuery, function(err, result){
        if(err) {
            console.log(err);
            return res.status(500).send("Failes to upload record");
        }
        const versuchID = result.recordset[0].VersuchID
        res.send({VersuchID: versuchID});
    })
})

app.post("/createResult", (req, res) => {
    const richtig = req.body.richtig ? 1: 0;
    const versuchID = req.body.versuchID;
    const frageID = req.body.frageID;

    const request = new mssql.Request();
    const sqlQuery = `INSERT INTO Auswertung (Richtig, VersuchID, FrageID) VALUES ('${richtig}', '${versuchID}', '${frageID}')`;

    request.query(sqlQuery, function(err, result){
        if(err) {
            console.log(err);
            return res.status(500).send("Failed to upload record");
        }
        res.send(result);
    })
    
})

app.post("/updateAttempt", (req, res) => {
    const versuchID = req.body.versuchID;
    const points = req.body.points;

    const request = new mssql.Request();
    const sqlQuery = `UPDATE VERSUCH SET Punktestand = ${points} WHERE VersuchID = ${versuchID}`;

    request.query(sqlQuery, function(err, result){
        if(err) {
            console.log(err);
            return res.status(500).send("Failes to update Attempt");
        }
        res.send(result);
    })
})

app.post("/deleteAttempt", (req, res) =>{
    const versuchID = req.body.versuchID;

    const request = new mssql.Request();
    const sqlQuery = `DELETE FROM VERSUCH WHERE VersuchID = ${versuchID}`;

    request.query(sqlQuery, function(err, result){
        if(err) {
            console.log(err);
            return res.status(500).send("Failed to delete Attempt");
        }
        res.send(result);
    })
})

app.post("/togglePublic", (req, res) => {
    const katalogID = req.body.katalogID;
    const oeffentlich = req.body.oeffentlich;

    const request = new mssql.Request();
    const sqlQuery = `UPDATE [Katalog] SET Oeffentlich = ${oeffentlich? 0 : 1} WHERE KatalogID = ${katalogID}`;

    request.query(sqlQuery, function(err, result){
        if(err){
            console.log(err);
            return res.status(500).send("Failed to Update Katalog");
        }
        res.send(result);
    })
})

app.get('/users', (req, res) => {
    const request = new mssql.Request();
    const sqlQuery = `SELECT * from [Nutzer]`;

    request.query(sqlQuery, function(err, result){
        if(err) {
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.get("/kats/:userID", (req, res) => {
    const userID = req.params.userID;
    
    const request = new mssql.Request();
    const sqlQuery = `
    SELECT K.KatalogID, K.Katalog, K.Oeffentlich, COUNT(F.FrageID) AS QuestionCount, MAX(V.Punktestand) AS MaxScore
    FROM [Katalog] K
    LEFT JOIN [Frage] F ON K.KatalogID = F.KatalogID
    LEFT JOIN [Versuch] V ON K.KatalogID = V.KatalogID
    WHERE K.Ersteller = '${userID}'
    GROUP BY K.KatalogID, K.Katalog, K.Oeffentlich`;

    request.query(sqlQuery, function(err, result){
        if(err) {
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.get("/userOfKat/:KatalogID", (req, res) => {
    const KatalogID= req.params.KatalogID;

    const request = new mssql.Request();
    const sqlQuery = `SELECT U.*
    FROM Katalog AS K
    INNER JOIN [Nutzer] AS U ON K.Ersteller = U.NutzerID
    WHERE K.KatalogID ='${KatalogID}'`;

    request.query(sqlQuery, function(err, result){
        if(err) {
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.get("/questions/:KatalogID", (req, res) =>{
    const KatalogID = req.params.KatalogID;

    const request = new mssql.Request();
    const sqlQuery = `SELECT * FROM Frage WHERE KatalogID = ${KatalogID}`;

    request.query(sqlQuery, function(err, result){
        if(err) {
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.get("/tries/:KatalogID", (req, res) => {
    const KatalogID = req.params.KatalogID;

    const request = new mssql.Request();
    const sqlQuery = `SELECT a.*
    FROM Auswertung a
    INNER JOIN Versuch v ON a.VersuchID = v.VersuchID
    WHERE v.KatalogID = ${KatalogID}`;

    request.query(sqlQuery, function(err, result){
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

const port = process.env.PORT || 5000;

app.listen(port, () =>
    console.log(`listening on port: ${port}`)
);

mssql.connect(config, function(err) {
    if (err) throw err;
    console.log("Connected to MSSQL");
});

app.get("/test", (req, res) => {
    res.send("Welcome to the backend");
})


