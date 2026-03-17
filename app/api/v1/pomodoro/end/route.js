/**
 * POST /api/v1/pomodoro/end
 * Termina una sesión de pomodoro y calcula las monedas ganadas
 * 
 * Body:
 * {
 *   sessionId: number,
 *   durationMinutes: number
 * }
 */

const { endPomodoro } = require('../pomodoro.service');

export async function POST(request) {
  try {
    console.log('[ROUTE] POST /api/v1/pomodoro/end');
    
    const body = await request.json();
    const { sessionId, durationMinutes } = body;

    console.log('[ROUTE] Body recibido:', { sessionId, durationMinutes });

    // Validaciones
    if (!sessionId) {
      throw new Error('sessionId es requerido');
    }
    if (!durationMinutes || durationMinutes <= 0) {
      throw new Error('durationMinutes debe ser mayor a 0');
    }

    console.log('[ROUTE] ✅ Validaciones OK');

    const session = endPomodoro(sessionId, durationMinutes);

    console.log('[ROUTE] ✅ Respondiendo con la sesión finalizada');

    return Response.json(
      {
        success: true,
        message: 'Pomodoro finalizado',
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
