/**
 * POST /api/v1/pomodoro/restart
 * Reinicia una sesión de pomodoro
 * 
 * Body:
 * {
 *   sessionId: number
 * }
 */

const { restartPomodoro } = require('../pomodoro.service');

export async function POST(request) {
  try {
    console.log('[ROUTE] POST /api/v1/pomodoro/restart');
    
    const body = await request.json();
    const { sessionId } = body;

    console.log('[ROUTE] Body recibido:', { sessionId });

    // Validaciones
    if (!sessionId) {
      throw new Error('sessionId es requerido');
    }

    console.log('[ROUTE] ✅ Validaciones OK');

    const session = restartPomodoro(sessionId);

    console.log('[ROUTE] ✅ Respondiendo con la sesión reiniciada');

    return Response.json(
      {
        success: true,
        message: 'Pomodoro reiniciado',
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
