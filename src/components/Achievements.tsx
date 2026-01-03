import { Trophy, Award, Star, Medal } from "lucide-react";

const Achievements = () => {
  const achievements = [
    {
      icon: Trophy,
      title: "Scene and Strategy Hackathon Winner",
      description: "Secured first place in an institute-level hackathon. Created and edited a promotional video that achieved 1st place among 20+ submissions for creativity and compelling brand messaging.",
      year: "2024",
    },
    {
      icon: Award,
      title: "Certified Meta Full Stack Developer",
      description: "Completed Meta's rigorous Full Stack Developer certification, mastering front-end and back-end technologies, database management, and deployment strategies.",
      year: "2025",
    },
  ];

  return (
    <section id="achievements" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-16">
          Achievements<span className="text-primary">.</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="group bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <achievement.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {achievement.title}
                    </h3>
                    <span className="text-sm text-muted-foreground">
                      {achievement.year}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
