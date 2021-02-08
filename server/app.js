/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;
const polishPost = require('./routes/polishPost.js');
const inpost = require('./routes/inpost.js');
const dhl = require('./routes/dhl.js');

app.use(cors());
app.use(bodyParser.json());
app.use('/polishPost', polishPost);
app.use('/inpost', inpost);
app.use('/dhl', dhl);
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
