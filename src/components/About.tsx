const About = () => {
const techStack = [
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "GraphQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "Photoshop", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" },
  { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
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
              I’m <strong className="text-foreground">Hemanth Chakravarthy Kancharla</strong>, a Computer Science undergraduate 
              with a strong interest in building <strong className="text-foreground">scalable, user-focused web applications</strong>. 
              I enjoy working across the stack designing clean interfaces, building reliable APIs, and connecting everything 
              into systems that feel fast, intuitive, and purposeful.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              My work spans frontend engineering, backend development, and applied problem-solving, with hands-on experience 
              in React, TypeScript, Node.js, and modern tooling. I care deeply about performance, clean architecture, and 
              thoughtful UX focusing on details that turn functional products into polished experiences.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              I’m always learning, building, and refining my craft, and I enjoy collaborating on meaningful projects that 
              push both technical and creative boundaries. If you’d like to discuss an idea, project, or opportunity, feel 
              free to{" "}
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
      </div>
    </section>
  );
};

export default About;