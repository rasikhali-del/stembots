import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
  duration?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onLoadingComplete,
  duration = 4000,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [isImageFading, setIsImageFading] = useState(false);

  useEffect(() => {
    const imageFadeTimer = setTimeout(() => {
      setIsImageFading(true);
    }, duration - 500);

    const fadeOutTimer = setTimeout(() => {
      setIsFading(true);
    }, duration - 300);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      onLoadingComplete?.();
    }, duration);

    return () => {
      clearTimeout(imageFadeTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(hideTimer);
    };
  }, [duration, onLoadingComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`loading-screen-overlay ${isFading ? 'fade-out' : ''}`}>
      <div className="loading-screen-content">
        <div className={`loading-logo-container ${isImageFading ? 'image-fade-out' : ''}`}>          <img
            src="/logo.jpg"
            alt="Stembots"
            className="loading-logo"
          />
          <div className="loading-glow"></div>
        </div>

        {/* Brand Name */}
        <div className={`loading-brand ${isImageFading ? 'image-fade-out' : ''}`}>
          <span className="brand-letter" style={{ animationDelay: '0s', color: '#ec4899' }}>S</span>
          <span className="brand-letter" style={{ animationDelay: '0.08s', color: '#1e3a5f' }}>T</span>
          <span className="brand-letter" style={{ animationDelay: '0.16s', color: '#14b8a6' }}>E</span>
          <span className="brand-letter" style={{ animationDelay: '0.24s', color: '#facc15' }}>M</span>
          <span className="brand-letter" style={{ animationDelay: '0.32s', color: '#1e3a5f' }}>B</span>
          <span className="brand-letter" style={{ animationDelay: '0.40s', color: '#1e3a5f' }}>O</span>
          <span className="brand-letter" style={{ animationDelay: '0.48s', color: '#1e3a5f' }}>T</span>
          <span className="brand-letter" style={{ animationDelay: '0.56s', color: '#1e3a5f' }}>S</span>
        </div>

        <div className={`loading-spinner ${isImageFading ? 'spinner-fade-out' : ''}`}>
          <div className="spinner-dot"></div>
          <div className="spinner-dot"></div>
          <div className="spinner-dot"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
