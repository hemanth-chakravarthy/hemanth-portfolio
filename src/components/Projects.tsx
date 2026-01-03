import { ExternalLink, Github } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      number: "1",
      title: "EchoVoyage",
      description:
        "EchoVoyage is a travel website that offers personalized trip planning and booking services. It features interactive maps, destination guides, and user reviews to help travelers create unforgettable experiences.",
      tech: ["React", "Redux", "Node.js", "MongoDB"],
      liveUrl: "https://echo-voyage.vercel.app/",
      githubUrl: "https://github.com/hemanth-chakravarthy/EchoVoyages",
      image: "src/assets/EchoVoyage.png",
    },
    {
      number: "2",
      title: "PhotoSphere",
      description:
        "PhotoSphere is a personal photography portfolio platform that allows photographers to showcase their work. Users can explore immersive photo spheres and connect with photographers for collaborations.",
      tech: [ "Typescript", "React", "Tailwind CSS", "PostgreSQL"],
      liveUrl: "https://photo-sphere-online.lovable.app/",
      githubUrl: "https://github.com/hemanth-chakravarthy/photo-shpere",
      image: "src/assets/PhotoSphere.png",
    },
    {
      number: "3",
      title: "Order Execution Engine",
      description:
        "A high-performance order execution engine for DEX trading with intelligent routing, real-time WebSocket updates, and concurrent order processing.",
      tech: ["Node.js", "TypeScript", "Fastify", "WebSockets", "BullMQ", "Redis"],
        liveUrl: "https://order-execution-engine-production-2c02.up.railway.app/",
      githubUrl: "https://github.com/hemanth-chakravarthy/Order-execution-engine",
      image: "src/assets/Order Execution.png",
    },
  ];

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="section-heading mb-16 text-center">
          Projects<span className="text-primary">.</span>
        </h2>

        <div className="space-y-32">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-12 items-center`}
            >
              {/* Project Image */}
              <div className="lg:w-1/2">
                <div className="project-card p-4 bg-secondary/50">
                  <div className="relative rounded-xl overflow-hidden aspect-video">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="lg:w-1/2">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-6xl font-display font-bold text-primary/20">
                    #{project.number}
                  </span>
                  <h3 className="text-3xl font-display font-bold">{project.title}</h3>
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-medium text-sm transition-all duration-300 hover:border-primary hover:text-primary"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
