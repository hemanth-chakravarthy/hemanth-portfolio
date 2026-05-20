import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const roles = [
  "Software Developer",
  "FullStack Developer",
  "Backend Developer",
  "Frontend Developer",
];

const PacManText = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [eatenChars, setEatenChars] = useState(0);
  const [isEating, setIsEating] = useState(true);
  const [pacManVisible, setPacManVisible] = useState(true);

  const currentRole = roles[roleIndex];
  const charWidth = 28; // Approximate width per character
  const textStartX = 0;
  
  // Pac-Man eating animation - slower speed (180ms per character)
  useEffect(() => {
    if (!isEating) return;

    const eatInterval = setInterval(() => {
      setEatenChars((prev) => {
        if (prev >= currentRole.length) {
          // Finished eating, transition to next role
          clearInterval(eatInterval);
          setPacManVisible(false);
          
          setTimeout(() => {
            setRoleIndex((prevRole) => (prevRole + 1) % roles.length);
            setEatenChars(0);
            setPacManVisible(true);
          }, 400);
          
          return prev;
        }
        return prev + 1;
      });
    }, 180); // Slower speed for better readability

    return () => clearInterval(eatInterval);
  }, [isEating, roleIndex, currentRole.length]);

  // Calculate Pac-Man position based on eaten characters
  const pacManX = textStartX + eatenChars * charWidth - 15;

  return (
    <div className="relative h-16 md:h-20 flex items-center justify-center overflow-visible">
      <div className="relative inline-flex items-center">
        {/* Pac-Man */}
        <AnimatePresence>
          {pacManVisible && (
            <motion.div
              className="absolute z-10"
              style={{ left: pacManX }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <PacMan />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Text being eaten */}
        <div className="relative flex items-center text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
          {currentRole.split("").map((char, index) => {
            const isSpace = char === " ";
            const firstWordEnd = currentRole.indexOf(" ");
            const isFirstWord = index < firstWordEnd;
            const isEaten = index < eatenChars;
            
            return (
              <motion.span
                key={`${roleIndex}-${index}`}
                className={`inline-block ${isFirstWord ? "gradient-text" : "text-foreground"}`}
                style={{ 
                  width: isSpace ? "0.3em" : "auto",
                  minWidth: isSpace ? "0.3em" : "auto",
                }}
                initial={{ opacity: 1, scale: 1 }}
                animate={{
                  opacity: isEaten ? 0 : 1,
                  scale: isEaten ? 0.5 : 1,
                  x: isEaten ? -10 : 0,
                }}
                transition={{ duration: 0.15 }}
              >
                {char}
              </motion.span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Pac-Man component with 3D spherical look and mouth animation
const PacMan = () => {
  return (
    <motion.div
      className="relative w-12 h-12 md:w-16 md:h-16"
      animate={{ 
        y: [0, -4, 0],
        rotate: [0, -5, 0, 5, 0]
      }}
      transition={{ 
        y: { duration: 0.4, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 2, repeat: Infinity, ease: "linear" }
      }}
    >
      {/* 3D Shadow beneath */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-2 bg-black/20 blur-md rounded-[100%] scale-x-150" />

      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
        <defs>
          <radialGradient id="pacmanGradient" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFF200" />
            <stop offset="70%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#B8860B" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Pac-Man Body with 3D Gradient */}
        <motion.path
          d="M50,50 L95,25 A50,50 0 1,0 95,75 Z"
          fill="url(#pacmanGradient)"
          stroke="#B8860B"
          strokeWidth="0.5"
          animate={{
            d: [
              "M50,50 L95,15 A50,50 0 1,0 95,85 Z", // Wide open
              "M50,50 L95,48 A50,50 0 1,0 95,52 Z", // Almost closed
              "M50,50 L95,15 A50,50 0 1,0 95,85 Z", // Wide open
            ],
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Specular Highlight for 3D effect */}
        <circle cx="35" cy="35" r="8" fill="white" fillOpacity="0.4" filter="url(#glow)" />
        <circle cx="32" cy="32" r="3" fill="white" fillOpacity="0.6" />

        {/* Eye - more classic style */}
        <circle cx="50" cy="25" r="4" fill="black" />
      </svg>
    </motion.div>
  );
};

export default PacManText;
