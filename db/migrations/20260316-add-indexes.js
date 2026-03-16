/* eslint-disable import/no-unresolved */
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    // Índices regulares para búsquedas por usuario
    await queryInterface.addIndex('pets', ['user_id'], {
      name: 'idx_pets_user',
    });

    // Índice para búsquedas por especie
    await queryInterface.addIndex('pets', ['species_id'], {
      name: 'idx_pets_species',
    });

    // Índice para inventario por usuario
    await queryInterface.addIndex('inventories', ['user_id'], {
      name: 'idx_inventory_user',
    });

    // Índice único para evitar items duplicados en inventario
    await queryInterface.addIndex('inventories', ['user_id', 'item_id'], {
      name: 'ux_inventory_user_item',
      unique: true,
    });

    // Índice único para garantizar una racha por usuario
    await queryInterface.addIndex('daily_streaks', ['user_id'], {
      name: 'ux_streak_user',
      unique: true,
    });

    // Índice para sesiones pomodoro por usuario
    await queryInterface.addIndex('pomodoro_sessions', ['user_id'], {
      name: 'idx_pomodoro_user',
    });

    // Índice para historial de huevos por usuario
    await queryInterface.addIndex('egg_openings', ['user_id'], {
      name: 'idx_egg_user',
    });

    // Índice para items en mascota
    await queryInterface.addIndex('pet_items', ['pet_id'], {
      name: 'idx_pet_items_pet',
    });

    // Índice extra para leaderboards y estadísticas por fecha
    await queryInterface.addIndex('pomodoro_sessions', ['created_at'], {
      name: 'idx_pomodoro_created',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('pomodoro_sessions', 'idx_pomodoro_created');
    await queryInterface.removeIndex('pet_items', 'idx_pet_items_pet');
    await queryInterface.removeIndex('egg_openings', 'idx_egg_user');
    await queryInterface.removeIndex('pomodoro_sessions', 'idx_pomodoro_user');
    await queryInterface.removeIndex('daily_streaks', 'ux_streak_user');
    await queryInterface.removeIndex('inventories', 'ux_inventory_user_item');
    await queryInterface.removeIndex('inventories', 'idx_inventory_user');
    await queryInterface.removeIndex('pets', 'idx_pets_species');
    await queryInterface.removeIndex('pets', 'idx_pets_user');
  },
};
