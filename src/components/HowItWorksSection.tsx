import { useState, useEffect, useRef } from 'react';

export default function HowItWorksSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 } // Reduced threshold for mobile
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-advance through steps
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % 3);
      }, 4000); // Increased time for mobile reading
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const steps = [
    {
      number: "01",
      label: "Connect",
      title: "We plug into your systems",
      description: "We integrate with your Follow Up Boss (or set it up fresh) and launch targeted PPC campaigns in your local markets. Everything flows seamlessly from day one.",
      metric: "Seamless integration",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      number: "02",
      label: "Convert", 
      title: "We work every opportunity",
      description: "New leads get called within 5 minutes. Your ISA team nurtures them through proven sequences. Smart lists trigger instant callbacks when leads show buying signals.",
      metric: "8-12 touches per lead",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      )
    },
    {
      number: "03",
      label: "Close",
      title: "You focus on deals, we handle everything else",
      description: "Track agent performance, monitor pipeline health, and see real-time results. You get hot leads delivered while we manage the entire system.",
      metric: "Complete transparency",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-[#f4f2ed] to-gray-50 overflow-hidden">
      {/* Enhanced Background Pattern - Hidden on mobile for performance */}
      <div className="absolute inset-0 opacity-5 overflow-hidden hidden sm:block">
        <div 
          className="absolute -inset-[100%] w-[300%] h-[300%]"
          style={{
            backgroundImage: `url('/AmplifiedSolutions_Logo-V2_Icon-01.png')`,
            backgroundSize: '150px 150px',
            backgroundRepeat: 'repeat',
            transform: 'rotate(45deg)',
            transformOrigin: 'center',
            filter: 'drop-shadow(2px 2px 4px rgba(100, 123, 117, 0.1))'
          }}
        ></div>
      </div>

      {/* Floating elements - Smaller on mobile */}
      <div className="absolute top-10 left-4 sm:top-20 sm:left-20 w-16 h-16 sm:w-32 sm:h-32 bg-[#FFD580]/10 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-4 sm:bottom-20 sm:right-20 w-20 h-20 sm:w-40 sm:h-40 bg-green-200/10 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4 sm:mb-6"
              style={{fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'}}>
            How it works
          </h2>
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className={`w-12 sm:w-16 h-1 bg-[#FFD580] rounded-full transition-all duration-500 delay-500 ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}></div>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            From chaos to closed deals in 3 simple steps
          </p>
        </div>

        {/* Steps - Mobile-first approach */}
        <div className="relative mb-12 sm:mb-16">
          {/* Mobile: Simple vertical layout */}
          <div className="block md:hidden space-y-8">
            {steps.map((step, index) => (
              <div key={index} className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                   style={{ transitionDelay: `${600 + index * 200}ms` }}>
                <div className="flex items-start space-x-4">
                  {/* Step indicator with arrow */}
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-sm font-black transition-all duration-300 ${activeStep === index ? 'bg-[#FFD580] text-gray-900 scale-110 shadow-lg' : 'bg-[#647b75] text-white'}`}>
                      <span>{step.number}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="mt-2">
                        <svg className="w-5 h-5 text-[#647b75] opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className={`bg-white rounded-xl p-6 shadow-lg flex-grow transition-all duration-500 relative ${activeStep === index ? 'ring-2 ring-[#FFD580] shadow-xl' : ''}`}>
                    {activeStep === index && (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#FFD580]/10 to-transparent opacity-100 transition-opacity duration-300 rounded-xl"></div>
                    )}
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[#647b75] font-bold text-sm uppercase tracking-wider">{step.label}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm mb-3">
                        {step.description}
                      </p>
                      <div className="inline-flex items-center px-3 py-1 bg-[#FFD580]/20 text-[#647b75] rounded-full text-xs font-semibold">
                        {step.icon}
                        <span className="ml-2">{step.metric}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Grid layout */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col h-full transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                   style={{ transitionDelay: `${600 + index * 200}ms` }}>
                <div className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 flex flex-col h-full group relative overflow-hidden ${activeStep === index ? 'ring-2 ring-[#FFD580] shadow-2xl scale-105' : ''}`}>
                  
                  {/* Active step glow */}
                  {activeStep === index && (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FFD580]/20 to-transparent opacity-100 transition-opacity duration-300"></div>
                  )}
                  
                  {/* Step header with number and arrow */}
                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-black transition-all duration-300 ${activeStep === index ? 'bg-[#FFD580] text-gray-900' : 'bg-[#647b75]/10 text-[#647b75]'}`}>
                        {step.number}
                      </div>
                      {index < steps.length - 1 && (
                        <svg className="w-6 h-6 text-[#647b75] opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      )}
                    </div>
                    <span className="text-[#647b75] font-bold text-sm uppercase tracking-wider">{step.label}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-grow flex flex-col relative z-10">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[#647b75] transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm mb-6 flex-grow">
                      {step.description}
                    </p>
                    <div className="mt-auto">
                      <div className="inline-flex items-center px-4 py-2 bg-[#FFD580]/20 text-[#647b75] rounded-full text-sm font-semibold">
                        {step.icon}
                        <span className="ml-2">{step.metric}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}