require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const user = process.env.user;
const clientId = process.env.clientId;
const clientSecret = process.env.clientSecret;
const redirectUri = process.env.redirectUri;
const refreshToken = process.env.refreshToken;

exports.getMail = (req , res, next) =>{
    res.render('form' , {message: ''});
};

exports.postMail = async (req, res, next) =>{
    const name = req.body.name;
    const company = req.body.company;
    const email = req.body.email;
    const phone = req.body.phone;
    const message = req.body.message;
    console.log(req.body);

    const oauth2Client = new OAuth2(
        clientId,clientSecret,redirectUri
    );
    
    oauth2Client.setCredentials({
        refresh_token: refreshToken
    });
    // const accessToken = oauth2Client.getAccessToken();

    const output = ` 
        <p> A New Contact Form Was Created By You.</p>
        <h3> Contact Details </h3>
        <ul>
          <li>Name: ${name}</li>
          <li>Company: ${company}}</li>
          <li>Email: ${email}</li>
          <li>Phone: ${phone}</li>
        </ul>
        <h3>Message</h3>
        <p>${message}</p>
    `;
   
    const transporter = nodemailer.createTransport({
      service : "gmail",
      auth: {
        type: "OAuth2",
        user: user,
        clientId: clientId,
        clientSecret: clientId,
        refreshToken: refreshToken,
        accessToken:  "ya29.A0ARrdaM_lfklwwQ4SzDvmW-2iOTL2Xi8ge06lLEI8MkrkcA1_847wwLGYliIkFGQ_I9e3Ab70ChyytzvunASLX_foIk0xzQlP_6yOiD1ig6M58uBtYNUKv3efFPwF5YA9rvhzowt70644Oyh8KKpsctuREvxN"
      },
      tls:{
        rejectUnauthorized:false
      }
    });  
    
    // send mail with defined transport object
    const mailOptions = {
      ffrom: `'Its Srijit ' <${user}>`, // sender address
      to: email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "HEY there!!", // plain text body
      html: output, // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      console.log('error occured');
    }

    else {
      console.log(info);
      console.log("success");
    }
  });

    res.render("form", {message : "Email has been Sent"});
}