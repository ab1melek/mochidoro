/**
 * POST /api/v1/pomodoro/restart
 * Reanuda la última sesión pausada del usuario
 */

const { restartPomodoroService } = require('../pomodoro.service');

export async function POST(request) {
  try {
    console.log('[ROUTE] POST /api/v1/pomodoro/restart');
    
    const body = await request.json();
    const { userId } = body;

    console.log('[ROUTE] Body:', { userId });

    if (!userId) {
      throw new Error('userId es requerido');
    }

    // Llamar al service
    const session = await restartPomodoroService(userId);

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
