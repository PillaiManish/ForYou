let express = require('express')
let app = express()
let logHelpers = require('./helpers/log-helper')
let bodyParser = require('body-parser');
let mailQueueHelper = require('./helpers/mail-queue-helper')
let redisQueueHelper = require('./helpers/redis-queue-helper')

let dbHelpers = require('./helpers/db-helper')
dbHelpers.setUpConnectionPool()

let redisHelper = require('./helpers/redis-helper')
redisHelper.setUpRedisConnection().then().catch((err) => {
    logHelpers.error('Failed to connect to redis')
    process.exit(0);
})
redisQueueHelper.setUpRedisQueue()
mailQueueHelper.setUpMailQueue();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


let authRouters = require('./routers/auth-routers')
app.use('/auth',authRouters)


let journalRouters = require('./routers/journal-routers')
app.use('/journal',journalRouters)

app.listen(3000, ()=>{
    logHelpers.log("Listening to PORT 3000")
})