import { useState, useEffect, useRef } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy',
  fetchpriority = 'auto',
  onLoad,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(loading === 'eager');
  const imgRef = useRef(null);

  useEffect(() => {
    if (loading === 'eager') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '100px',
        threshold: 0.01
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  return (
    <div ref={imgRef} className={`relative ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
      )}
      {(isInView || loading === 'eager') && (
        <img
          src={src}
          alt={alt}
          className={`${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading={loading}
          decoding="async"
          fetchpriority={fetchpriority}
          onLoad={handleLoad}
          {...props}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
