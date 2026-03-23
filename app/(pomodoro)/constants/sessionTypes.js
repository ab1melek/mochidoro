export const SESSION_TYPES = {
  SESSION: 'session',
  BREAK: 'break',
  LONG_BREAK: 'long-break',
};

export const SESSION_TYPE_CONFIG = {
  [SESSION_TYPES.SESSION]: {
    duration: 25 * 60, // 25 minutes in seconds
    label: 'Pomodoro',
    coins: 30, // 25 + 5 bonus
  },
  [SESSION_TYPES.BREAK]: {
    duration: 5 * 60, // 5 minutes in seconds
    label: 'Short Break',
    coins: 5,
  },
  [SESSION_TYPES.LONG_BREAK]: {
    duration: 15 * 60, // 15 minutes in seconds
    label: 'Long Break',
    coins: 10,
  },
};
