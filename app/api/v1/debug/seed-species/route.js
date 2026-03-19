/**
 * POST /api/v1/debug/seed-species
 * SOLO PARA TESTING - Crea la especie Mochi en la BD
 * 
 * Eliminar este endpoint en producción
 */

export async function POST(request) {
  try {
    console.log('[DEBUG] POST /api/v1/debug/seed-species');

    // Import dinámico - solo en server-side
    const { PetSpecies } = await import('../../../../../db/index.js');

    // Verificar si ya existe
    const existingSpecies = await PetSpecies.findOne({ where: { name: 'Mochi' } });

    if (existingSpecies) {
      console.log('[DEBUG] ⚠️ Especie ya existe');
      return Response.json(
        {
          success: true,
          message: 'Especie Mochi ya existe',
          data: existingSpecies.toJSON(),
        },
        { status: 200 }
      );
    }

    // Crear especie Mochi
    const mochi = await PetSpecies.create({
      name: 'Mochi',
      rarity: 'common',
      cost: 25,
      imageUrl: '/pets/mochi.png',
      baseHunger: 80,
      baseHappiness: 80,
    });

    console.log('[DEBUG] ✅ Especie Mochi creada:', mochi.toJSON());

    return Response.json(
      {
        success: true,
        message: 'Especie Mochi creada',
        data: mochi.toJSON(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[DEBUG ERROR]:', error.message);

    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 400 }
    );
  }
}
