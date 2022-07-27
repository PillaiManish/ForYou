let constants = require('../config/constants')

let Pool = require('pg').Pool
let logHelpers = require('./log-helper')

let dbHelpers =  (() => {

    let pool;
    function connectToDataBase(){
        try {
            pool = new Pool({
                user: constants.dbConfig.dbUser,
                host: constants.dbConfig.host,
                database: constants.dbConfig.dbName,
                password: constants.dbConfig.dbPassword,
                port: constants.dbConfig.dbPort,
                max: constants.dbConfig.dbMaxConn,
                maxUses: constants.dbConfig.dbMaxConnUses,
            })
            logHelpers.info("Connected to DataBase")

        }

        catch(err){
            logHelpers.error("Cannot connect to DataBase")
        }
    }
    

    return {
        setUpConnectionPool: ()=>{
            if(!pool){
                try {
                    connectToDataBase();
                }

                catch(err){
                }
            }
        },

        runQuery: async (query, dataArray)=>{
            if(!pool){
                try{
                    connectToDataBase();
                }

                catch(err){

                }
            }

            let queryResult = null;
            try{
                queryResult = await pool.query(query, dataArray) 
                let printSuccess = "The query "+query+" run successfully"
                logHelpers.info(printSuccess)
            }
            catch(err){
                logHelpers.error(err.message)
                throw err;
            }

            return queryResult
        },

    }
    
})();

module.exports = dbHelpers;