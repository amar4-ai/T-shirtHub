const nodemailer = require("nodemailer")


const sendEmail = async (optional) => {
    var transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "amarkhadkabardiya1234@gmail.com",
            pass: "kbrivykaaknirwde"
        }
    })
    

    const mailoptions ={
        from:"TSHITHUB<tshirthub@gmail.com>",
        to:optional.Email,
        subject:optional.subject,
        text:optional.message
    };
    await transport.sendMail(mailoptions)
}
module.exports = sendEmail