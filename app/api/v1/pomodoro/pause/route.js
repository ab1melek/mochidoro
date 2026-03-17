/**
 * POST /api/v1/pomodoro/pause
 * Pausa una sesión de pomodoro en curso
 * 
 * Body:
 * {
 *   sessionId: number
 * }
 */

const { pausePomodoro } = require('../pomodoro.service');

export async function POST(request) {
  try {
    console.log('[ROUTE] POST /api/v1/pomodoro/pause');
    
    const body = await request.json();
    const { sessionId } = body;

    console.log('[ROUTE] Body recibido:', { sessionId });

    // Validaciones
    if (!sessionId) {
      throw new Error('sessionId es requerido');
    }

    console.log('[ROUTE] ✅ Validaciones OK');

    const session = pausePomodoro(sessionId);

    console.log('[ROUTE] ✅ Respondiendo con la sesión pausada');

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
