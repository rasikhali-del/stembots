import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';

type Animation = 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight';

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  animation?: Animation;
  delay?: number;
  threshold?: number;
}

const hiddenTransformByAnimation: Record<Animation, string> = {
  fadeIn: 'none',
  slideUp: 'translateY(30px)',
  slideLeft: 'translateX(-30px)',
  slideRight: 'translateX(30px)',
};

export const ScrollAnimation = ({
  children,
  className = '',
  animation = 'fadeIn',
  delay = 0,
  threshold = 0.15,
}: ScrollAnimationProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  const animateClass = useMemo(() => {
    switch (animation) {
      case 'slideUp':
        return 'animate-fade-in-up';
      case 'slideLeft':
        return 'animate-slide-in-left';
      case 'slideRight':
        return 'animate-slide-in-right';
      case 'fadeIn':
      default:
        return 'animate-fade-in-up';
    }
  }, [animation]);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            setInView(true);

            const start = () => {
              target.classList.remove(animateClass);
              void target.offsetWidth;
              target.classList.add(animateClass);
            };

            if (delay > 0) {
              window.setTimeout(start, delay);
            } else {
              start();
            }
          } else {
            setInView(false);
            target.classList.remove(animateClass);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -15% 0px',
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [animateClass, delay, threshold]);

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : hiddenTransformByAnimation[animation],
      }}
    >
      {children}
    </div>
  );
};
