let logHelpers = require('../helpers/log-helper')
let dbHelpers = require('../helpers/db-helper')
let crypto = require('crypto'); 
let mails = require('../helpers/mail-queue-helper')
let totp = require("totp-generator");
let base32 = require('base-32')
let redisHelper = require('../helpers/redis-helper')
let constants = require('../config/constants')
let commonHelpers = require('../helpers/common-helper')
let jsonwebtoken = require('jsonwebtoken')

let sendOTP = (email)=>{
    return new Promise(async(resolve, reject)=>{
        let emailBase32 = base32.default.encode(email);
        let OTP = totp(emailBase32, {period: 270});

        logHelpers.info(OTP)
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

        let jwt = null;
        if (isUserRegistered != null){
            jwt = jsonwebtoken.sign({
                uuid: JSON.parse(isUserRegistered)}, constants.JWT.JWT_SECRET_KEY,
                {expiresIn: '90d'});
    
            return resolve({jwt: jwt})
        }
        
        let uuid = commonHelpers.generateUuid()
        let query = "INSERT INTO USERS (id,email) VALUES($1, $2)";
        let dataArray = [uuid,data.email];
        let result;

        try{
            result = await dbHelpers.runQuery(query, dataArray);
        }
        catch(err){
            return reject({error:err, message: "Could not save the data."})
        }

        try{
            await redisHelper.setDataToRedisKey(key, uuid)
        }
        catch(err){
            logHelpers.error(err)
        }

        jwt = jsonwebtoken.sign({
            uuid: uuid}, constants.JWT.JWT_SECRET_KEY,
            {expiresIn: '90d'});

        return resolve({jwt: jwt})

    })
}

module.exports = {
    sendOTP,
    authenticateOTP
}