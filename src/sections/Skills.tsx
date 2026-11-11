import { useRef, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { SectionHeading } from "@/components/SectionHeading";
import { useScrollReveal } from "@/lib/motion";
import {
  Code2,
  Palette,
  Database,
  Terminal as TerminalIcon,
  Cpu,
} from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiChakraui,
  SiTailwindcss,
  SiStyledcomponents,
  SiMui,
  SiRedux,
  SiGraphql,
  SiZod,
  SiGithub,
  SiCypress,
  SiTestinglibrary,
  SiDocker,
  SiVercel,
  SiOpenai,
  SiStorybook,
  SiShadcnui,
} from "react-icons/si";
import {
  RiClaudeFill,
  RiGeminiFill,
  RiGitForkFill,
  RiHeart3Fill,
  RiCopilotFill,
} from "react-icons/ri";
import { BiSolidZap } from "react-icons/bi";
import { TbHexagonLetterCFilled } from "react-icons/tb";

export default function Skills() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  useScrollReveal(sectionRef);

  const skillCategories = [
    {
      name: "Frontend Core",
      icon: Code2,
      skills: [
        { name: "React.js", icon: SiReact, color: "#61DAFB" },
        { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
        { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
        { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
        { name: "HTML5/CSS3", icon: SiHtml5, color: "#E34F26" },
      ],
    },
    {
      name: "UI & Styling",
      icon: Palette,
      skills: [
        { name: "Chakra UI", icon: SiChakraui, color: "#319795" },
        { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
        { name: "Styled Comp.", icon: SiStyledcomponents, color: "#DB7093" },
        { name: "Material UI", icon: SiMui, color: "#0081CB" },
        { name: "Shadcn UI", icon: SiShadcnui, color: "#ffffff" },
        { name: "Storybook", icon: SiStorybook, color: "#FF4785" },
      ],
    },
    {
      name: "State & Data",
      icon: Database,
      skills: [
        { name: "Zustand", icon: BiSolidZap, color: "#E0A458" },
        { name: "Redux", icon: SiRedux, color: "#764ABC" },
        { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
        { name: "REST APIs", icon: RiGitForkFill, color: "#FF6C37" },
        { name: "Zod", icon: SiZod, color: "#3178C6" },
      ],
    },
    {
      name: "Testing & Tools",
      icon: TerminalIcon,
      skills: [
        { name: "Git / GitHub", icon: SiGithub, color: "#F05032" },
        { name: "Cypress", icon: SiCypress, color: "#69D3A7" },
        { name: "RTL", icon: SiTestinglibrary, color: "#E33332" },
        { name: "Docker", icon: SiDocker, color: "#2496ED" },
        { name: "Vercel / CI", icon: SiVercel, color: "#ffffff" },
      ],
    },
    {
      name: "AI Tools",
      icon: Cpu,
      skills: [
        { name: "ChatGPT", icon: SiOpenai, color: "#10a37f" },
        { name: "Claude", icon: RiClaudeFill, color: "#d97757" },
        { name: "Gemini", icon: RiGeminiFill, color: "#1a73e8" },
        { name: "Cursor", icon: TbHexagonLetterCFilled, color: "#3b82f6" },
        { name: "Copilot", icon: RiCopilotFill, color: "#ffffff" },
        { name: "Lovable", icon: RiHeart3Fill, color: "#ffffff" },
      ],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-20 sm:py-24 lg:py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div
        aria-hidden="true"
        className="orb orb-cyan -top-24 -left-24 w-[700px] h-[700px] [--orb-alpha:0.08]"
      />
      <div
        aria-hidden="true"
        className="orb orb-blue -bottom-20 -right-20 w-[560px] h-[560px] [--orb-alpha:0.08]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={t("skills.badge")}
          title={t("skills.title")}
          accent={t("skills.titleAccent")}
          subtitle={t("skills.subtitle")}
        />

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
          {skillCategories.map((category) => (
            <div key={category.name} data-reveal="scale" className="h-full">
              <div className="h-full glass rounded-2xl p-6 hover:bg-[#111827]/90 hover:border-[#3b82f6]/30 transition-colors duration-300 flex flex-col items-center text-center">
                {/* Category header */}
                <div className="flex flex-col items-center gap-3 mb-6 w-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3b82f6]/20 to-[#06b6d4]/20 flex items-center justify-center mb-2">
                    <category.icon
                      className="w-6 h-6 text-[#3b82f6]"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-white whitespace-nowrap">
                    {category.name}
                  </h3>
                </div>

                {/* Skills Icons Grid */}
                <ul className="grid grid-cols-2 gap-x-3 gap-y-4 w-full">
                  {category.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="flex flex-col items-center gap-2 group cursor-default"
                      // Brand colour is exposed as a CSS variable so hover is
                      // handled entirely in CSS, with no React re-renders.
                      style={{ "--skill-color": skill.color } as CSSProperties}
                    >
                      <div className="w-12 h-12 rounded-lg bg-[#1e293b] flex items-center justify-center border border-transparent transition-[background-color,border-color,box-shadow,transform] duration-200 ease-out-quint group-hover:bg-[#334155] group-hover:border-[#3b82f6]/30 group-hover:-translate-y-0.5 group-hover:shadow-[0_0_18px_color-mix(in_srgb,var(--skill-color)_25%,transparent)]">
                        <skill.icon
                          aria-hidden="true"
                          className="w-7 h-7 text-slate-400 transition-colors duration-200 group-hover:text-[color:var(--skill-color)]"
                        />
                      </div>
                      <span className="text-[11px] leading-tight font-medium text-gray-400 uppercase transition-colors duration-200 group-hover:text-white">
                        {skill.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
