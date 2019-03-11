const jwt = require('jsonwebtoken');
const secret = require('../config.json').JWT_SECRET;

const withAuth = function(req, res, next) {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token;

  if(!token) {
    res.status(401).send('Unauthorized: No token provided');
  }
  else {
    jwt.verify(token, secret, function(err, decoded) {
      if(err) {
        console.log('Invalid token');
        res.status(401).send('Unauthorized: Invalid token');
      }
      else {
        req.username = decoded.username;
        console.log('Permitting ' + req.username + ' to proceed');
        next();
      }
    });
  }
}

module.exports = withAuth;