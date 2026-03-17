/**
 * POST /api/v1/pomodoro/pause
 * Pausa la sesión activa del usuario
 */

const { pausePomodoroService } = require('../pomodoro.service');

export async function POST(request) {
  try {
    console.log('[ROUTE] POST /api/v1/pomodoro/pause');
    
    const body = await request.json();
    const { userId } = body;

    console.log('[ROUTE] Body:', { userId });

    if (!userId) {
      throw new Error('userId es requerido');
    }

    // Llamar al service
    const session = await pausePomodoroService(userId);

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
