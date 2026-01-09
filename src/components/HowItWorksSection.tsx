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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-advance through steps - UPDATED TO 6
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % 6);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const steps = [
    {
      number: "01",
      label: "Discovery",
      title: "Complete your intake form",
      description: "Tell us about your business, lead sources, team structure, and current pain points. We gather what we need to implement our proven system.",
      metric: "15-minute questionnaire",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      number: "02",
      label: "Strategy",
      title: "Review the roadmap",
      description: "We present our proven implementation plan—showing exactly what we'll build in your Follow Up Boss using action plans, smart lists, and workflows that convert.",
      metric: "Proven blueprint",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      )
    },
    {
      number: "03",
      label: "Build",
      title: "We build your automation system",
      description: "Our team implements our setup in your Follow Up Boss account—action plans, smart lists, lead flows, stages, and all automation workflows.",
      metric: "7-10 day buildout",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      number: "04",
      label: "Review",
      title: "Walkthrough of your new system",
      description: "We give you a comprehensive overview of everything we built—showing you how each automation works, when it triggers, and how it all connects together.",
      metric: "Complete system tour",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      number: "05",
      label: "Documentation",
      title: "Best practice training materials",
      description: "You get our complete training library, cheat sheets, and quick-reference guides that show your team exactly how to use every feature of your new system.",
      metric: "Video library & guides",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      number: "06",
      label: "Launch",
      title: "Live training and support",
      description: "Live training to get you adopted to the system, followed by 30-day support.",
      metric: "Live training",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
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
            From chaos to automated revenue in 6 simple steps
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

          {/* Desktop: Grid layout - 2 rows of 3 */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col h-full transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                   style={{ transitionDelay: `${600 + index * 200}ms` }}>
                <div className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 flex flex-col h-full group relative overflow-hidden ${activeStep === index ? 'ring-2 ring-[#FFD580] shadow-2xl scale-105' : ''}`}>
                  
                  {/* Active step glow */}
                  {activeStep === index && (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FFD580]/20 to-transparent opacity-100 transition-opacity duration-300"></div>
                  )}
                  
                  {/* Step header with number */}
                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-black transition-all duration-300 ${activeStep === index ? 'bg-[#FFD580] text-gray-900' : 'bg-[#647b75]/10 text-[#647b75]'}`}>
                        {step.number}
                      </div>
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