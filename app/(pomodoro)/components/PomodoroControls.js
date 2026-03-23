'use client';

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
    <div className="controls-container">
      <div className="button-group">
        {!isSessionActive ? (
          <button 
            onClick={onStart}
            className="btn btn-primary"
          >
            Comenzar
          </button>
        ) : (
          <>
            <button 
              onClick={onToggleTimer}
              className={`btn ${isRunning ? 'btn-pause' : 'btn-play'}`}
            >
              {isRunning ? 'Pausar' : 'Reanudar'}
            </button>
            <button 
              onClick={onReset}
              className="btn btn-reset"
            >
              Reiniciar
            </button>
            <button 
              onClick={onEnd}
              className="btn btn-end"
            >
              Finalizar
            </button>
          </>
        )}
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <style jsx>{`
        .controls-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          margin-top: 3rem;
          width: 100%;
        }

        .button-group {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 120px;
        }

        .btn-primary {
          background: #4CAF50;
          color: white;
        }

        .btn-primary:hover {
          background: #45a049;
          transform: scale(1.05);
        }

        .btn-play {
          background: #2196F3;
          color: white;
        }

        .btn-play:hover {
          background: #0b7dda;
          transform: scale(1.05);
        }

        .btn-pause {
          background: #ff9800;
          color: white;
        }

        .btn-pause:hover {
          background: #e68900;
          transform: scale(1.05);
        }

        .btn-reset {
          background: #f44336;
          color: white;
        }

        .btn-reset:hover {
          background: #da190b;
          transform: scale(1.05);
        }

        .btn-end {
          background: #9C27B0;
          color: white;
        }

        .btn-end:hover {
          background: #7b1fa2;
          transform: scale(1.05);
        }

        .error-message {
          background: #ffebee;
          color: #c62828;
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
          width: 100%;
          max-width: 400px;
        }

        @media (max-width: 768px) {
          .button-group {
            gap: 0.5rem;
          }

          .btn {
            padding: 0.6rem 1rem;
            font-size: 0.9rem;
            min-width: 100px;
          }
        }
      `}</style>
    </div>
  );
};
