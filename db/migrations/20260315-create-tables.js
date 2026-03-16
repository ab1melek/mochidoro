/* eslint-disable import/no-unresolved */
/** @type {import('sequelize-cli').Migration} */

const { USERS_TABLE, UserSchema } = require('../models/user.model.js');
const { DAILY_STREAKS_TABLE, DailyStreakSchema } = require('../models/dailyStreak.model.js');
const { PET_SPECIES_TABLE, PetSpeciesSchema } = require('../models/petSpecies.model.js');
const { PETS_TABLE, PetSchema } = require('../models/pet.model.js');
const { ITEMS_TABLE, ItemSchema } = require('../models/item.model.js');
const { PET_ITEMS_TABLE, PetItemSchema } = require('../models/petItem.model.js');
const { EGG_OPENINGS_TABLE, EggOpeningSchema } = require('../models/eggOpening.model.js');
const { INVENTORIES_TABLE, InventorySchema } = require('../models/inventory.model.js');
const { POMODORO_SESSIONS_TABLE, PomodoroSessionSchema } = require('../models/pomodoroSessions.model.js');

// Helper to convert schemas for migration
const convertSchemaForMigration = (schema, Sequelize) => {
  const converted = {};
  Object.keys(schema).forEach((key) => {
    const field = { ...schema[key] };
    if (field.defaultValue === 'CURRENT_TIMESTAMP') {
      field.defaultValue = Sequelize.literal('CURRENT_TIMESTAMP');
    }
    converted[key] = field;
  });
  return converted;
};

module.exports = {
  async up(queryInterface, Sequelize) {
    const userSchema = convertSchemaForMigration(UserSchema, Sequelize);
    const dailyStreakSchema = convertSchemaForMigration(DailyStreakSchema, Sequelize);
    const petSpeciesSchema = convertSchemaForMigration(PetSpeciesSchema, Sequelize);
    const petSchema = convertSchemaForMigration(PetSchema, Sequelize);
    const itemSchema = convertSchemaForMigration(ItemSchema, Sequelize);
    const petItemSchema = convertSchemaForMigration(PetItemSchema, Sequelize);
    const eggOpeningSchema = convertSchemaForMigration(EggOpeningSchema, Sequelize);
    const inventorySchema = convertSchemaForMigration(InventorySchema, Sequelize);
    const pomodoroSessionSchema = convertSchemaForMigration(PomodoroSessionSchema, Sequelize);

    await queryInterface.createTable(USERS_TABLE, userSchema);
    await queryInterface.createTable(PET_SPECIES_TABLE, petSpeciesSchema);
    await queryInterface.createTable(ITEMS_TABLE, itemSchema);
    await queryInterface.createTable(PETS_TABLE, petSchema);
    await queryInterface.createTable(DAILY_STREAKS_TABLE, dailyStreakSchema);
    await queryInterface.createTable(EGG_OPENINGS_TABLE, eggOpeningSchema);
    await queryInterface.createTable(PET_ITEMS_TABLE, petItemSchema);
    await queryInterface.createTable(INVENTORIES_TABLE, inventorySchema);
    await queryInterface.createTable(POMODORO_SESSIONS_TABLE, pomodoroSessionSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(POMODORO_SESSIONS_TABLE);
    await queryInterface.dropTable(INVENTORIES_TABLE);
    await queryInterface.dropTable(PET_ITEMS_TABLE);
    await queryInterface.dropTable(EGG_OPENINGS_TABLE);
    await queryInterface.dropTable(DAILY_STREAKS_TABLE);
    await queryInterface.dropTable(PETS_TABLE);
    await queryInterface.dropTable(ITEMS_TABLE);
    await queryInterface.dropTable(PET_SPECIES_TABLE);
    await queryInterface.dropTable(USERS_TABLE);
  },
};
