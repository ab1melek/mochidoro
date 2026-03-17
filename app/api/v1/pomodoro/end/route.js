/**
 * POST /api/v1/pomodoro/end
 * Finaliza una sesión de pomodoro y suma monedas
 */

const { endPomodoroService } = require('../pomodoro.service');

export async function POST(request) {
  try {
    console.log('[ROUTE] POST /api/v1/pomodoro/end');
    
    const body = await request.json();
    const { sessionId, durationMinutes, userId } = body;

    console.log('[ROUTE] Body:', { sessionId, durationMinutes, userId });

    if (!sessionId || !durationMinutes || !userId) {
      throw new Error('sessionId, durationMinutes y userId son requeridos');
    }

    // Llamar al service
    const result = await endPomodoroService(sessionId, durationMinutes, userId);

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
