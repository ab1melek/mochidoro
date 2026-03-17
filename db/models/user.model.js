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
    type: DataTypes.STRING(255),
    allowNull: true,
    unique: true,
    field: 'google_id',
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
    defaultValue: DataTypes.NOW,
    field: 'created_at',
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
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