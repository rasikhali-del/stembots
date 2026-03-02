import { motion } from 'motion/react';

interface AnimatedTextProps {
  children: string;
  className?: string;
  variant?: 'word' | 'character' | 'line';
  delay?: number;
  staggerDelay?: number;
}

const sentenceVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 12,
      duration: 0.6,
    },
  },
};

const charVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 120,
      damping: 15,
      duration: 0.5,
      delay: i * 0.05,
    },
  }),
};

const lineVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 12,
      duration: 0.8,
      delay: i * 0.2,
    },
  }),
};

export const AnimatedText = ({
  children,
  className = '',
  variant = 'word',
  delay = 0,
  staggerDelay = 0.08,
}: AnimatedTextProps) => {
  if (variant === 'word') {
    const words = children.split(' ');
    return (
      <motion.div
        className={className}
        variants={sentenceVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: '-15% 0px' }}
        transition={{ staggerChildren: staggerDelay, delayChildren: delay }}
      >
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            variants={wordVariants}
            className="inline-block mr-2"
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  if (variant === 'character') {
    return (
      <motion.span
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: '-15% 0px' }}
      >
        {children.split('').map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            variants={charVariants}
            custom={index}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.span>
    );
  }

  if (variant === 'line') {
    const lines = children.split('\n');
    return (
      <motion.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: '-15% 0px' }}
      >
        {lines.map((line, index) => (
          <motion.div key={`line-${index}`} variants={lineVariants} custom={index}>
            {line}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return <div className={className}>{children}</div>;
};
