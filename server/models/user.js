/* eslint-disable func-names */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { credentialsSchema, contactSchema } = require('./basicSchemas.js');
const databaseConfig = require('../config/database.js');

const UserSchema = new mongoose.Schema({
    accountType: {
        type: String,
        required: true,
    },
    credentials: credentialsSchema,
    contact: contactSchema,
});
UserSchema.methods.setPassword = function (password) {
    this.credentials.password = password;
};
const User = mongoose.model('User', UserSchema);
module.exports = User;
module.exports.getById = (id, callback) => {
    User.findById(id, callback);
};
module.exports.getByLogin = (loginQuery, callback) => {
    const query = { 'credentials.login': loginQuery };
    User.findOne(query, callback);
};
module.exports.register = (newCustomer, callback) => {
    bcrypt.genSalt(databaseConfig.bcryptSaltLength, (err, salt) => {
        if (err) {
            throw err;
        } else {
            bcrypt.hash(newCustomer.credentials.password, salt, (err1, hash) => {
                if (err1) {
                    throw err;
                } else {
                    newCustomer.setPassword(hash);
                    newCustomer.save(callback);
                }
            });
        }
    });
};
module.exports.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) {
            throw err;
        } else {
            callback(null, isMatch);
        }
    });
};
