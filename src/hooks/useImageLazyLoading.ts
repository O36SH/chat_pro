import { useEffect, useRef } from 'react';

export const useImageLazyLoading = () => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && imgRef.current) {
            const img = imgRef.current;
            const src = img.getAttribute('data-src');
            if (src) {
              img.src = src;
              img.classList.remove('lazy');
              observer.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: '50px',
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  return imgRef;
};