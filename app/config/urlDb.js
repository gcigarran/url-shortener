const dbClient = require('mongoose');
const config = require('config');
const db = config.get('mongo');
const urlDb = {};

const connectDb = async () => {
    try {
        await dbClient.connect(db.uri, {
            useNewUrlParser: true
        });
    console.log (`URL Database Connected...`);
   } catch (err) {
       console.error(err.message);
       process.exit(1);

   }
};

urlDb.connectDb = connectDb;

module.exports = urlDb;

