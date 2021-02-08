const $ = require('cheerio');

async function parseUpsEvents(events) {
    const subEventsList = [];
    for (let i = 0; i < events.length; i += 1) {
        const tempDate = new Date();
        tempDate.setTime(Date.parse(`${events[i][1].substring(6, 10)}-${events[i][1].substring(3, 5)}-${events[i][1].substring(0, 2)} ${events[i][1].substring(11, 30)}`));
        const tempBody = {
            date: tempDate,
            status: events[i][0],
            location: events[i][2],
        };
        subEventsList.push(tempBody);
    }
    return subEventsList;
}
async function getTrackingHistoryByHtmlFile(html) {
    const subEventList = [];
    for (let i = 0; i < 30; i += 1) {
        if ($(`#stApp_ShpmtProg_LVP_milestone_name_${i}`, html).length === 1) {
            const tempEvent = [];
            tempEvent.push($(`#stApp_ShpmtProg_LVP_milestone_name_${i}`, html).text().replace(/\s\s+/g, '').replace(/\n/g, '')
                .replace(/\t/g, ' '));
            const time = $(`#stApp_ShpmtProg_LVP_milestone_${i}_DateTime_1`, html).text().replace(/\s\s+/g, '');
            tempEvent.push(`${time.substring(0, 10)} ${time.substring(10, 30)}`);
            tempEvent.push($(`#stApp_ShpmtProg_LVP_milestone_${i}_location_1`, html).text().replace(/\s\s+/g, ''));
            subEventList.push(tempEvent);
        }
    }
    return subEventList;
}
async function parseUpsPackage(html, packageNumber) {
    const events = await getTrackingHistoryByHtmlFile(html);
    const tempParsedEvents = await parseUpsEvents(events);
    const deliveryPackage = {
        packageNumber,
        events: tempParsedEvents,
    };
    return deliveryPackage;
}
module.exports = parseUpsPackage;
