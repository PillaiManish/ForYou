let logHelpers =  (() => {
    return {
        log: (data) => {
            console.log("LOG", data);
        },
        info: (data) => {
            console.log("INFO", data);
        },
        event: (data) => {
            console.log("EVENT", data);
        },
        alert: (data) => {
            console.log("ALERT", data);
        },
        request: (data) => {
            console.log("REQUEST", data);
        },
        response: (data) => {
            console.log("RESPONSE", data);
        },
        error: (data) => {
            console.log("ERROR", data);
        },
        dataError: (data) => {
            console.log("DATA_ERROR", data);
        }
    };

})();

module.exports = logHelpers;