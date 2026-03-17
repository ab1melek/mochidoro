require('server-only');

const sequelize = require('./connection');

const { createUserModel } = require('./models/user.model.js');
const { createDailyStreakModel } = require('./models/dailyStreak.model.js');
const { createPetSpeciesModel } = require('./models/petSpecies.model.js');
const { createPetModel } = require('./models/pet.model.js');
const { createPomodoroSessionModel } = require('./models/pomodoroSessions.model.js');
const { createItemModel } = require('./models/item.model.js');
const { createInventoryModel } = require('./models/inventory.model.js');
const { createPetItemModel } = require('./models/petItem.model.js');
const { createEggOpeningModel } = require('./models/eggOpening.model.js');

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