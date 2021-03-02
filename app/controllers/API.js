// const account = require('../models/account');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const request = require('request');


exports.index = function (req, res) {
    res.json({ message: 'Hello !' });
};

exports.test = function (req, res) {
    res.json({ message: 'Test OK !' });
};

exports.login = function (req, res) {
    res.json({ message: 'Login OK !' });
};