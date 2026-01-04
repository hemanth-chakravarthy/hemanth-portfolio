import { Github, Linkedin, Mail, Instagram } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import PacManText from "./PacManText";

// Import images directly
import profileImageDark from "@/assets/profile.png"; // or your actual path
import profileImageLight from "@/assets/profilewhite.png"; // or your actual path

// Floating tech icons configuration with x/y positioning
const floatingIcons = [
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    alt: "JavaScript",
    x: { mobile: 80, desktop: 130 },
    y: { mobile: -40, desktop: -60 },
    delay: 0,
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    alt: "MongoDB",
    x: { mobile: 100, desktop: 160 },
    y: { mobile: 30, desktop: 40 },
    delay: 0.5,
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    alt: "React",
    x: { mobile: -120, desktop: -200 },
    y: { mobile: -40, desktop: -50 },
    delay: 1,
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    alt: "PostgreSQL",
    x: { mobile: -120, desktop: -180 },
    y: { mobile: 40, desktop: 60 },
    delay: 1.5,
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    alt: "Git",
    x: { mobile: -150, desktop: -220 },
    y: { mobile: 100, desktop: 140 },
    delay: 2,
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    alt: "TypeScript",
    x: { mobile: 120, desktop: 180 },
    y: { mobile: 100, desktop: 130 },
    delay: 2.5,
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg",
    alt: "NestJS",
    x: { mobile: 110, desktop: 170 },
    y: { mobile: 150, desktop: 190 },
    delay: 3,
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    alt: "Node.js",
    x: { mobile: -140, desktop: -200 },
    y: { mobile: 150, desktop: 200 },
    delay: 3.5,
  },
];

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check theme on mount and when it changes
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    };

    // Initial check
    checkTheme();

    // Create a MutationObserver to watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          checkTheme();
        }
      });
    });

    // Start observing the html element for class changes
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Track mouse position for parallax
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion || isMobile) return;
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkMobile);
    };
  }, [prefersReducedMotion, isMobile]);

  const socialLinks = [
    { icon: Github, href: "https://github.com/hemanth-chakravarthy", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/hemanth-chakravarthy-kancharla-a27b87357", label: "LinkedIn" },
    { icon: Mail, href: "mailto:khchakri@gmail.com", label: "Email" },
    { icon: Instagram, href: "https://instagram.com/imperialx.04", label: "Instagram" },
  ];

  // Determine which profile image to use based on theme
  const profileImage = isDarkMode ? profileImageDark : profileImageLight;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Main Content */}
      <motion.div
        className="container mx-auto px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Changed to text-base for a medium feel */}
        <motion.p 
          className="text-base text-muted-foreground mb-2"
          variants={itemVariants}
        >
          Hello, I'm Hemanth Chakravarthy Kancharla
        </motion.p>
        
        <motion.div 
          className="mb-4"
          variants={itemVariants}
        >
          <PacManText />
        </motion.div>
        
        {/* Description using text-base and tighter width */}
        <motion.div 
          className="max-w-md mx-auto text-muted-foreground text-base mb-8"
          variants={itemVariants}
        >
          <p>
            <span className="line-through mr-1 opacity-60">Full-Stack</span>
            <span className="line-through mr-1 opacity-60">Software</span>
            <span className="line-through mr-1 opacity-60">Backend</span>
            <span className="line-through mr-1 opacity-60">Frontend</span>
            <span className="font-medium ml-1">→ all of the above.</span>
            <br />
            <span className="block mt-2 leading-relaxed">
              Developer crafting reliable, user-centric applications with an emphasis on performance and usability.
            </span>
          </p>
        </motion.div>

        {/* Portrait Container */}
        <div className="relative mx-auto flex items-center justify-center">
          <motion.div 
            className="relative w-64 h-auto md:w-80 md:h-auto mx-auto"           
            variants={imageVariants}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent rounded-full blur-xl scale-110" />
            <img
              src={profileImage}
              alt="Hemanth Chakravarthy Kancharla"
              className="w-full h-auto object-contain relative z-10"
            />
            
            {/* 3D Icons Mapping */}
            {floatingIcons.map((icon, index) => {
              const xPos = isMobile ? icon.x.mobile : icon.x.desktop;
              const yPos = isMobile ? icon.y.mobile : icon.y.desktop;
              
              return (
                <motion.div
                  key={index}
                  style={{ position: "absolute", left: "50%", top: "50%" }}
                  animate={{ x: xPos, y: yPos, opacity: 1, scale: 1 }}
                >
                  <motion.img
                    src={icon.src}
                    alt={icon.alt}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-6 h-6 md:w-7 md:h-7 -translate-x-1/2 -translate-y-1/2 drop-shadow-md"
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
        
        {/* Photography Button - Scaled down */}
        <a
          href="https://photo-sphere-online.lovable.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-4 bottom-36 z-50 md:left-10 group"
        >
          <button className="px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm border border-foreground/10 dark:bg-black/30 bg-white/30 shadow-md transition-all duration-300 hover:scale-105 hover:bg-primary hover:border-primary hover:shadow-lg hover:shadow-primary/20 dark:hover:text-white hover:text-black">
            Photography <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
          </button>
        </a>
      </motion.div>

      {/* Fixed Social Links */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4">
        {socialLinks.map((social, index) => (
          <motion.a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label={social.label}
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
            transition={{ delay: 1 + index * 0.1 }}
            whileHover={{ scale: 1.1 }}
          >
            <social.icon className="w-5 h-5" />
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default Hero;