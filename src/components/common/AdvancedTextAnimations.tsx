import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface RevealTextProps {
  children: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

interface BlurRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

interface CounterProps {
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
}

// Text reveal with blur effect - HeraldX style
export const BlurReveal = ({ children, className = '', delay = 0 }: BlurRevealProps) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once: false, margin: '-15% 0px' }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

// Gradient text animation
export const GradientText = ({ 
  children, 
  className = '',
  animate = true,
}: { 
  children: string; 
  className?: string;
  animate?: boolean;
}) => {
  if (!animate) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      className={`${className} bg-gradient-to-r from-primary via-secondary to-accent bg-300% bg-clip-text text-transparent`}
      animate={{
        backgroundPosition: ['0% center', '100% center', '0% center'],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.span>
  );
};

// Split text reveal line by line
export const SplitText = ({
  children,
  className = '',
  delay = 0,
  once = false,
}: RevealTextProps) => {
  const lines = children.split('\n');

  return (
    <div className={className}>
      {lines.map((line, lineIndex) => (
        <motion.div
          key={`line-${lineIndex}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once, margin: '-15% 0px' }}
          transition={{
            duration: 0.6,
            delay: delay + lineIndex * 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="overflow-hidden"
        >
          <span>{line}</span>
        </motion.div>
      ))}
    </div>
  );
};

// Character by character reveal
export const CharacterReveal = ({
  children,
  className = '',
  delay = 0,
  once = false,
}: RevealTextProps) => {
  const characters = children.split('');

  return (
    <motion.span className={className}>
      {characters.map((char, index) => (
        <motion.span
          key={`char-${index}`}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once, margin: '-15% 0px' }}
          transition={{
            duration: 0.3,
            delay: delay + index * 0.03,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: 'inline-block', minWidth: char === ' ' ? '0.3em' : 'auto' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Animated counter
export const AnimatedCounter = ({ 
  to, 
  duration = 2,
  className = '',
  suffix = '',
}: CounterProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, margin: '-15% 0px' }}
      className={className}
    >
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration }}
      >
        {to}
      </motion.span>
      {suffix && <span>{suffix}</span>}
    </motion.div>
  );
};

// Stagger text animation
export const StaggerText = ({
  children,
  className = '',
  delay = 0,
  once = false,
  staggerDelay = 0.1,
}: RevealTextProps & { staggerDelay?: number }) => {
  const words = children.split(' ');

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-15% 0px' }}
      transition={{ staggerChildren: staggerDelay, delayChildren: delay }}
    >
      {words.map((word, index) => (
        <motion.span
          key={`word-${index}`}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Slide in text
export const SlideInText = ({
  children,
  className = '',
  delay = 0,
  direction = 'left',
}: RevealTextProps & { direction?: 'left' | 'right' | 'top' | 'bottom' }) => {
  const directionMap = {
    left: { x: -50, y: 0 },
    right: { x: 50, y: 0 },
    top: { x: 0, y: -50 },
    bottom: { x: 0, y: 50 },
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...directionMap[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: false, margin: '-15% 0px' }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

// Text clip animation
export const ClipText = ({
  children,
  className = '',
  delay = 0,
}: RevealTextProps) => {
  return (
    <motion.div
      className={`${className} overflow-hidden`}
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
      viewport={{ once: false, margin: '-15% 0px' }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

// Rotate text animation
export const RotateText = ({
  children,
  className = '',
  delay = 0,
}: RevealTextProps) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, rotateX: 90 }}
      whileInView={{ opacity: 1, rotateX: 0 }}
      viewport={{ once: false, margin: '-15% 0px' }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ perspective: '1000px' }}
    >
      {children}
    </motion.div>
  );
};

// Pulse text animation
export const PulseText = ({
  children,
  className = '',
  delay = 0,
}: RevealTextProps) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, margin: '-15% 0px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

// Shimmer text animation
export const ShimmerText = ({
  children,
  className = '',
  delay = 0,
}: RevealTextProps) => {
  return (
    <motion.div
      className={`${className} relative overflow-hidden`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, margin: '-15% 0px' }}
      transition={{
        duration: 0.6,
        delay,
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        whileInView={{ x: '100%' }}
        viewport={{ once: false }}
        transition={{
          duration: 1.5,
          delay: delay + 0.3,
          ease: 'easeInOut',
        }}
      />
      {children}
    </motion.div>
  );
};

// Scale reveal text
export const ScaleReveal = ({
  children,
  className = '',
  delay = 0,
}: RevealTextProps) => {
  return (
    <motion.div
      className={`${className} overflow-hidden`}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, margin: '-15% 0px' }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

// Word reveal with fade
export const WordReveal = ({
  children,
  className = '',
  delay = 0,
}: RevealTextProps) => {
  const words = children.split(' ');

  return (
    <motion.div className={className}>
      {words.map((word, index) => (
        <motion.span
          key={`word-reveal-${index}`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-15% 0px' }}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};
