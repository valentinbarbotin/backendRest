const mongoose = require('mongoose');
const moment = require('moment');

const environment = require("../config/environment");
const Users = require('../models/users');
const Checkmail = require('../models/checkmail');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const request = require('request');
const TokenGenerator = require('uuid-token-generator');

exports.index = function (req, res) {
    res.json({ message: 'Hello !' });
};

exports.verifyToken = function (req, res) {
    var data = req.params.token;
    console.log(`Le token est ${data}`);

    Checkmail.findOne({token: data}).exec(function (err, data) {
        if (err) {
            console.log(err)
        } else {
            if (data != null) {
                Checkmail.findByIdAndDelete(mongoose.Types.ObjectId(data._id), function (err, docs) { 
                    if (err){ 
                        console.log(err) 
                    } 
                    else{ 
                        console.log("Suppresion du jeton : ", data.token);
                        Users.updateOne({email: data.email}, { $set: { active: true } }, function (err) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log("Activation compte ok")
                                res.json({ send: true });
                            }
                        });

                    } 
                }); 
                
            } else {
                console.log("J'ai pas trouvé le jeton")
            }
        }
    })

    // res.json({ message: 'ok' });
};


exports.register = function (req, res) {

    var data = req.body;
    console.log(data);
    data.password = bcrypt.hashSync(data.password, 10);

    var newUser = new Users(data);
    newUser.save(function (err) {
        if(err) {
            console.log(err);
            res.json({ message: 'Erreur insertion', register: false });
        } else {
            console.log("Inscription ok")
            res.json({ message: 'Insertion OK', register: true });
        }
    });

    const token = new TokenGenerator(512, TokenGenerator.BASE62);

    dataCheckMail = {
        email: data.email,
        token: token.generate()
    }
    console.log(dataCheckMail)
    var newCheckmail = new Checkmail(dataCheckMail);
    newCheckmail.save(function (err) {
        if(err) {
            console.log(err);
            // si erreur, alors delete le compte ?
        } else {
            console.log("Creation jeton ok")
            // envoie mail
        }
    });

    // res.json({ message: 'Test OK !' });
};

exports.login = function (req, res) {
    
    var nomEmail = req.body.nomEmail;
    var password = req.body.password;
    
    Users.findOne( { $or: [{email: nomEmail},{user: nomEmail}]} ).exec(function (err, data) {
        //account.findOne({}).exec(function (err, data) {
            if (err) {
                console.log(err)
                res.json({ message: 'Authentifcation echoué', login: false });
            } else {
                if (data != null) {
                    bcrypt.compare(password,data.password)
                    .then(
                        valid => {
                            if (!valid) {
                                console.log("mauvais mdp")
                                res.json({ message: 'Authentifcation echoué', login: false });
                            } else {
                                console.log("retour ok")
                                // console.log(req.session);
                                // sessionData = req.session;
                                // sessionData.user = {};
                                // sessionData.user.username = data.user;
                                // console.log("Session => data : username=%s", sessionData.user.username)
    
                                // console.log(sessionData);
    
                                // console.log("redirect to dashboard")
                                // res.redirect('/dashboard')
                                var token = jwt.sign(
                                    {
                                        email: data.email,
                                        user: data.user,
                                        role: data.role,
                                    },
                                    environment.secret,
                                    {
                                        algorithm: 'HS512',
                                        expiresIn: '24h'
                                    }
                                );
                                res.json({ message: 'Connection OK', login: true, token: token });
    
                                // res.status(200).json({
                                //     userId: data._id,
                                //     token: jwt.sign(
                                //     { userId: data._id },
                                //     'RANDOM_TOKEN_SECRET',
                                //     { expiresIn: '24h' }
                                //     )
                                // });
                            }
                        }
                    )
                } else {
                    res.json({ message: 'Authentifcation echoué', login: false });
                };
            };
        });


};