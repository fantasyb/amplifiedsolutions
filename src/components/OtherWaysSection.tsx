"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";

type Props = {
  onOpenModal: () => void;
};

type ExtraItem = {
  key: string;
  title: string;
  description: string;
  // Optional vendor logo
  logoSrc?: string;
  logoAlt?: string;
  // Optional external link
  externalHref?: string;
  // Fallback icon when no logo available
  icon?: ReactNode;
  // Primary CTA copy override
  ctaLabel?: string;
};

export default function OtherWaysSection({ onOpenModal }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const items: ExtraItem[] = [
    {
      key: "realscout",
      title: "RealScout Integration & Setup",
      description:
        "Full RealScout + Follow Up Boss integration with purpose-built smart lists, automations, and hands-on team training.",
      logoSrc:
        "https://d3iv89674z08wb.cloudfront.net/assets/homepage_images/logo-49b083b9f96b6fc111363f3b495e63cf694754fbe64da508978aaa22c93b9b7d.png",
      logoAlt: "RealScout",
      ctaLabel: "Talk to us",
    },
    {
      key: "training",
      title: "Platform Training Sessions",
      description:
        "Focused training on Follow Up Boss or RealScout — workflows, smart lists, daily ops, and adoption best practices.",
      icon: (
        <svg className="w-8 h-8 text-[#647b75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      ctaLabel: "Book a session",
    },
    {
      key: "smart-list-zero",
      title: "Smart List Zero",
      description:
        "Accountability framework that keeps teams at follow-up zero with clear KPIs, prioritized queues, and coaching cadence.",
      logoSrc:
        "https://www.smartlistzero.com/_next/image?url=%2FSLZ_Logo_V1-01.png&w=384&q=75",
      logoAlt: "Smart List Zero",
      ctaLabel: "Talk to us",
    },
    {
      key: "trevy",
      title: "Trevy Setup & Integrations",
      description:
        "Connect Trevy with your lead stack to automate repetitive operational tasks and keep data flowing between systems.",
      logoSrc: "https://www.trevy.io/Trevy_Logo_Black.svg",
      logoAlt: "Trevy",
      ctaLabel: "Talk to us",
    },
    {
      key: "listing-leads",
      title: "Listing Leads",
      description:
        "Done-for-you program that helps agents generate high-intent listing opportunities in their local markets.",
      logoSrc:
        "https://cdn.prod.website-files.com/65b25d0c769dd664cecbcea0/6890b154216ead3a8ba5884c_new-logotype-black.png",
      logoAlt: "Listing Leads",
      externalHref: "https://listingleads.com",
      ctaLabel: "Visit listingleads.com",
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-24 bg-[#f4f2ed] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-[#FFD580]/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-12 -left-12 w-80 h-80 bg-[#9fe2bf]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`text-center mb-14 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-sm md:text-base font-bold text-[#647b75] tracking-wider uppercase mb-3">
            Add-Ons & Consulting
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-5" style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}>
            Other Ways We Can Help
          </h2>
          <div className="flex justify-center mb-5">
            <div className={`w-16 h-1 bg-[#FFD580] rounded-full transition-all duration-500 delay-700 ${isVisible ? "scale-x-100" : "scale-x-0"}`} />
          </div>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Complementary offerings to strengthen your pipeline, improve adoption, and keep your operations running smoothly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item, index) => (
            <Card
              key={item.key}
              item={item}
              index={index}
              isVisible={isVisible}
              onOpenModal={onOpenModal}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({
  item,
  index,
  isVisible,
  onOpenModal,
}: {
  item: ExtraItem;
  index: number;
  isVisible: boolean;
  onOpenModal: () => void;
}) {
  const [hideLogo, setHideLogo] = useState(false);

  const Icon = () => (
    <div className="w-16 h-16 bg-[#FFD580]/20 rounded-xl flex items-center justify-center">
      {item.icon ?? (
        <svg className="w-8 h-8 text-[#647b75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1.004M12 8V7m0 10v-1m0-9a5 5 0 00-5 5h10a5 5 0 00-5-5z" />
        </svg>
      )}
    </div>
  );

  return (
    <div
      className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-white/50 relative overflow-hidden ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${200 + index * 120}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFD580]/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />

      {/* Logo or icon */}
      <div className="relative z-10 mb-5">
        {item.logoSrc && !hideLogo ? (
          <div className="w-24 h-12 relative">
            <Image
              src={item.logoSrc}
              alt={item.logoAlt ?? item.title}
              fill
              sizes="96px"
              className="object-contain"
              onError={() => setHideLogo(true)}
            />
          </div>
        ) : (
          <Icon />
        )}
      </div>

      <div className="relative z-10">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-5">{item.description}</p>

        <div className="flex items-center gap-3">
          {item.externalHref ? (
            <a
              href={item.externalHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-full bg-[#647b75] text-white text-sm font-semibold hover:bg-[#5a6f69] transition-colors"
            >
              {item.ctaLabel ?? "Learn More"}
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          ) : (
            <button
              type="button"
              onClick={onOpenModal}
              className="inline-flex items-center px-4 py-2 rounded-full bg-[#647b75] text-white text-sm font-semibold hover:bg-[#5a6f69] transition-colors"
            >
              {item.ctaLabel ?? "Talk to us"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
