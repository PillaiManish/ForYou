let express = require('express')

let journalRouters = express.Router()
let journalController = require('../controllers/journal-controller')

journalRouters.post('/', journalController.addJournalApi)
journalRouters.get('/', journalController.viewJournalApi)
journalRouters.get('/:uuid', journalController.viewSingleJournalApi)

module.exports = journalRouters;