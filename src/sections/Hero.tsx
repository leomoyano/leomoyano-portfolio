import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
        opacity: 0,
        y: 60,
      });
      gsap.set(imageRef.current, {
        opacity: 0,
        scale: 0.8,
        rotateY: 30,
      });

      // Entrance animation timeline
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      })
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.7'
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.7'
        )
        .to(
          imageRef.current,
          {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 1.2,
            ease: 'power3.out',
          },
          '-=0.9'
        );

      // Scroll parallax effect
      gsap.to(imageRef.current, {
        y: 80,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to(contentRef.current, {
        y: -40,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-[#0a0f1c]">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#3b82f6]/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#06b6d4]/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div ref={contentRef} className="order-2 lg:order-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-gray-300">Abierto a nuevas oportunidades</span>
            </div>

            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6"
            >
              Leonardo{' '}
              <span className="text-gradient">Moyano</span>
            </h1>

            <p
              ref={subtitleRef}
              className="text-lg sm:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0 mb-8"
            >
              Frontend Developer con 5+ años de experiencia construyendo aplicaciones web 
              escalables con React, Next.js y TypeScript. Especializado en optimización de 
              performance, design systems y herramientas de IA para desarrollo.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Button
                onClick={scrollToProjects}
                size="lg"
                className="bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] hover:opacity-90 text-white font-semibold px-8 py-6 text-lg group"
              >
                Ver Proyectos
                <ArrowDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </Button>
              <Button
                onClick={scrollToAbout}
                variant="outline"
                size="lg"
                className="border-gray-600 text-white hover:bg-white/10 px-8 py-6 text-lg"
              >
                Sobre Mí
              </Button>
            </div>

            {/* Social links */}
            <div className="flex gap-4 justify-center lg:justify-start">
              <a
                href="https://github.com/leonardomoyano7"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#3b82f6]/20 transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/leonardomoyano7"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#3b82f6]/20 transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:leomoyano7@gmail.com"
                className="w-12 h-12 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#3b82f6]/20 transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Profile Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div
              ref={imageRef}
              className="relative"
              style={{ perspective: '1000px' }}
            >
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/30 to-[#06b6d4]/30 rounded-3xl blur-2xl scale-110" />
              
              {/* Main image container */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px] rounded-3xl overflow-hidden glass p-2">
                <div className="w-full h-full rounded-2xl overflow-hidden">
                  <img
                    src="/profile.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -bottom-4 -left-4 glass rounded-xl px-4 py-3 animate-float">
                <div className="text-2xl font-bold text-gradient">5+</div>
                <div className="text-xs text-gray-400">Años Exp.</div>
              </div>

              <div 
                className="absolute -top-4 -right-4 glass rounded-xl px-4 py-3 animate-float"
                style={{ animationDelay: '1s' }}
              >
                <div className="text-2xl font-bold text-gradient">4</div>
                <div className="text-xs text-gray-400">Empresas</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0f1c] to-transparent" />
    </section>
  );
}
