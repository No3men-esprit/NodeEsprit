/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";

var express = require("express");
var router = express.Router();

router.get("/:regid", function (req, res) {
    res.locals.connection.query("Select * from ville where Reg_id =" + req.params.regid, function (error, results, fields) {
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
