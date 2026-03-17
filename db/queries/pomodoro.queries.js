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
 * Verificar si hay sesión activa para el usuario
 */
const getActiveSessionByUserId = async (userId) => {
  const { PomodoroSession } = await import('../index.js');
  
  console.log('[QUERY] Buscando sesión activa para usuario:', userId);
  
  const activeSession = await PomodoroSession.findOne({
    where: { userId, isActive: true },
  });

  if (activeSession) {
    console.log('[QUERY] ⚠️ Sesión activa encontrada:', activeSession.id);
    return activeSession;
  }

  console.log('[QUERY] ✅ No hay sesión activa');
  return null;
};

/**
 * Crear una nueva sesión de pomodoro
 * @param {number} userId - ID del usuario
 * @param {string} type - Tipo de sesión: 'session', 'long-session', 'break', 'long-break'
 */
const createPomodoroSession = async (userId, type) => {
  const { PomodoroSession } = await import('../index.js');
  
  console.log('[QUERY] Creando sesión en BD...');
  
  const session = await PomodoroSession.create({
    userId,
    type,
    coinsEarned: 0,
    isActive: true,
  });

  console.log('[QUERY] ✅ Sesión creada:', session.id, 'Tipo:', type);
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
  console.log('[QUERY] Datos a actualizar:', updateData);

  try {
    // Actualizar la sesión
    const result = await PomodoroSession.update(updateData, { 
      where: { id: sessionId },
    });

    console.log('[QUERY] Update resultado:', result);

    // Obtener la sesión actualizada
    const updated = await PomodoroSession.findByPk(sessionId);
    
    if (!updated) {
      throw new Error('No se pudo recuperar la sesión actualizada');
    }

    console.log('[QUERY] ✅ Sesión actualizada correctamente');
    console.log('[QUERY] Estado final:', { 
      id: updated.id, 
      isActive: updated.isActive, 
      coinsEarned: updated.coinsEarned 
    });
    
    return updated;
  } catch (error) {
    console.error('[QUERY ERROR] Error al actualizar:', error.message);
    throw error;
  }
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
  getActiveSessionByUserId,
  createPomodoroSession,
  getPomodoroSessionById,
  updatePomodoroSession,
  addCoinsToUser,
};
