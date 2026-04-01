import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export default function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
  {
    icon: (
      <svg className="w-8 h-8 text-[#647b75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    ),
    title: "Someone pulls reports every Monday morning",
    description: "Now a dashboard updates itself. Leadership sees the numbers in real time. Agents get a scorecard automatically. Nobody sits in a spreadsheet anymore.",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-[#647b75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Your TC is copy-pasting contract details into six places",
    description: "Now one form fills everything. Docs, CRM, deal board, notifications — all wired together. One entry, zero re-typing.",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-[#647b75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Nobody's followed up with your database in months",
    description: "Now every lead gets touched automatically. Personalized, timely, based on where they are in the pipeline. No one falls through the cracks at 2am.",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-[#647b75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    title: "Your CRM is a mess and everyone knows it",
    description: "Now stages, tags, and workflows actually mean something. Clean data in, clean data out. Your team stops guessing and starts working a real system.",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-[#647b75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    title: "You're paying someone to post content you're not sure even works",
    description: "Now content is built with real market data, structured for Google and AI citations, and published on a system. Not a prayer.",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-[#647b75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "You keep saying 'we should automate that' and never do",
    description: "That's what we're here for. You tell us what's manual, we make it automatic. We embed with your team and keep building until there's nothing left to automate.",
  },
];

  return (
    <section ref={sectionRef} className="relative py-16 md:py-20 lg:py-24 bg-[#f4f2ed] overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/SystemGoals_Image_Edited.png"
          alt="System goals visualization"
          fill
          className="object-cover object-center opacity-8 transform rotate-6 scale-110"
        />
        {/* Gradient overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f4f2ed]/80 via-[#f4f2ed]/60 to-[#f4f2ed]/80"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6"
              style={{fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'}}>
            We see the same thing in every team we walk into.
          </h2>
          <div className="flex justify-center mb-8">
            <div className={`w-16 h-1 bg-[#FFD580] rounded-full transition-all duration-500 delay-700 ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}></div>
          </div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            People doing work that a system should handle. Here are the ones we see most.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-white/30 flex flex-col h-full group relative overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${800 + index * 200}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Hover effect background */}
              <div className={`absolute inset-0 bg-gradient-to-br from-[#FFD580]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              {/* Icon */}
              <div className={`w-16 h-16 bg-[#FFD580]/20 rounded-xl flex items-center justify-center mb-6 relative z-10 transition-all duration-300 ${hoveredCard === index ? 'bg-[#FFD580]/30 scale-110' : ''}`}>
                {service.icon}
              </div>
              
              {/* Content */}
              <div className="flex-grow relative z-10">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {service.description}
                </p>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}