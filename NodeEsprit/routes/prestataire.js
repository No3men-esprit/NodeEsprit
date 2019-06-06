/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";

var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
    res.locals.connection.query("Select u.id,u.nom,u.prenom,u.telephone,u.email, p.description,p.numberPiont ,s.description dservice from service s INNER JOIN prestataire p INNER JOIN utilisateur u where p.Uti_id = u.id and p.id = s.id ", function (error, results, fields) {
        if (error) {
            res.status(500);
            res.send({"status": false});
            res.end();
        } else {
            res.status(200);
            res.send(results);
        }
    });

});

router.get("/getPrestatairByService/:idService", function (req, res) {
    res.locals.connection.query("Select u.id,u.nom,u.prenom,u.telephone,u.email, p.description,p.numberPiont ,s.description dservice from service s INNER JOIN prestataire p INNER JOIN utilisateur u where p.Uti_id = u.id and p.id = s.id and p.id =" + req.params.idService, function (error, results, fields) {
        if (error) {
            res.status(500);
            res.send({"status": false});
            res.end();
        } else {
            res.status(200);
            res.send(results);
        }
    });

});

module.exports = router;

