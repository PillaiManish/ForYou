let logHelpers = require('../helpers/log-helper')
let dbHelpers = require('../helpers/db-helper')
let crypto = require('crypto'); 
let mails = require('../helpers/mail-helper').sendMails


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

        

        try{
            result = await mails.sendEmailOTP(email,"12345") 
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