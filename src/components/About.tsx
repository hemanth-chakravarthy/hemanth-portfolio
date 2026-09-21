import Education from "./Education";

const About = () => {
const techStack = [
  // Languages
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },

  // Frontend
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Redux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
  { name: "Zustand", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
  { name: "Vite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" },

  // Backend
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "Fastify", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastify/fastify-original.svg" },
  { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  { name: "REST API", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "WebSockets", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg" },
  { name: "Swagger", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swagger/swagger-original.svg" },

  // Databases
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
  { name: "Supabase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" },
  { name: "Prisma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" },

  // AI / ML
  { name: "LangChain", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "LangGraph", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Qdrant", icon: "https://cdn.simpleicons.org/qdrant/DC382D" },
  { name: "Hugging Face", icon: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg" },
  { name: "Gemini", icon: "https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-svg/icons/gemini-color.svg" },
  { name: "Groq", icon: "https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-svg/icons/groq.svg" },
  { name: "OpenAI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/openapi/openapi-original.svg" },
  { name: "Claude", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/anthropic/anthropic-original.svg" },
  { name: "LSTM", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "XGBoost", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "LightGBM", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Random Forest", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },

  // Cloud / DevOps
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Docker Compose", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "GitHub Actions", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg" },
  { name: "Railway", icon: "https://railway.app/brand/logo-light.svg" },
  { name: "Render", icon: "https://cdn.simpleicons.org/render/46E3B7" },
  { name: "Netlify", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg" },
  { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },

  // Tools
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Photoshop", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" },
];

  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Centered heading */}
        <h2 className="section-heading text-center mb-12">
          About Me<span className="text-primary">.</span>
        </h2>

        {/* Centered content container */}
<div className="flex flex-col items-center">
  {/* Centered content with max width */}
  <div className="max-w-3xl text-center">
    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
      I’m <strong className="text-foreground">Hemanth Chakravarthy Kancharla</strong>, a{" "}
      <strong className="text-foreground">2026 Computer Science graduate</strong> and AI Engineer Intern
      with a strong interest in building <strong className="text-foreground">scalable, intelligent, and user-focused applications</strong>.
      I enjoy working across the stack — from designing clean interfaces and reliable APIs to building
      AI-powered systems that solve real-world problems.
    </p>

    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
      My work spans <strong className="text-foreground">full-stack development, backend engineering, and applied AI</strong>,
      with hands-on experience in React, TypeScript, Node.js, Fastify, PostgreSQL, MongoDB, and modern
      AI/LLM tooling. I’ve built everything from full-stack platforms and backend systems to AI-powered
      document intelligence and football analytics applications. I care about clean architecture,
      performance, and creating experiences that feel simple despite the complexity underneath.
    </p>

    <p className="text-lg text-muted-foreground leading-relaxed mb-12">
      I’m always learning, building, and experimenting with new technologies. I enjoy turning ideas into
      working products and exploring the intersection of{" "}
      <strong className="text-foreground">software engineering, AI, and product design</strong>.
      If you’d like to discuss an idea, project, or opportunity, feel free to{" "}
      <a href="#contact" className="text-primary hover:underline font-medium">
        reach out!
      </a>
    </p>
  </div>

          {/* Centered Tech Stack */}
          <div className="mt-16 w-full max-w-4xl">
            <h3 className="text-xl font-display font-semibold mb-8 text-center">My Tech Stack<span className="text-primary">.</span></h3>
            <div className="flex flex-wrap justify-center gap-3">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className="tech-badge"
                >
                  <img src={tech.icon} alt={tech.name} className="w-5 h-5" />
                  {tech.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Education Timeline Section */}
        <Education />
      </div>
    </section>
  );
};

export default About;