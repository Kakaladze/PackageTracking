/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;
const polishPost = require('./routes/polishPost.js');

app.use(cors());
app.use(bodyParser.json());
app.use('/polishPost', polishPost);
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
