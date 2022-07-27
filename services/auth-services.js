let logHelpers = require('../helpers/log-helper')
let dbHelpers = require('../helpers/db-helper')
let crypto = require('crypto'); 


let register = (name, email)=>{
    return new Promise(async(resolve, reject)=>{
        let query = "INSERT INTO USERS (name, email) VALUES($1,$2)";
        let dataArray = [name, email];

        try{
            let result = await dbHelpers.runQuery(query, dataArray);
        }
        catch(err){
            return reject({error:err, message: "Could not save the data."})
        }

        return resolve(true);
    })
}

module.exports = {
    register
}