const https = require('https');
const express = require('express');

const router = express.Router();
const { Routes } = require('../common/routes.js');
const { ErrorMessages } = require('../common/responseMessages');
const { response400 } = require('../common/responseHelpers.js');
const parseInpostPackcage = require('../common/supportFunctions.js');

const url = 'api-shipx-pl.easypack24.net';
router.get(Routes.tracking, (req, res) => {
    const { deliveryNumber } = req.query;
    const options = {
        host: url,
        port: 443,
        path: `/v1/tracking/${deliveryNumber}`,
        method: 'GET',
    };
    https.get(options, (response) => {
        if (response.statusCode === 404) {
            return response400(res, ErrorMessages.NOT_FOUND);
        }
        if (response.statusCode === 400) {
            return response400(res, ErrorMessages.WRONG_ARGS);
        }
        response.setEncoding('utf8');
        return response.on('data', (chunk) => {
            const data = JSON.parse(chunk);

            return res.status(200).send({ success: true, package: parseInpostPackcage(data) });
        });
    });
});

module.exports = router;
