let constants = require('../config/constants')
let logHelpers = require('./log-helper')
let redisHelper = require('./redis-helper')

let redisQueueHelper = (function () {
    let redisQueue = [];

    function init() {
        setInterval(async () => {
            const redisQuery = redisQueue.slice(0);
            redisQueue = redisQueue.slice(redisQuery.length);

            for (const query of redisQuery) {
                try {
                    await redisHelper[query.type](query.key, query.data)
                } catch (err) {
                    logHelpers.error(err.message)
                }
            }
            if (redisQuery.length > 0) {
                logHelpers.info("All redis query runned successfully")
            }
        }, 5000);
    }

    return {
        setUpRedisQueue: () => {
            init();
        }, pushRedisQueue: (redisType, redisKey, redisData = null) => {
            redisQueue.push({type: redisType, key: redisKey, data: redisData});
        }
    };
})();

module.exports = redisQueueHelper