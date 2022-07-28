let express = require('express')

let journalRouters = express.Router()
let journalController = require('../controllers/journal-controller')

journalRouters.post('/add/', journalController.addJournalApi)
journalRouters.post('/view', journalController.viewJournalApi)

module.exports = journalRouters;