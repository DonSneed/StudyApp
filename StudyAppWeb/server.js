import express from "express"
import mssql from "mssql"
import cors from "cors"
const app = express()

app.use(cors())
app.use(express.json())

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

app.post('/create', (req, res) =>{
    console.log(req.body);
    const name = req.body.name;
    const password = req.body.password;

    const request = new mssql.Request();
    const sqlQuery = "INSERT INTO [dbo].[User] (name, password) VALUES ('${name}','${password}')";

    request.query(sqlQuery, function(err, result){
        if(err) {
            console.log(err);
            return res.status(500).send("Failes to insert record");
        }
        res.send("Record inserted");
    })
})

mssql.connect(config, function(err) {
    if (err) throw err;
    console.log("Connected to MSSQL");
});

app.get('/', function(req, res) {
    const request = new mssql.Request();
    request.query('SELECT * FROM users', function (err, result){
        if (err) throw err;
        res.send(result);
    });
});

app.listen(1433, ()=> {
    console.log("Yey, our server is running on port 1433");
});

app.listen(5173, ()=> {
    console.log("Yey, our project is running on port 5173");
});