const { DataTypes } = require('sequelize');

const PET_ITEMS_TABLE = 'pet_items';

const PetItemSchema = {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  petId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'pets', key: 'id' }, field: 'pet_id' },
  itemId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'items', key: 'id' }, field: 'item_id' },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'created_at' }
};

const createPetItemModel = (sequelize) => {
  const PetItem = sequelize.define('PetItem', PetItemSchema, {
    tableName: PET_ITEMS_TABLE,
    timestamps: false,
  });

  return PetItem;
};

module.exports = { createPetItemModel, PetItemSchema, PET_ITEMS_TABLE };