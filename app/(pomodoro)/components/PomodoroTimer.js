'use client';

import styles from './PomodoroTimer.module.css';

export const PomodoroTimer = ({ timeRemaining, formatTime, totalDuration = 1500 }) => {
  // Calculate progress (0-1) based on actual session duration
  const progress = (totalDuration - timeRemaining) / totalDuration;
  const circumference = 2 * Math.PI * 90; // radius 90
  const offset = circumference * (1 - progress);

  return (
    <div className={styles.timerContainer}>
      <svg className={styles.timerSvg} viewBox="0 0 200 200">
        {/* Background circle */}
        <circle
          cx="100"
          cy="100"
          r="90"
          className={styles.circleBackground}
        />
        {/* Progress circle */}
        <circle
          cx="100"
          cy="100"
          r="90"
          className={styles.circleProgress}
          style={{ strokeDashoffset: offset }}
        />
      </svg>
      <div className={styles.timerDisplay}>
        {formatTime(timeRemaining)}
      </div>
    </div>
  );
};
