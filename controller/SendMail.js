const nodemailer = require('nodemailer');

const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID = "1043436854827-o8i19fqpgebijgliphf4gbqvtnla2jti.apps.googleusercontent.com";
const MAIL_ADDRESS = "codingravi@gmail.com"
const CLIENT_SECRET = "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"
const REDIRECT_URL = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = "1//04U8KdVXHlrlyCgYIARAAGAQSNwF-L9IrseGCyiZWnAVTgXts5YPIosP-j9L_mqofUhV4qCoBKR2jEcV32BSX4jvpE1_vuAvZsco";

// Access token
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URL)
oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN})

// END
const SendMail = async(req,res)=>{
  try {

    // Access token 
    const ACCESS_TOKEN = await oAuth2Client.getAccessToken()
    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
          type: 'OAuth2',
          user: MAIL_ADDRESS,
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: ACCESS_TOKEN,
      }
  });


  var mailOptions = {
    from: MAIL_ADDRESS,
    to: req.body.mail,
    subject: "Celebrate Holi with our Super Offer!",
    html:`<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Holi Festival Sale</title>
      <style>
        /* Add your custom styles here */
        .container {
          width: 80%;
          margin: 0 auto;
          text-align: center;
          font-family: Arial, sans-serif;
        }
        h1 {
          color: #ff9900;
        }
        .btn {
          background-color: #ff9900;
          color: white;
          padding: 10px 20px;
          border-radius: 5px;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Celebrate Holi with our Super Offer!</h1>
        <p>Get ready to celebrate the festival of colors with our amazing deals. This Holi, enjoy discounts of up to 50% on all products on our ecommerce website.</p>
        <a href="https://your-website.com" class="btn">Shop now</a>
      </div>
    </body>
    </html>`
};

transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      res.status(400).json(error);
    } else {
        res.status(200).json('Email sent: ' + info.response);
    }
});
  } catch (error) {
    res.status(400).json("error");
  }

}

module.exports = SendMail;