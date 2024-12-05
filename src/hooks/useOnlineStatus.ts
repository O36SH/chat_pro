import { useState, useEffect } from 'react';
import { socketService } from '../services/socket';

export const useOnlineStatus = (userId: string) => {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    socketService.on(`user:status:${userId}`, (status: boolean) => {
      setIsOnline(status);
    });

    return () => {
      socketService.off(`user:status:${userId}`);
    };
  }, [userId]);

  return isOnline;
};