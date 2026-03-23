'use client';

import { useState, useEffect, useRef } from 'react';
import { SESSION_TYPE_CONFIG, SESSION_TYPES } from '@/app/(pomodoro)/constants/sessionTypes';
import { usePomodoroAPI } from './usePomodoroAPI';
import { useSoundToggle } from './useSoundToggle';
import { useSound } from './useSound';

export const usePomodoro = () => {
  const [sessionType, setSessionType] = useState(SESSION_TYPES.SESSION);
  const [timeRemaining, setTimeRemaining] = useState(
    SESSION_TYPE_CONFIG[SESSION_TYPES.SESSION].duration
  );
  const [isRunning, setIsRunning] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(true); // Start with session active (but paused)
  const [error, setError] = useState(null);
  const [completedCycles, setCompletedCycles] = useState(0);

  const intervalRef = useRef(null);
  const { endSession } = usePomodoroAPI();
  const { soundEnabled, toggleSound } = useSoundToggle();
  const { playSound, playCompletionSound } = useSound(soundEnabled);

  // Countdown timer effect
  useEffect(() => {
    if (!isRunning || timeRemaining <= 0) return;

    intervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        const newTime = prev - 1;
        return newTime;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeRemaining]);

  // Auto-complete when timer reaches 0
  useEffect(() => {
    if (isSessionActive && timeRemaining === 0 && isRunning) {
      const handleCompleteSession = async () => {
        const duration = SESSION_TYPE_CONFIG[sessionType].duration;
        const minutesCompleted = Math.floor(duration / 60); // Always full minutes

        try {
          playCompletionSound(); // Play Fortnite death sound on completion
          await endSession(minutesCompleted, sessionType);
          
          // Increment cycles only if it was a pomodoro session
          if (sessionType === SESSION_TYPES.SESSION) {
            setCompletedCycles(prev => prev + 1);
          }
          
          // Reset timer to initial state but keep session active for next round
          setIsRunning(false);
          setTimeRemaining(SESSION_TYPE_CONFIG[sessionType].duration);
          // KEEP isSessionActive = true so buttons stay visible
        } catch (err) {
          setError(err.message);
        }
      };

      handleCompleteSession();
    }
  }, [timeRemaining, isRunning, isSessionActive, sessionType, endSession, playCompletionSound]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Initialize session (called once at the start)
  const handleStartSession = (type) => {
    setSessionType(type);
    setTimeRemaining(SESSION_TYPE_CONFIG[type].duration);
    setIsSessionActive(true);
    setIsRunning(false); // Start paused, user must click play
  };

  // Change session type (only resets, doesn't start)
  const handleChangeSessionType = (type) => {
    setSessionType(type);
    setTimeRemaining(SESSION_TYPE_CONFIG[type].duration);
    setIsRunning(false); // Always pause when changing session
    playSound('select');
  };

  // Pause/Resume
  const toggleTimer = () => {
    const newState = !isRunning;
    setIsRunning(newState);
    playSound(newState ? 'play' : 'pause');
  };

  // Reset
  const handleReset = () => {
    setIsRunning(false);
    setTimeRemaining(SESSION_TYPE_CONFIG[sessionType].duration);
    playSound('reset');
  };

  // Stop session without completion
  const handleStopSession = () => {
    setIsRunning(false);
    setIsSessionActive(false);
    setTimeRemaining(SESSION_TYPE_CONFIG[sessionType].duration);
  };

  return {
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
  };
};
