/**
 * Service - Orquesta Functions y Queries para Mascotas
 * Llama a ambas capas y combina la lógica
 */

const { validateAffordEgg, generatePetName } = require('./pets.functions');

const getQueries = async () => {
  const queries = await import('../../../../db/queries/pets.queries.js');
  return {
    getSpeciesById: queries.getSpeciesById,
    createEgg: queries.createEgg,
    getEggById: queries.getEggById,
    createPet: queries.createPet,
    markEggAsOpened: queries.markEggAsOpened,
    getUserById: queries.getUserById,
    subtractCoinsFromUser: queries.subtractCoinsFromUser,
  };
};

/**
 * BUY EGG - Comprar un huevo
 * @param {number} userId - ID del usuario
 * @param {number} speciesId - ID de la especie
 */
const buyEggService = async (userId, speciesId) => {
  console.log('[SERVICE] Comprando huevo...');

  const queries = await getQueries();

  // 1. Obtener especie (QUERY)
  const species = await queries.getSpeciesById(speciesId);

  // 2. Validar que el usuario tiene monedas (FUNCTION + QUERY)
  const user = await queries.getUserById(userId);
  validateAffordEgg(user.coins, species.cost);

  // 3. Crear huevo en BD (QUERY)
  const egg = await queries.createEgg(userId, speciesId);

  // 4. Restar monedas al usuario (QUERY)
  await queries.subtractCoinsFromUser(userId, species.cost);

  console.log('[SERVICE] ✅ Huevo comprado por', species.cost, 'monedas');
  return {
    egg,
    species: species.name,
    costDeducted: species.cost,
  };
};

/**
 * HATCH EGG - Abrir huevo, nace mascota
 * @param {number} userId - ID del usuario
 * @param {number} eggId - ID del huevo
 */
const hatchEggService = async (userId, eggId) => {
  console.log('[SERVICE] Abriendo huevo...');

  const queries = await getQueries();

  // 1. Obtener huevo (QUERY)
  const egg = await queries.getEggById(eggId);

  // Validar que el huevo pertenece al usuario
  if (egg.userId !== userId) {
    throw new Error('Este huevo no te pertenece');
  }

  // 2. Obtener especie (QUERY)
  const species = await queries.getSpeciesById(egg.speciesId);

  // 3. Generar nombre (FUNCTION)
  const petName = generatePetName(species.name);

  // 4. Crear mascota (QUERY)
  const pet = await queries.createPet(userId, egg.speciesId, petName);

  // 5. Marcar huevo como abierto (QUERY)
  await queries.markEggAsOpened(eggId);

  console.log('[SERVICE] ✅ ¡Nació una mascota!');
  return {
    pet,
    petName,
    species: species.name,
  };
};

// SERVICIO DE ALIMENTAR

module.exports = {
  buyEggService,
  hatchEggService,
};
