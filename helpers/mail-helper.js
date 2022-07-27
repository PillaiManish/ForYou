

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: constants.email.emailId,
        pass: constants.email.emailPassword,
    },
});