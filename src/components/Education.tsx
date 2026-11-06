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
    tag: "Secondary Education",
    name: "Hyderabad Public School",
    location: "Begumpet, Hyderabad, Telangana",
    program: "Primary & Secondary Schooling",
    score: "ICSE",
    scoreLabel: "Curriculum",
    rangeStart: "2011",
    rangeEnd: "2020",
    tags: ["Foundation", "Leadership", "Academics"],
  },
  {
    year: "2020 — 2022",
    tag: "Intermediate",
    name: "Narayana Junior College",
    location: "Lingampally, Hyderabad, Telangana",
    program: "Senior Secondary · MPC (Maths, Physics, Chemistry)",
    score: "TSBIE",
    scoreLabel: "Board",
    rangeStart: "2020",
    rangeEnd: "2022",
    tags: ["MPC", "Problem Solving", "Competitive Prep"],
  },
  {
    year: "2022 — 2026",
    tag: "Undergraduate",
    name: "Indian Institute of Information Technology, Sri City",
    location: "Chittoor, Andhra Pradesh",
    program: "B.Tech — Computer Science & Engineering",
    score: "2026",
    scoreLabel: "Graduation",
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
          <span className="font-sans text-sm font-semibold text-primary">
            Education
          </span>
          <span className="flex-1 h-px bg-border" />
          <span className="font-sans text-sm text-muted-foreground">
            2011 — 2026
          </span>
        </div>

        {/* Big Impact Headline */}
        <h3 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl tracking-tight text-foreground leading-[1.05] mb-3 text-left">
          The<br />
          <span className="text-primary">Foundation.</span>
        </h3>
        <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-xl mb-12 sm:mb-16 text-left">
          From curiosity to building systems — three checkpoints, one trajectory.
        </p>

        {/* Interactive Timeline Track */}
        <div className="relative py-6 my-2">
          {/* Base Inactive Track Line (precisely between centers of dot 0 and dot 2) */}
          <div className="absolute top-[35px] left-[16.666%] right-[16.666%] h-[3px] bg-border rounded-full" />

          {/* Active Filled Track */}
          <div
            className="absolute top-[35px] left-[16.666%] right-[16.666%] h-[3px] rounded-full overflow-hidden pointer-events-none"
          >
            <div
              className="h-full bg-primary rounded-full transition-all duration-700 ease-out"
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
                      <span className="absolute w-8 h-8 rounded-full bg-primary/20 animate-ping pointer-events-none" />
                    )}

                    {/* Outer Ring / Shell */}
                    <div
                      className={`relative flex items-center justify-center rounded-full transition-all duration-300 ${
                        isActive
                          ? "w-8 h-8 sm:w-9 sm:h-9 bg-background border-2 border-primary ring-4 ring-primary/15 scale-110"
                          : isPast
                          ? "w-7 h-7 sm:w-7.5 sm:h-7.5 bg-background border-2 border-primary/80 group-hover:scale-105 group-hover:border-primary"
                          : "w-6 h-6 sm:w-7 sm:h-7 bg-card border-2 border-border group-hover:border-primary/60 group-hover:scale-105"
                      }`}
                    >
                      {/* Inner Core */}
                      <div
                        className={`rounded-full transition-all duration-300 ${
                          isActive
                            ? "w-3 h-3 sm:w-3.5 sm:h-3.5 bg-primary"
                            : isPast
                            ? "w-2.5 h-2.5 bg-primary/80"
                            : "w-2 h-2 bg-muted-foreground/30 group-hover:bg-primary/50"
                        }`}
                      />
                    </div>

                    {/* Index Watermark above dot */}
                    <span
                      className={`absolute -top-4 font-sans text-[11px] font-bold transition-all duration-200 ${
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
                    className={`mt-2 px-3 py-1 rounded-md font-sans text-xs font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-primary/15 text-primary border border-primary/30"
                        : "bg-secondary text-muted-foreground border border-border group-hover:border-primary/30 group-hover:text-foreground"
                    }`}
                  >
                    {stage.year}
                  </div>

                  {/* Institution Name */}
                  <span
                    className={`mt-2 font-display font-semibold text-xs sm:text-sm md:text-base leading-snug max-w-[140px] sm:max-w-[200px] transition-colors duration-200 ${
                      isActive
                        ? "text-foreground font-bold"
                        : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    {stage.name}
                  </span>

                  {/* Program Subtitle */}
                  <span className="hidden sm:block text-xs text-muted-foreground mt-1 max-w-[180px] line-clamp-2">
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
            className="mt-8 sm:mt-12 p-6 sm:p-8 md:p-10 rounded-2xl bg-card border border-border shadow-card text-left"
          >
            <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-8 items-start">
              {/* Institution & Location details */}
              <div className="flex-1 min-w-[220px]">
                <div className="font-sans text-xs text-primary font-semibold mb-2">
                  {activeStage.tag}
                </div>
                <h4 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-foreground leading-tight">
                  {activeStage.name}
                </h4>
                <p className="text-sm sm:text-base text-primary font-medium mt-1">
                  {activeStage.location}
                </p>
                <p className="text-sm sm:text-base text-muted-foreground mt-2">
                  {activeStage.program}
                </p>
              </div>

              {/* Range & Board/Graduation info */}
              <div className="min-w-[180px]">
                <div className="flex items-center gap-2 font-sans text-xs text-muted-foreground">
                  <span>{activeStage.rangeStart}</span>
                  <span className="flex-1 h-px bg-border min-w-[40px]" />
                  <span>{activeStage.rangeEnd}</span>
                </div>
                <div className="mt-4 font-sans text-xs text-muted-foreground">
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
                      className="px-3 py-1.5 rounded-md bg-secondary border border-border text-xs font-medium text-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Education Log & Status Banner */}
        <div className="flex flex-col lg:flex-row justify-between items-stretch gap-6 mt-12 sm:mt-16 pt-8 border-t border-border/40">
          {/* Terminal Block */}
          <div className="w-full lg:max-w-md rounded-xl bg-card border border-border overflow-hidden shadow-card text-left">
            {/* Window Controls Header */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-secondary border-b border-border">
              <span className="w-2.5 h-2.5 rounded-full bg-[#e0605a]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#e0b95a]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#5ac98a]" />
              <span className="ml-2 font-sans text-xs font-medium text-muted-foreground">
                education.log
              </span>
            </div>

            {/* Log Body */}
            <div className="p-4 sm:p-5 font-sans text-xs sm:text-[13px] leading-relaxed text-foreground overflow-x-auto">
              <div className="text-muted-foreground mb-3">Academic Timeline</div>
              
              <div className="space-y-3">
                <div>
                  <span className="text-primary font-semibold">[2011 – 2020]</span> Secondary Education
                  <div className="text-muted-foreground pl-3 border-l border-border ml-2 mt-0.5">
                    Hyderabad Public School, Begumpet · Telangana
                  </div>
                </div>

                <div>
                  <span className="text-primary font-semibold">[2020 – 2022]</span> Intermediate
                  <div className="text-muted-foreground pl-3 border-l border-border ml-2 mt-0.5">
                    Narayana Junior College, Lingampally · MPC
                  </div>
                </div>

                <div>
                  <span className="text-primary font-semibold">[2022 – 2026]</span> Undergraduate
                  <div className="text-muted-foreground pl-3 border-l border-border ml-2 mt-0.5">
                    IIIT Sri City, Chittoor · B.Tech CSE
                  </div>
                </div>

                <div className="pt-1">
                  <span className="text-primary font-semibold">[2026]</span> Status
                  <div className="pl-3 border-l border-border ml-2 mt-0.5">
                    <span className="text-primary font-semibold">Graduating · Full-Stack & Applied AI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Status Punchline Statement */}
          <div className="flex flex-col justify-center items-start lg:items-end text-left lg:text-right py-2">
            <div className="font-sans text-sm text-muted-foreground mb-2">
              2022 – 2026 · B.Tech CSE · IIIT Sri City
            </div>
            <div className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight">
              Knowledge built.<br />
              <span className="text-primary">Now building systems.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
