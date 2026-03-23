import { useUser } from '@/app/context/UserContext';

export const usePomodoroAPI = () => {
  const { userId } = useUser();

  const startSession = async (sessionType) => {
    const response = await fetch('/api/v1/pomodoro/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, type: sessionType }),
    });

    if (!response.ok) {
      throw new Error('Failed to start session');
    }

    return response.json();
  };

  const endSession = async (minutesCompleted) => {
    const response = await fetch('/api/v1/pomodoro/end', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, minutesCompleted }),
    });

    if (!response.ok) {
      throw new Error('Failed to end session');
    }

    return response.json();
  };

  return { startSession, endSession };
};
