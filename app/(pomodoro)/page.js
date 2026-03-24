'use client';

import { usePomodoro } from '@/app/(pomodoro)/hooks/usePomodoro';
import { SESSION_TYPES } from '@/app/(pomodoro)/constants/sessionTypes';
import { PomodoroTimer } from '@/app/(pomodoro)/components/PomodoroTimer';
import { SessionTypeSelector } from '@/app/(pomodoro)/components/SessionTypeSelector';
import { PomodoroControls } from '@/app/(pomodoro)/components/PomodoroControls';
import styles from './page.module.css';

export default function PomodoroPdao() {
  const {
    sessionType,
    timeRemaining,
    isRunning,
    isSessionActive,
    formatTime,
    handleStartSession,
    handleEndSession,
    toggleTimer,
    handleReset,
    error,
  } = usePomodoro();

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1>🍅 Mochidoro</h1>
        <p className={styles.subtitle}>Pomodoro Timer</p>
      </header>

      <main className={styles.mainContent}>
        <PomodoroTimer 
          timeRemaining={timeRemaining}
          formatTime={formatTime}
          totalDuration={SESSION_TYPES[sessionType] * 60}
          isRunning={isRunning}
          sessionType={sessionType}
        />

        {!isSessionActive && (
          <SessionTypeSelector
            selectedType={sessionType}
            onSelectType={handleStartSession}
            isDisabled={isSessionActive}
          />
        )}

        <PomodoroControls
          isRunning={isRunning}
          isSessionActive={isSessionActive}
          onToggleTimer={toggleTimer}
          onStart={() => handleStartSession(sessionType)}
          onEnd={handleEndSession}
          onReset={handleReset}
          error={error}
        />
      </main>
    </div>
  );
}
