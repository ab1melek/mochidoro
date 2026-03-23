/**
 * POST /api/v1/pomodoro/end
 * Finaliza la sesión o crea+finaliza si no existe (para frontend local-first)
 * Body: { userId, minutesCompleted, type }
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

    // Llamar al service (que obtiene la sesión activa o la crea si es necesario)
    const result = await endPomodoroService(userId, minutesCompleted, type);

    return Response.json(
      {
        success: true,
        message: 'Pomodoro finalizado',
        data: result,
      },
      { status: 200 }
    );
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
