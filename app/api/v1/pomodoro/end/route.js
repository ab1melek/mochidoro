/**
 * POST /api/v1/pomodoro/end
 * Finaliza la sesión o crea+finaliza si no existe (para frontend local-first)
 * Body: { userId, minutesCompleted, type }
 * 
 * ⚠️  TEMPORALMENTE DESACTIVADO: No guarda en BD mientras se arregla el sistema de usuarios
 */

const { endPomodoroService } = require('../pomodoro.service');

export async function POST(request) {
  try {
    console.log('[ROUTE] POST /api/v1/pomodoro/end');
    
    const body = await request.json();
    const { userId, minutesCompleted, type } = body;

    console.log('[ROUTE] Body:', { userId, minutesCompleted, type });

    if (!userId || minutesCompleted === undefined) {
      throw new Error('userId y minutesCompleted son requeridos');
    }

    // ⚠️  TEMPORAL: Mock response sin tocar BD
    console.log('[ROUTE] ⚠️  MODO MOCK: No se guarda en BD');
    const mockResult = {
      id: Math.random(),
      userId,
      minutesCompleted,
      type,
      coinsEarned: 0,
      createdAt: new Date(),
    };

    return Response.json(
      {
        success: true,
        message: 'Pomodoro finalizado (MOCK - sin BD)',
        data: mockResult,
      },
      { status: 200 }
    );

    // Comentado temporalmente:
    // const result = await endPomodoroService(userId, minutesCompleted, type);
  } catch (error) {
    console.error('[ROUTE ERROR]:', error.message);

    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 400 }
    );
  }
}
