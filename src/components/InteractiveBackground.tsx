import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const InteractiveBackground = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const { scrollYProgress } = useScroll();
  const waveY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.matchMedia("(max-width: 768px)").matches || 
        "ontouchstart" in window
      );
    };

    const checkReducedMotion = () => {
      setPrefersReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    };

    checkMobile();
    checkReducedMotion();

    const handleResize = () => checkMobile();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Simplified static background for mobile or reduced motion
  if (isMobile || prefersReducedMotion) {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
        <div 
          className="absolute left-0 bottom-0 w-full h-1/3"
          style={{
            background: "hsl(var(--primary))",
            boxShadow: "inset 0 0 50px rgba(0, 0, 0, 0.5)",
          }}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* Wave container */}
      <motion.div
        className="absolute left-0 w-full h-full"
        style={{
          background: "hsl(var(--primary))",
          boxShadow: "inset 0 0 50px rgba(0, 0, 0, 0.5)",
          y: waveY,
        }}
      >
        {/* Rotating wave spans */}
        <motion.span
          className="absolute"
          style={{
            width: "325vh",
            height: "325vh",
            top: 0,
            left: "50%",
            x: "-50%",
            y: "-75%",
            borderRadius: "45%",
            background: "hsl(var(--background))",
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.span
          className="absolute"
          style={{
            width: "325vh",
            height: "325vh",
            top: 0,
            left: "50%",
            x: "-50%",
            y: "-75%",
            borderRadius: "40%",
            background: "hsl(var(--background) / 0.5)",
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.span
          className="absolute"
          style={{
            width: "325vh",
            height: "325vh",
            top: 0,
            left: "50%",
            x: "-50%",
            y: "-75%",
            borderRadius: "42.5%",
            background: "hsl(var(--background) / 0.5)",
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>
    </div>
  );
};

export default InteractiveBackground;
