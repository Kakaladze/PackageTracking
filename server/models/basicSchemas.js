const validator = require('./validator.js');
const { ErrorMessages } = require('../common/responseMessages.js');

module.exports.credentialsSchema = {
    login: {
        type: String,
        required: true,
        unique: true,
        maxlength: 65,
        minlength: 6,
        validate: {
            validator: validator.validateLogin,
            message: ErrorMessages.VALIDATION_ERROR,
        },
    },
    password: {
        type: String,
        required: true,
    },
};
module.exports.contactSchema = {
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 100,
        minlength: 1,
        validate: {
            validator: validator.validateEmail,
            message: ErrorMessages.VALIDATION_ERROR,
        },
    },
};
