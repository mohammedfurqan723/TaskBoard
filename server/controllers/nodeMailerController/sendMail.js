const nodeMailer = require('nodemailer');

const sendMail = (to, url, text) => {
    const mailTransporter = nodeMailer.createTransport({
        service:"gmail",
        auth:{
            user:'taskboardorg@gmail.com',
            pass:"zoqwmvfbreevttog"
        }
    })

    const mailOptions = {
        from:'taskboardorg@gmail.com',
        to:to,
        subject:`${text}`,
        html:`<div>
        <a href=${url}>${text}</a>
        <div>`
    }

    mailTransporter.sendMail(mailOptions,(err, info) => {
        if(err){ 
            console.log(err);
        }
    });
};

module.exports = sendMail;