const express = require("express");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();
const nodemailer = require("nodemailer");
const bodyparser = require('body-parser');

app.use(bodyparser.json());

router.get("/", (req, res) => {
  res.send("App is running..");
});

router.post("/sendmail", (req, res) => {
  const { to, subject, text } = req.body;
  console.log(req);
  console.log(to , subject ,text);

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "gopinathanselvaraj21@gmail.com",
      pass: "hrtxkhqjfjqwnlbd",
    },
  });

  const mailOptions = {
    from: "gopinathanselvaraj21@gmail.com",
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions,function(error , info){
    if(error){
      console.log('error' , error)
    }
    else{
      console.log('Email sent' , info)
    }
  })

});

app.use("/.netlify/functions/api", router);
module.exports.handler = serverless(app);
