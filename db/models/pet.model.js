const { DataTypes } = require('sequelize');

const PETS_TABLE = 'pets';

const PetSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' }
  },
  speciesId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'pet_species', key: 'id' },
    field: 'species_id',
  },
  name: { type: DataTypes.STRING(80), allowNull: true },
  hunger: { type: DataTypes.INTEGER, defaultValue: 80 }, 
  happiness: { type: DataTypes.INTEGER, defaultValue: 80 }, 
  level: { type: DataTypes.INTEGER, defaultValue: 1 },
  lastStateUpdateAt: { type: DataTypes.DATE, defaultValue: 'CURRENT_TIMESTAMP', field: 'last_state_update_at' },
  createdAt: { type: DataTypes.DATE, defaultValue: 'CURRENT_TIMESTAMP', field: 'created_at' },
  updatedAt: { type: DataTypes.DATE, defaultValue: 'CURRENT_TIMESTAMP', field: 'updated_at' }
};

const createPetModel = (sequelize) => {
  const Pet = sequelize.define('Pet', PetSchema, {
    tableName: PETS_TABLE,
    timestamps: false,
  });

  return Pet;
};

module.exports = { createPetModel, PetSchema, PETS_TABLE };