'use client';

import { useCallback } from 'react';

// Play audio from file
const playAudioFile = (filename, soundEnabled = true) => {
  if (!soundEnabled) return; // Silenced
  
  try {
    const audio = new Audio(`/sounds/${filename}`);
    audio.volume = 0.5;
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        console.log('Audio play failed:', err);
      });
    }
  } catch (err) {
    console.log('Audio not available');
  }
};

export const useSound = (soundEnabled = true) => {
  const playSound = useCallback(() => {
    // Fart sound for all button interactions
    playAudioFile('fart.mp3', soundEnabled);
  }, [soundEnabled]);

  // Separate completion sound
  const playCompletionSound = useCallback(() => {
    playAudioFile('death-fortnite.mp3', soundEnabled);
  }, [soundEnabled]);

  return { playSound, playCompletionSound };
};
