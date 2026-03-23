'use client';

import { SESSION_TYPE_CONFIG } from '@/app/(pomodoro)/constants/sessionTypes';
import styles from './SessionTypeSelector.module.css';

export const SessionTypeSelector = ({ 
  selectedType, 
  onSelectType, 
  isDisabled 
}) => {
  return (
    <div className={styles.selectorContainer}>
      <div className={styles.buttonGroup}>
        {Object.entries(SESSION_TYPE_CONFIG).map(([key, config]) => (
          <button
            key={key}
            onClick={() => onSelectType(key)}
            disabled={isDisabled}
            className={`${styles.sessionButton} ${selectedType === key ? styles.active : ''}`}
          >
            {config.label}
          </button>
        ))}
      </div>
    </div>
  );
};
