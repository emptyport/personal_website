const pool = require('../utils/pool').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../config.json');
const secret = config.JWT_SECRET;

module.exports = function(app) {

  app.post('/api/authenticate', (req, res) => {
    const { username, password } = req.body;
    pool.query('SELECT * FROM users WHERE username = $1', [username], (error, result) => {
      if(error) {
        console.error(error);
        res.status(500).json( {error: 'Internal server error'} );
      }
      else {
        if(result.rows.length === 0) {
          res.status(401).json( {error: 'Incorrect username or password'} );
        }
        else {
          bcrypt.compare(password, result.rows[0].password, function(err, same) {
            if(err) {
              console.error(err);
              res.status(500).json( {error: 'Internal server error'} );
            }
            else {
              if(same) {
                const payload = { username };
                const token = jwt.sign(payload, secret, {
                  expiresIn: '1h'
                });
                console.log('Issuing token for '+username);
                res.cookie('token', token, { httpOnly: true })
                  .sendStatus(200);
              }
              else {
                res.status(401).json( {error: 'Incorrect username or password'} );
              }
            }
          });
        }
      }
    }); 
  });
}