/**
 * POST /api/v1/pomodoro/end
 * Finaliza la sesión activa del usuario y suma monedas
 * Body: { userId, minutesCompleted }
 */

const { endPomodoroService } = require('../pomodoro.service');

export async function POST(request) {
  try {
    console.log('[ROUTE] POST /api/v1/pomodoro/end');
    
    const body = await request.json();
    const { userId, minutesCompleted } = body;

    console.log('[ROUTE] Body:', { userId, minutesCompleted });

    if (!userId || minutesCompleted === undefined) {
      throw new Error('userId y minutesCompleted son requeridos');
    }

    // Llamar al service (que obtiene la sesión activa automáticamente)
    const result = await endPomodoroService(userId, minutesCompleted);

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
