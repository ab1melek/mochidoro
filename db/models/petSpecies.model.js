const { DataTypes } = require('sequelize');

const PET_SPECIES_TABLE = 'pet_species';

const PetSpeciesSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: { type: DataTypes.STRING(80), allowNull: false },
  rarity: { type: DataTypes.STRING(20), allowNull: false }, // common, rare, epic...
  imageUrl: { type: DataTypes.STRING(255), allowNull: true, field: 'image_url' },
  baseHunger: { type: DataTypes.INTEGER, defaultValue: 80, field: 'base_hunger' },
  baseHappiness: { type: DataTypes.INTEGER, defaultValue: 80, field: 'base_happiness' },
  createdAt: { type: DataTypes.DATE, defaultValue: 'CURRENT_TIMESTAMP', field: 'created_at' }
};

const createPetSpeciesModel = (sequelize) => {
  const PetSpecies = sequelize.define('PetSpecies', PetSpeciesSchema, {
    tableName: PET_SPECIES_TABLE,
    timestamps: false,
  });

  return PetSpecies;
};

module.exports = { createPetSpeciesModel, PetSpeciesSchema, PET_SPECIES_TABLE };