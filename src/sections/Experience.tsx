import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar, MapPin, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: 1,
    role: 'Front End Developer',
    company: 'Finalis',
    location: 'San Francisco, California, USA (Remoto)',
    period: 'Nov 2022 - Presente',
    description:
      'Desarrollo y mantengo componentes UI reutilizables, reduciendo el tiempo de entrega de features. Co-creador de un Design System adoptado por múltiples equipos para escalabilidad y consistencia.',
    achievements: [
      'Reduje el tiempo de entrega de features con componentes reutilizables',
      'Co-cree un Design System adoptado por equipos de toda la empresa',
      'Identifiqué y resolví vulnerabilidades de seguridad en paquetes',
    ],
    technologies: ['React', 'TypeScript', 'Chakra UI', 'GraphQL', 'Docker'],
  },
  {
    id: 2,
    role: 'Front End Developer',
    company: 'The Fuzzy Fish - Digital Works',
    location: 'Córdoba, Argentina',
    period: 'Dic 2020 - Nov 2022',
    description:
      'Entregué features listos para producción en plataformas SaaS y fintech, colaborando con equipos multiculturales en LATAM y clientes de EE.UU. Enfoque en performance, accesibilidad y código mantenible.',
    achievements: [
      'Entregué features para plataformas SaaS y fintech',
      'Colaboré con equipos multiculturales en LATAM y EE.UU.',
      'Implementé interfaces con React y TypeScript enfocadas en accesibilidad',
    ],
    technologies: ['React', 'TypeScript', 'Styled Components', 'Redux Toolkit'],
  },
  {
    id: 3,
    role: 'Front-End Developer',
    company: 'RollingCode School',
    location: 'Tucumán, Argentina',
    period: 'Ene 2020 - Feb 2021',
    description:
      'Trabajé directamente con clientes locales en proyectos como Giros y Finanzas (Colombia), Laboris y Stars (Argentina). Gané experiencia temprana en entrega completa de proyectos.',
    achievements: [
      'Desarrollé proyectos para clientes en Colombia y Argentina',
      'Trabajé directamente con clientes locales',
      'Adquirí experiencia en entrega completa de proyectos',
    ],
    technologies: ['JavaScript', 'React', 'HTML/CSS', 'Bootstrap'],
  },
  {
    id: 4,
    role: 'Front-End Developer',
    company: 'Panacea Soft',
    location: 'Tucumán, Argentina',
    period: 'Sep 2019 - Ene 2020',
    description:
      'Desarrollé un sistema completo para clínicas, desde turnos para pacientes hasta la organización del personal. Colaboré en un equipo pequeño enfocado en diseño responsive y componentes reutilizables.',
    achievements: [
      'Desarrollé sistema de gestión de turnos para clínicas',
      'Implementé diseño responsive y componentes reutilizables',
      'Trabajé en equipo colaborativo con metodologías ágiles',
    ],
    technologies: ['JavaScript', 'React', 'HTML/CSS', 'Material UI'],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

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

      // Timeline line draw animation
      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      // Experience cards animation
      const cards = timelineRef.current?.querySelectorAll('.experience-card');
      cards?.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          x: index % 2 === 0 ? -80 : 80,
          duration: 0.8,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // Timeline dots animation
      const dots = timelineRef.current?.querySelectorAll('.timeline-dot');
      dots?.forEach((dot, index) => {
        gsap.from(dot, {
          scale: 0,
          duration: 0.4,
          delay: 0.3 + index * 0.2,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: dot,
            start: 'top 80%',
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
      id="experience"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3b82f6]/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-[#3b82f6] uppercase tracking-wider mb-3">
            Trayectoria
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Experiencia <span className="text-gradient">Profesional</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] mx-auto rounded-full" />
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Mi recorrido profesional en el mundo del desarrollo de software,
            destacando logros y responsabilidades en cada rol.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Central line - visible on lg screens */}
          <div
            ref={lineRef}
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 timeline-line rounded-full"
          />

          {/* Mobile line */}
          <div className="lg:hidden absolute left-6 top-0 bottom-0 w-1 timeline-line rounded-full" />

          {/* Experience items */}
          <div className="space-y-12 lg:space-y-0">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`relative lg:grid lg:grid-cols-2 lg:gap-8 ${
                  index !== experiences.length - 1 ? 'lg:pb-16' : ''
                }`}
              >
                {/* Timeline dot */}
                <div
                  className={`timeline-dot absolute left-6 lg:left-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] border-4 border-[#0a0f1c] z-10 lg:-translate-x-1/2 top-6`}
                />

                {/* Content */}
                <div
                  className={`experience-card ml-16 lg:ml-0 ${
                    index % 2 === 0
                      ? 'lg:pr-16 lg:text-right'
                      : 'lg:col-start-2 lg:pl-16'
                  }`}
                >
                  <div className="glass rounded-2xl p-6 hover:bg-[#111827]/80 transition-colors group">
                    {/* Header */}
                    <div
                      className={`flex flex-wrap items-center gap-3 mb-4 ${
                        index % 2 === 0 ? 'lg:justify-end' : ''
                      }`}
                    >
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#3b82f6]/20 text-[#3b82f6] text-sm">
                        <Calendar className="w-3 h-3" />
                        {exp.period}
                      </span>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#06b6d4]/20 text-[#06b6d4] text-sm">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </span>
                    </div>

                    {/* Role & Company */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-white group-hover:text-gradient transition-colors">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-400 mt-1">
                        <Briefcase className="w-4 h-4" />
                        <span>{exp.company}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <div className="mb-4">
                      <ul
                        className={`space-y-2 ${
                          index % 2 === 0 ? 'lg:text-right' : ''
                        }`}
                      >
                        {exp.achievements.map((achievement, i) => (
                          <li
                            key={i}
                            className={`flex items-center gap-2 text-sm text-gray-300 ${
                              index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                            }`}
                          >
                            <ChevronRight className="w-4 h-4 text-[#3b82f6] flex-shrink-0" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div
                      className={`flex flex-wrap gap-2 ${
                        index % 2 === 0 ? 'lg:justify-end' : ''
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
                {index % 2 === 0 && (
                  <div className="hidden lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
