let logHelpers = require('../helpers/log-helper')
let dbHelpers = require('../helpers/db-helper')
let crypto = require('crypto'); 
let {authentication} = require('../services/auth-services')

let authenticationAPI = async (req, res)=> {
    try{
        await authentication(req.body.name, req.body.email)
    }

    catch (err){
        return res.send({
            success:false,
            message:"User authentication failed."
        })
    }

    logHelpers.info("Successfully Authenticated")
    
    res.send({
        success:true,
        message:"User has been authenticated Successfully"
    })
}

module.exports = {
    authenticationAPI,
}