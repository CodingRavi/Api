const nodemailer = require('nodemailer');

const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID = "1043436854827-o8i19fqpgebijgliphf4gbqvtnla2jti.apps.googleusercontent.com";
const MAIL_ADDRESS = "codingravi@gmail.com"
const CLIENT_SECRET = "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"
const REDIRECT_URL = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = "1//04hGHQJ4Vn-rUCgYIARAAGAQSNwF-L9IrlceKrK2aCnLzPy4lKr1jDulPb0fMw6FUTYgJQ_1bK4Y44vmKemLWUVE-D6r1GmMNq7c";

// Access token
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URL)
oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN})

// END
const SendMail = async(req,res)=>{
  try {
    
    // Access token 
    const ACCESS_TOKEN = await oAuth2Client.getAccessToken()
    // console.log("::res 2",req.body.mail);
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
        <title>Happy Shivratri!</title>
        <style>
          /* Fonts */
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
          
          /* Global Styles */
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Roboto', sans-serif;
          }
          
          body {
            background-color: #f2f2f2;
          }
          
          /* Container */
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
          }
          
          /* Header */
          .header {
            background-color: #0066cc;
            color: #ffffff;
            padding: 30px;
            text-align: center;
            font-size: 32px;
            font-weight: bold;
            font-family: 'Lobster', cursive;
          }
          
          /* Content */
          .content {
            padding: 30px;
            font-size: 18px;
            line-height: 1.5;
            color: #333333;
          }
          
          .content p {
            margin-bottom: 20px;
          }
          
          /* Footer */
          .footer {
            background-color: #0066cc;
            color: #ffffff;
            padding: 20px;
            text-align: center;
            font-size: 14px;
          }
          
          .footer a {
            color: #ffffff;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">Happy Shivratri!</div>
          <div class="content">
            <p>May Lord Shiva bless you with health, wealth, and prosperity on this auspicious day.</p>
            <p>Wishing you and your family a very happy and blessed Shivratri.</p>
          </div>
          <div class="footer">
            <p>Best regards, <br> Ravi Ranjan Kumar</p>
            <p>Follow us on <a href="#">Facebook</a> and <a href="#">Twitter</a>.</p>
          </div>
        </div>
      </body>
    </html>`
};

transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      res.status(400).json(error);
    } else {
        res.status(200).json("Success fully sended");
        // console.log('Email sent: ' + info.response);
    }
});
  } catch (error) {
    res.status(400).json(error);
  }

}

module.exports = SendMail;