const express = require('express');
const fs = require('fs');

const router = express.Router();
const puppeteer = require('puppeteer');
const { Routes } = require('../common/routes.js');
const { ErrorMessages } = require('../common/responseMessages');
const { response400 } = require('../common/responseHelpers.js');

router.get(Routes.tracking, async (req, res) => {
    const { deliveryNumber } = req.query;
    const options = {
        url: `https://www.dhl.com/pl-pl/home/tracking/tracking-parcel.html?submit=1&tracking-id=${deliveryNumber}`,
    };
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:60.0) Gecko/20100101 Firefox/60.0');
        await page.goto(options.url);
        await page.waitForNavigation({ waitUntil: 'networkidle2' });
        const [button] = await page.$x("//button[contains(., 'Zezwolenie na wszystkie')]");
        if (button) {
            await button.click();
        }
        await page.screenshot({ path: 'example.png' });
        const bodyHTML = await page.evaluate(() => document.body.innerHTML);
        await browser.close();
        fs.writeFileSync('html.txt', bodyHTML);
    })();
});

module.exports = router;
