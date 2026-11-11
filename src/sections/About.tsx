import { useRef } from "react";
import { Code2, Palette, Lightbulb, Rocket } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SectionHeading } from "@/components/SectionHeading";
import { useScrollReveal } from "@/lib/motion";

const highlightedSkills = [
  "React",
  "Next.js",
  "TypeScript",
  "Chakra UI",
  "Tailwind CSS",
  "Zustand",
];

export default function About() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  useScrollReveal(sectionRef);

  const stats = [
    { value: "5+", label: t("about.stats.exp"), icon: Rocket },
    { value: "4", label: t("about.stats.companies"), icon: Code2 },
    { value: "B2", label: t("about.stats.english"), icon: Palette },
    { value: "Agile", label: t("about.stats.agile"), icon: Lightbulb },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 sm:py-24 lg:py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div
        aria-hidden="true"
        className="orb orb-blue -top-20 -right-20 w-[560px] h-[560px] [--orb-alpha:0.08]"
      />
      <div
        aria-hidden="true"
        className="orb orb-cyan -bottom-16 -left-16 w-[420px] h-[420px] [--orb-alpha:0.08]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={t("about.badge")}
          title={t("about.title")}
          accent={t("about.titleAccent")}
          subtitle={t("about.subtitle")}
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div
              data-reveal="clip"
              className="group relative rounded-2xl overflow-hidden"
            >
              <img
                src="/workspace.jpg"
                alt=""
                width={1184}
                height={864}
                loading="lazy"
                decoding="async"
                className="w-full h-auto rounded-2xl transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
              />

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/20 to-[#06b6d4]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c]/80 via-transparent to-transparent" />
            </div>

            {/* Decorative elements */}
            <div
              data-reveal="scale"
              aria-hidden="true"
              className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-32 h-32 border-2 border-[#3b82f6]/30 rounded-2xl -z-10"
            />
            <div
              data-reveal="scale"
              aria-hidden="true"
              className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-24 h-24 border-2 border-[#06b6d4]/30 rounded-2xl -z-10"
            />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <h3
              data-reveal
              className="text-2xl sm:text-3xl font-bold tracking-tight text-white text-balance mb-6"
            >
              {t("about.bodyTitle")}{" "}
              <span className="text-gradient">
                {t("about.bodyTitleAccent")}
              </span>
            </h3>

            <div className="space-y-4 text-gray-400 leading-relaxed text-pretty">
              <p data-reveal>{t("about.p1")}</p>
              <p data-reveal>{t("about.p2")}</p>
              <p data-reveal>{t("about.p3")}</p>
            </div>

            {/* Skills tags */}
            <ul data-reveal className="flex flex-wrap gap-2 mt-8">
              {highlightedSkills.map((skill) => (
                <li
                  key={skill}
                  className="px-4 py-2 rounded-lg glass text-sm text-gray-300 hover:text-white hover:border-[#3b82f6]/50 transition-colors duration-200 cursor-default"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-16">
          {stats.map((stat) => (
            <div key={stat.label} data-reveal="scale" className="h-full">
              <div className="h-full glass rounded-2xl p-5 sm:p-6 text-center group hover:bg-[#3b82f6]/10 hover:border-[#3b82f6]/30 hover:-translate-y-1 transition-[background-color,border-color,transform] duration-300 ease-out-quint">
                <stat.icon
                  aria-hidden="true"
                  className="w-8 h-8 text-[#3b82f6] mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 ease-out-quint"
                />
                <div className="text-3xl lg:text-4xl font-bold text-gradient mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 text-balance">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
