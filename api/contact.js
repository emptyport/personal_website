const pool = require('../utils/pool').pool;
const nodemailer = require('nodemailer');
const config = require('../config.json');
const path = require('path');

module.exports = function(app) {
  app.post('/api/contact', (req, res) => {
    if(req.body.trial !== '4') {
      res.sendFile(path.join(__dirname, '../client/_site', 'spam-contact', 'index.html'));
      return;
    }

    let mailTemplate = `
      <h3>New message from ${req.body.firstname} ${req.body.lastname}</h3>
      <p>${req.body.message}</p>
      <p>${req.body.email}</p>
    `;

    /*
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.EM_USERNAME,
        pass: config.EM_PASSWORD
      }
    });
    */

    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        type: 'OAuth2',
        user: config.EM_USERNAME,
        clientId: config.EM_CLIENTID,
        clientSecret: config.EM_CLIENTSECRET,
        refreshToken: config.EM_REFRESHTOKEN,
        accessToken: config.EM_ACCESSTOKEN,
        expires: config.EM_EXPIRES
      }
    });

    const mailOptions = {
      from: config.EM_USERNAME,
      to: config.EMAIL,
      subject: `${req.body.firstname} ${req.body.lastname} via michaelporter.dev`,
      html: mailTemplate
    }

    transporter.sendMail(mailOptions, function(err, info) {
      if(err) { console.log(err); return; }
      else { console.log(info); }
    });

    pool.query('INSERT INTO contact (first_name, last_name, email, message) VALUES ($1, $2, $3, $4)', [req.body.firstname, req.body.lastname, req.body.email, req.body.message], (error, results) => {
      if(error) {
        res.sendFile(path.join(__dirname, '../client/_site', 'failed-contact', 'index.html'));
      }

      res.sendFile(path.join(__dirname, '../client/_site', 'good-contact', 'index.html'));

    });   
  });

}