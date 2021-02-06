/* eslint-disable max-len */
/* eslint-disable no-shadow */
const soap = require('soap');
const express = require('express');

const router = express.Router();
const { Routes } = require('../common/routes.js');
const { PolishPostCredentials } = require('../common/credentials.js');
const { response400 } = require('../common/responseHelpers.js');
const { ErrorMessages } = require('../common/responseMessages');
const parsePolishPostPackage = require('../common/supportFunctions.js');

const url = 'https://tt.poczta-polska.pl/Sledzenie/services/Sledzenie?wsdl';

router.get(Routes.test, (req, res) => {
    const { deliveryNumber } = req.query;
    soap.createClient(url, (err, client) => {
        const security = new soap.WSSecurity(PolishPostCredentials.username, PolishPostCredentials.password, {
            hasTimeStamp: false,
            hasTokenCreated: false,
        });
        const args = { numer: deliveryNumber.toString() };
        client.setSecurity(security);
        client.sprawdzPrzesylkePl(args, (err, result) => {
            if (result.return.status === -1) {
                return response400(res, ErrorMessages.NOT_FOUND);
            }
            if (result.return.status === -2) {
                return response400(res, ErrorMessages.WRONG_PACKAGE_NUMBER);
            }
            if (result.return.status === -99) {
                return response400(res, ErrorMessages.SOMETHING_WENT_WRONG);
            }
            return res.status(200).send({ success: true, package: parsePolishPostPackage(result.return.danePrzesylki) });
        });
    });
});

module.exports = router;
