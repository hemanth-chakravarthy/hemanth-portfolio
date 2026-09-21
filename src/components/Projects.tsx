import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import echoVoyageImage from "@/assets/EchoVoyage.webp";
import playerNationImage from "@/assets/PlayerNation.webp";
import orderExecutionImage from "@/assets/OrderExecution.webp";
import photoSphereImage from "@/assets/PhotoSphere.webp";
import airQualityImage from "@/assets/AirQuality.webp";
import voyageMateImage from "@/assets/VoyageMate.webp";
import photoChatbotImage from "@/assets/PhotoChatbot.webp";
import smartBookmarkImage from "@/assets/SmartBookmark.webp";
import meetingCopilotImage from "@/assets/MeetingCopilot.webp";
import pyganoImage from "@/assets/pygano.webp";

interface ProjectData {
  title: string;
  description: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
}

const RAW_PROJECTS: ProjectData[] = [
  {
    title: "EchoVoyage",
    description: "A travel website offering personalized trip planning and booking, with interactive maps, destination guides, and user reviews.",
    tech: ["React", "Redux", "Node.js", "MongoDB"],
    liveUrl: "https://echovoyages-v2.onrender.com",
    githubUrl: "https://github.com/hemanth-chakravarthy/EchoVoyages",
    image: echoVoyageImage,
  },
  {
    title: "PlayerNation",
    description:
      "PlayerNation is an AI-powered football analytics app that transforms raw 2018 FIFA World Cup event data into AI-generated tactical match reports. It processes passes, shots, duels, fouls, player performances, and key match moments, then uses Gemini and Groq to generate fact-constrained tactical analysis with cached reports.",
    tech: [
      "React Native",
      "Expo",
      "Zustand",
      "Fastify",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Gemini",
      "Groq",
    ],
    liveUrl: "https://expo.dev/accounts/hemanthchakravarthy/projects/player-nation/builds/1378579e-bb30-4cad-a07a-199a8f5241db",
    githubUrl: "https://github.com/hemanth-chakravarthy/player-nation",
    image: playerNationImage,
  },
  {
    title: "Order Execution Engine",
    description: "A high-performance order execution engine for DEX trading with intelligent routing, real-time WebSocket updates, and concurrent order processing.",
    tech: ["Node.js", "TypeScript", "Fastify", "WebSockets", "Redis"],
    liveUrl: "https://order-execution-engine-production-2c02.up.railway.app/",
    githubUrl: "https://github.com/hemanth-chakravarthy/Order-execution-engine",
    image: orderExecutionImage,
  },
  {
    title: "PhotoSphere",
    description: "A personal photography portfolio platform where photographers showcase work through immersive, explorable photo spheres.",
    tech: ["TypeScript", "React", "Tailwind CSS", "PostgreSQL"],
    liveUrl: "https://photo-sphere-online.lovable.app/",
    githubUrl: "https://github.com/hemanth-chakravarthy/photo-shpere",
    image: photoSphereImage,
  },
  {
    title: "Air Quality Monitor",
    description: "A comprehensive web app for real-time air-quality monitoring and prediction, powered by Keras/TensorFlow models served through FastAPI.",
    tech: ["React", "TypeScript", "FastAPI", "Python", "TensorFlow", "Docker"],
    liveUrl: "",
    githubUrl: "https://github.com/hemanth-chakravarthy/Air-Quality-Monitoring",
    image: airQualityImage,
  },
  {
    title: "VoyageMate AI",
    description: "An agentic AI travel planner generating personalized itineraries and real-time insights via a ReAct-based LangGraph workflow.",
    tech: ["LangGraph", "FastAPI", "Python", "React"],
    liveUrl: "https://huggingface.co/spaces/imperialx04/VoyagemateAI",
    githubUrl: "https://github.com/hemanth-chakravarthy/voyagemate-ai",
    image: voyageMateImage,
  },
  {
    title: "Photography Chatbot",
    description: "An AI-powered personal photography advisor built with Next.js and the Groq API (Llama 3.3) for equipment and technique advice.",
    tech: ["Next.js", "Tailwind CSS", "Groq API", "Llama 3.3"],
    liveUrl: "https://photography-chatbot.vercel.app",
    githubUrl: "https://github.com/hemanth-chakravarthy/photography-chatbot",
    image: photoChatbotImage,
  },
  {
    title: "Smart Bookmark App",
    description: "A high-density digital knowledge archive built for speed, inspired by Obsidian's aesthetics and engineered for real-time sync.",
    tech: ["Next.js", "Tailwind CSS", "Supabase", "Vercel"],
    liveUrl: "https://smart-bookmark-app-pink-tau.vercel.app",
    githubUrl: "https://github.com/hemanth-chakravarthy/smart-bookmark-app",
    image: smartBookmarkImage,
  },
  {
    title: "TwinMind — Meeting Copilot",
    description: "A real-time AI meeting assistant performing live transcription, contextual reasoning, and intelligent augmentation with a secure BYOK architecture.",
    tech: ["Next.js", "TypeScript", "Groq API", "Zustand"],
    liveUrl: "https://live-ai-meeting-copilot.vercel.app",
    githubUrl: "https://github.com/hemanth-chakravarthy/live-ai-meeting-copilot",
    image: meetingCopilotImage,
  },
  {
    title: "Pygano — Steganography Tool",
    description: "A modular steganography suite hiding data inside images, audio, and text via LSB encoding, with a Python CLI and client-side web app.",
    tech: ["Python", "JavaScript", "Pillow", "Web Audio API"],
    liveUrl: "https://pygano-steganography-tool.vercel.app",
    githubUrl: "https://github.com/hemanth-chakravarthy/pygano-steganography-tool",
    image: pyganoImage,
  },
];

