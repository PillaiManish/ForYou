let {addJournal,viewJournal} = require('../services/journal-services')
let logHelpers = require('../helpers/log-helper')

let addJournalApi = async (req, res) => {
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
    let data
    try{
        data = await viewJournal({jwt:req.headers.authorization})
    }

    catch(err){
        return res.send({
            success:false,
            message:"Failed to get Journal."
        })
    }
    logHelpers.info("Journals viewed successfully")
    res.send({
        success:true,
        data:data,
        message:"Journals viewed successfully"
    })

}

module.exports = {
    addJournalApi,
    viewJournalApi
}