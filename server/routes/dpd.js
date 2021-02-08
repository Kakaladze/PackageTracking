const express = require('express');

const router = express.Router();
const puppeteer = require('puppeteer');
const { Routes } = require('../common/routes.js');
const { ErrorMessages } = require('../common/responseMessages');
const { response400 } = require('../common/responseHelpers.js');
const parseDpdPackage = require('../supportFunctions/supportDpdFunctions.js');

router.get(Routes.tracking, async (req, res) => {
    const { deliveryNumber } = req.query;
    const options = {
        url: `https://tracktrace.dpd.com.pl/parcelDetails?typ=1&p1=${deliveryNumber}`,
    };
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:60.0) Gecko/20100101 Firefox/60.0');
        await page.goto(options.url);
        const bodyHTML = await page.evaluate(() => document.body.innerHTML);
        await browser.close();
        const tempPackage = await parseDpdPackage(bodyHTML, deliveryNumber);
        if (tempPackage.events.length === 0) {
            return response400(res, ErrorMessages.NOT_FOUND);
        }
        return res.status(200).send({ success: true, package: tempPackage });
    })();
});

module.exports = router;
