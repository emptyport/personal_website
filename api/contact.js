const pool = require('../utils/pool').pool;

module.exports = function(app) {
  app.post('/api/contact', (req, res) => {
    if(req.body.hidden.length > 0) {
      res.status(200).send('Domo origato, Mr. Roboto');
      return;
    }

    pool.query('INSERT INTO contact (first_name, last_name, email, message) VALUES ($1, $2, $3, $4)', [req.body.firstName, req.body.lastName, req.body.email, req.body.message], (error, results) => {
      if(error) {
        res.status(401).send('There was an error processing your message, :( please try again');
      }

      res.status(200).send("Thank you for your message! I'll get back to you soon!");

    });   
  });

}