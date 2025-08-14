import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  index: number;
  color?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  index,
  color = 'teal',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: 'easeOut',
      }}
    >      <Tilt
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        perspective={1000}
        glareEnable={true}
        glareMaxOpacity={0.3}
        glareColor={color === 'teal' ? '#2dd4bf' : '#8b5cf6'}
        glarePosition="all"
        glareBorderRadius="12px"
      >
        <motion.div
          className="relative p-8 h-full rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm overflow-hidden group"
          whileHover={{ borderColor: '#2dd4bf' }}
          transition={{ duration: 0.3 }}
        >
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at 50% 0%, ${
                color === 'teal' ? 'rgba(45, 212, 191, 0.15)' : 'rgba(139, 92, 246, 0.15)'
              } 0%, transparent 70%)`,
            }}
          />
          
          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}                className="absolute w-1 h-1 bg-teal-400 rounded-full opacity-0 group-hover:opacity-50"
                initial={{ 
                  x: Math.random() * 100 + '%',
                  y: '100%'
                }}
                animate={{
                  y: '-100%',
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: 'linear',
                }}
              />
            ))}
          </div>

          {/* Icon with animation */}
          <motion.div
            className="relative z-10 mb-6"
            whileHover={{ rotate: 360, scale: 1.2 }}
            transition={{ duration: 0.5 }}
          >
            <Icon className={`w-10 h-10 text-${color}-400`} />
            <motion.div
              className={`absolute inset-0 w-10 h-10 bg-${color}-400/20 rounded-full blur-xl`}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0.2, 0.5],
              }}              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>

          {/* Content */}
          <h4 className="relative z-10 text-xl font-bold mb-3 text-white group-hover:text-teal-400 transition-colors duration-300">
            {title}
          </h4>
          <p className="relative z-10 text-gray-400 leading-relaxed">
            {description}
          </p>

          {/* Animated border */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: `linear-gradient(90deg, transparent, ${
                color === 'teal' ? '#2dd4bf' : '#8b5cf6'
              }, transparent)`,
              opacity: 0,
            }}
            whileHover={{ opacity: 0.5 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </Tilt>
    </motion.div>
  );
};