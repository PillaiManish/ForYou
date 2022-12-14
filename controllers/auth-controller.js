let logHelpers = require('../helpers/log-helper')
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
    let data = null
    try {
        data = await authenticateOTP({email:req.body.email, OTP:req.body.OTP})
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
        data: data,
        message:"OTP authenticated successfully"
    })
}

module.exports = {
    sendOTPAPI,
    authenticateOTPApi
}