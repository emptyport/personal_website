const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

require('./api/contact')(app);

app.use(express.static(path.join(__dirname, 'client/_site')));

app.listen(port, () => console.log(`Listening on port ${port}`));
