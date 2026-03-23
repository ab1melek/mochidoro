'use client';

import { useState, useEffect, useRef } from 'react';
import { SESSION_TYPE_CONFIG, SESSION_TYPES } from '@/app/(pomodoro)/constants/sessionTypes';
import { usePomodoroAPI } from './usePomodoroAPI';

export const usePomodoro = () => {
  const [sessionType, setSessionType] = useState(SESSION_TYPES.SESSION);
  const [timeRemaining, setTimeRemaining] = useState(
    SESSION_TYPE_CONFIG[SESSION_TYPES.SESSION].duration
  );
  const [isRunning, setIsRunning] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [error, setError] = useState(null);

  const intervalRef = useRef(null);
  const { startSession, endSession } = usePomodoroAPI();

  // Countdown timer effect
  useEffect(() => {
    if (!isRunning || timeRemaining <= 0) return;

    intervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Start new session
  const handleStartSession = async (type) => {
    try {
      setError(null);
      await startSession(type);
      setSessionType(type);
      setTimeRemaining(SESSION_TYPE_CONFIG[type].duration);
      setIsRunning(true);
      setIsSessionActive(true);
      setSessionStartTime(Date.now());
    } catch (err) {
      setError(err.message);
      setIsRunning(false);
      setIsSessionActive(false);
    }
  };

  // End session
  const handleEndSession = async () => {
    try {
      setError(null);
      const duration = SESSION_TYPE_CONFIG[sessionType].duration;
      const minutesCompleted = Math.floor((duration - timeRemaining) / 60);

      await endSession(minutesCompleted);
      setIsRunning(false);
      setIsSessionActive(false);
      setTimeRemaining(SESSION_TYPE_CONFIG[sessionType].duration);
      setSessionStartTime(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // Pause/Resume
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  // Reset
  const handleReset = () => {
    setIsRunning(false);
    setTimeRemaining(SESSION_TYPE_CONFIG[sessionType].duration);
  };

  return {
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
  };
};
