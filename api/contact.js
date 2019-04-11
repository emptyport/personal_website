const pool = require('../utils/pool').pool;
const nodemailer = require('nodemailer');
const config = require('../config.json');

module.exports = function(app) {
  app.post('/api/contact', (req, res) => {
    if(req.body.trial !== '4') {
      res.status(200).send("This appears to be a spam response because the math question was answered incorrectly");
      return;
    }

    let mailTemplate = `
      <h3>New message from ${req.body.firstname} ${req.body.lastname}</h3>
      <p>${req.body.message}</p>
      <p>${req.body.email}</p>
    `;

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.EM_USERNAME,
        pass: config.EM_PASSWORD
      }
    });

    const mailOptions = {
      from: config.EM_USERNAME,
      to: config.EMAIL,
      subject: 'New message from michaelporter.dev',
      html: mailTemplate
    }

    transporter.sendMail(mailOptions, function(err, info) {
      if(err) { console.log(err); }
      else { console.log(info); }
    });

    pool.query('INSERT INTO contact (first_name, last_name, email, message) VALUES ($1, $2, $3, $4)', [req.body.firstname, req.body.lastname, req.body.email, req.body.message], (error, results) => {
      if(error) {
        res.status(401).send('There was an error processing your message, :( please try again');
      }

      res.status(200).send("Thank you for your message! I'll get back to you soon!");

    });   
  });

}