const LAYERS = ["Interface", "Logic", "Data", "Intelligence", "Delivery"] as const;

const TECH_META: Record<string, [string, string]> = {
  "React": ["Interface", "component UI"],
  "React Native": ["Interface", "mobile UI"],
  "Next.js": ["Interface", "SSR + routing"],
  "TypeScript": ["Interface", "typed contracts"],
  "JavaScript": ["Interface", "client logic"],
  "Tailwind CSS": ["Interface", "utility styling"],
  "Redux": ["Interface", "global store"],
  "Zustand": ["Interface", "lightweight state"],
  "Node.js": ["Logic", "server runtime"],
  "Fastify": ["Logic", "HTTP routing"],
  "FastAPI": ["Logic", "async python api"],
  "WebSockets": ["Logic", "live duplex feed"],
  "Python": ["Logic", "services & scripts"],
  "Web Audio API": ["Logic", "sample-level audio"],
  "Pillow": ["Logic", "pixel manipulation"],
  "MongoDB": ["Data", "document store"],
  "PostgreSQL": ["Data", "relational store"],
  "Redis": ["Data", "cache + queues"],
  "Supabase": ["Data", "auth + realtime db"],
  "Prisma": ["Data", "ORM layer"],
  "TensorFlow": ["Intelligence", "forecast models"],
  "LangGraph": ["Intelligence", "agent workflow"],
  "Groq API": ["Intelligence", "llm inference"],
  "Groq": ["Intelligence", "fast inference"],
  "Gemini": ["Intelligence", "multimodal AI"],
  "Llama 3.3": ["Intelligence", "reasoning model"],
  "Expo": ["Delivery", "managed runtime"],
  "Docker": ["Delivery", "containerized"],
  "Vercel": ["Delivery", "edge hosting"],
};

const THEMES = {
  dark: {
    bg: "#0c0f14",
    card: "#10141a",
    secondary: "#181e26",
    border: "rgba(255,255,255,0.08)",
    fg: "hsl(0,0%,96%)",
    muted: "hsl(220,10%,58%)",
    primary: "#23dec8",
  },
  light: {
    bg: "#ffffff",
    card: "#ffffff",
    secondary: "#f4f5f7",
    border: "hsl(220,14%,90%)",
    fg: "hsl(220,20%,12%)",
    muted: "hsl(220,10%,46%)",
    primary: "#1cb09f",
  },
};

