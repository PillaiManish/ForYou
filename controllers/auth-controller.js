let logHelpers = require('../helpers/log-helper')
let dbHelpers = require('../helpers/db-helper')
let crypto = require('crypto'); 
let {sendOTP, authenticateOTP} = require('../services/auth-services')

let sendOTPAPI = async (req, res)=> {
    try{
        await sendOTP(req.body.email)
    }

    catch (err){
        return res.send({
            success:false,
            message:"Failed to send OTP."
        })
    }

    logHelpers.info("OTP send successfully")
    
    res.send({
        success:true,
        message:"OTP send successfully"
    })
}

let authenticateOTPApi = async (req, res) => {
    try {
        await authenticateOTP({email:req.body.email, OTP:req.body.OTP})
    }
    catch(err){
        return res.send({
            success:false,
            message:"OTP authentication failed."
        })
    }

    logHelpers.info("Successfully Authenticated")

    res.send({
        success:true,
        message:"OTP authenticated successfully"
    })
}

module.exports = {
    sendOTPAPI,
    authenticateOTPApi
}