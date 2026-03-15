import sequelize from './config.js';

async function testConnection() {
  try {
    console.log('🔄 Intentando conectar a la base de datos...');
    
    await sequelize.authenticate();
    
    console.log('✅ Conexión exitosa a la base de datos');
    console.log(`📊 Base de datos: ${sequelize.config.database}`);
    console.log(`🏠 Host: ${sequelize.config.host}:${sequelize.config.port}`);
    
    return true;
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:');
    console.error(error.message);
    return false;
  } finally {
    await sequelize.close();
    console.log('🔌 Conexión cerrada');
  }
}

// Ejecutar test
testConnection().then((success) => {
  process.exit(success ? 0 : 1);
});
