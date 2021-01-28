const nodemailer = require('nodemailer');
const fs = require('fs');

async function mailer(output, subject, sendTo, attach = []) { 
    let transporter = nodemailer.createTransport({
      // host: "smtp.office365.com", // not working, hence replaced
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        // user: 'webadmin@bikebazaar.com',
        // pass: 'bikebaz@1981'
        user: 'bikebazaar01@gmail.com',
        pass: 'bikebazaar123'
      }
    });

    transporter.sendMail({
      from: '"Trial" <bikebazaar01@gmail.com>', // sender address
      to: sendTo, 
      subject: subject, // Subject line
      text: '', // plain text body
      html: output, // html body
      attachments: attach
    }, (err, info) => {
      if(!err){
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        attach.forEach(img => {
          fs.unlink(img.path, (err) => {
            if(err) console.log(err);
            console.log("deleted");
          })
        })
      } else{
        console.log("Error: ", err);
      }
    });
  }

 module.exports = mailer;