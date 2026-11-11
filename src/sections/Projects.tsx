import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SectionHeading } from "@/components/SectionHeading";
import { useScrollReveal } from "@/lib/motion";

export default function Projects() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  useScrollReveal(sectionRef);

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

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-20 sm:py-24 lg:py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div
        aria-hidden="true"
        className="orb orb-blue top-1/3 -right-24 w-[700px] h-[700px] [--orb-alpha:0.08]"
      />
      <div
        aria-hidden="true"
        className="orb orb-cyan bottom-1/3 -left-20 w-[560px] h-[560px] [--orb-alpha:0.08]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={t("projects.badge")}
          title={t("projects.title")}
          accent={t("projects.titleAccent")}
          subtitle={t("projects.subtitle")}
        />

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <article
              key={project.id}
              data-reveal
              className={`group relative rounded-2xl overflow-hidden ${
                index === 0 ? "lg:col-span-2" : ""
              }`}
            >
              {/* Glass container */}
              <div className="h-full glass rounded-2xl overflow-hidden hover:bg-[#111827]/90 hover:border-[#3b82f6]/30 transition-colors duration-300">
                {/* Image container */}
                <div
                  className={`relative overflow-hidden ${
                    index === 0 ? "h-64 lg:h-80" : "h-56"
                  }`}
                >
                  <img
                    src={project.image}
                    alt=""
                    width={1248}
                    height={832}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
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
                  <div className="absolute inset-0 bg-[#0a0f1c]/80 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 ease-out flex items-center justify-center gap-4">
                    {project.inDevelopment ? (
                      <span className="text-white font-medium px-4 py-2 glass glass-blur rounded-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out-quint">
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
                            <Github className="w-4 h-4 mr-2" aria-hidden="true" />
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
                            <ExternalLink className="w-4 h-4 mr-2" aria-hidden="true" />
                            {t("projects.demo")}
                          </a>
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-xl lg:text-2xl font-bold text-white group-hover:text-gradient transition-colors">
                      {project.title}
                    </h3>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="w-5 h-5 flex-shrink-0 mt-1 text-gray-400 group-hover:text-[#3b82f6] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-[color,transform] duration-300 ease-out-quint"
                    />
                  </div>

                  <p className="text-gray-400 leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-lg bg-[#1e293b] text-xs text-gray-300 hover:bg-[#3b82f6]/20 hover:text-white transition-colors duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View all projects CTA */}
        <div data-reveal className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="h-12 border-gray-600 bg-transparent text-white hover:bg-white/10 hover:text-white hover:border-gray-400 px-8"
            asChild
          >
            <a
              href="https://github.com/leomoyano"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5 mr-2" aria-hidden="true" />
              {t("projects.githubCTA")}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
