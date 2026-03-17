/**
 * Service - Orquesta Functions y Queries
 * Llama a ambas capas y combina la lógica
 */

const { validateDuration, calculateCoins } = require('./pomodoro.functions');
const { createPomodoroSession, getPomodoroSessionById, updatePomodoroSession, addCoinsToUser } = require('../../../db/queries/pomodoro.queries');

/**
 * START - Iniciar sesión de pomodoro
 */
const startPomodoroService = async (userId, durationMinutes) => {
  console.log('[SERVICE] Iniciando pomodoro...');

  // 1. Validar duración (FUNCTION)
  validateDuration(durationMinutes);

  // 2. Crear en BD (QUERY)
  const session = await createPomodoroSession(userId, durationMinutes);

  console.log('[SERVICE] ✅ Pomodoro iniciado');
  return session;
};

/**
 * PAUSE - Pausar sesión
 */
const pausePomodoroService = async (sessionId) => {
  console.log('[SERVICE] Pausando pomodoro...');

  // 1. Obtener sesión (QUERY)
  await getPomodoroSessionById(sessionId);

  // 2. Actualizar estado (QUERY)
  const updated = await updatePomodoroSession(sessionId, { isActive: false });

  console.log('[SERVICE] ✅ Pomodoro pausado');
  return updated;
};

/**
 * RESTART - Reanudar sesión
 */
const restartPomodoroService = async (sessionId) => {
  console.log('[SERVICE] Reanudando pomodoro...');

  // 1. Obtener sesión (QUERY)
  await getPomodoroSessionById(sessionId);

  // 2. Actualizar estado (QUERY)
  const updated = await updatePomodoroSession(sessionId, { isActive: true });

  console.log('[SERVICE] ✅ Pomodoro reanudado');
  return updated;
};

/**
 * END - Finalizar sesión y ganar monedas
 */
const endPomodoroService = async (sessionId, durationMinutes, userId) => {
  console.log('[SERVICE] Finalizando pomodoro...');

  // 1. Validar duración (FUNCTION)
  validateDuration(durationMinutes);

  // 2. Calcular monedas (FUNCTION)
  const coinsEarned = calculateCoins(durationMinutes);

  // 3. Actualizar sesión (QUERY)
  const updated = await updatePomodoroSession(sessionId, {
    coinsEarned,
    isActive: false,
  });

  // 4. Sumar monedas al usuario (QUERY)
  await addCoinsToUser(userId, coinsEarned);

  console.log('[SERVICE] ✅ Pomodoro finalizado');
  return {
    session: updated,
    coinsEarned,
  };
};

module.exports = {
  startPomodoroService,
  pausePomodoroService,
  restartPomodoroService,
  endPomodoroService,
};
  endPomodoro,
};
