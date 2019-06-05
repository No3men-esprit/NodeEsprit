/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";

var express = require("express");
var router = express.Router();
//exemple body {"Uti_id":6, "Cli_id": 1,"description":"description","image":"","dateDemande":"2019-01-01","dateFunction":"2019-01-01"}
router.post("/add", function (req, res) {
    res.locals.connection.query("insert into demande(Uti_id,Cli_id,description,image,dateDemande,dateFunction,acceptation_prestataire) values(" + req.body.Uti_id + "," + req.body.Cli_id + ",'" + req.body.description + "','" + req.body.image + "','" + req.body.dateDemande + "','" + req.body.dateFunction + "',0)",
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

router.get("/getAllDemandeAccepter/:idclient", function (req, res) {
    res.locals.connection.query("Select d.id,d.description description, s.description sdescription,u.nom,u.prenom,d.dateFunction,d.prix from utilisateur u INNER JOIN prestataire p INNER JOIN demande d INNER JOIN service s where s.id = p.id and u.id = p.Uti_id and p.Uti_id = d.Uti_id and d.Cli_id = " + req.params.idclient + " and d.acceptation_prestataire = 1",
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

router.get("/getAllNewDemande/:idprestataire", function (req, res) {
    res.locals.connection.query("Select uc.id idclient,d.id,d.description description,uc.nom,uc.prenom,d.dateFunction,d.image,d.prix from utilisateur u INNER JOIN prestataire p INNER JOIN demande d INNER JOIN client c INNER JOIN utilisateur uc  where uc.id = c.id and c.id = d.Cli_id and p.Uti_id = " + req.params.idprestataire + " and u.id = p.Uti_id and d.Uti_id = p.Uti_id and  d.acceptation_prestataire = 0",
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
//exemple body {"id":18,"prix":1000}
router.put("/ConfirmerDemande", function (req, res) {
    res.locals.connection.query("UPDATE demande SET acceptation_prestataire = 1 , prix = " + req.body.prix + " where id =" + req.body.id,
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
module.exports = router;