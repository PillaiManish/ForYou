let nodemailer = require('nodemailer')
let constants = require('../config/constants')
let logHelpers = require('./log-helper')

let transporter = nodemailer.createTransport({
    host: constants.email.emailHost,
    port: constants.email.emailPort,
    secure: constants.email.emailSecure, 
    auth: {
        user: constants.email.emailId,
        pass: constants.email.emailPassword,
    },
});

let sendMails = {
    sendEmailOTP : (email, OTP) => {
        return new Promise(async(resolve, reject)=>{
            try{
                await transporter.sendMail({
                    from: constants.email.emailId,
                    to: email,
                    subject: constants.emailSubject.sendEmailOTP,
                    text: OTP,
                    html: OTP
                })

                logHelpers.info("Email has been sent")
            }
            catch (err){
                logHelpers.error(err.message)
                return reject({error:err, message: "Could Not send email OTP."})
            }

            return resolve(true)
        }
    )}
}

module.exports = {
    transporter,
    sendMails
}