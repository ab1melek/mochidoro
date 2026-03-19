/**
 * Queries de Mascotas
 * Interactúan directamente con los modelos Sequelize
 */

/**
 * Obtener especie por ID
 */
const getSpeciesById = async (speciesId) => {
  const { PetSpecies } = await import('../index.js');

  console.log('[QUERY] Buscando especie:', speciesId);

  const species = await PetSpecies.findByPk(speciesId);

  if (!species) {
    throw new Error('Especie no encontrada');
  }

  console.log('[QUERY] ✅ Especie encontrada:', species.name);
  return species;
};

/**
 * Crear huevo
 */
const createEgg = async (userId, speciesId) => {
  const { EggOpening } = await import('../index.js');

  console.log('[QUERY] Creando huevo para usuario:', userId, 'Especie:', speciesId);

  const egg = await EggOpening.create({
    userId,
    speciesId,
    isOpened: false,
  });

  console.log('[QUERY] ✅ Huevo creado:', egg.id);
  return egg;
};

/**
 * Obtener huevo por ID
 */
const getEggById = async (eggId) => {
  const { EggOpening } = await import('../index.js');

  console.log('[QUERY] Buscando huevo:', eggId);

  const egg = await EggOpening.findByPk(eggId);

  if (!egg) {
    throw new Error('Huevo no encontrado');
  }

  if (egg.isOpened) {
    throw new Error('Este huevo ya fue abierto');
  }

  console.log('[QUERY] ✅ Huevo encontrado');
  return egg;
};

/**
 * Crear mascota
 */
const createPet = async (userId, speciesId, name) => {
  const { Pet } = await import('../index.js');

  console.log('[QUERY] Creando mascota para usuario:', userId, 'Especie:', speciesId, 'Nombre:', name);

  const pet = await Pet.create({
    userId,
    speciesId,
    name,
    hunger: 80,
    happiness: 80,
    level: 1,
  });

  console.log('[QUERY] ✅ Mascota creada:', pet.id, '- Nombre:', name);
  return pet;
};

/**
 * Marcar huevo como abierto
 */
const markEggAsOpened = async (eggId) => {
  const { EggOpening } = await import('../index.js');

  console.log('[QUERY] Marcando huevo como abierto:', eggId);

  const egg = await EggOpening.update({ isOpened: true }, { where: { id: eggId }, returning: true });

  console.log('[QUERY] ✅ Huevo marcado como abierto');
  return egg;
};

/**
 * Obtener usuario
 */
const getUserById = async (userId) => {
  const { User } = await import('../index.js');

  console.log('[QUERY] Obteniendo usuario:', userId);

  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  console.log('[QUERY] ✅ Usuario encontrado. Monedas:', user.coins);
  return user;
};

/**
 * Restar monedas al usuario
 */
const subtractCoinsFromUser = async (userId, coinsToSubtract) => {
  const { User } = await import('../index.js');

  console.log('[QUERY] Restando', coinsToSubtract, 'monedas al usuario:', userId);

  const user = await User.findByPk(userId);
  const newCoins = Math.max(0, user.coins - coinsToSubtract);

  await user.update({ coins: newCoins });

  console.log('[QUERY] ✅ Monedas restadas. Nuevas monedas:', newCoins);
  return newCoins;
};

/**
 * Obtener huevo no abierto del usuario
 */
const getUnhatchedEggByUserId = async (userId) => {
  const { EggOpening } = await import('../index.js');

  console.log('[QUERY] Buscando huevo no abierto del usuario:', userId);

  const egg = await EggOpening.findOne({
    where: { userId, isOpened: false },
    order: [['id', 'DESC']], // Obtener el más reciente
  });

  if (!egg) {
    console.log('[QUERY] ℹ️ No hay huevo sin abrir');
    return null;
  }

  console.log('[QUERY] ✅ Huevo encontrado. Minutos acumulados:', egg.minutesAccumulated);
  return egg;
};

/**
 * Actualizar minutos acumulados del huevo
 */
const updateEggMinutes = async (eggId, minutesToAdd) => {
  const { EggOpening } = await import('../index.js');

  console.log('[QUERY] Actualizando minutos del huevo:', eggId, '+', minutesToAdd);

  const egg = await EggOpening.findByPk(eggId);
  const newMinutes = egg.minutesAccumulated + minutesToAdd;

  await egg.update({ minutesAccumulated: newMinutes });

  console.log('[QUERY] ✅ Minutos acumulados:', newMinutes, '/ 60');
  return { egg, totalMinutes: newMinutes };
};

module.exports = {
  getSpeciesById,
  createEgg,
  getEggById,
  createPet,
  markEggAsOpened,
  getUserById,
  subtractCoinsFromUser,
  getUnhatchedEggByUserId,
  updateEggMinutes,
  subtractCoinsFromUser,
};
