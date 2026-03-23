/**
 * Service - Orquesta Functions y Queries
 * Llama a ambas capas y combina la lógica
 */

const { validateSessionType, calculateCoinsForCompletedSession } = require('./pomodoro.functions');
const { getActiveSessionByUserId, createPomodoroSession, getPomodoroSessionById, updatePomodoroSession, addCoinsToUser } = require('../../../../db/queries/pomodoro.queries');

/**
 * START - Iniciar sesión de pomodoro
 * @param {number} userId - ID del usuario
 * @param {string} type - Tipo de sesión: 'session', 'long-session', 'break', 'long-break'
 */
const startPomodoroService = async (userId, type) => {
  console.log('[SERVICE] Iniciando pomodoro...');

  // 1. Validar tipo de sesión (FUNCTION)
  validateSessionType(type);

  // 2. Validar que no haya otra sesión activa (QUERY)
  const activeSession = await getActiveSessionByUserId(userId);
  if (activeSession) {
    throw new Error(`Ya tienes una sesión activa. Finalízala primero (ID: ${activeSession.id})`);
  }

  // 3. Crear en BD (QUERY)
  const session = await createPomodoroSession(userId, type);

  console.log('[SERVICE] ✅ Pomodoro iniciado');
  return session;
};

/**
 * END - Finalizar sesión completada y ganar monedas
 * ASUME QUE TODO POST ES SESIÓN COMPLETADA (frontend solo envía cuando timer llega a 0:00)
 * @param {number} userId - ID del usuario
 * @param {number} minutesCompleted - Minutos completados (25, 5, 15, 60)
 * @param {string} type - Tipo de sesión: 'session', 'long-session', 'break', 'long-break'
 */
const endPomodoroService = async (userId, minutesCompleted, type) => {
  console.log('[SERVICE] Finalizando sesión completada...', { userId, minutesCompleted, type });

  // 1. Validar tipo de sesión
  validateSessionType(type);

  // 2. Obtener o crear sesión
  let activeSession = await getActiveSessionByUserId(userId);
  if (!activeSession) {
    console.log('[SERVICE] ℹ️  No hay sesión anterior. Creando nueva...');
    activeSession = await createPomodoroSession(userId, type);
  }

  // 3. Calcular monedas para sesión completada
  const { coins: coinsEarned } = calculateCoinsForCompletedSession(activeSession.type);

  // 4. Actualizar sesión con datos de finalización
  const updated = await updatePomodoroSession(activeSession.id, {
    minutesCompleted,
    coinsEarned,
    isActive: false,
  });

  // 5. Sumar monedas al usuario
  await addCoinsToUser(userId, coinsEarned);

  let petHatched = null;

  // 6. Agregar minutos al huevo y verificar eclosión
  const petQueries = await import('../../../../db/queries/pets.queries.js');
  const petFunctions = await import('../pets/pets.functions.js');
  
  const egg = await petQueries.getUnhatchedEggByUserId(userId);
  if (egg) {
    console.log('[SERVICE] 🥚 Sumando minutos al huevo...');
    const { totalMinutes } = await petQueries.updateEggMinutes(egg.id, minutesCompleted);

    // Si el huevo alcanzó 25 minutos, crear la mascota automáticamente
    if (totalMinutes >= 25) {
      console.log('[SERVICE] 🎉 ¡Huevo eclosionado! Creando mascota...');
      const species = await petQueries.getSpeciesById(egg.speciesId);
      const petName = petFunctions.generatePetName(species.name);
      const pet = await petQueries.createPet(userId, egg.speciesId, petName);
      await petQueries.markEggAsOpened(egg.id);
      
      petHatched = {
        petId: pet.id,
        petName: petName,
        speciesName: species.name,
      };
      console.log('[SERVICE] ✅ ¡Mascota ' + petName + ' ha nacido!');
    }
  }

  console.log('[SERVICE] ✅ Pomodoro completado. Monedas ganadas:', coinsEarned);
  return {
    coinsEarned,
    minutesCompleted,
    type,
    petHatched,
    message: 'Sesión completada - monedas otorgadas',
  };
};

module.exports = {
  startPomodoroService,
  endPomodoroService,
};
