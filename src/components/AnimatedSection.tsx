import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Wrapper component that animates children when they come into view.
 * Respects user's reduced motion preferences.
 * Uses GPU-accelerated transforms for 60 FPS performance.
 */
const AnimatedSection = ({ 
  children, 
  className = "", 
  delay = 0 
}: AnimatedSectionProps) => {
  const prefersReducedMotion = useReducedMotion();

  // Skip animation if user prefers reduced motion
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: "easeOut",
      }}
      style={{ willChange: "transform, opacity" }} // GPU acceleration hint
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
