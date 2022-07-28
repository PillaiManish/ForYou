let logHelpers = require('../helpers/log-helper')
let dbHelpers = require('../helpers/db-helper')
let crypto = require('crypto'); 
let mails = require('../helpers/mail-queue-helper')
let totp = require("totp-generator");
let base32 = require('base-32')
let redisHelper = require('../helpers/redis-helper')
let constants = require('../config/constants')
let commonHelpers = require('../helpers/common-helper')

let sendOTP = (email)=>{
    return new Promise(async(resolve, reject)=>{
        let emailBase32 = base32.default.encode(email);
        let OTP = totp(emailBase32, {period: 270});

        try{
            await mails.pushMailQueue(constants.mailTypes.sendEmailOTP, {email: email, OTP: OTP})
        }
        catch(err){
            return reject({error:err, message: "Could not send the OTP."})
        }

        return resolve(true);
    })
}

let authenticateOTP = (data)=>{
    return new Promise(async (resolve, reject)=>{
        let emailBase32 = base32.default.encode(data.email);
        let OTP = totp(emailBase32, {period: 270});

        if (OTP != data.OTP){
            return reject({error:new Error('Incorrect OTP'), message: "Incorrect OTP."})
        }
        
        let isUserRegistered;
        let key = constants.redisKeys.userDetails + data.email

        try{
            isUserRegistered = await redisHelper.getDataFromRedisKey(key)
        }
        catch(err){
            logHelpers.error(err)
        }

        if (isUserRegistered != null){
            return resolve(true)
        }
        
        let query = "INSERT INTO USERS (id,email) VALUES($1, $2)";
        let dataArray = [commonHelpers.generateUuid(),data.email];
        let result;

        try{
            result = await dbHelpers.runQuery(query, dataArray);
        }
        catch(err){
            return reject({error:err, message: "Could not save the data."})
        }

        try{
            await redisHelper.setDataToRedisKey(key, {name: 'Guest'})
        }
        catch(err){
            logHelpers.error(err)
        }

        return resolve(true)
    })
}

module.exports = {
    sendOTP,
    authenticateOTP
}