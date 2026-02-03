import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code2, 
  Palette, 
  Database, 
  Terminal as TerminalIcon, 
  Cpu 
} from 'lucide-react';
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
  SiFigma, 
  SiRedux, 
  SiGraphql, 
  SiZod, 
  SiGithub, 
  SiCypress, 
  SiTestinglibrary, 
  SiDocker, 
  SiVercel, 
  SiOpenai, 
  SiGooglecloud 
} from 'react-icons/si';
import { RiRestTimeLine } from 'react-icons/ri';
import { VscVscode } from 'react-icons/vsc';
import { BiSolidZap } from 'react-icons/bi';
import { TbMessageChatbot } from 'react-icons/tb';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    name: 'Frontend Core',
    icon: Code2,
    skills: [
      { name: 'React.js', icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'HTML5/CSS3', icon: SiHtml5, color: '#E34F26' },
    ],
  },
  {
    name: 'UI & Styling',
    icon: Palette,
    skills: [
      { name: 'Chakra UI', icon: SiChakraui, color: '#319795' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Styled Comp.', icon: SiStyledcomponents, color: '#DB7093' },
      { name: 'Material UI', icon: SiMui, color: '#0081CB' },
      { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
    ],
  },
  {
    name: 'State & Data',
    icon: Database,
    skills: [
      { name: 'Zustand', icon: BiSolidZap, color: '#443e38' },
      { name: 'Redux', icon: SiRedux, color: '#764ABC' },
      { name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
      { name: 'REST APIs', icon: RiRestTimeLine, color: '#FF6C37' },
      { name: 'Zod', icon: SiZod, color: '#3178C6' },
    ],
  },
  {
    name: 'Testing & Tools',
    icon: TerminalIcon,
    skills: [
      { name: 'Git / GitHub', icon: SiGithub, color: '#F05032' },
      { name: 'Cypress', icon: SiCypress, color: '#17202C' },
      { name: 'RTL', icon: SiTestinglibrary, color: '#E33332' },
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
      { name: 'Vercel / CI', icon: SiVercel, color: '#ffffff' },
    ],
  },
  {
    name: 'AI Tools',
    icon: Cpu,
    skills: [
      { name: 'ChatGPT', icon: SiOpenai, color: '#10a37f' },
      { name: 'Claude', icon: TbMessageChatbot, color: '#d97757' },
      { name: 'Gemini', icon: SiGooglecloud, color: '#1a73e8' },
      { name: 'Cursor', icon: VscVscode, color: '#3b82f6' },
      { name: 'Copilot', icon: SiGithub, color: '#ffffff' },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Category cards animation
      const cards = categoriesRef.current?.querySelectorAll('.skill-category');
      cards?.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 60,
          rotateX: 10,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#06b6d4]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#3b82f6]/5 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-[#3b82f6] uppercase tracking-wider mb-3">
            Competencias
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Stack <span className="text-gradient">Tecnológico</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] mx-auto rounded-full" />
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Herramientas y tecnologías que domino para construir productos digitales de alto impacto.
          </p>
        </div>

        {/* Skills Grid */}
        <div
          ref={categoriesRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
          style={{ perspective: '1000px' }}
        >
          {skillCategories.map((category) => (
            <div
              key={category.name}
              className="skill-category glass rounded-2xl p-6 hover:bg-[#111827]/80 transition-all duration-500 flex flex-col items-center text-center"
            >
              {/* Category header */}
              <div className="flex flex-col items-center gap-3 mb-8 w-full">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3b82f6]/20 to-[#06b6d4]/20 flex items-center justify-center mb-2">
                  <category.icon className="w-6 h-6 text-[#3b82f6]" />
                </div>
                <h3 className="text-lg font-bold text-white whitespace-nowrap">
                  {category.name}
                </h3>
              </div>

              {/* Skills Icons Grid */}
              <div className="grid grid-cols-2 gap-4 w-full">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex flex-col items-center gap-2 group cursor-default"
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div 
                      className="w-12 h-12 rounded-lg bg-[#1e293b] flex items-center justify-center transition-all duration-300 group-hover:bg-[#334155] border border-transparent group-hover:border-[#3b82f6]/30 relative overflow-hidden"
                      style={{
                        boxShadow: hoveredSkill === skill.name ? `0 0 15px ${skill.color}30` : 'none'
                      }}
                    >
                      <skill.icon 
                        className="w-7 h-7 transition-all duration-300 grayscale group-hover:grayscale-0"
                        style={{ color: hoveredSkill === skill.name ? skill.color : '#94a3b8' }}
                      />
                    </div>
                    <span 
                      className="text-[10px] font-medium text-gray-400 uppercase tracking-tighter transition-colors group-hover:text-white"
                    >
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
