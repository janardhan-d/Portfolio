import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * 3D ScrollReveal Component
 * Provides 60fps GPU-accelerated 3D scroll-triggered entrance animations
 * with customizable direction, depth, perspective, and timing.
 */
export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.65,
  className = '',
  cascade = false,
  distance = 60,
  once = true,
  scale = 1
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-60px' });

  // 3D variants based on direction
  const getVariants = () => {
    switch (direction) {
      case 'up':
        return {
          hidden: { opacity: 0, y: distance, rotateX: 12, scale: 0.96 },
          visible: { opacity: 1, y: 0, rotateX: 0, scale: 1 }
        };
      case 'down':
        return {
          hidden: { opacity: 0, y: -distance, rotateX: -12, scale: 0.96 },
          visible: { opacity: 1, y: 0, rotateX: 0, scale: 1 }
        };
      case 'left':
        return {
          hidden: { opacity: 0, x: -distance, rotateY: -14, scale: 0.96 },
          visible: { opacity: 1, x: 0, rotateY: 0, scale: 1 }
        };
      case 'right':
        return {
          hidden: { opacity: 0, x: distance, rotateY: 14, scale: 0.96 },
          visible: { opacity: 1, x: 0, rotateY: 0, scale: 1 }
        };
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.85, z: -100 },
          visible: { opacity: 1, scale: 1, z: 0 }
        };
      case 'flip3d':
        return {
          hidden: { opacity: 0, rotateY: 70, scale: 0.9 },
          visible: { opacity: 1, rotateY: 0, scale: 1 }
        };
      default:
        return {
          hidden: { opacity: 0, y: distance },
          visible: { opacity: 1, y: 0 }
        };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={getVariants()}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1] // Custom snappy spring-like cubic bezier
      }}
      className={className}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1200
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger Container for parent grids/lists
 */
export function StaggerContainer({ children, className = '', staggerDelay = 0.08, delayChildren = 0.1 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren
          }
        }
      }}
      className={className}
      style={{ perspective: 1200 }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 35, rotateX: 10, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
  }
};
