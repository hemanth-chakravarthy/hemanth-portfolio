import { useRef, ReactNode, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";

interface ScrollSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

const ScrollSection = ({ children, id, className = "" }: ScrollSectionProps) => {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.matchMedia("(max-width: 768px)").matches ||
        "ontouchstart" in window
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Transform values for parallax effect
  const rawY = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -60]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const rawScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  // Smooth spring animations
  const springConfig = { damping: 30, stiffness: 100, mass: 0.5 };
  const y = useSpring(rawY, springConfig);
  const opacity = useSpring(rawOpacity, springConfig);
  const scale = useSpring(rawScale, springConfig);

  // Disable animations on mobile or reduced motion
  if (isMobile || prefersReducedMotion) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      style={{
        y,
        opacity,
        scale,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </motion.section>
  );
};

export default ScrollSection;
