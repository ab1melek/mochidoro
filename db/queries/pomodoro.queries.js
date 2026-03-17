/**
 * Queries de Pomodoro
 * Interactúan directamente con los modelos Sequelize
 */

// Importar dinámicamente
const getModels = async () => {
  const { User, PomodoroSession } = await import('../models/user.model.js');
  const { User: UserModel, PomodoroSession: PomodoroSessionModel } = await import('../index.js');
  return { User: UserModel, PomodoroSession: PomodoroSessionModel };
};

/**
 * Crear una nueva sesión de pomodoro
 */
const createPomodoroSession = async (userId, durationMinutes) => {
  const { PomodoroSession } = await import('../index.js');
  
  console.log('[QUERY] Creando sesión en BD...');
  
  const session = await PomodoroSession.create({
    userId,
    durationMinutes,
    coinsEarned: 0,
    isActive: true,
  });

  console.log('[QUERY] ✅ Sesión creada:', session.id);
  return session;
};

/**
 * Obtener sesión por ID
 */
const getPomodoroSessionById = async (sessionId) => {
  const { PomodoroSession } = await import('../index.js');
  
  console.log('[QUERY] Buscando sesión:', sessionId);
  
  const session = await PomodoroSession.findByPk(sessionId);

  if (!session) {
    throw new Error('Sesión no encontrada');
  }

  console.log('[QUERY] ✅ Sesión encontrada');
  return session;
};

/**
 * Actualizar sesión
 */
const updatePomodoroSession = async (sessionId, updateData) => {
  const { PomodoroSession } = await import('../index.js');
  
  console.log('[QUERY] Actualizando sesión:', sessionId);
  console.log('[QUERY] Datos:', updateData);

  await PomodoroSession.update(updateData, { where: { id: sessionId } });

  const updated = await PomodoroSession.findByPk(sessionId);
  
  console.log('[QUERY] ✅ Sesión actualizada');
  return updated;
};

/**
 * Actualizar monedas del usuario
 */
const addCoinsToUser = async (userId, coinsToAdd) => {
  const { User } = await import('../index.js');
  
  console.log('[QUERY] Sumando monedas al usuario:', userId, 'Monedas:', coinsToAdd);
  
  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  const newCoins = (user.coins || 0) + coinsToAdd;
  await user.update({ coins: newCoins });

  console.log('[QUERY] ✅ Monedas actualizadas. Total:', newCoins);
  return newCoins;
};

module.exports = {
  createPomodoroSession,
  getPomodoroSessionById,
  updatePomodoroSession,
  addCoinsToUser,
};
