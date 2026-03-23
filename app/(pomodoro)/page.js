'use client';

import { usePomodoro } from '@/app/(pomodoro)/hooks/usePomodoro';
import { SESSION_TYPES } from '@/app/(pomodoro)/constants/sessionTypes';
import { PomodoroTimer } from '@/app/(pomodoro)/components/PomodoroTimer';
import { SessionTypeSelector } from '@/app/(pomodoro)/components/SessionTypeSelector';
import { PomodoroControls } from '@/app/(pomodoro)/components/PomodoroControls';

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
    <div className="page-container">
      <header className="header">
        <h1>🍅 Mochidoro</h1>
        <p className="subtitle">Pomodoro Timer</p>
      </header>

      <main className="main-content">
        <PomodoroTimer 
          timeRemaining={timeRemaining}
          formatTime={formatTime}
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

      <style jsx>{`
        .page-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }

        .header {
          text-align: center;
          color: white;
          margin-bottom: 3rem;
        }

        .header h1 {
          font-size: 3rem;
          margin: 0;
          margin-bottom: 0.5rem;
        }

        .subtitle {
          font-size: 1.2rem;
          opacity: 0.9;
          margin: 0;
        }

        .main-content {
          background: white;
          border-radius: 20px;
          padding: 3rem 2rem;
          max-width: 600px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        @media (max-width: 768px) {
          .page-container {
            padding: 1rem;
          }

          .header h1 {
            font-size: 2rem;
          }

          .main-content {
            padding: 2rem 1rem;
            border-radius: 15px;
          }
        }
      `}</style>
    </div>
  );
}
