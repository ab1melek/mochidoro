const sequelize = require('./connection');

const { createUserModel } = require('./User');
const { createDailyStreakModel } = require('./DailyStreak');
const { createPetSpeciesModel } = require('./PetSpecies');
const { createPetModel } = require('./Pet');
const { createPomodoroSessionModel } = require('./PomodoroSession');
const { createItemModel } = require('./Item');
const { createInventoryModel } = require('./Inventory');
const { createPetItemModel } = require('./PetItem');
const { createEggOpeningModel } = require('./EggOpening');

const User = createUserModel(sequelize);
const DailyStreak = createDailyStreakModel(sequelize);
const PetSpecies = createPetSpeciesModel(sequelize);
const Pet = createPetModel(sequelize);
const PomodoroSession = createPomodoroSessionModel(sequelize);
const Item = createItemModel(sequelize);
const Inventory = createInventoryModel(sequelize);
const PetItem = createPetItemModel(sequelize);
const EggOpening = createEggOpeningModel(sequelize);

module.exports = {
  sequelize,
  User,
  DailyStreak,
  PetSpecies,
  Pet,
  PomodoroSession,
  Item,
  Inventory,
  PetItem,
  EggOpening
};