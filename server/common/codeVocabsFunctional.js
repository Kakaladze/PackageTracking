/* eslint-disable no-plusplus */
const got = require('got');

async function InpostPackageStatuses() {
    let data;
    const promise = new Promise((resolve, reject) => {
        (async () => {
            try {
                const response = await got('https://api-shipx-pl.easypack24.net/v1/statuses');
                data = await JSON.parse(response.body);
                resolve(data);
            } catch (error) {
                reject(error);
            }
        })();
    });
    data = await promise;
    const events = {};
    for (let i = 0; i < data.items.length; i++) {
        events[data.items[i].name] = [data.items[i].title, data.items[i].description];
    }
    return events;
}

module.exports = InpostPackageStatuses;
