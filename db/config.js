const { dbConfig } = require('../app/common/config.js');

module.exports = {
  development: {
    username: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.name,
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: 'postgres',
  },
  production: {
    username: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.name,
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: 'postgres',
  },
};
