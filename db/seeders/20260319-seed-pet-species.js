/**
 * Seeder - Crear especies iniciales
 */

const { PetSpecies } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('pet_species', [
      {
        name: 'Gatito Clásico',
        rarity: 'common',
        cost: 25,
        image_url: '/pets/cat-classic.png',
        base_hunger: 80,
        base_happiness: 80,
        created_at: new Date(),
      },
      {
        name: 'Perrito Alegrón',
        rarity: 'common',
        cost: 25,
        image_url: '/pets/dog-happy.png',
        base_hunger: 75,
        base_happiness: 90,
        created_at: new Date(),
      },
      {
        name: 'Dragón Místico',
        rarity: 'rare',
        cost: 500,
        image_url: '/pets/dragon-mystic.png',
        base_hunger: 70,
        base_happiness: 85,
        created_at: new Date(),
      },
      {
        name: 'Fénix Dorado',
        rarity: 'rare',
        cost: 500,
        image_url: '/pets/phoenix-golden.png',
        base_hunger: 80,
        base_happiness: 95,
        created_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('pet_species', null, {});
  },
};
