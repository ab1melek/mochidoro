const setupAssociations = (models) => {
  const {
    User,
    DailyStreak,
    PetSpecies,
    Pet,
    PomodoroSession,
    Item,
    Inventory,
    PetItem,
    EggOpening
  } = models;

  User.hasMany(Pet, { foreignKey: 'user_id', as: 'pets' });
  Pet.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

  User.belongsTo(Pet, { foreignKey: 'active_pet_id', as: 'active_pet' });

  Pet.belongsTo(PetSpecies, { foreignKey: 'species_id', as: 'species' });
  PetSpecies.hasMany(Pet, { foreignKey: 'species_id', as: 'pets' });

  User.hasOne(DailyStreak, { foreignKey: 'user_id', as: 'streak' });
  DailyStreak.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

  User.hasMany(PomodoroSession, { foreignKey: 'user_id', as: 'pomodoros' });
  PomodoroSession.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

  User.hasMany(Inventory, { foreignKey: 'user_id', as: 'inventory' });
  Inventory.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

  Inventory.belongsTo(Item, { foreignKey: 'item_id', as: 'item' });
  Item.hasMany(Inventory, { foreignKey: 'item_id', as: 'inventories' });

  Pet.hasMany(PetItem, { foreignKey: 'pet_id', as: 'items' });
  PetItem.belongsTo(Pet, { foreignKey: 'pet_id', as: 'pet' });
  PetItem.belongsTo(Item, { foreignKey: 'item_id', as: 'item' });

  User.hasMany(EggOpening, { foreignKey: 'user_id', as: 'egg_openings' });
  EggOpening.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
  EggOpening.belongsTo(PetSpecies, { foreignKey: 'species_id', as: 'species' });
};

module.exports = { setupAssociations };