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
};

app.get("/test", (req, res) => {
    res.send("welcome to the backend");
})

app.post('/create', (req, res) =>{
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;

    const request = new mssql.Request();
    const sqlQuery = `INSERT INTO [Nutzer] (Username, password) VALUES ('${user}','${password}')`;

    request.query(sqlQuery, function(err, result){
        if(err) {
            console.log(err);
            return res.status(500).send("Failes to insert record");
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


