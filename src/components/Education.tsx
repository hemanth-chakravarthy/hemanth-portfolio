import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EducationStage {
  year: string;
  tag: string;
  name: string;
  location: string;
  program: string;
  score: string;
  scoreLabel: string;
  rangeStart: string;
  rangeEnd: string;
  tags?: string[];
}

const STAGES: EducationStage[] = [
  {
    year: "2011 — 2020",
    tag: "SECONDARY_EDUCATION",
    name: "Hyderabad Public School",
    location: "Begumpet, Hyderabad, Telangana",
    program: "Primary & Secondary Schooling",
    score: "ICSE",
    scoreLabel: "CURRICULUM",
    rangeStart: "2011",
    rangeEnd: "2020",
    tags: ["Foundation", "Leadership", "Academics"],
  },
  {
    year: "2020 — 2022",
    tag: "INTERMEDIATE",
    name: "Narayana Junior College",
    location: "Lingampally, Hyderabad, Telangana",
    program: "Senior Secondary · MPC (Maths, Physics, Chemistry)",
    score: "TSBIE",
    scoreLabel: "BOARD",
    rangeStart: "2020",
    rangeEnd: "2022",
    tags: ["MPC", "Problem Solving", "Competitive Prep"],
  },
  {
    year: "2022 — 2026",
    tag: "UNDERGRADUATE",
    name: "Indian Institute of Information Technology, Sri City",
    location: "Chittoor, Andhra Pradesh",
    program: "B.Tech — Computer Science & Engineering",
    score: "2026",
    scoreLabel: "GRADUATION",
    rangeStart: "2022",
    rangeEnd: "2026",
    tags: ["Full Stack", "Distributed Systems", "Applied AI / ML"],
  },
];

