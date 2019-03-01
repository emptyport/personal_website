const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const sizeOf = require('image-size');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Images folder
app.use('/images', express.static('images'));

// API calls
app.get('/api/listImages', (req, res) => {
  let files = fs.readdirSync('images');
  let fileList = [];
  files.map(img => {
    let dimensions = sizeOf('images/'+img);
    fileList.push({
      filename: img,
      width: dimensions.width,
      height: dimensions.height
    });
  });
  res.send({ imgList: fileList });
});


app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
