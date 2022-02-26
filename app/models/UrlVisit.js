const Sequelize = require('sequelize');
const statsDb = require('../config/statsDb');

const UrlVisit = statsDb.dbClient.define('UrlVisit', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    urlCode: {
        type: Sequelize.TEXT
    },
    longUrl: {
        type: Sequelize.TEXT
    },
    referrer: {
        type: Sequelize.TEXT
    },
    ipAddress: {
        type: Sequelize.TEXT
    },
    country: {
        type: Sequelize.TEXT
    }

});

module.exports = UrlVisit;