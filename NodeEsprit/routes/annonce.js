/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


"use strict";

var express = require("express");
var router = express.Router();
//exemple body {"idclient":7, "idservice": 2, "date":"2019-01-01","description":"description","image":"","minprix":"100","maxprix":"100"}
router.post("/add", function (req, res) {
    res.locals.connection.query("insert into annonce(idclient,idservice,date,description,image,minprix,maxprix) values(?," + req.body.idservice + ",'" + req.body.date + "','" + req.body.description + "','" + req.body.image + "'," + req.body.minprix + "," + req.body.maxprix + ")",
            function (error, results, fields) {
                if (error) {
                    throw error;
                    res.status(500);
                    res.send({"status": false});
                } else {
                    res.status(200);
                    res.send({"status": true});
                }
            });

});

router.get("/getAnnoncePublier/:idservice", function (req, res) {
    res.locals.connection.query("Select a.id,a.idclient,a.idservice,a.description,a.image,a.minprix,a.maxprix,u.nom,u.prenom from annonce a INNER JOIN utilisateur u where u.id = a.idclient and idservice=" + req.params.idservice + " and publier = 1",
            function (error, results, fields) {
                if (error) {
                    throw error;
                    res.status(500);
                    res.send({"status": false});
                } else {
                    res.status(200);
                    res.send(results);
                }
            });


});

router.get("/getAnnonceByIdClient/:idclient", function (req, res) {
    res.locals.connection.query("Select a.id,a.idclient,a.idservice,a.title,a.description,a.minprix,a.maxprix,u.nom,u.prenom from annonce a INNER JOIN utilisateur u where u.id = a.idclient and a.idclient=" + req.params.idclient,
            function (error, results, fields) {
                if (error) {
                    throw error;
                    res.status(500);
                    res.send({"status": false});
                } else {
                    res.status(200);
                    res.send(results);
                }
            });


});

module.exports = router;