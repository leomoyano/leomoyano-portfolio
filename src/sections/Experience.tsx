import { useRef } from "react";
import { Briefcase, Calendar, MapPin, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SectionHeading } from "@/components/SectionHeading";
import { MOTION_OK, gsap, useGSAP, useScrollReveal } from "@/lib/motion";

export default function Experience() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useScrollReveal(sectionRef);

  const experiences = [
    {
      id: 1,
      role: t("experience.jobs.jbk.role"),
      company: "JBK",
      location: `San Miguel de Tucumán, Argentina (${t("experience.remote")})`,
      period: `${t("experience.months.apr")} 2026 - ${t("experience.present")}`,
      description: t("experience.jobs.jbk.description"),
      achievements: t("experience.jobs.jbk.achievements", {
        returnObjects: true,
      }) as string[],
      technologies: [
        "TypeScript",
        "React",
        "React Router",
        "Node.js",
        "Tailwind CSS",
        "Microsoft Azure",
        "Anthropic Claude",
        "Agentic Workflows",
      ],
    },
    {
      id: 2,
      role: t("experience.jobs.finalis.role"),
      company: "Finalis",
      location: `San Francisco, CA, USA (${t("experience.remote")})`,
      period: "Nov 2022 - Mar 2026",
      description: t("experience.jobs.finalis.description"),
      achievements: t("experience.jobs.finalis.achievements", {
        returnObjects: true,
      }) as string[],
      technologies: [
        "React",
        "TypeScript",
        "NextJs",
        "Chakra UI",
        "GraphQL",
        "Docker",
      ],
    },
    {
      id: 3,
      role: t("experience.jobs.fuzzy.role"),
      company: "The Fuzzy Fish - Digital Works",
      location: `Córdoba, Argentina (${t("experience.remote")})`,
      period: `${t("experience.months.dec")} 2020 - Nov 2022`,
      description: t("experience.jobs.fuzzy.description"),
      achievements: t("experience.jobs.fuzzy.achievements", {
        returnObjects: true,
      }) as string[],
      technologies: [
        "React",
        "TypeScript",
        "Styled Components",
        "Redux Toolkit",
      ],
    },
    {
      id: 4,
      role: t("experience.jobs.rolling.role"),
      company: "RollingCode School",
      location: "Tucumán, Argentina",
      period: `${t("experience.months.jan")} 2020 - Feb 2021`,
      description: t("experience.jobs.rolling.description"),
      achievements: t("experience.jobs.rolling.achievements", {
        returnObjects: true,
      }) as string[],
      technologies: ["JavaScript", "React", "HTML/CSS", "Bootstrap"],
    },
    {
      id: 5,
      role: t("experience.jobs.panacea.role"),
      company: "Panacea Soft",
      location: "Tucumán, Argentina",
      period: `Sep 2019 - ${t("experience.months.jan")} 2020`,
      description: t("experience.jobs.panacea.description"),
      achievements: t("experience.jobs.panacea.achievements", {
        returnObjects: true,
      }) as string[],
      technologies: ["JavaScript", "React", "HTML/CSS", "Material UI"],
    },
  ];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        // The gradient line is drawn as the reader scrolls through the timeline.
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 75%",
              end: "bottom 65%",
              scrub: 0.5,
            },
          },
        );

        // Each dot pops in as the line reaches it.
        gsap.utils.toArray<HTMLElement>(".timeline-dot").forEach((dot) => {
          gsap.from(dot, {
            scale: 0.4,
            opacity: 0,
            duration: 0.5,
            ease: "back.out(2.5)",
            scrollTrigger: { trigger: dot, start: "top 75%", once: true },
          });
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-20 sm:py-24 lg:py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div
        aria-hidden="true"
        className="orb orb-blue top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] [--orb-alpha:0.07]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={t("experience.badge")}
          title={t("experience.title")}
          accent={t("experience.titleAccent")}
          subtitle={t("experience.subtitle")}
        />

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Track + progress line: left rail on mobile, centered on lg */}
          <div
            aria-hidden="true"
            className="absolute left-4 sm:left-6 lg:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 rounded-full bg-[#1e293b]"
          >
            <div
              ref={lineRef}
              className="h-full w-full origin-top rounded-full bg-gradient-to-b from-[#3b82f6] to-[#06b6d4]"
            />
          </div>

          {/* Experience items */}
          <ol className="space-y-8 sm:space-y-12 lg:space-y-0">
            {experiences.map((exp, index) => (
              <li
                key={exp.id}
                className={`relative lg:grid lg:grid-cols-2 lg:gap-8 ${
                  index !== experiences.length - 1 ? "lg:pb-16" : ""
                }`}
              >
                {/* Timeline dot */}
                <div
                  aria-hidden="true"
                  className="absolute left-4 sm:left-6 lg:left-1/2 top-6 z-10 -translate-x-1/2"
                >
                  <div className="timeline-dot w-4 h-4 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] ring-4 ring-[#0a0f1c] shadow-[0_0_12px_rgba(59,130,246,0.6)]" />
                </div>

                {/* Content */}
                <div
                  data-reveal={index % 2 === 0 ? "left" : "right"}
                  className={`ml-10 sm:ml-16 lg:ml-0 ${
                    index % 2 === 0
                      ? "lg:pr-16 lg:text-right"
                      : "lg:col-start-2 lg:pl-16"
                  }`}
                >
                  <div className="glass rounded-2xl p-5 sm:p-6 hover:bg-[#111827]/90 hover:border-[#3b82f6]/30 transition-colors duration-300 group">
                    {/* Header */}
                    <div
                      className={`flex flex-wrap items-center gap-3 mb-4 ${
                        index % 2 === 0 ? "lg:justify-end" : ""
                      }`}
                    >
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#3b82f6]/20 text-[#3b82f6] text-sm">
                        <Calendar className="w-3 h-3" aria-hidden="true" />
                        {exp.period}
                      </span>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#06b6d4]/20 text-[#06b6d4] text-sm">
                        <MapPin className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                        {exp.location}
                      </span>
                    </div>

                    {/* Role & Company */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-white group-hover:text-gradient transition-colors">
                        {exp.role}
                      </h3>
                      <div
                        className={`flex items-center gap-2 text-gray-400 mt-1 ${
                          index % 2 === 0 ? "lg:justify-end" : ""
                        }`}
                      >
                        <Briefcase className="w-4 h-4" aria-hidden="true" />
                        <span>{exp.company}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 mb-4 leading-relaxed text-pretty">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <div className="mb-4">
                      <ul
                        className={`space-y-2 ${
                          index % 2 === 0 ? "lg:text-right" : ""
                        }`}
                      >
                        {exp.achievements.map((achievement, i) => (
                          <li
                            key={i}
                            className={`flex items-start gap-2 text-sm text-gray-300 ${
                              index % 2 === 0 ? "lg:flex-row-reverse" : ""
                            }`}
                          >
                            <ChevronRight
                              aria-hidden="true"
                              className={`w-4 h-4 mt-0.5 text-[#3b82f6] flex-shrink-0 ${
                                index % 2 === 0 ? "lg:rotate-180" : ""
                              }`}
                            />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div
                      className={`flex flex-wrap gap-2 ${
                        index % 2 === 0 ? "lg:justify-end" : ""
                      }`}
                    >
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-lg bg-[#1e293b] text-xs text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Empty column for alternating layout */}
                {index % 2 === 0 && <div className="hidden lg:block" />}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
