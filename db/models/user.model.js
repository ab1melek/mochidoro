const { DataTypes } = require('sequelize');

const USERS_TABLE = 'users';

const UserSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING(120),
    allowNull: false,
    unique: true,
  },
  googleId: {
  unique: true
  },
  coins: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  activePetId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'active_pet_id',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: 'CURRENT_TIMESTAMP',
    field: 'created_at',
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: 'CURRENT_TIMESTAMP',
    field: 'updated_at',
  }
};

const createUserModel = (sequelize) => {
  const User = sequelize.define('User', UserSchema, {
    tableName: USERS_TABLE,
  });

  return User;
};

module.exports = { createUserModel, UserSchema, USERS_TABLE };