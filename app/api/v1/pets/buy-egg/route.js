/**
 * POST /api/v1/pets/buy-egg
 * Compra un huevo de una especie
 * Body: { userId, speciesId }
 */

const { buyEggService } = require('../pets.service');

export async function POST(request) {
  try {
    console.log('[ROUTE] POST /api/v1/pets/buy-egg');

    const body = await request.json();
    const { userId, speciesId } = body;

    console.log('[ROUTE] Body:', { userId, speciesId });

    if (!userId || !speciesId) {
      throw new Error('userId y speciesId son requeridos');
    }

    // Llamar al service
    const result = await buyEggService(userId, speciesId);

    return Response.json(
      {
        success: true,
        message: 'Huevo comprado exitosamente',
        data: result,
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
