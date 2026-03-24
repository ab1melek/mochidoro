'use client';

import { usePomodoro } from '@/app/(pomodoro)/hooks/usePomodoro';
import { PomodoroTimer } from '@/app/(pomodoro)/components/PomodoroTimer';
import { SessionTypeSelector } from '@/app/(pomodoro)/components/SessionTypeSelector';
import { SESSION_TYPE_CONFIG } from '@/app/(pomodoro)/constants/sessionTypes';
import styles from '@/app/(pomodoro)/page.module.css';

export default function Home() {
  const {
    sessionType,
    timeRemaining,
    isRunning,
    isSessionActive,
    completedCycles,
    formatTime,
    handleStartSession,
    handleChangeSessionType,
    toggleTimer,
    handleReset,
    error,
    soundEnabled,
    toggleSound,
  } = usePomodoro();

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>✨ Mochidoro ✨</h1>
      <main className={styles.mainContent}>
        {/* Control buttons on top - Show play/pause, reset and sound toggle */}
        <div className={styles.topControls}>
          {isSessionActive ? (
            <>
              <button 
                onClick={toggleTimer}
                className={`${styles.controlBtn} ${isRunning ? styles.pauseBtn : styles.playBtn}`}
                title={isRunning ? 'Pausar' : 'Reanudar'}
              >
                {isRunning ? '⏸' : '▶'}
              </button>
              <button 
                onClick={handleReset}
                className={`${styles.controlBtn} ${styles.resetBtn}`}
                title="Reiniciar"
              >
                🔄
              </button>
              <button 
                onClick={toggleSound}
                className={`${styles.controlBtn} ${styles.soundBtn}`}
                title={soundEnabled ? 'Silenciar' : 'Activar sonido'}
              >
                {soundEnabled ? '🔊' : '🔇'}
              </button>
            </>
          ) : (
            <div style={{ width: '180px' }}></div>
          )}
        </div>

        {/* Large timer in center */}
        <PomodoroTimer 
          timeRemaining={timeRemaining}
          formatTime={formatTime}
          totalDuration={SESSION_TYPE_CONFIG[sessionType].duration}
          isRunning={isRunning}
          sessionType={sessionType}
        />

        {/* Cycle counter */}
        {isSessionActive && (
          <div className={styles.cycleCounter}>
            cycle: {completedCycles}
            <span className={styles.dots}>
              {[...Array(4)].map((_, i) => (
                <span key={i} className={i < completedCycles ? styles.filledDot : styles.emptyDot}>
                  ●
                </span>
              ))}
            </span>
          </div>
        )}

        {/* Session type selector at bottom - Always available */}
        <SessionTypeSelector
          selectedType={sessionType}
          onSelectType={(type) => {
            if (isSessionActive) {
              handleChangeSessionType(type);
            } else {
              handleStartSession(type);
            }
          }}
          isDisabled={false}
        />

        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}
      </main>
    </div>
  );
}