const { DataTypes } = require('sequelize');

const INVENTORIES_TABLE = 'inventories';

const InventorySchema = {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' }, field: 'user_id' },
  itemId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'items', key: 'id' }, field: 'item_id' },
  quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'created_at' }
};

const createInventoryModel = (sequelize) => {
  const Inventory = sequelize.define('Inventory', InventorySchema, {
    tableName: INVENTORIES_TABLE,
    timestamps: false,
  });

  return Inventory;
};

module.exports = { createInventoryModel, InventorySchema, INVENTORIES_TABLE };