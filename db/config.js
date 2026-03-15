import { Sequelize } from 'sequelize';
import { dbConfig } from '../app/common/config.js';

const sequelize = new Sequelize(
  dbConfig.name,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: 'postgres',
  }
);

export default sequelize;