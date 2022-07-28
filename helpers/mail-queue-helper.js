let constants = require('../config/constants')
let logHelpers = require('./log-helper')
let mails = require('./mail-helper').sendMails


let mailQueueHelper = (function () {
    let mailQueue = [];

    function init() {
        setInterval(async () => {
            const mailsToSend = mailQueue.slice(0);
            mailQueue = mailQueue.slice(mailsToSend.length);

            for (const mail of mailsToSend) {
                try {
                    await mails[mail.type](mail.data);
                } catch (err) {
                    logHelpers.error(err.message)
                }
            }
            if (mailsToSend.length > 0) {
                logHelpers.info("All mails send successfully")
            }
        }, 5000);
    }

    return {
        setUpMailQueue: () => {
            init();
        }, pushMailQueue: (mailType, mailData) => {
            mailQueue.push({type: mailType, data: mailData});
        }
    };
})();

module.exports = mailQueueHelper