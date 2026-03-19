const { DataTypes } = require('sequelize');

const EGG_OPENINGS_TABLE = 'egg_openings';

const EggOpeningSchema = {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' }, field: 'user_id' },
  speciesId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'pet_species', key: 'id' }, field: 'species_id' },
  minutesAccumulated: { type: DataTypes.INTEGER, defaultValue: 0, field: 'minutes_accumulated' },
  isOpened: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'is_opened' },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'created_at' }
};

const createEggOpeningModel = (sequelize) => {
  const EggOpening = sequelize.define('EggOpening', EggOpeningSchema, {
    tableName: EGG_OPENINGS_TABLE,
    timestamps: false,
  });

  return EggOpening;
};

module.exports = { createEggOpeningModel, EggOpeningSchema, EGG_OPENINGS_TABLE };