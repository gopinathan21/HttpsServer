const express = require('express');
const serverless = require('serverless-http');
const app = express();
const router = express.Router();
const nodemailer = require('nodemailer')


router.get('/', (req, res) => {
  res.send('App is running..');
});


router.post('/sendmail', (req, res) => {
  res.send('New record added.');
});




app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);
