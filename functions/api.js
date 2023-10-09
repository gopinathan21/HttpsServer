const express = require("express");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();
const nodemailer = require("nodemailer");
const bodyparser = require("body-parser");

app.use(bodyparser.json());

router.get("/", (req, res) => {
  res.send("App is running..");
});

router.post("/sendmail", async (req, res) => {
  const { to, subject, text, html } = req.body;
  console.log(req);
  console.log(to, subject, text);
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "gopinathanselvaraj21@gmail.com",
        pass: "hrtxkhqjfjqwnlbd",
      },
    });

    const mailOptions = {
      from: "gopinathanselvaraj21@gmail.com",
      to: "gopinathanselvaraj21@gmail.com",
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent", info);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.use("/.netlify/functions/api", router);
module.exports.handler = serverless(app);
