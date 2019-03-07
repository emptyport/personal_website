const config = require('../config.json');

const Pool = require('pg').Pool;
module.exports.pool = new Pool({
  user: config.PG_USER,
  host: config.PG_HOST,
  database: config.PG_DATABASE,
  password: config.PG_PASSWORD,
  port: config.PG_PORT
});

