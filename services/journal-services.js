
let addJournal = () => {
    new Promise(async(resolve, reject)=>{
        let query = "INSERT INTO JOURNALS (id, user_id, ) VALUES($1, $2)";
        let dataArray = [commonHelpers.generateUuid(),data.email];
        let result;

        try{
            result = await dbHelpers.runQuery(query, dataArray);
        }
        catch(err){
            return reject({error:err, message: "Could not save the data."})
        }

        return resolve(true)
    })

}

let viewJournal = () => {
    new Promise(async(resolve, reject)=>{
        resolve(true)
    })

}

module.exports = {
    addJournal,
    viewJournal
}