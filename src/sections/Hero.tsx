import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  FINE_POINTER,
  MOTION_OK,
  gsap,
  scrollToSection,
  useGSAP,
} from "@/lib/motion";

const socialLinks = [
  { icon: Github, href: "https://github.com/leomoyano", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/leonardomoyano7",
    label: "LinkedIn",
  },
  { icon: Mail, href: "mailto:leomoyano7@gmail.com", label: "Email" },
];

export default function Hero() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // One orchestrated entrance for the first paint.
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" }, delay: 0.1 })
          .from('[data-hero="badge"]', { opacity: 0, y: 16, duration: 0.6 })
          .from(
            '[data-hero="word"]',
            { yPercent: 115, duration: 1, ease: "expo.out", stagger: 0.09 },
            0.15,
          )
          .from(
            '[data-hero="fade"]',
            { opacity: 0, y: 20, duration: 0.8, stagger: 0.09 },
            0.45,
          )
          .from(
            imageRef.current,
            { opacity: 0, scale: 0.94, duration: 1.2, ease: "expo.out" },
            0.25,
          )
          .from(
            '[data-hero="chip"]',
            {
              opacity: 0,
              scale: 0.9,
              duration: 0.5,
              ease: "back.out(1.6)",
              stagger: 0.12,
            },
            0.9,
          );
      });

      // Parallax only where the two columns sit side by side; when stacked,
      // moving them in opposite directions would make them overlap.
      mm.add(`${MOTION_OK} and (min-width: 1024px)`, () => {
        const scrollTrigger = {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        };
        gsap.to(imageRef.current, { y: 60, ease: "none", scrollTrigger });
        gsap.to(contentRef.current, { y: -30, ease: "none", scrollTrigger });
      });

      // Portrait leans toward the cursor. Decorative, so mouse/trackpad only.
      mm.add(`${MOTION_OK} and ${FINE_POINTER}`, () => {
        const frame = imageRef.current;
        const card = tiltRef.current;
        if (!frame || !card) return;

        gsap.set(card, { transformPerspective: 900 });
        const rotateX = gsap.quickTo(card, "rotationX", {
          duration: 0.7,
          ease: "power3.out",
        });
        const rotateY = gsap.quickTo(card, "rotationY", {
          duration: 0.7,
          ease: "power3.out",
        });

        const onMove = (event: PointerEvent) => {
          const rect = frame.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          rotateY(x * 10);
          rotateX(y * -10);
        };
        const onLeave = () => {
          rotateX(0);
          rotateY(0);
        };

        frame.addEventListener("pointermove", onMove);
        frame.addEventListener("pointerleave", onLeave);
        return () => {
          frame.removeEventListener("pointermove", onMove);
          frame.removeEventListener("pointerleave", onLeave);
        };
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100svh] flex items-center overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-[#0a0f1c]" aria-hidden="true">
        {/* Gradient orbs */}
        <div className="orb orb-blue top-[10%] left-[8%] w-[820px] h-[820px] [--orb-alpha:0.14] animate-pulse-glow" />
        <div
          className="orb orb-cyan bottom-[8%] right-[8%] w-[700px] h-[700px] [--orb-alpha:0.14] animate-pulse-glow"
          style={{ animationDelay: "-3s" }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-16 items-center">
          {/* Content */}
          <div
            ref={contentRef}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            <div
              data-hero="badge"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass glass-blur mb-6"
            >
              <span className="relative flex w-2 h-2" aria-hidden="true">
                <span className="absolute inline-flex w-full h-full rounded-full bg-green-400 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-green-400" />
              </span>
              <span className="text-sm text-gray-300">{t("hero.status")}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-tight mb-6">
              {/* Each word slides up from behind its own mask. */}
              <span className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]">
                <span data-hero="word" className="inline-block">
                  Leonardo
                </span>
              </span>{" "}
              <span className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]">
                <span data-hero="word" className="inline-block text-gradient">
                  Moyano
                </span>
              </span>
            </h1>

            <p
              data-hero="fade"
              className="text-lg sm:text-xl text-gray-400 leading-relaxed text-pretty max-w-xl mx-auto lg:mx-0 mb-8"
            >
              {t("hero.subtitle")}
            </p>

            <div
              data-hero="fade"
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
            >
              <Button
                onClick={() => scrollToSection("#projects")}
                size="lg"
                className="h-12 bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] hover:opacity-90 hover:shadow-[0_8px_30px_rgba(59,130,246,0.35)] text-white font-semibold px-8 text-lg group"
              >
                {t("hero.ctaProjects")}
                <ArrowDown
                  className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform duration-200 ease-out-quint"
                  aria-hidden="true"
                />
              </Button>
              <Button
                onClick={() => scrollToSection("#about")}
                variant="outline"
                size="lg"
                className="h-12 border-gray-600 bg-transparent text-white hover:bg-white/10 hover:text-white hover:border-gray-400 px-8 text-lg"
              >
                {t("hero.ctaAbout")}
              </Button>
            </div>

            {/* Social links */}
            <div
              data-hero="fade"
              className="flex gap-4 justify-center lg:justify-start"
            >
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  {...(social.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  aria-label={social.label}
                  className="w-12 h-12 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#3b82f6]/20 hover:-translate-y-0.5 active:scale-95 transition-[color,background-color,transform] duration-200 ease-out-quint"
                >
                  <social.icon className="w-5 h-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Profile Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div ref={imageRef} className="relative">
              <div ref={tiltRef} className="relative">
                {/* Glow effect behind image */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/30 to-[#06b6d4]/30 rounded-3xl blur-2xl scale-110"
                />

                {/* Main image container */}
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px] rounded-3xl overflow-hidden glass p-2">
                  <div className="w-full h-full rounded-2xl overflow-hidden">
                    <img
                      src="/profile.jpg"
                      alt="Leonardo Moyano"
                      width={800}
                      height={800}
                      decoding="async"
                      fetchPriority="high"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Floating badges */}
                <div
                  data-hero="chip"
                  className="absolute -bottom-4 -left-4"
                >
                  <div className="glass glass-blur rounded-xl px-4 py-3 animate-float">
                    <div className="text-2xl font-bold text-gradient">5+</div>
                    <div className="text-xs text-gray-400">
                      {t("hero.expYears")}
                    </div>
                  </div>
                </div>

                <div data-hero="chip" className="absolute -top-4 -right-4">
                  <div
                    className="glass glass-blur rounded-xl px-4 py-3 animate-float"
                    style={{ animationDelay: "-3s" }}
                  >
                    <div className="text-2xl font-bold text-gradient">5</div>
                    <div className="text-xs text-gray-400">
                      {t("hero.companies")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0f1c] to-transparent"
      />
    </section>
  );
}
