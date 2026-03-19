/**
 * POST /api/v1/pets/hatch
 * Abre un huevo, nace la mascota
 * Body: { userId, eggId }
 */

const { hatchEggService } = require('../pets.service');

export async function POST(request) {
  try {
    console.log('[ROUTE] POST /api/v1/pets/hatch');

    const body = await request.json();
    const { userId, eggId } = body;

    console.log('[ROUTE] Body:', { userId, eggId });

    if (!userId || !eggId) {
      throw new Error('userId y eggId son requeridos');
    }

    // Llamar al service
    const result = await hatchEggService(userId, eggId);

    return Response.json(
      {
        success: true,
        message: '¡Nació una mascota!',
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
