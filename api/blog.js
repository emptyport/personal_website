const withAuth = require('../utils/middleware');

const pool = require('../utils/pool').pool;

module.exports = function(app) {

  app.post('/api/blog/new', withAuth, (req, res) => {
    let text = req.body.text;
    let title = req.body.title;

    pool.query('INSERT INTO posts (title, text) VALUES ($1, $2)', [title, text], (error, results) => {
      if(error) {
        res.status(401).send(error);
        return;
      }

      res.status(201).send('Post added successfully');
    });
  });

  app.get('/api/blog/fetchPosts', (req, res) => {
    pool.query('SELECT * FROM posts', (error, results) => {
      if(error) {
        res.status(401).send(error);
        return;
      }
      res.status(201).send({ posts: results.rows });
    });
  });

  app.get('/api/blog/fetch/:id', (req, res) => {
    let id = req.params.id;
    pool.query('SELECT * FROM posts WHERE id = $1', [id], (error, results) => {
      if(error) {
        res.status(401).send(error);
        return;
      }
      res.status(201).send({ post: results.rows[0] });
    });
  });

}

