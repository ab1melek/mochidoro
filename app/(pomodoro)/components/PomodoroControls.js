'use client';

import styles from './PomodoroControls.module.css';

export const PomodoroControls = ({ 
  isRunning, 
  isSessionActive,
  onToggleTimer, 
  onStart,
  onEnd,
  onReset,
  error 
}) => {
  return (
    <div className={styles.controlsContainer}>
      <div className={styles.buttonGroup}>
        {!isSessionActive ? (
          <button 
            onClick={onStart}
            className={`${styles.btn} ${styles.btnPrimary}`}
          >
            Comenzar
          </button>
        ) : (
          <>
            <button 
              onClick={onToggleTimer}
              className={`${styles.btn} ${isRunning ? styles.btnPause : styles.btnPlay}`}
            >
              {isRunning ? 'Pausar' : 'Reanudar'}
            </button>
            <button 
              onClick={onReset}
              className={`${styles.btn} ${styles.btnReset}`}
            >
              Reiniciar
            </button>
            <button 
              onClick={onEnd}
              className={`${styles.btn} ${styles.btnEnd}`}
            >
              Finalizar
            </button>
          </>
        )}
      </div>

      {error && (
        <div className={styles.errorMessage}>
          {error}
        </div>
      )}
    </div>
  );
};
