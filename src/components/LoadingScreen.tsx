import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoadingScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Reduced from 2500ms to 1500ms for faster load

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            {/* Logo animation */}
            <motion.div
              className="relative z-10"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                duration: 1,                type: 'spring',
                stiffness: 260,
                damping: 20,
              }}
            >
              <img
                src="/xental logo copy 3.png"
                alt="Xental"
                className="w-24 h-24 filter brightness-0 invert"
              />
            </motion.div>

            {/* Rotating rings */}
            <motion.div
              className="absolute inset-0 border-2 border-teal-400 rounded-full"
              style={{ width: '150px', height: '150px', top: '-25px', left: '-25px' }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            
            <motion.div
              className="absolute inset-0 border-2 border-purple-500 rounded-full"
              style={{ width: '180px', height: '180px', top: '-40px', left: '-40px' }}
              animate={{ rotate: -360 }}
              transition={{
                duration: 3,
                repeat: Infinity,                ease: 'linear',
              }}
            />

            {/* Loading text */}
            <motion.div
              className="absolute -bottom-16 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-1">
                <span className="text-teal-400 font-bold tracking-wider">LOADING</span>
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-1 h-1 bg-teal-400 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};