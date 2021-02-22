const express = require('express');

const router = express.Router();
// eslint-disable-next-line no-unused-vars
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { databaseConfig } = require('../config/database.js');
const { Routes } = require('../common/routes.js');
const { ErrorMessages, SuccessMessages } = require('../common/responseMessages.js');
const { response400, response200 } = require('../common/responseHelpers.js');
const { passportConfig } = require('../config/passport');
const User = require('../models/user.js');

router.post(Routes.register, (req, res) => {
    const {
        login, password, email,
    } = req.body;
    if (!login || !password || !email) {
        return response400(res, ErrorMessages.MISSING_OR_WRONG_ARGS);
    }
    if (password.length < 8 || password.length > 65) {
        return response400(res, ErrorMessages.VALIDATION_ERROR);
    }
    const newUser = new User({
        accountType: databaseConfig.accountTypes.user,
        contact: {
            email,
        },
        credentials: {
            login,
            password,
        },
    });
    return User.register(newUser, (err) => {
        if (err) {
            if (err._message === 'User validation failed') {
                return response400(res, ErrorMessages.VALIDATION_ERROR);
            }
            if (err.keyValue['credentials.login']) {
                return response400(res, ErrorMessages.INFORMATION_EXISTS);
            } if (err.keyValue['contact.email']) {
                return response400(res, ErrorMessages.INFORMATION_EXISTS);
            }
            return response400(res, ErrorMessages.FAILED_TO_REGISTER);
        }
        return response200(res, SuccessMessages.USER_REGISTERED);
    });
});
router.post(Routes.login, (req, res) => {
    const { login, password } = req.body;
    if (!password || !login) {
        return response400(res, ErrorMessages.MISSING_OR_WRONG_ARGS);
    }
    return User.getByLogin(login, (err, customer) => {
        if (err) {
            throw err;
        }
        if (!customer) {
            return response400(res, ErrorMessages.FAILED_TO_LOGIN);
        }
        return User.comparePassword(password, customer.credentials.password, (err1, isMatch) => {
            if (err1) {
                throw err1;
            }
            if (!isMatch) {
                return response400(res, ErrorMessages.FAILED_TO_LOGIN);
            }
            const customerCopy = {
                _id: customer._id,
            };
            const token = jwt.sign({ data: customerCopy }, databaseConfig.secret, {
                expiresIn: passportConfig.timeWhenPasswordExpires,
            });
            return res.status(200).json({
                success: true,
                account_type: customer.accountType,
                token: `JWT ${token}`,
                login: customer.credentials.login,
                customer: customer.contact,
            });
        });
    });
});
module.exports = router;
