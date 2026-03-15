import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Use a motion value for visibility to avoid React re-renders on mousemove
  const cursorOpacity = useMotionValue(0);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Smooth spring animation for the main cursor
  const springConfig = { damping: 30, stiffness: 1000, mass: 0.3 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Delayed spring for the ring cursor
  const ringConfig = { damping: 28, stiffness: 800, mass: 0.6 };
  const ringXSpring = useSpring(cursorX, ringConfig);
  const ringYSpring = useSpring(cursorY, ringConfig);

  useEffect(() => {
    // Check for mobile devices
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches || 
                  "ontouchstart" in window);
    };

    // Check for reduced motion preference
    const checkReducedMotion = () => {
      setPrefersReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    };

    checkMobile();
    checkReducedMotion();

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      cursorOpacity.set(1); // No React re-render — just updates motion value
    };

    const handleMouseLeave = () => cursorOpacity.set(0);
    const handleMouseEnter = () => cursorOpacity.set(1);

    if (!isMobile && !prefersReducedMotion) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseleave", handleMouseLeave);
      document.addEventListener("mouseenter", handleMouseEnter);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, cursorOpacity, isMobile, prefersReducedMotion]);

  // Don't render on mobile or if user prefers reduced motion
  if (isMobile || prefersReducedMotion) return null;

  return (
    <>
      {/* Hide default cursor */}
      <style>{`
        * { cursor: none !important; }
        a, button, [role="button"] { cursor: none !important; }
      `}</style>

      {/* Main cursor with </> text */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          opacity: cursorOpacity,
        }}
      >
        <span className="text-primary font-mono text-sm font-bold select-none">
          {"</>"}
        </span>
      </motion.div>

      {/* Ring cursor (delayed follow) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: ringXSpring,
          y: ringYSpring,
          translateX: "-50%",
          translateY: "-50%",
          opacity: cursorOpacity,
        }}
      >
        <div className="w-10 h-10 rounded-full border-2 border-primary/40" />
      </motion.div>
    </>
  );
};

export default CustomCursor;
