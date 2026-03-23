const { DataTypes } = require('sequelize');

const POMODORO_SESSIONS_TABLE = 'pomodoro_sessions';

const PomodoroSessionSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' }, field: 'user_id' },
  type: { type: DataTypes.ENUM('session', 'break', 'long-break'), allowNull: false },
  minutesCompleted: { type: DataTypes.INTEGER, field: 'minutes_completed' },
  coinsEarned: { type: DataTypes.INTEGER, defaultValue: 0, field: 'coins_earned' },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'created_at' }
};

const createPomodoroSessionModel = (sequelize) => {
  const PomodoroSession = sequelize.define('PomodoroSession', PomodoroSessionSchema, {
    tableName: POMODORO_SESSIONS_TABLE,
    timestamps: false,
  });

  return PomodoroSession;
};

module.exports = { createPomodoroSessionModel, PomodoroSessionSchema, POMODORO_SESSIONS_TABLE };