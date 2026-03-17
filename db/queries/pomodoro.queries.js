/**
 * Queries de Pomodoro
 * Interactúan directamente con los modelos Sequelize
 */

// Importar modelos (se inyectarán desde la inicialización)
let PomodoroSession;
let User;

const setPomodoroModels = (models) => {
  PomodoroSession = models.PomodoroSession;
  User = models.User;
};

/**
 * Crear una nueva sesión de pomodoro
 */
const createPomodoroSession = async (userId, durationMinutes) => {
  console.log('[QUERY] Creating pomodoro session...');
  
  const session = await PomodoroSession.create({
    userId,
    durationMinutes,
    coinsEarned: 0,
    isActive: true,
  });

  console.log('[QUERY] ✅ Sesión creada en BD:', session.toJSON());
  return session;
};

/**
 * Obtener sesión por ID
 */
const getPomodoroSessionById = async (sessionId) => {
  console.log('[QUERY] Obteniendo sesión:', sessionId);
  
  const session = await PomodoroSession.findByPk(sessionId);

  if (!session) {
    throw new Error('Sesión no encontrada');
  }

  console.log('[QUERY] ✅ Sesión obtenida:', session.toJSON());
  return session;
};

/**
 * Actualizar sesión
 */
const updatePomodoroSession = async (sessionId, updateData) => {
  console.log('[QUERY] Actualizando sesión:', sessionId);
  console.log('[QUERY] Datos a actualizar:', updateData);
  
  const [updatedRows, updatedData] = await PomodoroSession.update(updateData, {
    where: { id: sessionId },
    returning: true,
  });

  if (updatedRows === 0) {
    throw new Error('No se pudo actualizar la sesión');
  }

  console.log('[QUERY] ✅ Sesión actualizada:', updatedData[0].toJSON());
  return updatedData[0];
};

/**
 * Actualizar monedas del usuario
 */
const addCoinsToUser = async (userId, coinsToAdd) => {
  console.log('[QUERY] Agregando monedas al usuario:', userId);
  console.log('[QUERY] Monedas a sumar:', coinsToAdd);
  
  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  const newCoins = (user.coins || 0) + coinsToAdd;
  await user.update({ coins: newCoins });

  console.log('[QUERY] ✅ Monedas actualizadas. Total monedas:', newCoins);
  return user;
};

module.exports = {
  setPomodoroModels,
  createPomodoroSession,
  getPomodoroSessionById,
  updatePomodoroSession,
  addCoinsToUser,
};
