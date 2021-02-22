const { ExtractJwt, Strategy } = require('passport-jwt');
const User = require('../models/user.js');
const databaseConfig = require('./database');

module.exports = (passport) => {
    const opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = databaseConfig.secret;
    passport.use(new Strategy(opts, (jwtPayload, done) => {
        User.getById(jwtPayload.data._id, (err, customer) => {
            if (err) {
                return done(err, false);
            }
            if (customer) {
                return done(null, customer);
            }
            return done(null, false);
        });
    }));
};

module.exports.passportConfig = {
    timeWhenPasswordExpires: '1h',
};
