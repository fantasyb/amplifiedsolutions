import Image from 'next/image';
import Link from 'next/link';
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
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Action Plans",
    subtitle: "Automated email sequences that get responses",
    description: "Pre-built drip campaigns for buyers, sellers, renters, and sphere with empathetic, personable copy that generates conversations.",
    href: "/services/action-plans",
    highlights: ["Proven Templates", "Reply-Based Content"]
  },
  {
    icon: (
      <svg className="w-8 h-8 text-[#647b75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: "Smart Lists",
    subtitle: "Know exactly who to call, every day",
    description: "Ten priority-based lists that update automatically based on lead behavior, so you stop guessing and start converting.",
    href: "/services/smart-lists",
    highlights: ["Priority-Based", "Auto-Updating"]
  },
  {
    icon: (
      <svg className="w-8 h-8 text-[#647b75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    title: "Lead Ponds",
    subtitle: "Turn cold leads into hot opportunities",
    description: "Intelligent ponds that group unnurtured leads by criteria—so agents can claim high-potential prospects instead of letting them go cold.",
    href: "/services/ponds",
    highlights: ["Agent Choice", "Smart Filtering"]
  },
  {
    icon: (
      <svg className="w-8 h-8 text-[#647b75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Lead Flows",
    subtitle: "Automatic assignment and routing",
    description: "Intelligent workflows that route new leads to the right action plan and agent instantly—no manual sorting required.",
    href: "/services/lead-flows",
    highlights: ["Auto-Assignment", "Instant Routing"]
  },
  {
    icon: (
      <svg className="w-8 h-8 text-[#647b75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    ),
    title: "Stages & Pipeline",
    subtitle: "Simplified pipeline management",
    description: "Clean stage definitions and streamlined workflows that help your team collaborate and move deals forward efficiently.",
    href: "/services/stages",
    highlights: ["Simplified Stages", "Clear Definitions"]
  },
  {
    icon: (
      <svg className="w-8 h-8 text-[#647b75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: "FUB Pixel Install",
    subtitle: "Track lead activity automatically",
    description: "Courtesy installation of the Follow Up Boss pixel on your website to track lead behavior and trigger smart automations.",
    href: "/services/pixel",
    highlights: ["Activity Tracking", "Behavior Triggers"]
  },
  {
    icon: (
      <svg className="w-8 h-8 text-[#647b75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "Training & Support",
    subtitle: "Get up to speed, fast",
    description: "One-on-one implementation, 30-minute follow-up, 90-day group training access, video library, and lifetime monthly support calls.",
    href: "/services/training",
    highlights: ["1-on-1 Training", "Ongoing Support"]
  },
  {
    icon: (
      <svg className="w-8 h-8 text-[#647b75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Trevy Integration",
    subtitle: "AI-powered personalization (Optional)",
    description: "Configure your Follow Up Boss to work with Trevy's AI engine—turning cold leads into conversations with deeply personalized messages.",
    href: "/services/trevy",
    highlights: ["AI Messaging", "Behavioral Triggers"]
  }
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
          <p className="text-sm md:text-base font-bold text-[#647b75] tracking-wider uppercase mb-4">
            What's Included
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6"
              style={{fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'}}>
            A complete Follow Up Boss system built for automation
          </h2>
          <div className="flex justify-center mb-8">
            <div className={`w-16 h-1 bg-[#FFD580] rounded-full transition-all duration-500 delay-700 ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}></div>
          </div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Reduce manual tasks, increase conversion, and run your business more efficiently with proven automation. We handle your entire CRM setup—action plans, smart lists, ponds, workflows, and AI-ready infrastructure.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm font-medium text-[#647b75] mb-4">
                  {service.subtitle}
                </p>
                <p className="text-gray-600 leading-relaxed text-sm mb-6">
                  {service.description}
                </p>
                
                {/* Key highlights */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.highlights.map((highlight, i) => (
                    <span 
                      key={i} 
                      className="text-xs px-3 py-1 bg-[#647b75]/10 text-[#647b75] rounded-full font-medium"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Learn More Link - Always at bottom */}
              <div className="mt-auto relative z-10">
                <Link 
                  href={service.href}
                  className="group/link flex items-center text-[#647b75] font-semibold hover:text-[#5a6f69] transition-all duration-200 uppercase text-sm tracking-wider"
                >
                  Learn More
                  <svg className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}