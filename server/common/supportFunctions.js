/* eslint-disable no-plusplus */
function parseEventsPolishPost(events) {
    const subEventsList = [];
    for (let i = 0; i < events.length; i++) {
        const tempBody = {
            date: events[i].czas,
            cityLocation: events[i].jednostka.daneSzczegolowe.miejscowosc,
            deliveryLocation: events[i].jednostka.nazwa,
            statusCode: events[i].kod,
            statusName: events[i].nazwa,
            delivered: events[i].konczace,
        };
        subEventsList.push(tempBody);
    }
    return subEventsList;
}
function parsePolishPostPackage(data) {
    const deliveryPackage = {
        packageNumber: data.numer,
        dateOfPosting: data.dataNadania,
        originCountryCode: data.kodKrajuNadania,
        destinationCountryCode: data.kodKrajuPrzezn,
        originCountryName: data.krajNadania,
        destinationCountryName: data.krajPrzezn,
        dispatchPostOffice: data.urzadNadania.nazwa,
        destinationPostOffice: data.urzadPrzezn.nazwa,
        serviceName: data.rodzPrzes,
        active: data.zakonczonoObsluge,
        events: parseEventsPolishPost(data.zdarzenia.zdarzenie),
    };
    return deliveryPackage;
}
const https = require('https');
const { InpostPackageTypes, InpostPackageCheck } = require('./codeVocabs.js');

function parseEventsInpost(events) {
    const subEventsList = [];
    const url = 'api-shipx-pl.easypack24.net';
    const options = {
        host: url,
        port: 443,
        path: '/v1/statuses',
        method: 'GET',
    };
    https.get(options, (response) => {
        response.setEncoding('utf8');
        return response.on('data', (chunk) => {
            const data = JSON.parse(chunk);
            for (let i = 0; i < events.length; i++) {
                const tempBody = {
                    date: events[i].czas,
                    cityLocation: events[i].jednostka.daneSzczegolowe.miejscowosc,
                    deliveryLocation: events[i].jednostka.nazwa,
                    statusCode: events[i].kod,
                    statusName: events[i].nazwa,
                    delivered: events[i].konczace,
                };
                subEventsList.push(tempBody);
            }
            return subEventsList;
        });
    });
}
function parseInpostPackcage(data) {
    if (InpostPackageCheck[data.service] === 'locker') {
        const packageData = {
            packageNumber: data.tracking_number,
            dateOfPosting: data.created_at,
            originLockerCode: data.dropoff_machine_detail.name,
            destinationLockerCode: data.target_machine_detail,
            lastUpdate: data.target.updated_at,

        };
    } else {
        return 'pass';
    }
    return data;
}
module.exports = parsePolishPostPackage;
module.exports = parseInpostPackcage;
