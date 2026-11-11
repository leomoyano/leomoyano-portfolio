import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "react-i18next";
import { SectionHeading } from "@/components/SectionHeading";
import { useScrollReveal } from "@/lib/motion";
import {
  Mail,
  MapPin,
  Send,
  Linkedin,
  Github,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const FORMSPREE_ID = "xojnaqvv";
const SUCCESS_RESET_MS = 5000;

const fieldClassName =
  "h-11 bg-[#1e293b] border-[#334155] text-white placeholder:text-gray-500 hover:border-[#475569] focus-visible:border-[#3b82f6] focus-visible:ring-[#3b82f6]/25 transition-[border-color,box-shadow] duration-200";

export default function Contact() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const resetTimer = useRef<number | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useScrollReveal(sectionRef);

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const contactInfo: {
    icon: typeof Mail;
    label: string;
    value: string;
    href?: string;
  }[] = [
    {
      icon: Mail,
      label: t("contact.email"),
      value: "leomoyano7@gmail.com",
      href: "mailto:leomoyano7@gmail.com",
    },
    {
      icon: MapPin,
      label: t("contact.location"),
      value: "Tucumán, Argentina",
    },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/leomoyano", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/leonardomoyano7",
      label: "LinkedIn",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setHasError(false);

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Formspree responded with ${response.status}`);
      }

      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      // Bring the form back after a short while.
      window.clearTimeout(resetTimer.current);
      resetTimer.current = window.setTimeout(
        () => setIsSubmitted(false),
        SUCCESS_RESET_MS,
      );
    } catch (error) {
      console.error("Error submitting form:", error);
      setHasError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-20 sm:py-24 lg:py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div
        aria-hidden="true"
        className="orb orb-blue -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[1100px] [--orb-alpha:0.07]"
      />
      <div
        aria-hidden="true"
        className="orb orb-cyan -bottom-20 -right-20 w-[560px] h-[560px] [--orb-alpha:0.08]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={t("contact.badge")}
          title={t("contact.title")}
          subtitle={t("contact.subtitle")}
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div data-reveal className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-white mb-4">
                {t("contact.infoTitle")}
              </h3>
              <p className="text-gray-400 leading-relaxed text-pretty">
                {t("contact.infoText")}
              </p>
            </div>

            {/* Contact cards */}
            <div className="space-y-4">
              {contactInfo.map((item) => {
                const content = (
                  <>
                    <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-gradient-to-br from-[#3b82f6]/20 to-[#06b6d4]/20 flex items-center justify-center">
                      <item.icon
                        className="w-5 h-5 text-[#3b82f6]"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm text-gray-400">{item.label}</div>
                      <div className="text-white font-medium truncate">
                        {item.value}
                      </div>
                    </div>
                  </>
                );

                return item.href ? (
                  <a
                    key={item.value}
                    href={item.href}
                    className="flex items-center gap-4 p-4 rounded-xl glass hover:bg-[#111827]/90 hover:border-[#3b82f6]/30 active:scale-[0.99] transition-[background-color,border-color,transform] duration-200 ease-out-quint"
                  >
                    {content}
                  </a>
                ) : (
                  <div
                    key={item.value}
                    className="flex items-center gap-4 p-4 rounded-xl glass"
                  >
                    {content}
                  </div>
                );
              })}
            </div>

            {/* Social links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">
                {t("contact.followMe")}
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#3b82f6]/20 hover:-translate-y-0.5 active:scale-95 transition-[color,background-color,transform] duration-200 ease-out-quint"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div data-reveal className="glass rounded-2xl p-6 lg:p-8">
            <h3 className="text-xl font-bold text-white mb-6">
              {t("contact.formTitle")}
            </h3>

            {isSubmitted ? (
              <div
                role="status"
                className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in-0 zoom-in-95 duration-300 ease-out-quint"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                  <CheckCircle
                    className="w-8 h-8 text-green-500"
                    aria-hidden="true"
                  />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">
                  {t("contact.success")}
                </h4>
                <p className="text-gray-400">{t("contact.successText")}</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-6 animate-in fade-in-0 duration-300"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    {t("contact.name")}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t("contact.namePlaceholder")}
                    className={fieldClassName}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    {t("contact.email")}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t("contact.emailPlaceholder")}
                    className={fieldClassName}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    {t("contact.message")}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t("contact.messagePlaceholder")}
                    rows={5}
                    className={`${fieldClassName} h-auto min-h-32 resize-none`}
                  />
                </div>

                {hasError && (
                  <p
                    role="alert"
                    className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300 animate-in fade-in-0 slide-in-from-top-1 duration-200"
                  >
                    <AlertCircle
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    {t("contact.error")}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className="group w-full h-12 bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] hover:opacity-90 hover:shadow-[0_8px_30px_rgba(59,130,246,0.35)] disabled:opacity-70 text-white font-semibold"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      {t("contact.sending")}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send
                        className="w-5 h-5 transition-transform duration-200 ease-out-quint group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                      {t("contact.send")}
                    </span>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
