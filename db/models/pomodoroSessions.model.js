const { DataTypes } = require('sequelize');

const POMODORO_SESSIONS_TABLE = 'pomodoro_sessions';

const PomodoroSessionSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' }, field: 'user_id' },
  durationMinutes: { type: DataTypes.INTEGER, allowNull: false, field: 'duration_minutes' },
  coinsEarned: { type: DataTypes.INTEGER, defaultValue: 0, field: 'coins_earned' },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true, field: 'is_active' },
  createdAt: { type: DataTypes.DATE, defaultValue: 'CURRENT_TIMESTAMP', field: 'created_at' }
};

const createPomodoroSessionModel = (sequelize) => {
  const PomodoroSession = sequelize.define('PomodoroSession', PomodoroSessionSchema, {
    tableName: POMODORO_SESSIONS_TABLE,
    timestamps: false,
  });

  return PomodoroSession;
};

module.exports = { createPomodoroSessionModel, PomodoroSessionSchema, POMODORO_SESSIONS_TABLE };