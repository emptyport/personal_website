const prompt = require('prompt');
const bcrypt = require('bcrypt');

const config = require('./config.json');

const Pool = require('pg').Pool;
const pool = new Pool({
  user: config.PG_USER,
  host: config.PG_HOST,
  database: config.PG_DATABASE,
  password: config.PG_PASSWORD,
  port: config.PG_PORT
});

let prompt_attributes = [
  {
    name: 'username'
  },
  {
    name: 'password',
    hidden: true
  }
];

prompt.start();

prompt.get(prompt_attributes, function(err, result) {
  if(err) {
    console.log(err);
    console.log('Error with prompt');
    return;
  }

  let username = result.username;
  let password = result.password;
  bcrypt.hash(password, 10, function(error, hashedPassword) {
    if(error) {
      console.log(error);
      console.log('Error with bcrypt hashing');
      return;
    }

    pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword], (error, results) => {
      if(error) {
        console.log(error);
        console.log('Error with db insertion');
        return;
      }

      console.log('Successfully added user!');
      return;
    });
  });
});