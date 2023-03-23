const express = require("express");
const path = require("path");
const cors = require('cors');
const mssql = require('mssql');
const { request } = require("http");

const app = express();
app.use(express.json());

app.use(cors());

const config = {
    user:  "Enrico",
    password: "Sneed1",
    server:"BE1CA899",
    database:"StudyAppDB",
    options:{
        trustServerCertificate: true,
        trustedConnection: true,
        encrypt: true,
        enableArithAbort: true,
        instancename: "MSSQLSERVER"
    },
    port: 1433
};

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

app.post("/createKat", (req, res) => {
    const katName = req.body.katName;
    const creator = req.body.creator;

    const request = new mssql.Request();
    const sqlQuery = `INSERT INTO Katalog (Katalog, Ersteller) VALUES ('${katName}', ${creator})`;

    request.query(sqlQuery, function(err, result){
        if(err) {
            console.log(err);
            return res.status(500).send("Failes to update record");
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
    SELECT K.KatalogID, K.Katalog, COUNT(F.FrageID) AS QuestionCount, MAX(V.Punktestand) AS MaxScore
    FROM [Katalog] K
    LEFT JOIN [Frage] F ON K.KatalogID = F.KatalogID
    LEFT JOIN [Versuch] V ON K.KatalogID = V.KatalogID
    WHERE K.Ersteller = '${userID}'
    GROUP BY K.KatalogID, K.Katalog`;

    request.query(sqlQuery, function(err, result){
        if(err) {
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


