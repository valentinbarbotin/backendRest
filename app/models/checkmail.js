const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const checkmail = new Schema ({
        token: { type: String, required: true, unique: true },
        email: { type: String, required: true },
        // moment
});

checkmail.plugin(uniqueValidator);

module.exports = mongoose.model('checkmail', checkmail)