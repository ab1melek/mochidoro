/**
 * Functions - Lógica de cálculo para mascotas
 * No toca BD, solo calcula
 */

// Validar que el usuario tiene suficientes monedas
const validateAffordEgg = (userCoins, eggCost) => {
  if (userCoins < eggCost) {
    throw new Error(`No tienes suficientes monedas. Necesitas ${eggCost}, tienes ${userCoins}`);
  }
  console.log('[FUNCTION] ✅ Usuario puede comprar el huevo');
  return true;
};

// Generar nombre aleatorio para mascota
const generatePetName = (speciesName) => {
  const adjectives = ['Feliz', 'Rápido', 'Valiente', 'Tímido', 'Travieso', 'Amigable', 'Sabio'];
  const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const name = `${randomAdj} ${speciesName}`;
  console.log('[FUNCTION] 🐣 Nombre generado:', name);
  return name;
};

module.exports = {
  validateAffordEgg,
  generatePetName,
};
