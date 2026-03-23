'use client';

import { SESSION_TYPES, SESSION_TYPE_CONFIG } from '@/app/(pomodoro)/constants/sessionTypes';

export const SessionTypeSelector = ({ 
  selectedType, 
  onSelectType, 
  isDisabled 
}) => {
  return (
    <div className="selector-container">
      <div className="button-group">
        {Object.entries(SESSION_TYPE_CONFIG).map(([key, config]) => (
          <button
            key={key}
            onClick={() => onSelectType(key)}
            disabled={isDisabled}
            className={`session-button ${selectedType === key ? 'active' : ''}`}
          >
            {config.label}
            <span className="duration">
              {Math.floor(config.duration / 60)}m
            </span>
          </button>
        ))}
      </div>

      <style jsx>{`
        .selector-container {
          display: flex;
          justify-content: center;
          width: 100%;
          margin: 2rem 0;
        }

        .button-group {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 1rem;
          max-width: 600px;
          width: 100%;
        }

        .session-button {
          padding: 1rem;
          border: 2px solid #ddd;
          background: white;
          cursor: pointer;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .session-button:hover:not(:disabled) {
          border-color: #333;
          background: #f5f5f5;
        }

        .session-button.active {
          background: #333;
          color: white;
          border-color: #333;
        }

        .session-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .duration {
          font-size: 0.8rem;
          opacity: 0.7;
        }

        @media (max-width: 768px) {
          .button-group {
            grid-template-columns: repeat(2, 1fr);
          }

          .session-button {
            padding: 0.75rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};
