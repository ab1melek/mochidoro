/**
 * POST /api/v1/pomodoro/pause
 * Pausa una sesión de pomodoro
 */

const { pausePomodoroService } = require('../pomodoro.service');

export async function POST(request) {
  try {
    console.log('[ROUTE] POST /api/v1/pomodoro/pause');
    
    const body = await request.json();
    const { sessionId } = body;

    console.log('[ROUTE] Body:', { sessionId });

    if (!sessionId) {
      throw new Error('sessionId es requerido');
    }

    // Llamar al service
    const session = await pausePomodoroService(sessionId);

    return Response.json(
      {
        success: true,
        message: 'Pomodoro pausado',
        data: session,
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
