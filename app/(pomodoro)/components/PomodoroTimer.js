'use client';

import Image from 'next/image';
import styles from './PomodoroTimer.module.css';

export const PomodoroTimer = ({ 
  timeRemaining, 
  formatTime, 
  totalDuration = 1500, 
  isRunning = false,
  sessionType = 'session'
}) => {
  // Calculate progress (0-1) based on actual session duration
  const progress = (totalDuration - timeRemaining) / totalDuration;
  const circumference = 2 * Math.PI * 90; // radius 90
  const offset = circumference * (1 - progress);

  // Determine Mochi image based on state
  let mochiImage = '/static-mochi/mochi-tranquilo.png'; // default: not running

  if (isRunning) {
    if (sessionType === 'session') {
      mochiImage = '/static-mochi/mochi-move.png'; // Pomodoro 25min
    } else if (sessionType === 'break') {
      mochiImage = '/static-mochi/mochi-tomando-aguita.png'; // Short break 5min
    } else if (sessionType === 'long-break') {
      mochiImage = '/static-mochi/mochi-dormido.png'; // Long break 15min
    }
  }

  return (
    <div className={styles.timerContainer}>
      {/* Timer numbers - TOP */}
      <div className={styles.timerDisplay}>
        {formatTime(timeRemaining)}
      </div>

      {/* Circle with Mochi - BOTTOM */}
      <div className={styles.mochiCircleContainer}>
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
        {/* Mochi image centered inside circle */}
        <div className={styles.mochiWrapper}>
          <Image
            src={mochiImage}
            alt="Mochi"
            width={120}
            height={120}
            priority
            className={styles.mochiImage}
          />
        </div>
      </div>
    </div>
  );
};
