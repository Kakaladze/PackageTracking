/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { databaseConfig } = require('./config/database');

const app = express();
const port = 3001;
const polishPost = require('./routes/polishPost.js');
const inpost = require('./routes/inpost.js');
const dhl = require('./routes/dhl.js');
const dpd = require('./routes/dpd.js');
const ups = require('./routes/ups.js');
const users = require('./routes/users.js');

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(databaseConfig.uri);
mongoose.connection.on('connected', () => {
    console.log('Connected to DB');
});

app.use(cors());
app.use(bodyParser.json());
app.use('/polishPost', polishPost);
app.use('/inpost', inpost);
app.use('/dhl', dhl);
app.use('/dpd', dpd);
app.use('/ups', ups);
app.use('/users', users);
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
