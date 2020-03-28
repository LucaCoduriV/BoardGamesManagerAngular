require('dotenv').config();
var colors = require('colors');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
let router = require('./routes/routes');

const app = express();

app.use(cors()); // Cross-origin resource sharing
app.use(bodyParser.json());

app.use(router);

//faire écouter le port 8080
app.listen(8081, () => {
    console.log('Listening to port 8081');
});

module.exports = app;
