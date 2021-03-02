const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const users = new Schema ({
        user: { type: String, required: true, unique: true},
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, default: "Utilisateur" },
        active: { type: Boolean, default: false },
});

users.plugin(uniqueValidator);

module.exports = mongoose.model('users', users)