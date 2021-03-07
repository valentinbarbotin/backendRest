// const account = require('../models/account');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const request = require('request');


exports.index = function (req, res) {
    res.json({ message: 'Hello !' });
};

exports.test = function (req, res) {

    try {
        const fd = fs.openSync('/tmp/scrypteur/fichier', 'w+')
        data = fs.readFileSync(fd, 'utf-8')
        console.log(data)
        fs.writeFileSync(fd, 'nodejs\nfs')
      } catch (err) {
        console.error(err)
      }
      res.json({ message: 'Test OK !' });
};

exports.login = function (req, res) {
    res.json({ message: 'Login OK !' });
};