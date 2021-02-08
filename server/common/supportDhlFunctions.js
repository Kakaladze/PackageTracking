/* eslint-disable no-plusplus */
function checkDateOfPosting(events) {
    return events[events.length - 1].timestamp;
}
function parseDhlEvents(events) {
    const subEventsList = [];
    for (let i = 0; i < events.length; i++) {
        const tempBody = {
            timestamp: events[i].timestamp,
            location: events[i].location.address.addressLocality,
            statusCode: events[i].statusCode,
            description: events[i].description,
        };
        subEventsList.push(tempBody);
    }
    return subEventsList;
}
function parseDhlPackage(data) {
    const deliveryPackage = {
        packageNumber: data.id,
        dateOfPosting: checkDateOfPosting(data.events),
        dispatchPostOffice: data.origin.address.addressLocality,
        destinationPostOffice: data.destination.address.addressLocality,
        serviceName: data.service,
        events: parseDhlEvents(data.events),
    };
    return deliveryPackage;
}

module.exports = parseDhlPackage;
