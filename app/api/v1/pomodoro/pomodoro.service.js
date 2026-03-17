/**
 * Service de Pomodoro
 * Contiene toda la lógica compartida de pomodoro
 */

// Duraciones válidas para sesiones
const VALID_DURATIONS = [25, 60, 5, 15];

// STEP 1: START - Inicia una nueva sesión de pomodoro
const startPomodoro = (userId, durationMinutes) => {
  console.log('🍅 [SERVICE] START');
  console.log(`  → userId: ${userId}`);
  console.log(`  → durationMinutes: ${durationMinutes}`);
  
  // Validar que la duración sea válida
  if (!VALID_DURATIONS.includes(durationMinutes)) {
    throw new Error(`Duraciones válidas: ${VALID_DURATIONS.join(', ')} minutos`);
  }
  
  // Simulamos una sesión (sin guardar en BD)
  const sessionData = {
    id: Math.floor(Math.random() * 10000),
    userId,
    durationMinutes,
    coinsEarned: 0,
    status: 'active',
    startTime: new Date(),
  };

  console.log('  ✅ Sesión iniciada:', sessionData);
  return sessionData;
};

// STEP 2: PAUSE - Pausa una sesión de pomodoro
const pausePomodoro = (sessionId) => {
  console.log('⏸️ [SERVICE] PAUSE');
  console.log(`  → sessionId: ${sessionId}`);
  
  // Simulamos la pausa
  const pausedSession = {
    id: sessionId,
    status: 'paused',
    pausedAt: new Date(),
  };

  console.log('  ✅ Sesión pausada:', pausedSession);
  return pausedSession;
};

// STEP 3: RESTART - Reinicia una sesión de pomodoro
const restartPomodoro = (sessionId) => {
  console.log('🔄 [SERVICE] RESTART');
  console.log(`  → sessionId: ${sessionId}`);
  
  // Simulamos el reinicio
  const restartedSession = {
    id: sessionId,
    status: 'active',
    restartedAt: new Date(),
  };

  console.log('  ✅ Sesión reiniciada:', restartedSession);
  return restartedSession;
};

// STEP 4: END - Termina una sesión de pomodoro y calcula monedas
const endPomodoro = (sessionId, durationMinutes) => {
  console.log('✅ [SERVICE] END');
  console.log(`  → sessionId: ${sessionId}`);
  console.log(`  → durationMinutes: ${durationMinutes}`);
  
  // Calcular monedas: 1 moneda por minuto
  let coinsEarned = durationMinutes * 1;
  
  // Bonus según duración
  if (durationMinutes === 25) {
    coinsEarned += 5;
    console.log(`  🎁 Bonus +5 por completar pomodoro de 25 min`);
  } else if (durationMinutes === 60) {
    coinsEarned += 10;
    console.log(`  🎁 Bonus +10 por completar pomodoro de 60 min`);
  }
  
  // Simulamos el fin de sesión
  const endedSession = {
    id: sessionId,
    status: 'completed',
    coinsEarned,
    endedAt: new Date(),
  };

  console.log(`  💰 Monedas ganadas: ${coinsEarned}`);
  console.log('  ✅ Sesión finalizada:', endedSession);
  return endedSession;
};

module.exports = {
  startPomodoro,
  pausePomodoro,
  restartPomodoro,
  endPomodoro,
};
