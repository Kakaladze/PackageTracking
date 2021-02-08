/* eslint-disable max-len */
const express = require('express');

const router = express.Router();
const puppeteer = require('puppeteer');
const { Routes } = require('../common/routes.js');
const { ErrorMessages } = require('../common/responseMessages');
const { response400 } = require('../common/responseHelpers.js');
const parseUpsPackage = require('../supportFunctions/supportUpsFunctions.js');

router.get(Routes.tracking, async (req, res) => {
    const { deliveryNumber } = req.query;
    const options = {
        url: `https://www.ups.com/track?loc=pl_PL&tracknum=${deliveryNumber}`,
    };
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const navigationPromise = page.waitForNavigation();
        await page.setRequestInterception(true);
        page.on('request', (request) => {
            if (request.resourceType() === 'image') request.abort();
            else request.continue();
        });
        page.setDefaultNavigationTimeout(5000);
        page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:60.0) Gecko/20100101 Firefox/60.0');
        try { await page.goto(options.url); } catch (e) { return response400(res, ErrorMessages.NOT_FOUND); }
        try { await page.waitForSelector('.privacy_prompt_content > .option_set > .option_explicit:nth-child(1) > .radio-button > .radio-button__control'); } catch (e) { return response400(res, ErrorMessages.NOT_FOUND); }
        try { await navigationPromise; } catch (e) { return response400(res, ErrorMessages.NOT_FOUND); }
        try { await page.waitForSelector('.privacy_prompt_content > .option_set > .option_explicit:nth-child(1) > .radio-button > label'); } catch (e) { return response400(res, ErrorMessages.NOT_FOUND); }
        try { await page.click('.privacy_prompt_content > .option_set > .option_explicit:nth-child(1) > .radio-button > label'); } catch (e) { return response400(res, ErrorMessages.NOT_FOUND); }
        try { await page.waitForSelector('#stApp_shpmtProgress > div:nth-child(1) > button:nth-child(1)'); } catch (e) { return response400(res, ErrorMessages.NOT_FOUND); }
        try { await page.click('#stApp_shpmtProgress > div:nth-child(1) > button:nth-child(1)'); } catch (e) { return response400(res, ErrorMessages.NOT_FOUND); }
        const bodyHTML = await page.evaluate(() => document.body.innerHTML);
        try { await browser.close(); } catch (e) { return response400(res, ErrorMessages.NOT_FOUND); }
        const tempPackage = await parseUpsPackage(bodyHTML);
        return res.status(200).send({ success: true, package: tempPackage });
    })();
});

module.exports = router;
