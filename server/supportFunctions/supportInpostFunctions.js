/* eslint-disable no-plusplus */
const { InpostPackageTypes, InpostPackageCheck } = require('../common/codeVocabs.js');
const InpostPackageStatuses = require('../common/codeVocabsFunctional.js');

async function parseEventsInpost(events) {
    const subEventsList = [];
    const inpostEvents = await InpostPackageStatuses();
    for (let i = 0; i < events.length; i++) {
        const tempBody = {
            status: inpostEvents[events[i].status],
            date: events[i].datetime,
        };
        subEventsList.push(tempBody);
    }
    return subEventsList;
}
async function parseInpostPackcage(data) {
    if (InpostPackageCheck[data.service] === 'locker') {
        const packageData = {
            packageNumber: data.tracking_number,
            dateOfPosting: data.created_at,
            originLockerCode: data.custom_attributes.dropoff_machine_detail.name,
            destinationLockerCode: data.custom_attributes.target_machine_detail.name,
            lastUpdate: data.updated_at,
            serviceName: InpostPackageTypes[data.service],
            events: await parseEventsInpost(data.tracking_details),
        };
        return packageData;
    }
    const packageData = {
        packageNumber: data.tracking_number,
        dateOfPosting: data.created_at,
        lastUpdate: data.updated_at,
        serviceName: InpostPackageTypes[data.service],
        events: await parseEventsInpost(data.tracking_details),
    };
    return packageData;
}
module.exports = parseInpostPackcage;