const Education = () => {
  const [active, setActive] = useState(2);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const activeStage = STAGES[active];

  return (
    <section className="relative w-full mt-24 pt-16 border-t border-border/40 overflow-hidden">
      {/* Subtle Background Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10"
        style={{
          backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        {/* Top Eyebrow Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">
            EDUCATION
          </span>
          <span className="flex-1 h-px bg-gradient-to-r from-primary/50 to-border/20" />
          <span className="font-mono text-xs tracking-wider text-muted-foreground">
            2011 — 2026
          </span>
        </div>

        {/* Big Impact Headline */}
        <h3 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl tracking-tight text-foreground leading-[1.05] mb-3 text-left">
          THE<br />
          <span className="gradient-text">FOUNDATION.</span>
        </h3>
        <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-xl mb-12 sm:mb-16 text-left">
          From curiosity to building systems — three checkpoints, one trajectory.
        </p>

        {/* Interactive Timeline Track */}
        <div className="relative py-6 my-2">
          {/* Base Inactive Track Line (precisely between centers of dot 0 and dot 2) */}
          <div className="absolute top-[35px] left-[16.666%] right-[16.666%] h-[3px] bg-border/50 rounded-full" />

          {/* Active Gradient Filled Track */}
          <div
            className="absolute top-[35px] left-[16.666%] right-[16.666%] h-[3px] rounded-full overflow-hidden pointer-events-none"
          >
            <div
              className="h-full bg-gradient-to-r from-primary via-cyan-400 to-primary rounded-full transition-all duration-700 ease-out shadow-[0_0_14px_rgba(35,222,200,0.6)]"
              style={{
                width: mounted
                  ? active === 0
                    ? "0%"
                    : active === 1
                    ? "50%"
                    : "100%"
                  : "0%",
              }}
            />
          </div>

          {/* Timeline Nodes (3-Column Grid matching 16.666%, 50%, 83.333% centers) */}
          <div className="relative grid grid-cols-3 gap-2 sm:gap-4 z-10">
            {STAGES.map((stage, i) => {
              const isActive = i === active;
              const isPast = i < active;

              return (
                <div
                  key={stage.tag}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className="flex flex-col items-center text-center cursor-pointer group transition-all duration-300 px-1 sm:px-2"
                >
                  {/* Node Dot Container */}
                  <div className="relative flex items-center justify-center w-12 h-[22px] my-[13px]">
                    {/* Active Pulse Animation Ring */}
                    {isActive && (
                      <span className="absolute w-8 h-8 rounded-full bg-primary/25 animate-ping pointer-events-none" />
                    )}

                    {/* Outer Ring / Shell */}
                    <div
                      className={`relative flex items-center justify-center rounded-full transition-all duration-300 ${
                        isActive
                          ? "w-8 h-8 sm:w-9 sm:h-9 bg-background border-2 border-primary shadow-[0_0_16px_rgba(35,222,200,0.5)] ring-4 ring-primary/20 scale-110"
                          : isPast
                          ? "w-7 h-7 sm:w-7.5 sm:h-7.5 bg-background border-2 border-primary/80 shadow-[0_0_10px_rgba(35,222,200,0.3)] group-hover:scale-105 group-hover:border-primary"
                          : "w-6 h-6 sm:w-7 sm:h-7 bg-card border-2 border-border/70 group-hover:border-primary/60 group-hover:scale-105"
                      }`}
                    >
                      {/* Inner Glowing Core */}
                      <div
                        className={`rounded-full transition-all duration-300 ${
                          isActive
                            ? "w-3 h-3 sm:w-3.5 sm:h-3.5 bg-primary shadow-[0_0_8px_#23dec8]"
                            : isPast
                            ? "w-2.5 h-2.5 bg-primary/80"
                            : "w-2 h-2 bg-muted-foreground/30 group-hover:bg-primary/50"
                        }`}
                      />
                    </div>

                    {/* Index Watermark above dot */}
                    <span
                      className={`absolute -top-4 font-mono text-[10px] font-bold tracking-widest transition-all duration-200 ${
                        isActive
                          ? "text-primary opacity-100 -translate-y-0.5"
                          : "text-muted-foreground/40 opacity-0 group-hover:opacity-100 group-hover:-translate-y-0.5"
                      }`}
                    >
                      0{i + 1}
                    </span>
                  </div>

                  {/* Year Tag Badge */}
                  <div
                    className={`mt-2 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full font-mono text-[11px] sm:text-xs font-semibold tracking-wider transition-all duration-300 ${
                      isActive
                        ? "bg-primary/15 text-primary border border-primary/30 shadow-[0_0_10px_rgba(35,222,200,0.15)]"
                        : "bg-secondary/60 text-muted-foreground border border-border/40 group-hover:border-primary/30 group-hover:text-foreground"
                    }`}
                  >
                    {stage.year}
                  </div>

                  {/* Institution Name */}
                  <span
                    className={`mt-2 font-display font-semibold text-xs sm:text-sm md:text-base leading-snug max-w-[140px] sm:max-w-[200px] transition-colors duration-200 ${
                      isActive
                        ? "text-foreground font-bold"
                        : "text-muted-foreground/80 group-hover:text-foreground"
                    }`}
                  >
                    {stage.name}
                  </span>

                  {/* Program Subtitle */}
                  <span className="hidden sm:block text-[11px] sm:text-xs text-muted-foreground mt-1 max-w-[180px] line-clamp-2">
                    {stage.program}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Detail Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="mt-8 sm:mt-12 p-6 sm:p-8 md:p-10 rounded-2xl bg-card/60 backdrop-blur-xl border border-border shadow-card dark:bg-card/40 text-left"
          >
            <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-8 items-start">
              {/* Institution & Location details */}
              <div className="flex-1 min-w-[220px]">
                <div className="font-mono text-xs tracking-wider text-primary font-semibold mb-2 uppercase">
                  {activeStage.tag.replace(/_/g, " ")}
                </div>
                <h4 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-foreground leading-tight">
                  {activeStage.name}
                </h4>
                <p className="text-sm sm:text-base text-primary/80 font-medium mt-1">
                  {activeStage.location}
                </p>
                <p className="text-sm sm:text-base text-muted-foreground mt-2">
                  {activeStage.program}
                </p>
              </div>

              {/* Range & Board/Graduation info */}
              <div className="min-w-[180px]">
                <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                  <span>{activeStage.rangeStart}</span>
                  <span className="flex-1 h-px bg-border min-w-[40px]" />
                  <span>{activeStage.rangeEnd}</span>
                </div>
                <div className="mt-4 font-mono text-xs tracking-wider text-muted-foreground/70 uppercase">
                  {activeStage.scoreLabel}
                </div>
                <div className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-primary mt-1">
                  {activeStage.score}
                </div>
              </div>

              {/* Tags */}
              {activeStage.tags && (
                <div className="flex flex-wrap gap-2 items-end max-w-xs">
                  {activeStage.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-full bg-secondary/80 border border-border/50 text-xs font-medium text-foreground/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Education Terminal Log & Status Banner */}
        <div className="flex flex-col lg:flex-row justify-between items-stretch gap-6 mt-12 sm:mt-16 pt-8 border-t border-border/40">
          {/* Terminal Block */}
          <div className="w-full lg:max-w-md rounded-xl bg-[#0c0f14] border border-border/40 overflow-hidden shadow-2xl text-left">
            {/* Window Controls Header */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-secondary/20 border-b border-white/5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#e0605a]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#e0b95a]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#5ac98a]" />
              <span className="ml-2 font-mono text-xs text-muted-foreground">
                education.log
              </span>
            </div>

            {/* Terminal Body */}
            <div className="p-4 sm:p-5 font-mono text-xs sm:text-[12.5px] leading-relaxed text-emerald-300/80 overflow-x-auto">
              <div className="text-muted-foreground mb-3">$ cat education.log</div>
              
              <div className="space-y-3">
                <div>
                  <span className="text-primary font-semibold">[2011 - 2020]</span> SECONDARY_EDUCATION
                  <div className="text-muted-foreground pl-3 border-l border-border/30 ml-2 mt-0.5">
                    └─ Hyderabad Public School, Begumpet<br />
                    &nbsp;&nbsp;&nbsp;Telangana
                  </div>
                </div>

                <div>
                  <span className="text-primary font-semibold">[2020 - 2022]</span> INTERMEDIATE
                  <div className="text-muted-foreground pl-3 border-l border-border/30 ml-2 mt-0.5">
                    └─ Narayana Junior College, Lingampally<br />
                    &nbsp;&nbsp;&nbsp;MPC · Telangana
                  </div>
                </div>

                <div>
                  <span className="text-primary font-semibold">[2022 - 2026]</span> UNDERGRADUATE
                  <div className="text-muted-foreground pl-3 border-l border-border/30 ml-2 mt-0.5">
                    └─ IIIT Sri City, Chittoor<br />
                    &nbsp;&nbsp;&nbsp;B.Tech — CSE · Andhra Pradesh
                  </div>
                </div>

                <div className="pt-1">
                  <span className="text-primary font-semibold">[2026]</span> STATUS
                  <div className="pl-3 border-l border-border/30 ml-2 mt-0.5">
                    └─ <span className="text-emerald-400 font-semibold">GRADUATING · FULL-STACK & AI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Status Punchline Statement */}
          <div className="flex flex-col justify-center items-start lg:items-end text-left lg:text-right py-2">
            <div className="font-mono text-xs tracking-wider text-muted-foreground uppercase mb-2">
              2022 - 2026 · B.TECH CSE · IIIT SRI CITY
            </div>
            <div className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight">
              KNOWLEDGE BUILT.<br />
              <span className="text-primary">NOW BUILDING SYSTEMS.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
