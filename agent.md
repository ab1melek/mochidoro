# Mochidoro MVP - Context Guide

## Proyecto
**Pomodoro Timer + Pet Adoption System**
- Frontend: React/Next.js local-first timer con UI pomofox-inspired
- Backend: API REST que registra sesiones completadas y otorga monedas
- BD: Sequelize + PostgreSQL

## Stack
- **Frontend**: Next.js 16.1.6, React, CSS Modules, SVG circular progress
- **Backend**: Next.js API Routes, Sequelize 6.37.8
- **Audio**: Web Audio API (sonidos fatso fart.mp3, death-fortnite.mp3 en `/public/sounds/`)
- **DB**: Usuarios, Sesiones Pomodoro, Mascotas, Huevos, Items

## Estado ACTUAL ✅

### Frontend Funcional
- ✅ Timer 100% local (25/5/15 min) - NO llama backend durante cuenta atrás
- ✅ Play/Pausa/Reset siempre visibles
- ✅ Click sesión = reinicia + pausa (no inicia automático)
- ✅ Círculo SVG progresa según duración real
- ✅ Auto-POST a `/api/v1/pomodoro/end` cuando llega a 0:00 (MODO MOCK - no guarda en BD)
- ✅ Sonido: Fart en botones, Fortnite death en completación
- ✅ Toggle sonido 🔊/🔇 en barra de controles
- ✅ Ciclos incrementan solo en Pomodoro (25 min)
- ✅ Timer reinicia automáticamente después de completar
- ✅ **NUEVO**: Mochi integrado en círculo de progreso
  - Cambio dinámico de imagen según estado (tranquilo/move/dormido/tomando-aguita)
  - Tamaño aumentado (220px x 220px) para mejor visibilidad
  - Colores verdes congruentes (#D4E8B1 - #E8F5A8 background, #A8D963 progreso)
  - Título "✨ Mochidoro ✨" afuera de la tarjeta
  - Espacios optimizados entre componentes

### Backend (Temporalmente Desactivado para Desarrollo de Usuarios)
- ⚠️  POST `/api/v1/pomodoro/end` → **MODO MOCK** (no guarda en BD)
  - Devuelve success: true pero sin persistencia
  - Temporal mientras se arregla el sistema de usuarios
  - Código listo para reactivar: descomentar llamada a `endPomodoroService()`
- ✅ Monedas: 30 (session), 5 (break), 10 (long-break) [lógica lista, no aplica en MOCK]
- ✅ Auto-eclosiona mascota a 25 minutos acumulados [lógica lista, no aplica en MOCK]
- ✅ Endpoint solo espera: `{userId, minutesCompleted, type}`

### BD Limpieza
- ✅ Removido campo `isActive` de pomodoroSessions
- ✅ Enum actualizado: solo 'session', 'break', 'long-break'
- ✅ Código limpio en queries y service layer



### 🟠 BACKEND - APIs completas, UI faltando
**Sesiones Pomodoro**: ✅ Completo
- ✅ POST `/api/v1/pomodoro/end` guarda sesiones + suma monedas

**Mascotas**: ✅ Backend, ❌ UI
- ✅ POST `/api/v1/pets/buy-egg` (comprar huevo)
- ✅ POST `/api/v1/pets/hatch` (abrir huevo)
- ✅ Auto-hatch a 25 min acumulados
- ❌ **UI**: GET /api/v1/pets, listar mascotas, ver stats (hunger/happiness/level)
- ❌ **UI**: Interactuar mascotas (feed, play)

**Shop**: ✅ Backend, ❌ UI
- ✅ Modelo pet_species con costo
- ❌ **UI**: Catálogo de huevos, botón comprar

**Inventory**: ✅ Modelo, ❌ UI
- ✅ Tabla items + pet_items
- ❌ **UI**: Mostrar items en inventario

**Daily Streaks**: ✅ Modelo, ❌ UI
- ✅ Tabla daily_streaks con racha y protectores
- ❌ **UI**: Tracker de racha diaria

### 🟢 Prototipo MVP (lo más importante)
1. **Perfil Usuario** - Mostrar monedas, ciclos totales
2. **Pet Display Page** - Listar mascotas + stats
3. **Shop** - Comprar huevos
4. **Interacción Mascotas** - Alimentar/jugar (endpoints POO faltando)

## Arquitectura Clave

### Request Flow Completado
```
Frontend: Click sesión → Timer cuenta local (sin POST)
         Timer 0:00 → Auto-POST /api/v1/pomodoro/end
Backend: POST recibido → Crea sesión + Guarda + Otorga monedas
         Si >= 25 min acumulados → Auto-eclosiona mascota
```

### Hooks Importantes
- `usePomodoro()` - State: sessionType, timeRemaining, isRunning, soundEnabled
- `useSound(soundEnabled)` - Controla reproducción audio
- `useSoundToggle()` - Estado toggle sonido
- `usePomodoroAPI()` - Solo POST (startSession removido)

### Componentes
- `PomodoroTimer` → Timer display + SVG circle (dinámico por duración)
- `SessionTypeSelector` → 3 botones tipo sesión
- `page.js` → Orquestador principal

## Notas Importantes
- **userId hardcodeado**: 1 (mock, sin auth aún)
- **Puerto**: 3002 (3000 ocupado por proceso del sistema)
- **Sonidos**: Se silencian si `soundEnabled=false`
- **Ciclos**: Solo incrementan en sesiones de 25 min (Pomodoro)
- **Huevos**: 25 minutos = 1 mascota nueva (fue 60, reducido a 25)

## INVENTARIO REAL DEL CODEBASE ✅

### Frontend - COMPLETAMENTE IMPLEMENTADO
- ✅ Timer local 100% (usePomodoro hook)
- ✅ Controles: Play/Pausa/Reset (siempre visibles)
- ✅ Selector sesiones (reinincia local, sin POST)
- ✅ SVG circular progress (dinámico por duración)
- ✅ Audio: fart.mp3 (botones), death-fortnite.mp3 (completación)
- ✅ Toggle sonido 🔊/🔇
- ✅ Ciclo counter (solo incrementa en Pomodoro 25min)
- ✅ Auto-POST /api/v1/pomodoro/end cuando timer llega 0:00

### Backend APIs
- ✅ POST `/api/v1/pomodoro/end` - Guarda sesión + suma monedas
- ✅ POST `/api/v1/pets/buy-egg` - Compra huevo
- ✅ POST `/api/v1/pets/hatch` - Abre huevo → nace mascota
- ❌ GET `/api/v1/pets` - No implementado
- ❌ GET `/api/v1/user/{id}` - No implementado
- ❌ POST `/api/v1/pets/{id}/feed` - No implementado
- ❌ POST `/api/v1/pets/{id}/play` - No implementado

### Modelos BD
- ✅ users (coins, activePetId)
- ✅ pomodoro_sessions (userId, type, minutesCompleted, coinsEarned)
- ✅ pets (userId, speciesId, name, hunger, happiness, level)
- ✅ pet_species (name, rarity, cost, imageUrl)
- ✅ egg_openings (userId, speciesId, minutesAccumulated, isOpened)
- ✅ inventory (userId, itemId, quantity)
- ✅ items (name, type, price, effectValue)
- ✅ pet_items (petId, itemId)
- ✅ daily_streaks (userId, currentStreak, bestStreak, protectors)

### UI Componentes
- ✅ PomodoroTimer.js - Display + SVG
- ✅ SessionTypeSelector.js - 3 botones
- ✅ page.js - Main layout (controles + timer + sesiones + ciclos)
- ❌ PetsPage.js - NO existe
- ❌ ShopPage.js - NO existe
- ❌ ProfilePage.js - NO existe
- ❌ InventoryPage.js - NO existe

## Para Siguiente Agente

### Cambios Recientes (Sesión Actual)
1. **Revisión Completa del Codebase**: Verificado que está más avanzado de lo documentado
   - Timer 100% funcional ✅
   - Mascotas backend lista ✅
   - Solo falta UI y sistema de usuarios

2. **UI de Mochi Implementada**:
   - Componente `PomodoroTimer` actualizado con wrapper de Mochi
   - Imágenes dinámicas según estado: mochi-tranquilo.png, mochi-move.png, mochi-tomando-aguita.png, mochi-dormido.png
   - Círculo SVG con Mochi dentro, progreso dinámico
   - Colores verdes congruentes con Mochi: #D4E8B1-#E8F5A8 (background), #A8D963 (progreso)
   - Botones Play/Pomodoro verde #A8D963 (consistentes)
   - Título afuera de tarjeta, espacios optimizados

3. **Backend en Modo MOCK Temporal**:
   - POST `/api/v1/pomodoro/end` devuelve success sin tocar BD
   - Línea a descomentar: `const result = await endPomodoroService(userId, minutesCompleted, type);`
   - Motivo: Arreglar sistema de usuarios antes de persistir datos

### Órden de Prioridad
1. **AHORA**: Arreglar sistema de usuarios (userId real, auth o mock mejorado)
2. **LUEGO**: Descomentar llamadas a BD en pomodoro.service
3. **DESPUÉS**: Crear páginas de UI (Mascotas, Tienda, Perfil)
4. **FINALMENTE**: Implementar endpoints GET faltantes

### Si el servidor no levanta:
- Verificar: `npm run dev` da error "Unknown system error -35"
- Soluciones: `pkill -9 node`, `rm -rf .next node_modules/.vite`, `npm install`, reintentar
- O: Rebuild dev container
