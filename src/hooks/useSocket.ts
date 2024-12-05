import { useEffect, useRef } from 'react';
import { socketService } from '../services/socket';
import { useAuthStore } from '../store/authStore';
import { toast } from 'react-hot-toast';

export const useSocket = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const connectionAttempts = useRef(0);
  const maxAttempts = 3;

  useEffect(() => {
    if (isAuthenticated) {
      const connectWithRetry = () => {
        if (connectionAttempts.current >= maxAttempts) {
          toast.error('فشل الاتصال بالخادم. يرجى المحاولة لاحقاً');
          return;
        }

        try {
          socketService.connect();
          connectionAttempts.current++;
        } catch (error) {
          console.error('Socket connection error:', error);
          setTimeout(connectWithRetry, 2000); // Retry after 2 seconds
        }
      };

      connectWithRetry();
    } else {
      socketService.disconnect();
    }

    return () => {
      socketService.disconnect();
      connectionAttempts.current = 0;
    };
  }, [isAuthenticated]);

  return socketService;
};