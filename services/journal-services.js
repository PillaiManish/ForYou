let dbHelpers = require('../helpers/db-helper')
let redisHelper = require('../helpers/redis-helper')
let constants = require('../config/constants')
let commonHelpers = require('../helpers/common-helper')
let jsonwebtoken = require('jsonwebtoken');
const logHelpers = require('../helpers/log-helper');
let redis = require('../helpers/redis-queue-helper')

let addJournal = (data) => {
    return new Promise(async(resolve, reject)=>{
        let token = null
        
        try{
            token = jsonwebtoken.verify(data.jwt, constants.JWT.JWT_SECRET_KEY)
        }
        catch (err){
            return reject({error:err, message: "Invalid JWT"})
        }

        let uuid = commonHelpers.generateUuid()
        let query = "INSERT INTO JOURNALS (id, user_id, content) VALUES($1, $2, $3) RETURNING *";
        let dataArray = [uuid, token.uuid, data.content];
        let result;

        try{
            result = await dbHelpers.runQuery(query, dataArray);
        }
        catch(err){
            return reject({error:err, message: "Could not save the data."})
        }

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
            list.push(result.rows[0])
        }
        else{
            list = result.rows
        }

        try{
            await redis.pushRedisQueue(constants.redisQueue.setKeyData, key, list)
        }
        catch(err){
            logHelpers.error(err)
        }

        return resolve(true)
    })

}

let viewJournal = (data) => {
    return new Promise(async(resolve, reject)=>{
        let token = null
        let result = null
        
        try{
            token = jsonwebtoken.verify(data.jwt, constants.JWT.JWT_SECRET_KEY)
        }
        catch (err){
            return reject({error:err, message: "Invalid JWT"})
        }


        let key = constants.redisKeys.userBlogList + token.uuid

        try{
            isKeyPresent = await redisHelper.getDataFromRedisKey(key)
        }
        catch(err){
            logHelpers.error(err)
        }

        if (isKeyPresent != null){
            return resolve({journals: JSON.parse(isKeyPresent)})
        }

        let query = "SELECT * FROM JOURNALS where user_id=$1";
        let dataArray = [token.uuid];

        try{
            result = await dbHelpers.runQuery(query, dataArray);
        }
        catch(err){
            return reject({error:err, message: "Could not collect the data."})
        }

        return resolve({journals: result.rows})
    })

}

let viewSingleJournal = (data)=>{
    return new Promise(async(resolve, reject)=>{
        let token = null
        let result = null
        
        console.log(data.journalUUID)
        try{
            token = jsonwebtoken.verify(data.jwt, constants.JWT.JWT_SECRET_KEY)
        }
        catch (err){
            return reject({error:err, message: "Invalid JWT"})
        }

        let query = "SELECT * FROM JOURNALS WHERE id=$1";
        let dataArray = [data.journalUUID];

        try{
            result = await dbHelpers.runQuery(query, dataArray);
        }
        catch(err){
            return reject({error:err, message: "Could not get the data."})
        }

        return resolve({journal: result.rows[0]})


    })
}

module.exports = {
    addJournal,
    viewJournal,
    viewSingleJournal
}