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
}

module.exports = config;