const Projects: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;
  const t = isDark ? THEMES.dark : THEMES.light;

  const startAuto = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setHovered((currentHovered) => {
        if (currentHovered === null) {
          setActive((prev) => (prev + 1) % RAW_PROJECTS.length);
        }
        return currentHovered;
      });
    }, 4500);
  };

  useEffect(() => {
    startAuto();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const activeIdx = hovered !== null ? hovered : active;
  const raw = RAW_PROJECTS[activeIdx];

  const activeLayers = LAYERS.map((layerName) => {
    const items = raw.tech.filter((name) => (TECH_META[name] || ["Logic"])[0] === layerName);
    if (!items.length) return null;
    return {
      name: layerName,
      items: items.map((name) => ({
        name,
        role: (TECH_META[name] || ["", "supporting"])[1],
      })),
    };
  }).filter(Boolean) as { name: string; items: { name: string; role: string }[] }[];

  const techCountLabel = `${raw.tech.length} technologies · ${activeLayers.length} layers`;
  const numLabel = String(activeIdx + 1).padStart(2, "0");

  return (
    <section
      id="projects"
      style={{
        backgroundColor: t.bg,
        transition: "background 0.4s",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 py-16 md:py-20">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h2
            className="section-heading text-center"
            style={{
              margin: 0,
              color: t.fg,
            }}
          >
            Featured Projects<span style={{ color: t.primary }}>.</span>
          </h2>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] gap-10 lg:gap-12 items-start">
          {/* Left Column: Project Navigation List */}
          <div className="flex flex-col">
            {RAW_PROJECTS.map((project, i) => {
              const isActive = i === activeIdx;
              return (
                <div
                  key={project.title}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => {
                    setActive(i);
                    setHovered(null);
                    startAuto();
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "14px 10px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    background: isActive ? t.secondary : "transparent",
                    transition: "background 0.25s",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', monospace",
                      fontSize: "12px",
                      color: isActive ? t.primary : t.muted,
                      minWidth: "22px",
                      transition: "color 0.25s",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    style={{
                      flex: 1,
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 600,
                      fontSize: "15px",
                      color: isActive ? t.fg : t.muted,
                      transition: "color 0.25s",
                    }}
                  >
                    {project.title}
                  </span>
                  <span
                    style={{
                      color: t.primary,
                      opacity: isActive ? 1 : 0,
                      transition: "opacity 0.25s",
                      fontSize: "14px",
                    }}
                  >
                    →
                  </span>
                </div>
              );
            })}

            {/* Progress Bar */}
            <div
              style={{
                marginTop: "20px",
                height: "2px",
                borderRadius: "2px",
                background: t.border,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${((activeIdx + 1) / RAW_PROJECTS.length) * 100}%`,
                  background: t.primary,
                  transition: "width 0.4s ease",
                }}
              />
            </div>

            {/* Counter and Status */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
                fontFamily: "'Space Grotesk', monospace",
                fontSize: "11px",
                letterSpacing: "0.1em",
                color: t.muted,
              }}
            >
              <span>
                {numLabel} / {String(RAW_PROJECTS.length).padStart(2, "0")}
              </span>
              <span>AUTO-CYCLING</span>
            </div>
          </div>

          {/* Right Column: Preview Card */}
          <div
            key={raw.title}
            style={{
              background: t.card,
              border: `1px solid ${t.border}`,
              borderRadius: "20px",
              padding: "20px",
              animation: "proj-fade 0.4s ease",
            }}
          >
            {/* Visual Header Image with Big Number Watermark */}
            <div
              style={{
                position: "relative",
                height: "320px",
                overflow: "hidden",
                borderRadius: "16px",
                background: t.secondary,
              }}
            >
              <div
                role="img"
                aria-label={raw.title}
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${raw.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  top: "16px",
                  left: "20px",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "56px",
                  color: t.fg,
                  opacity: 0.08,
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                {numLabel}
              </span>
            </div>

            {/* Details Section */}
            <div style={{ padding: "32px 4px 4px" }}>
              <h3
                style={{
                  margin: "0 0 12px",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(22px, 3vw, 30px)",
                  color: t.fg,
                }}
              >
                {raw.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "15px",
                  lineHeight: 1.6,
                  color: t.muted,
                  maxWidth: "560px",
                }}
              >
                {raw.description}
              </p>

              {/* Architecture Stack Breakdown */}
              <div
                style={{
                  margin: "26px 0 28px",
                  padding: "20px 20px 22px",
                  borderRadius: "16px",
                  background: t.secondary,
                  border: `1px solid ${t.border}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "16px",
                    marginBottom: "18px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
                    <span
                      style={{
                        width: "18px",
                        height: "2px",
                        borderRadius: "2px",
                        background: t.primary,
                        flex: "none",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: t.fg,
                      }}
                    >
                      Architecture
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', monospace",
                      fontSize: "10.5px",
                      letterSpacing: "0.06em",
                      color: t.muted,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {techCountLabel}
                  </span>
                </div>

                {/* Layers & Technology Chips */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {activeLayers.map((layer, ci) => (
                    <div
                      key={layer.name}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "minmax(96px, auto) minmax(0, 1fr)",
                        gap: "18px",
                        alignItems: "start",
                        padding: "13px 0",
                        borderTop: ci === 0 ? "none" : `1px solid ${t.border}`,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "7px",
                          paddingTop: "7px",
                        }}
                      >
                        <span
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: t.primary,
                            flex: "none",
                          }}
                        />
                        <span
                          style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: "9.5px",
                            fontWeight: 700,
                            letterSpacing: "0.13em",
                            textTransform: "uppercase",
                            color: t.fg,
                            opacity: 0.72,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {layer.name}
                        </span>
                      </div>

                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", minWidth: 0 }}>
                        {layer.items.map((tech) => (
                          <div
                            key={tech.name}
                            className="transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "3px",
                              padding: "10px 12px 11px",
                              borderRadius: "11px",
                              background: t.card,
                              border: `1px solid ${t.border}`,
                              minWidth: 0,
                            }}
                          >
                            <span
                              style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: "13px",
                                fontWeight: 600,
                                color: t.fg,
                                lineHeight: 1.2,
                                letterSpacing: "-0.005em",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {tech.name}
                            </span>
                            <span
                              style={{
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: "11px",
                                fontWeight: 400,
                                letterSpacing: "0.01em",
                                color: t.muted,
                                lineHeight: 1.3,
                              }}
                            >
                              {tech.role}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                {raw.liveUrl ? (
                  <a
                    href={raw.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: "11px 22px",
                      borderRadius: "100px",
                      background: t.fg,
                      color: t.bg,
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "13.5px",
                      fontWeight: 600,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      transition: "opacity 0.2s",
                    }}
                    className="hover:opacity-90"
                  >
                    Live Demo ↗
                  </a>
                ) : null}
                <a
                  href={raw.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "11px 20px",
                    borderRadius: "100px",
                    border: `1px solid ${t.border}`,
                    color: t.muted,
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "13.5px",
                    fontWeight: 500,
                    textDecoration: "none",
                    transition: "color 0.2s, border-color 0.2s",
                  }}
                  className="hover:text-foreground hover:border-foreground"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;