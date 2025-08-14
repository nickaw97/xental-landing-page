import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  type?: 'typewriter' | 'glitch' | 'split' | 'gradient';
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  delay = 0,
  type = 'split',
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(textRef, { once: true, margin: "-50px" }); // Added margin for better trigger

  useEffect(() => {
    if (!isInView || !textRef.current) return;

    const element = textRef.current;
    if (type === 'typewriter') {
      element.innerHTML = '';
      gsap.to(element, {
        duration: text.length * 0.05,
        text: text,
        ease: 'none',
        delay,
      });
    } else if (type === 'split') {
      const words = text.split(' ');
      element.innerHTML = words
        .map(
          (word, i) =>
            `<span class="inline-block opacity-0 transform translate-y-10">${word}</span>`
        )
        .join(' ');

      gsap.to(element.querySelectorAll('span'), {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power3.out',
        delay,
      });
    } else if (type === 'glitch') {
      const glitchAnimation = () => {
        const originalText = text;
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';        
        let iterations = 0;
        const interval = setInterval(() => {
          element.innerText = originalText
            .split('')
            .map((char, index) => {
              if (index < iterations) {
                return originalText[index];
              }
              return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            })
            .join('');

          if (iterations >= originalText.length) {
            clearInterval(interval);
          }
          iterations += 1;
        }, 30);
      };

      setTimeout(glitchAnimation, delay * 1000);
    }
  }, [isInView, text, type, delay]);

  if (type === 'gradient') {
    return (
      <motion.div
        ref={textRef}
        className={className}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay }}
      >        <span
          className="bg-gradient-to-r from-teal-400 via-purple-500 to-teal-400 bg-clip-text text-transparent bg-[length:200%] animate-gradient"
        >
          {text}
        </span>
      </motion.div>
    );
  }

  return <div ref={textRef} className={className}>{text}</div>;
};

export const GlowingText: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute inset-0 bg-teal-400/20 blur-xl"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.span>
  );
};