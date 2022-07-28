let crypto = require('crypto')

const generateUuid = () => {
    return crypto.randomUUID();
}

module.exports = {
    generateUuid
}