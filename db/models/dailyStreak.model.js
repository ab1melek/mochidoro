const { DataTypes } = require('sequelize');

const DAILY_STREAKS_TABLE = 'daily_streaks';

const DailyStreakSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
    field: 'user_id',
  },
  currentStreak: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'current_streak',
  },
  bestStreak: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'best_streak',
  },
  lastActivityDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'last_activity_date',
  },
  protectors: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  maxMilestoneClaimed: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'max_milestone_claimed',
  }
};

const createDailyStreakModel = (sequelize) => {
  const DailyStreak = sequelize.define('DailyStreak', DailyStreakSchema, {
    tableName: DAILY_STREAKS_TABLE,
    timestamps: false,
  });

  return DailyStreak;
};

module.exports = { createDailyStreakModel, DailyStreakSchema, DAILY_STREAKS_TABLE };