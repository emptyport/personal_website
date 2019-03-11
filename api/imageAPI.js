const multer = require('multer');
const upload = multer({ dest: 'images/' });
const calipers = require('calipers')('jpeg');
const jimp = require('jimp');

const withAuth = require('../utils/middleware');

const pool = require('../utils/pool').pool;

const fileDir = 'images';
const thumbnailDir = 'thumbnails';

module.exports = function(app) {

  app.get('/api/fetchAllImages', (req, res) => {
    pool.query('SELECT * FROM images', (error, results) => {
      if(error) {
        console.error(error);
        res.status(401).send(error);
        return;
      }
      res.status(200).send({ images: results.rows });
    });
  });

  app.get('/api/listImages', (req, res) => {
    pool.query('SELECT * FROM images WHERE display = $1', ["yes"], (error, result) => {
      if(error) {
        throw error;
      }
      res.send({ imgList: result.rows });
    });
  });

  app.post('/api/upload', withAuth, upload.single('img'), (req, res) => {
    imgTitle = req.body.title;
    imgAlt = req.body.alt;
    fullFilename = fileDir + '/' + req.file.filename;
    fullThumbnail = fileDir + '/' + thumbnailDir + '/' + req.file.filename;

    jimp.read(fullFilename, (err, img) => {
      if(err) throw err;
      img.scaleToFit(100, 100).write(fullThumbnail);
    });

    calipers.measure(fullFilename, function(err, result) {
      let width = result.pages[0].width;
      let height = result.pages[0].height;
      let filename = req.file.filename;
      let photoPage = req.body.photoPage;

      pool.query('INSERT INTO images (filename, width, height, title, alt, display) VALUES ($1, $2, $3, $4, $5, $6)', [filename, width, height, imgTitle, imgAlt, photoPage], (error, results) => {
        if(error) {
          res.status(401).send(error);
          return;
        }

        res.status(201).send('Image added successfully');
      });

    });
    
  });


}

