import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Palette, Lightbulb, Rocket } from "lucide-react";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const stats = [
    { value: "5+", label: t("about.stats.exp"), icon: Rocket },
    { value: "4", label: t("about.stats.companies"), icon: Code2 },
    { value: "B2", label: t("about.stats.english"), icon: Palette },
    { value: "Agile", label: t("about.stats.agile"), icon: Lightbulb },
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

      // Content animation
      gsap.from(contentRef.current?.children || [], {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Image animation with rotation
      gsap.from(imageRef.current, {
        opacity: 0,
        x: 100,
        rotation: -5,
        duration: 1,
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Stats animation
      gsap.from(statsRef.current?.children || [], {
        opacity: 0,
        y: 30,
        scale: 0.9,
        stagger: 0.1,
        duration: 0.6,
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#3b82f6]/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#06b6d4]/5 rounded-full blur-[80px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-[#3b82f6] uppercase tracking-wider mb-3">
            {t("about.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t("about.title")}{" "}
            <span className="text-gradient">{t("about.titleAccent")}</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] mx-auto rounded-full" />
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            {t("about.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div ref={imageRef} className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/20 to-[#06b6d4]/20 opacity-0 hover:opacity-100 transition-opacity duration-500" />

              <img
                src="/workspace.jpg"
                alt="Workspace"
                className="w-full h-auto rounded-2xl"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c]/80 via-transparent to-transparent" />
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-[#3b82f6]/30 rounded-2xl -z-10" />
            <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-[#06b6d4]/30 rounded-2xl -z-10" />
          </div>

          {/* Content */}
          <div ref={contentRef} className="order-1 lg:order-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              {t("about.bodyTitle")}{" "}
              <span className="text-gradient">
                {t("about.bodyTitleAccent")}
              </span>
            </h3>

            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
              <p>{t("about.p3")}</p>
            </div>

            {/* Skills tags */}
            <div className="flex flex-wrap gap-2 mt-8">
              {[
                "React",
                "Next.js",
                "TypeScript",
                "Chakra UI",
                "Tailwind CSS",
                "Zustand",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-lg glass text-sm text-gray-300 hover:text-white hover:border-[#3b82f6]/50 transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-16"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-6 text-center group hover:bg-[#3b82f6]/10 transition-colors"
            >
              <stat.icon className="w-8 h-8 text-[#3b82f6] mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-3xl lg:text-4xl font-bold text-gradient mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
