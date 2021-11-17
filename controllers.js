const nodemailer = require("nodemailer");

exports.getMail = (req , res, next) =>{
    res.render('form' , {message: ''});
};

exports.postMail = (req, res, next) =>{
    const name = req.body.name;
    const company = req.body.company;
    const email = req.body.email;
    const phone = req.body.phone;
    const message = req.body.message;
    console.log(req.body);
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
        user: "itssrijit099@gmail.com",
        pass: "Uzumakinaruto100"
      }
    });  
    
    // send mail with defined transport object
    let info = transporter.sendMail({
        from: 'node-mailer', // sender address
        to: "srijitpatra123@gmailcom", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "HEY there!!", // plain text body
        html: output, // html body
        });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));    

    res.render("form", {message : "Email has been Sent"});
}