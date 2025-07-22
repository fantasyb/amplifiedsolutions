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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Lead Management",
      subtitle: "Follow Up Boss Optimization",
      description: "We handle your Follow Up Boss lead routing, agent nudging, reassignment, and pipeline tracking.",
      href: "/services/lead-management",
      highlights: ["Lead Routing", "Agent Nudging", "Pipeline Tracking"]
    },
    {
      icon: (
        <svg className="w-8 h-8 text-[#647b75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Lead Conversion",
      subtitle: "ISA Calling + Management",
      description: "Complete lead conversion services with ISA calling, management, and systematic follow-up.",
      href: "/services/lead-conversion",
      highlights: ["ISA Calling", "Lead Qualification", "Live Transfers"]
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6"
              style={{fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'}}>
            We work the leads so{' '}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                you can close the deals.
              </span>
              {/* Animated highlight */}
              <span className={`absolute bottom-1 left-0 w-full h-3 bg-[#FFD580] opacity-70 rounded-full transition-all duration-700 delay-500 ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}
                    style={{
                      borderRadius: '30px 20px 25px 15px',
                      transform: 'rotate(-0.3deg)',
                      transformOrigin: 'left center'
                    }}></span>
            </span>
          </h2>
          <div className="flex justify-center mb-8">
            <div className={`w-16 h-1 bg-[#FFD580] rounded-full transition-all duration-500 delay-700 ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}></div>
          </div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Get organized systems that turn every lead into revenue. No more missed opportunities, 
            no more leads falling through the cracks.
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
                  className="group/link flex items-center text-[#647b75] font-semibold hover:text-[#5a6f69] transition-all duration-200"
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