/**
 * POST /api/v1/pomodoro/start
 * Inicia una nueva sesión de pomodoro
 */

const { startPomodoroService } = require('../pomodoro.service');

export async function POST(request) {
  try {
    console.log('[ROUTE] POST /api/v1/pomodoro/start');
    
    const body = await request.json();
    const { userId, type } = body;

    console.log('[ROUTE] Body:', { userId, type });

    if (!userId || !type) {
      throw new Error('userId y type son requeridos');
    }

    // Llamar al service (que orquesta functions y queries)
    const session = await startPomodoroService(userId, type);

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
