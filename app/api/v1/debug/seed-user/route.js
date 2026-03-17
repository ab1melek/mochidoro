/**
 * POST /api/v1/debug/seed-user
 * SOLO PARA TESTING - Crea un usuario mock en la BD
 * 
 * Eliminar este endpoint en producción
 */

export async function POST(request) {
  try {
    console.log('[DEBUG] POST /api/v1/debug/seed-user');

    // Import dinámico - solo en server-side
    const { User } = await import('../../../../../db/index.js');

    // Verificar si ya existe
    const existingUser = await User.findOne({ where: { email: 'test@example.com' } });

    if (existingUser) {
      console.log('[DEBUG] ⚠️ Usuario ya existe');
      return Response.json(
        {
          success: true,
          message: 'Usuario ya existe',
          data: existingUser.toJSON(),
        },
        { status: 200 }
      );
    }

    // Crear usuario test
    const testUser = await User.create({
      email: 'test@example.com',
      googleId: 'test-google-id',
      coins: 0,
    });

    console.log('[DEBUG] ✅ Usuario creado:', testUser.toJSON());

    return Response.json(
      {
        success: true,
        message: 'Usuario de test creado',
        data: testUser.toJSON(),
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
