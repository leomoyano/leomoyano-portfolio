import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Design System - Finalis',
    description:
      'Co-creé un Design System completo adoptado por múltiples equipos de desarrollo. Incluye componentes reutilizables, documentación interactiva y tokens de diseño para garantizar consistencia visual.',
    image: '/project1.jpg',
    technologies: ['React', 'TypeScript', 'Chakra UI', 'Storybook', 'GraphQL'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 2,
    title: 'Plataforma Fintech - The Fuzzy Fish',
    description:
      'Desarrollé interfaces para plataforma fintech SaaS utilizada por clientes en LATAM y EE.UU. Enfoque en performance, accesibilidad WCAG 2.1 y código mantenible.',
    image: '/project2.jpg',
    technologies: ['React', 'TypeScript', 'Styled Components', 'Redux Toolkit'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 3,
    title: 'Giros y Finanzas - RollingCode',
    description:
      'Sistema completo para empresa de transferencias de dinero en Colombia. Implementé flujos de usuario, dashboard administrativo y integración con pasarelas de pago.',
    image: '/project3.jpg',
    technologies: ['React', 'JavaScript', 'Bootstrap', 'Node.js'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

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

      // Project cards animation
      const cards = projectsRef.current?.querySelectorAll('.project-card');
      cards?.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 80,
          scale: 0.95,
          duration: 0.8,
          delay: index * 0.2,
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
            Portafolio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Proyectos <span className="text-gradient">Relevantes</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] mx-auto rounded-full" />
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Proyectos en los que he trabajado, destacando mi contribución
            en desarrollo frontend, design systems y colaboración en equipos ágiles.
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={projectsRef} className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card group relative rounded-2xl overflow-hidden ${
                index === 0 ? 'lg:col-span-2' : ''
              }`}
            >
              {/* Glass container */}
              <div className="glass rounded-2xl overflow-hidden hover:bg-[#111827]/90 transition-all duration-500">
                {/* Image container */}
                <div
                  className={`relative overflow-hidden ${
                    index === 0 ? 'h-64 lg:h-80' : 'h-56'
                  }`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-[#0a0f1c]/50 to-transparent opacity-80" />
                  
                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] text-white text-xs font-medium">
                      Destacado
                    </div>
                  )}

                  {/* Hover overlay with actions */}
                  <div className="absolute inset-0 bg-[#0a0f1c]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
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
                        Código
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
                        Ver Demo
                      </a>
                    </Button>
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
              href="https://github.com/leonardomoyano7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5 mr-2" />
              Ver mi GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
