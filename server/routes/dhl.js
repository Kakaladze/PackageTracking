const express = require('express');
const https = require('https');

const router = express.Router();
const { Routes } = require('../common/routes.js');
const { ErrorMessages } = require('../common/responseMessages');
const { response400 } = require('../common/responseHelpers.js');
const { dhlCredentials } = require('../common/APIcredentials.js');
const parseDhlPackage = require('../supportFunctions/supportDhlFunctions.js');

const url = 'api-eu.dhl.com';

router.get(Routes.tracking, (req, res) => {
    const { deliveryNumber } = req.query;
    const options = {
        host: url,
        port: 443,
        path: `/track/shipments?trackingNumber=${deliveryNumber}&language=pl&limit=5`,
        method: 'GET',
        headers: {
            'DHL-API-Key': dhlCredentials.consumerKey,
        },
    };
    https.get(options, (response) => {
        if (response.statusCode === 404) {
            return response400(res, ErrorMessages.NOT_FOUND);
        }
        if (response.statusCode === 400) {
            return response400(res, ErrorMessages.WRONG_ARGS);
        }
        if (response.statusCode === 401) {
            return response400(res, ErrorMessages.UNAUTHORIZED);
        }
        if (response.statusCode === 429) {
            return response400(res, ErrorMessages.TOO_MANY_REQUESTS);
        }
        response.setEncoding('utf8');
        return response.on('data', (chunk) => {
            const data = JSON.parse(chunk);
            return res.status(200).send(
                {
                    success: true,
                    package: parseDhlPackage(data.shipments[0]),
                },
            );
        });
    });
});

module.exports = router;
