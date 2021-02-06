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
module.exports = parsePolishPostPackage;
