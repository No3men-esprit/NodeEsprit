/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const express = require('express');
const bodyParser = require('body-parser');
var mysql = require("mysql");

var service = require("./routes/service");
var annonce = require("./routes/annonce");
var demande = require("./routes/demande");
var pays = require("./routes/pays");
var region = require("./routes/region");
var ville = require("./routes/ville");
var prestataire = require("./routes/prestataire");
// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(function (req, res, next) {
    res.locals.connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'fixit'
    });
    res.locals.connection.connect();
    next();
});
// define a simple route
app.use("/service", service);
app.use("/annonce", annonce);
app.use("/demande", demande);
app.use("/pays", pays);
app.use("/region", region);
app.use("/ville", ville);
app.use("/prestataire", prestataire);
app.get('/', (req, res) => {
    res.json({"message": "Welcome to nodesprit application"});
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
module.exports = app;