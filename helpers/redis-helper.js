let createClient = require('redis').createClient
let constants = require('../config/constants')
let logHelpers = require('./log-helper')

let redisHelper = (function () {
    let instance;

    function createInstance() {
        return new Promise(async (resolve, reject) => {
            try {
                instance = createClient({
                    url: `redis://${constants.redisConfig.redisUsername}:${constants.redisConfig.redisPassword}@${constants.redisConfig.redisHost}:${constants.redisConfig.redisPort}`,
                });
                await instance.connect();
                logHelpers.info('Successfully connected to redis');
            } catch (err) {
                return reject(err);
            }
            return resolve(instance);
        });
    }

    return {
        setUpRedisConnection: () => {
            return new Promise(async (resolve, reject) => {
                if (!instance) {
                    try {
                        instance = await createInstance();
                    } catch (err) {
                        logHelpers.error('Failed to connect to redis');
                        return reject(err);
                    }
                }
                return resolve(true);
            });
        },
        getDataFromRedisKey: async (key) => {
            if (!instance) {
                try {
                    instance = await createInstance();
                } catch (err) {
                    logHelpers.error('Failed to connect to redis');
                    throw err;
                }
            }

            let redisResponse;

            try {
                redisResponse = await instance.get(key);
            } catch (err) {
                logHelpers.error('Failed to fetch data from redis');
                throw err;
            }
            return redisResponse;
        },

        setDataToRedisKey: async (key, data) => {
            if (!data) {
                logHelpers.error('data cannot be empty');
                throw new Error('data cannot be empty');
            }

            if (!key) {
                logHelpers.error('key cannot be empty');
                throw new Error('key cannot be empty');
            }

            if (!instance) {
                try {
                    instance = await createInstance();
                } catch (err) {
                    logHelpers.error('Failed to connect to redis');
                    throw err;
                }
            }

            try {
                await instance.set(key, JSON.stringify(data));
            } catch (err) {
                logHelpers.error('Failed to set data to redis');
                throw err;
            }
            return true;
        }
    };
})();

module.exports = redisHelper