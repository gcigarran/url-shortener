const { Sequelize } = require('@sequelize/core');
const config = require('config');
const dbDialect = 'postgres';
const db = config.get(dbDialect);
const statsDb = {};

const dbClient = new Sequelize(db.database, db.user, db.password, {
      host: db.host,
      dialect: dbDialect,
      logging: console.log,
      dialectOptions: {
        ssl: {      
          require: true,
          rejectUnauthorized: false
        }
      }
  
      });

const connectDb = async () => {
    try {
        await dbClient.authenticate();
        console.log (`Stats Database Connected...`);
   } catch (err) {
       console.error(err.message);
       process.exit(1);

   }
};

statsDb.connectDb = connectDb;
statsDb.dbClient = dbClient;

module.exports = statsDb;