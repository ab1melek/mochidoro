/**
 * Functions - Lógica de cálculo
 * No toca BD, solo calcula
 */

const SESSION_TYPES = {
  'session': 25,        // Pomodoro estándar
  'long-session': 60,   // Pomodoro largo
  'break': 5,           // Descanso corto
  'long-break': 15,     // Descanso largo
};

// Validar que el tipo de sesión sea válido
const validateSessionType = (type) => {
  if (!SESSION_TYPES[type]) {
    throw new Error(`Tipos válidos: ${Object.keys(SESSION_TYPES).join(', ')}`);
  }
  console.log('[FUNCTION] ✅ Tipo de sesión válido:', type);
  return true;
};

// Obtener duración según el tipo
const getDurationByType = (type) => {
  return SESSION_TYPES[type];
};

// Calcular si la sesión se completó y monedas ganadas
const calculateSessionResult = (type, minutesCompleted) => {
  const expectedDuration = SESSION_TYPES[type];
  const isCompleted = minutesCompleted === expectedDuration;

  // Calcular monedas: siempre 1 moneda por minuto
  let coins = minutesCompleted;
  
  if (isCompleted) {
    // Agregar bonus solo si se completa
    if (type === 'session') {
      coins += 5;
      console.log('[FUNCTION] 🎁 +5 bonus por completar session (25 min) = 30 monedas');
    } else if (type === 'long-session') {
      coins += 10;
      console.log('[FUNCTION] 🎁 +10 bonus por completar long-session (60 min) = 70 monedas');
    } else if (type === 'break') {
      console.log('[FUNCTION] ✅ Break completado (5 min) = 5 monedas');
    } else if (type === 'long-break') {
      coins = 10; // Special case: 10 monedas fijas
      console.log('[FUNCTION] ✅ Long-break completado (15 min) = 10 monedas');
    }
  } else {
    console.log('[FUNCTION] ⚠️  Sesión no completada. Esperaba', expectedDuration, 'min, completó', minutesCompleted, 'min. Gana 1 moneda por minuto (sin bonus)');
  }

  console.log('[FUNCTION] 💰 Monedas calculadas:', coins, '| Completado:', isCompleted);
  return { coins, isCompleted, expectedDuration };
};

module.exports = {
  validateSessionType,
  getDurationByType,
  calculateSessionResult,
  SESSION_TYPES,
};
