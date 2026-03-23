'use client';

export const PomodoroTimer = ({ timeRemaining, formatTime }) => {
  return (
    <div className="timer-container">
      <div className="timer-display">
        {formatTime(timeRemaining)}
      </div>
      <style jsx>{`
        .timer-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .timer-display {
          font-size: 7rem;
          font-weight: bold;
          font-family: 'Courier New', monospace;
          color: #333;
          letter-spacing: 0.1em;
          text-align: center;
          min-width: 400px;
        }

        @media (max-width: 768px) {
          .timer-display {
            font-size: 4rem;
            min-width: 300px;
          }
        }
      `}</style>
    </div>
  );
};
