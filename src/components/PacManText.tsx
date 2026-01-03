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

// Pac-Man component with mouth animation - black color
const PacMan = () => {
  return (
    <motion.div
      className="relative w-10 h-10 md:w-12 md:h-12"
      animate={{ x: [0, 2, 0] }}
      transition={{ duration: 0.18, repeat: Infinity }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <motion.path
          d="M50,50 L95,25 A50,50 0 1,0 95,75 Z"
          fill="currentColor"
          className="text-foreground"
          animate={{
            d: [
              "M50,50 L95,25 A50,50 0 1,0 95,75 Z", // Mouth open
              "M50,50 L95,45 A50,50 0 1,0 95,55 Z", // Mouth closed
              "M50,50 L95,25 A50,50 0 1,0 95,75 Z", // Mouth open
            ],
          }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Eye */}
        <circle cx="55" cy="30" r="6" fill="hsl(var(--background))" />
      </svg>
    </motion.div>
  );
};

export default PacManText;
