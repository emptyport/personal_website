const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const withAuth = require('./utils/middleware');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

require('./api/imageAPI')(app);
require('./api/authentication')(app);
require('./api/blog')(app);
require('./api/code')(app);
require('./api/contact')(app);

// Images folder
app.use('/images', express.static('images'));

// API calls
app.get('/checkToken', withAuth, function(req, res) {
  res.sendStatus(200);
});

app.use(express.static(path.join(__dirname, 'client/_site')));
/*
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    console.log('Page hit');
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
*/

app.listen(port, () => console.log(`Listening on port ${port}`));
