const $ = require('cheerio');

async function getTrackingHistoryByHtmlFile(html) {
    const subEventList = [];
    await $('tbody > tr', html).each(async (index, element) => {
        const tempBody = [];
        await $('td', element).each(async (index1, element1) => {
            tempBody.push($(element1).text());
        });
        subEventList.push(tempBody);
    });
    return subEventList;
}
async function parseDpdEvents(events) {
    const subEventsList = [];
    for (let i = 0; i < events.length; i += 1) {
        const tempDate = new Date();
        tempDate.setTime(Date.parse(`${events[i][0]} ${events[i][1]}`));
        const tempBody = {
            date: tempDate,
            status: events[i][2],
            location: events[i][3],
        };
        subEventsList.push(tempBody);
    }
    return subEventsList;
}
async function parseDpdPackage(html, packageNumber) {
    const events = await getTrackingHistoryByHtmlFile(html);
    const tempParsedEvents = await parseDpdEvents(events);
    const deliveryPackage = {
        packageNumber,
        events: tempParsedEvents,
    };
    return deliveryPackage;
}
module.exports = parseDpdPackage;
