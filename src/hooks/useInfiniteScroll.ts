import { useEffect, useCallback, RefObject } from 'react';
import { useInView } from 'react-intersection-observer';

interface UseInfiniteScrollProps {
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  threshold?: number;
}

export const useInfiniteScroll = ({
  loading,
  hasMore,
  onLoadMore,
  threshold = 0.5,
}: UseInfiniteScrollProps) => {
  const { ref, inView } = useInView({
    threshold,
  });

  const handleObserver = useCallback(() => {
    if (inView && !loading && hasMore) {
      onLoadMore();
    }
  }, [inView, loading, hasMore, onLoadMore]);

  useEffect(() => {
    handleObserver();
  }, [handleObserver]);

  return { ref };
};