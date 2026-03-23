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

// Calcular monedas para sesión completada (ASUME QUE SIEMPRE ES COMPLETA)
const calculateCoinsForCompletedSession = (type) => {
  let coins = 0;
  
  if (type === 'session') {
    coins = 25 + 5; // 25 min + 5 bonus = 30 monedas
    console.log('[FUNCTION] 💰 Session completada: 30 monedas (25 min + 5 bonus)');
  } else if (type === 'long-session') {
    coins = 60 + 10; // 60 min + 10 bonus = 70 monedas
    console.log('[FUNCTION] 💰 Long-session completada: 70 monedas (60 min + 10 bonus)');
  } else if (type === 'break') {
    coins = 5; // 5 min break = 5 monedas
    console.log('[FUNCTION] 💰 Break completado: 5 monedas');
  } else if (type === 'long-break') {
    coins = 10; // 15 min long-break = 10 monedas
    console.log('[FUNCTION] 💰 Long-break completado: 10 monedas');
  }
  
  return { coins };
};

module.exports = {
  validateSessionType,
  getDurationByType,
  calculateCoinsForCompletedSession,
  SESSION_TYPES,
};
