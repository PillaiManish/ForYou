let {addJournal,viewJournal} = require('../services/journal-services')
let logHelpers = require('../helpers/log-helper')

let addJournalApi = async(req, res) => {
    try{
        await addJournal({content:req.body.content, jwt:req.headers.authorization})
    }

    catch(err){
        return res.send({
            success:false,
            message:"Failed to add Journal."
        })
    }

    logHelpers.info("Journal added successfully")
    res.send({
        success:true,
        message:"Journal added successfully"
    })
}

let viewJournalApi = async (req, res) => {
    try{
        await viewJournal()
    }

    catch(err){
        return res.send({
            success:false,
            message:"Failed to get Journal."
        })
    }
    logHelpers.info("Journal view successfully")
    res.send({
        success:true,
        message:"Journal view successfully"
    })

}

module.exports = {
    addJournalApi,
    viewJournalApi
}