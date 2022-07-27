let logHelpers = require('../helpers/log-helper')
let dbHelpers = require('../helpers/db-helper')
let crypto = require('crypto'); 
let {register} = require('../services/auth-services')

let login = (req, res) => {

}

let registerApi = async (req, res)=> {
    try{
        await register(req.body.email, req.body.name)
    }

    catch (err){
        return res.send({
            success:false,
            message:"User registration failed."
        })
    }

    logHelpers.info("Successfully Registered")
    
    res.send({
        success:true,
        message:"User has been registered Successfully"
    })
}

module.exports = {
    login,
    registerApi
}