/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


"use strict";

var express = require("express");
var router = express.Router();
var bcrypt = require('bcrypt');
 var desc;
router.get("/:nom/:prenom/:mail/:login/:pwd/:phone/:idpays/:idreg/:idville/:type/:secteur/:code", function (req, res) {
    let hash = bcrypt.hashSync( req.params.pwd, 12).replace(/^\$2b/, "$2y");
 
res.locals.connection.query("insert into adresse (Pay_id,Reg_id,Vil_id,description) values (  '" + req.params.idpays+ "', '" + req.params.idreg + "','" + req.params.idville + "',' ')",
            function (error, results, fields) {
                if (error) {
                    throw error;
                    res.status(500);
                    res.send({"status": false});
                } else {
                    res.status(200);
                    //res.send({"status": true});
                     console.log(results.insertId);

                     res.locals.connection.query("insert into utilisateur (Adr_id,nom,prenom,login,motdepasse,telephone,email,nbPoint,validation,code) values ( '" + results.insertId + "','" +req.params.nom+ "','" + req.params.prenom + "', '" + req.params.login + "', '" +hash+ "','" + req.params.phone + "','" + req.params.mail+ "','500',1,'" +req.params.code+"')",
                     function (error, results, fields) {
                         if (error) {
                             throw error;
                             res.status(500);
                             res.send({"status": false});
                         } else {
                             res.status(200);                                
                                       
                             res.locals.connection.query("INSERT INTO `client` (`id`, `cin`) VALUES  ( '" + results.insertId + "','12345678'  )",
                             function (error, results, fields) {
                                 if (error) {
                                     throw error;
                                     res.status(500);
                                     res.send({"status": false});
                                 }  
                             });
                      
                     desc="Bonjour, je m’appelle "+req.params.prenom;
                     res.locals.connection.query("insert into prestataire (id, Uti_id,numberPiont,description) VALUES  ( '" +req.params.secteur+ "','" + results.insertId + "' ,'500' ,'"+desc+"'  )",
                     function (error, results, fields) {
                         if (error) {
                             throw error;
                             res.status(500);
                             res.send({"status": false});
                         } else {
                             res.status(200);                                
                           //  console.log(results.insertId);      
                              res.send("Success");
                         }
                     });
                         }
                     });

                  
                }
            });       



});

 
module.exports = router;