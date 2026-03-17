/**
 * Functions - Lógica de cálculo
 * No toca BD, solo calcula
 */

const VALID_DURATIONS = [25, 60, 5, 15];

// Validar que la duración sea permitida
const validateDuration = (durationMinutes) => {
  if (!VALID_DURATIONS.includes(durationMinutes)) {
    throw new Error(`Duraciones válidas: ${VALID_DURATIONS.join(', ')} minutos`);
  }
  console.log('[FUNCTION] ✅ Duración válida:', durationMinutes);
  return true;
};

// Calcular monedas ganadas
const calculateCoins = (durationMinutes) => {
  let coins = durationMinutes * 1; // 1 moneda por minuto

  // Bonus
  if (durationMinutes === 25) {
    coins += 5;
    console.log('[FUNCTION] 🎁 Bonus +5 por pomodoro de 25 min');
  } else if (durationMinutes === 60) {
    coins += 10;
    console.log('[FUNCTION] 🎁 Bonus +10 por pomodoro de 60 min');
  }

  console.log('[FUNCTION] 💰 Monedas calculadas:', coins);
  return coins;
};

module.exports = {
  validateDuration,
  calculateCoins,
};
