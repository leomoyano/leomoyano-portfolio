interface SectionHeadingProps {
  badge: string;
  title: string;
  accent?: string;
  subtitle: string;
}

/**
 * Shared heading block for every section. Each line is a `[data-reveal]`
 * target, so the parent section's `useScrollReveal` staggers them in.
 */
export function SectionHeading({
  badge,
  title,
  accent,
  subtitle,
}: SectionHeadingProps) {
  return (
    <div className="text-center mb-12 lg:mb-16">
      <span
        data-reveal
        className="inline-block text-sm font-medium text-[#3b82f6] uppercase tracking-[0.18em] mb-3"
      >
        {badge}
      </span>
      <h2
        data-reveal
        className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white text-balance mb-4"
      >
        {title}
        {accent && (
          <>
            {" "}
            <span className="text-gradient">{accent}</span>
          </>
        )}
      </h2>
      <div
        data-reveal
        aria-hidden="true"
        className="w-20 h-1 bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] mx-auto rounded-full"
      />
      <p
        data-reveal
        className="mt-4 text-gray-400 max-w-2xl mx-auto text-pretty leading-relaxed"
      >
        {subtitle}
      </p>
    </div>
  );
}
