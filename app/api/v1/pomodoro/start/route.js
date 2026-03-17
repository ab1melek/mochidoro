/**
 * POST /api/v1/pomodoro/start
 * Inicia una nueva sesión de pomodoro
 */

const { startPomodoroService } = require('../pomodoro.service');

export async function POST(request) {
  try {
    console.log('[ROUTE] POST /api/v1/pomodoro/start');
    
    const body = await request.json();
    const { userId, durationMinutes } = body;

    console.log('[ROUTE] Body:', { userId, durationMinutes });

    if (!userId || !durationMinutes) {
      throw new Error('userId y durationMinutes son requeridos');
    }

    // Llamar al service (que orquesta functions y queries)
    const session = await startPomodoroService(userId, durationMinutes);

    return Response.json(
      {
        success: true,
        message: 'Pomodoro iniciado',
        data: session,
      },
      { status: 201 }
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
