import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: t("projects.items.sumar.title"),
      description: t("projects.items.sumar.description"),
      image: "/project1.jpg",
      technologies: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Zustand",
        "Chart.js",
      ],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
      inDevelopment: true,
    },
    {
      id: 2,
      title: t("projects.items.cinema.title"),
      description: t("projects.items.cinema.description"),
      image: "/project2.jpg",
      technologies: [
        "Next.js",
        "TypeScript",
        "Prisma",
        "PostgreSQL",
        "Shadcn UI",
      ],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
      inDevelopment: true,
    },
    {
      id: 3,
      title: t("projects.items.cvanalyzer.title"),
      description: t("projects.items.cvanalyzer.description"),
      image: "/project3.jpg",
      technologies: ["Next.js", "OpenAI API", "Zod", "Framer Motion"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
      inDevelopment: true,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Project cards animation
      const cards = projectsRef.current?.querySelectorAll(".project-card");
      cards?.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 80,
          scale: 0.95,
          duration: 0.8,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#3b82f6]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-[#06b6d4]/5 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-[#3b82f6] uppercase tracking-wider mb-3">
            {t("projects.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t("projects.title")}{" "}
            <span className="text-gradient">{t("projects.titleAccent")}</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] mx-auto rounded-full" />
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            {t("projects.subtitle")}
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={projectsRef} className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card group relative rounded-2xl overflow-hidden ${
                index === 0 ? "lg:col-span-2" : ""
              }`}
            >
              {/* Glass container */}
              <div className="glass rounded-2xl overflow-hidden hover:bg-[#111827]/90 transition-all duration-500">
                {/* Image container */}
                <div
                  className={`relative overflow-hidden ${
                    index === 0 ? "h-64 lg:h-80" : "h-56"
                  }`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-[#0a0f1c]/50 to-transparent opacity-80" />

                  {/* Featured & In Development badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {project.featured && !project.inDevelopment && (
                      <div className="px-3 py-1 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] text-white text-xs font-medium">
                        {t("projects.featured")}
                      </div>
                    )}
                    {project.inDevelopment && (
                      <div className="px-3 py-1 rounded-full bg-orange-500/90 text-white text-xs font-medium backdrop-blur-sm">
                        {t("projects.inDevelopmentBadge")}
                      </div>
                    )}
                  </div>

                  {/* Hover overlay with actions */}
                  <div className="absolute inset-0 bg-[#0a0f1c]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
                    {project.inDevelopment ? (
                      <span className="text-white font-medium px-4 py-2 glass rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        {t("projects.comingSoon")}
                      </span>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-white/30 text-white hover:bg-white/10"
                          asChild
                        >
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="w-4 h-4 mr-2" />
                            {t("projects.code")}
                          </a>
                        </Button>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] text-white"
                          asChild
                        >
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            {t("projects.demo")}
                          </a>
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl lg:text-2xl font-bold text-white group-hover:text-gradient transition-colors">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-[#3b82f6] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>

                  <p className="text-gray-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-lg bg-[#1e293b] text-xs text-gray-300 hover:bg-[#3b82f6]/20 hover:text-white transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all projects CTA */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-gray-600 text-white hover:bg-white/10 px-8"
            asChild
          >
            <a
              href="https://github.com/leomoyano"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5 mr-2" />
              {t("projects.githubCTA")}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
