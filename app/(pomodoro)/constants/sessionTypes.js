export const SESSION_TYPES = {
  SESSION: 'session',
  LONG_SESSION: 'long-session',
  BREAK: 'break',
  LONG_BREAK: 'long-break',
};

export const SESSION_TYPE_CONFIG = {
  [SESSION_TYPES.SESSION]: {
    duration: 25 * 60, // 25 minutes in seconds
    label: 'Sesión',
    coins: 30, // 25 + 5 bonus
  },
  [SESSION_TYPES.LONG_SESSION]: {
    duration: 60 * 60, // 60 minutes in seconds
    label: 'Sesión Larga',
    coins: 70, // 60 + 10 bonus
  },
  [SESSION_TYPES.BREAK]: {
    duration: 5 * 60, // 5 minutes in seconds
    label: 'Descanso',
    coins: 5,
  },
  [SESSION_TYPES.LONG_BREAK]: {
    duration: 15 * 60, // 15 minutes in seconds
    label: 'Descanso Largo',
    coins: 10,
  },
};
