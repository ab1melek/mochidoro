const { DataTypes } = require('sequelize');

const ITEMS_TABLE = 'items';

const ItemSchema = {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(80), allowNull: false },
  type: { type: DataTypes.STRING(40), allowNull: false }, 
  price: { type: DataTypes.INTEGER, defaultValue: 0 },
  effectValue: { type: DataTypes.INTEGER, allowNull: true, field: 'effect_value' },
  imageUrl: { type: DataTypes.STRING(255), allowNull: true, field: 'image_url' },
  createdAt: { type: DataTypes.DATE, defaultValue: 'CURRENT_TIMESTAMP', field: 'created_at' }
};

const createItemModel = (sequelize) => {
  const Item = sequelize.define('Item', ItemSchema, {
    tableName: ITEMS_TABLE,
    timestamps: false,
  });

  return Item;
};

module.exports = { createItemModel, ItemSchema, ITEMS_TABLE };