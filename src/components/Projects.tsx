import React from "react";
import { ExternalLink, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  SiReact, SiRedux, SiNodedotjs, SiMongodb, 
  SiTypescript, SiTailwindcss, SiPostgresql, 
  SiFastify, SiSocketdotio, SiRedis, SiFramer,
  SiNextdotjs, SiSupabase, SiVercel, SiPython,
  SiDocker, SiTensorflow, SiKeras, SiObsidian,
  SiMeta, SiOpenai, SiRender
} from "react-icons/si";

// Import images at the top
import echoVoyageImage from "@/assets/EchoVoyage.webp";
import photoSphereImage from "@/assets/PhotoSphere.webp";
import orderExecutionImage from "@/assets/OrderExecution.webp";
import meetingCopilotImage from "@/assets/MeetingCopilot.webp";
import smartBookmarkImage from "@/assets/SmartBookmark.webp";
import photoChatbotImage from "@/assets/PhotoChatbot.webp";
import voyageMateImage from "@/assets/VoyageMate.webp";
import airQualityImage from "@/assets/AirQuality.webp";

const techIconMap: { [key: string]: { icon: any; color: string } } = {
  "React": { icon: SiReact, color: "#61DAFB" },
  "Redux": { icon: SiRedux, color: "#764ABC" },
  "Node.js": { icon: SiNodedotjs, color: "#339933" },
  "MongoDB": { icon: SiMongodb, color: "#47A248" },
  "Typescript": { icon: SiTypescript, color: "#3178C6" },
  "TypeScript": { icon: SiTypescript, color: "#3178C6" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
  "PostgreSQL": { icon: SiPostgresql, color: "#4169E1" },
  "Fastify": { icon: SiFastify, color: "#FFDB00" },
  "FastAPI": { icon: SiFastify, color: "#009688" },
  "WebSockets": { icon: SiSocketdotio, color: "#47B2FF" },
  "BullMQ": { icon: SiRedis, color: "#DC382D" },
  "Redis": { icon: SiRedis, color: "#DC382D" },
  "Framer Motion": { icon: SiFramer, color: "#0055FF" },
  "Next.js": { icon: SiNextdotjs, color: "#FFFFFF" },
  "Supabase": { icon: SiSupabase, color: "#3ECF8E" },
  "Vercel": { icon: SiVercel, color: "#FFFFFF" },
  "Python": { icon: SiPython, color: "#3776AB" },
  "Docker": { icon: SiDocker, color: "#2496ED" },
  "TensorFlow": { icon: SiTensorflow, color: "#FF6F00" },
  "Keras": { icon: SiKeras, color: "#D00000" },
  "Obsidian": { icon: SiObsidian, color: "#483699" },
  "Groq API": { icon: SiOpenai, color: "#f55036" },
  "Llama 3.3": { icon: SiMeta, color: "#0668E1" },
  "LangGraph": { icon: SiPython, color: "#3776AB" },
  "Onrender": { icon: SiRender, color: "#46E3B7" },
};

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col bg-card/40 backdrop-blur-md border border-border/50 rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-500 shadow-xl h-full dark:bg-secondary/30"
    >
      {/* Visual Area */}
      <div className="relative h-64 overflow-hidden bg-muted flex items-center justify-center p-0 dark:bg-black/40">
        {/* Project Image Background */}
        <img 
          src={project.image} 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 opacity-100 group-hover:opacity-10 group-hover:scale-110"
        />
        
        {/* Animated Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Center Line Glow (matching reference) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-32 bg-primary/40 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Tech Stack Scrolling Container */}
        <div 
          className={`relative w-full overflow-hidden flex items-center justify-center py-4 mask-fade-edges transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        >
          <motion.div 
            className="flex gap-6 items-center"
            animate={isHovered ? { 
              x: [0, -(project.tech.length * 88)], 
            } : { x: 0 }}
            transition={{ 
              duration: isHovered ? project.tech.length * 2 : 0.5,
              repeat: isHovered ? Infinity : 0,
              ease: "linear",
            }}
            style={{ 
              display: "flex",
              width: "max-content",
            }}
          >
            {/* Duplicate tech stack for seamless loop */}
            {[...project.tech, ...project.tech, ...project.tech].map((techName: string, i: number) => {
              const techData = techIconMap[techName] || { icon: SiReact, color: "#61DAFB" };
              const Icon = techData.icon;
              return (
                <div 
                  key={i}
                  className="flex flex-col items-center gap-2 group/icon"
                >
                  <div 
                    className="w-16 h-16 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center border border-border/50 shadow-sm group-hover/icon:scale-110 transition-all duration-300 dark:bg-secondary/80"
                    style={{ 
                      borderColor: isHovered ? `${techData.color}44` : undefined,
                      boxShadow: isHovered ? `0 0 20px ${techData.color}22` : undefined 
                    }}
                  >
                    <Icon 
                      className="w-8 h-8 transition-colors duration-300" 
                      style={{ color: techData.color }}
                    />
                  </div>
                  <span className="text-[10px] font-medium text-muted-foreground opacity-0 group-hover/icon:opacity-100 transition-opacity">
                    {techName}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Project Number */}
        <div className="absolute top-6 left-6">
          <span className="text-4xl font-display font-bold text-primary/10 select-none">
            0{project.number}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-8 flex flex-col">
        <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>
        
        <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-1">
          {project.description}
        </p>

        {/* Footer Links */}
        <div className="flex items-center gap-4 mt-auto">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-full text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            <ExternalLink className="w-4 h-4" />
            Live Demo
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full border border-border/50 text-muted-foreground hover:border-primary hover:text-primary transition-all duration-300"
            title="GitHub Repository"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const projects = [
    {
      number: "1",
      title: "EchoVoyage",
      description:
        "EchoVoyage is a travel website that offers personalized trip planning and booking services. It features interactive maps, destination guides, and user reviews.",
      tech: ["React", "Redux", "Node.js", "MongoDB"],
      liveUrl: "https://echovoyages-v2.onrender.com",
      githubUrl: "https://github.com/hemanth-chakravarthy/EchoVoyages",
      image: echoVoyageImage,
    },
    {
      number: "2",
      title: "Order Execution Engine",
      description:
        "A high-performance order execution engine for DEX trading with intelligent routing, real-time WebSocket updates, and concurrent order processing.",
      tech: ["Node.js", "TypeScript", "Fastify", "WebSockets", "Redis"],
      liveUrl: "https://order-execution-engine-production-2c02.up.railway.app/",
      githubUrl: "https://github.com/hemanth-chakravarthy/Order-execution-engine",
      image: orderExecutionImage,
    },
    {
      number: "3",
      title: "PhotoSphere",
      description:
        "PhotoSphere is a personal photography portfolio platform that allows photographers to showcase their work. Users can explore immersive photo spheres.",
      tech: ["Typescript", "React", "Tailwind CSS", "PostgreSQL"],
      liveUrl: "https://photo-sphere-online.lovable.app/",
      githubUrl: "https://github.com/hemanth-chakravarthy/photo-shpere",
      image: photoSphereImage,
    },
    
    {
      number: "4",
      title: "Air Quality Monitor",
      description:
        "Comprehensive web application for real-time air quality monitoring and prediction using machine learning (Keras/TensorFlow) and FastAPI.",
      tech: ["React", "TypeScript", "FastAPI", "Python", "TensorFlow", "Docker", "Redis"],
      liveUrl: "#",
      githubUrl: "https://github.com/hemanth-chakravarthy/Air-Quality-Monitoring",
      image: airQualityImage,
    },
    {
      number: "5",
      title: "VoyageMate AI",
      description:
        "Agentic AI travel planner that generates personalized itineraries and real-time insights using a ReAct-based LangGraph workflow and FastAPI.",
      tech: ["LangGraph", "FastAPI", "Python", "React", "Onrender"],
      liveUrl: "https://voyagemate-frontend.onrender.com/",
      githubUrl: "https://github.com/hemanth-chakravarthy/voyagemate-ai",
      image: voyageMateImage,
    },
    {
      number: "6",
      title: "Photography Chatbot",
      description:
        "Your AI-powered personal photography advisor. Built with Next.js and the Groq API (Llama 3.3) for intelligent equipment and technique advice.",
      tech: ["Next.js", "Tailwind CSS", "Groq API", "Llama 3.3"],
      liveUrl: "https://photography-chatbot.vercel.app",
      githubUrl: "https://github.com/hemanth-chakravarthy/photography-chatbot",
      image: photoChatbotImage,
    },
    {
      number: "7",
      title: "Smart Bookmark App",
      description:
        "A high-density, professional-grade digital knowledge archive built for speed. Inspired by Obsidian aesthetics and engineered for real-time synchronization.",
      tech: ["Obsidian", "Next.js", "Tailwind CSS", "Supabase", "Vercel"],
      liveUrl: "https://smart-bookmark-app-pink-tau.vercel.app",
      githubUrl: "https://github.com/hemanth-chakravarthy/smart-bookmark-app",
      image: smartBookmarkImage,
    },
    {
      number: "8",
      title: "Live AI Meeting Copilot",
      description:
        "A high-performance, real-time AI assistant built for live meeting augmentation. Handles continuous audio capture, multi-stage reasoning, and secure data management.",
      tech: ["Next.js", "Tailwind CSS", "Groq API", "Vercel"],
      liveUrl: "https://live-ai-meeting-copilot.vercel.app",
      githubUrl: "https://github.com/hemanth-chakravarthy/live-ai-meeting-copilot",
      image: meetingCopilotImage,
    },
  ];

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="section-heading mb-16 text-center">
          Featured Projects<span className="text-primary">.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;