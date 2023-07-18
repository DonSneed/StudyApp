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
        instancename: "MSSQLSERVER01"
    },
    port: 1433
}

module.exports = config;