/**
 * Service - Orquesta Functions y Queries
 * Llama a ambas capas y combina la lógica
 */

const { validateSessionType, calculateSessionResult } = require('./pomodoro.functions');
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
 * END - Finalizar sesión y ganar monedas
 * @param {number} userId - ID del usuario
 * @param {number} minutesCompleted - Minutos que realmente completó
 */
const endPomodoroService = async (userId, minutesCompleted) => {
  console.log('[SERVICE] Finalizando pomodoro...');

  // 1. Obtener la sesión activa del usuario (QUERY)
  const activeSession = await getActiveSessionByUserId(userId);
  if (!activeSession) {
    throw new Error('No hay sesión activa para finalizar');
  }

  // 2. Calcular resultado (monedas y si se completó) (FUNCTION)
  const { coins: coinsEarned, isCompleted } = calculateSessionResult(activeSession.type, minutesCompleted);

  // 3. Actualizar sesión (QUERY)
  console.log('[SERVICE] Marcando sesión como inactiva...');
  const updated = await updatePomodoroSession(activeSession.id, {
    minutesCompleted,
    coinsEarned,
    isActive: false,
  });

  // 4. Sumar monedas al usuario solo si se completó (QUERY)
  if (isCompleted) {
    await addCoinsToUser(userId, coinsEarned);
  }

  let petHatched = null;

  // 5. Si la sesión se completó, agregar minutos al huevo (QUERY)
  if (isCompleted) {
    const petQueries = await import('../../../../db/queries/pets.queries.js');
    const petFunctions = await import('../pets/pets.functions.js');
    
    const egg = await petQueries.getUnhatchedEggByUserId(userId);
    
    if (egg) {
      console.log('[SERVICE] 🥚 Actualizando minutos del huevo...');
      const { totalMinutes } = await petQueries.updateEggMinutes(egg.id, minutesCompleted);

      // Si el huevo alcanzó 60 minutos, crear la mascota automáticamente
      if (totalMinutes >= 60) {
        console.log('[SERVICE] 🎉 ¡Huevo listo para eclosionar! Creando mascota...');
        
        // Generar nombre y crear mascota
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
  }

  console.log('[SERVICE] ✅ Pomodoro finalizado. Completado:', isCompleted, 'Monedas ganadas:', coinsEarned);
  return {
    coinsEarned,
    minutesCompleted,
    isCompleted,
    petHatched,
    message: isCompleted ? 'Sesión completada exitosamente' : 'Sesión no completada',
  };
};

module.exports = {
  startPomodoroService,
  endPomodoroService,
};
