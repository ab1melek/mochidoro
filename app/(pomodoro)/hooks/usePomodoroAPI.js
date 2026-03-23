import { useUser } from '@/app/context/UserContext';

export const usePomodoroAPI = () => {
  const { userId } = useUser();

  const endSession = async (minutesCompleted, sessionType) => {
    const response = await fetch('/api/v1/pomodoro/end', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, minutesCompleted, type: sessionType }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to end session');
    }

    return response.json();
  };

  return { endSession };
};
