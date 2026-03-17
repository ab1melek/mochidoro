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

  console.log('[SERVICE] ✅ Pomodoro finalizado. Completado:', isCompleted, 'Monedas ganadas:', coinsEarned);
  return {
    coinsEarned,
    minutesCompleted,
    isCompleted,
    message: isCompleted ? 'Sesión completada exitosamente' : 'Sesión no completada',
  };
};

module.exports = {
  startPomodoroService,
  endPomodoroService,
};
