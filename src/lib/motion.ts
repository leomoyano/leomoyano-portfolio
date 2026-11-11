import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Media query that must match before any movement is animated. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
/** Devices with a real hovering pointer (mouse / trackpad). */
export const FINE_POINTER = "(hover: hover) and (pointer: fine)";

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Scroll to an in-page anchor, without smooth scrolling for reduced motion. */
export function scrollToSection(selector: string) {
  document.querySelector(selector)?.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });
}

type RevealVariant = "up" | "left" | "right" | "scale" | "clip";

const HIDDEN: Record<RevealVariant, gsap.TweenVars> = {
  up: { opacity: 0, y: 28 },
  left: { opacity: 0, x: -36 },
  right: { opacity: 0, x: 36 },
  scale: { opacity: 0, y: 16, scale: 0.94 },
  clip: { clipPath: "inset(0% 0% 100% 0%)" },
};

const SHOWN: Record<RevealVariant, gsap.TweenVars> = {
  up: { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
  left: { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" },
  right: { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" },
  scale: { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" },
  clip: { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "expo.out" },
};

const STAGGER = 0.07;

function variantOf(el: HTMLElement): RevealVariant {
  const value = el.dataset.reveal as RevealVariant | undefined;
  return value && value in HIDDEN ? value : "up";
}

/**
 * Reveals every `[data-reveal]` element inside `scope` once it scrolls into
 * view. Elements entering together are staggered. Supported values:
 * `up` (default), `left`, `right`, `scale` and `clip`.
 *
 * Hidden states are only applied when motion is allowed, so content stays
 * visible for reduced-motion users and when JavaScript fails.
 *
 * Do not put CSS transitions on `transform`/`opacity` on a `[data-reveal]`
 * element itself: they would fight the tween. Put them on a child instead.
 */
export function useScrollReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const items = gsap.utils.toArray<HTMLElement>(
          "[data-reveal]",
          scope.current,
        );
        if (!items.length) return;

        items.forEach((el) => gsap.set(el, HIDDEN[variantOf(el)]));

        ScrollTrigger.batch(items, {
          start: "top 88%",
          once: true,
          onEnter: (batch) => {
            batch.forEach((el, index) => {
              gsap.to(el, {
                ...SHOWN[variantOf(el as HTMLElement)],
                delay: index * STAGGER,
                overwrite: true,
                // Hand the element back to CSS (hover transforms, etc.).
                clearProps: "opacity,transform,clipPath",
              });
            });
          },
        });
      });
    },
    { scope },
  );
}

export { gsap, ScrollTrigger, useGSAP };
