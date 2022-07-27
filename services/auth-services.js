let logHelpers = require('../helpers/log-helper')
let dbHelpers = require('../helpers/db-helper')
let crypto = require('crypto'); 
let mails = require('../helpers/mail-helper').sendMails
let totp = require("totp-generator");
let base32 = require('base-32')

let register = (name, email)=>{
    return new Promise(async(resolve, reject)=>{
        let query = "INSERT INTO USERS (name, email) VALUES($1,$2)";
        let dataArray = [name, email];
        let result;

        try{
            result = await dbHelpers.runQuery(query, dataArray);
        }
        catch(err){
            return reject({error:err, message: "Could not save the data."})
        }

        let emailBase32 = base32.default.encode(email);
        let OTP = totp(emailBase32, {period: 270});

        try{
            result = await mails.sendEmailOTP(email,OTP) 
        }
        catch(err){
            return reject({error:err, message: "Could not send the OTP."})
        }


        return resolve(true);
    })
}

module.exports = {
    register
}