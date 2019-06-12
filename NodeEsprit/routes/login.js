/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright 2014 Oracle and/or its affiliates. All rights reserved.
 *
 * Oracle and Java are registered trademarks of Oracle and/or its affiliates.
 * Other names may be trademarks of their respective owners.
 *
 * The contents of this file are subject to the terms of either the GNU
 * General Public License Version 2 only ("GPL") or the Common
 * Development and Distribution License("CDDL") (collectively, the
 * "License"). You may not use this file except in compliance with the
 * License. You can obtain a copy of the License at
 * http://www.netbeans.org/cddl-gplv2.html
 * or nbbuild/licenses/CDDL-GPL-2-CP. See the License for the
 * specific language governing permissions and limitations under the
 * License.  When distributing the software, include this License Header
 * Notice in each file and include the License file at
 * nbbuild/licenses/CDDL-GPL-2-CP.  Oracle designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Oracle in the GPL Version 2 section of the License file that
 * accompanied this code. If applicable, add the following below the
 * License Header, with the fields enclosed by brackets [] replaced by
 * your own identifying information:
 * "Portions Copyrighted [year] [name of copyright owner]"
 *
 * If you wish your version of this file to be governed by only the CDDL
 * or only the GPL Version 2, indicate your decision by adding
 * "[Contributor] elects to include this software in this distribution
 * under the [CDDL or GPL Version 2] license." If you do not indicate a
 * single choice of license, a recipient has the option to distribute
 * your version of this file under either the CDDL, the GPL Version 2 or
 * to extend the choice of license to its licensees as provided above.
 * However, if you add GPL Version 2 code and therefore, elected the GPL
 * Version 2 license, then the option applies only if the new code is
 * made subject to such option by the copyright holder.
 *
 * Contributor(s):
 *
 * Portions Copyrighted 2014 Sun Microsystems, Inc.
 */

"use strict";

var express = require("express");
var router = express.Router();

 
var bcrypt = require('bcrypt');
router.get("/:login/:pwd", function (req, res) {
   // console.log(req.params.pwd);
   console.log("here");
    res.locals.connection.query("SELECT utilisateur.id,nom,prenom,motdepasse,email , '2' as type FROM `utilisateur`  INNER JOIN prestataire ON prestataire.Uti_id = utilisateur.id   WHERE `utilisateur`.`login` LIKE '"+req.params.login+"' and `utilisateur`.`validation` = 0   ",
            function (error, results, fields) {
                if (error) {
                    throw error;
                    res.status(500);
                    res.send({"status": false});
                    console.log("here");
                } else {
                 if (results.length > 0) {
                     console.log('>> ici ************');
                     var string=JSON.stringify(results);                    
                    var json =  JSON.parse(string);                    
                    //console.log('>> password:',json[0].motdepasse);             
                    var bcryptAttempt = bcrypt.compareSync(req.params.pwd, json[0].motdepasse.replace(/^\$2y/, "$2a"))
                    console.log(bcryptAttempt)
                      if(bcryptAttempt){

                        res.status(200);
                        res.send(results);
                      }else{
                        throw error;
                        res.status(500);
                        res.send({"status": false});
                        
                      }    
                  }else{
                 res.locals.connection.query("SELECT utilisateur.id,nom,prenom,motdepasse,email, '1' as type  FROM `utilisateur`  INNER JOIN client ON client.id = utilisateur.id WHERE `utilisateur`.`login` LIKE '"+req.params.login+"' and `utilisateur`.`validation` = 0   ",
            function (error, results, fields) {
                if (error) {
                    throw error;
                    res.status(500);
                    res.send({"status": false});

                } else {
                    console.log('>> ici 2 ************');
                    var string=JSON.stringify(results);                    
                    var json =  JSON.parse(string);                    
                    //console.log('>> password:',json[0].motdepasse);             
                    var bcryptAttempt = bcrypt.compareSync(req.params.pwd, json[0].motdepasse.replace(/^\$2y/, "$2a"))
                    console.log(bcryptAttempt)
                      if(bcryptAttempt){
                        res.status(200);
                        res.send(results);
                         }else{
                        throw error;
                        res.status(500);
                        res.send({"status": false});
                        
                      }  
                }
                });

                }
                 
                     

                  
                  
                }
            });

});

module.exports = router;
