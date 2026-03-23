'use client';

import { useState, useCallback } from 'react';

export const useSoundToggle = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => !prev);
  }, []);

  return {
    soundEnabled,
    toggleSound,
  };
};
