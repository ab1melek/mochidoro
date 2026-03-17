/**
 * POST /api/v1/pomodoro/start
 * Inicia una nueva sesión de pomodoro
 * 
 * Body:
 * {
 *   userId: number,
 *   durationMinutes: number (25 | 60 | 5 | 15)
 * }
 */

const { startPomodoro } = require('../pomodoro.service');

export async function POST(request) {
  try {
    console.log('[ROUTE] POST /api/v1/pomodoro/start');
    
    const body = await request.json();
    const { userId, durationMinutes } = body;

    console.log('[ROUTE] Body recibido:', { userId, durationMinutes });

    // Validaciones
    if (!userId) {
      throw new Error('userId es requerido');
    }
    if (!durationMinutes || durationMinutes <= 0) {
      throw new Error('durationMinutes debe ser mayor a 0');
    }

    console.log('[ROUTE] ✅ Validaciones básicas OK');

    const session = startPomodoro(userId, durationMinutes);

    console.log('[ROUTE] ✅ Respondiendo con la sesión');

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
