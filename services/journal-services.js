let dbHelpers = require('../helpers/db-helper')
let crypto = require('crypto'); 
let totp = require("totp-generator");
let base32 = require('base-32')
let redisHelper = require('../helpers/redis-helper')
let constants = require('../config/constants')
let commonHelpers = require('../helpers/common-helper')
let jsonwebtoken = require('jsonwebtoken');
const logHelpers = require('../helpers/log-helper');

let addJournal = (data) => {
    new Promise(async(resolve, reject)=>{
        let token = null
        
        try{
            token = jsonwebtoken.verify(data.jwt, constants.JWT.JWT_SECRET_KEY)
        }
        catch (err){
            return reject({error:err, message: "Invalid JWT"})
        }

        let uuid = commonHelpers.generateUuid()
        let query = "INSERT INTO JOURNALS (id, user_id, content) VALUES($1, $2, $3)";
        let dataArray = [uuid, token.uuid, data.content];
        let result;

        try{
            result = await dbHelpers.runQuery(query, dataArray);
        }
        catch(err){
            return reject({error:err, message: "Could not save the data."})
        }

        logHelpers.info("New Journal Added")

        let key = constants.redisKeys.userBlogList + token.uuid

        try{
            isKeyPresent = await redisHelper.getDataFromRedisKey(key)
        }
        catch(err){
            logHelpers.error(err)
        }

        let list;
        if (isKeyPresent != null){
            list = JSON.parse(isKeyPresent)
            list.push(uuid)
        }
        else{
            list = [uuid]
        }

        try{
            await redisHelper.setDataToRedisKey(key, list)
        }
        catch(err){
            logHelpers.error(err)
        }

        return resolve(true)
    })

}

let viewJournal = () => {
    new Promise(async(resolve, reject)=>{
        resolve(true)
    })

}

module.exports = {
    addJournal,
    viewJournal
}