const { MongoCredentials } = require('../common/DBcredentials');

module.exports.databaseConfig = {
    uri: MongoCredentials.uri,
    secret: MongoCredentials.secret,
    bcryptSaltLength: 10,
    accountTypes: {
        user: 'User',
        udmin: 'Admin',
    },
};
