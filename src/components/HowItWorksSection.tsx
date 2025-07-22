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
      title: "We Access Your Follow Up Boss",
      description: "Connect to your existing Follow Up Boss system (or we can set it up for you) and configure lead routing for optimal workflow.",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      number: "02", 
      title: "We Start Working Your Leads",
      description: "Agent nudging, lead reassignment, and pipeline tracking. If you have ISA services, we call new leads, pond leads, and smart lists.",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      )
    },
    {
      number: "03",
      title: "We Keep Everyone Accountable",
      description: "Track agent activity, ensure proper follow-up, and provide regular reporting so you know exactly what's happening with every lead.",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
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
            How it{' '}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                works
              </span>
              <span className={`absolute bottom-0 sm:bottom-1 left-0 w-full h-2 sm:h-3 bg-[#FFD580] opacity-70 rounded-full transition-all duration-700 delay-300 hidden sm:block ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}
                    style={{
                      borderRadius: '30px 20px 25px 15px',
                      transform: 'rotate(-0.3deg)',
                      transformOrigin: 'left center'
                    }}></span>
            </span>
          </h2>
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className={`w-12 sm:w-16 h-1 bg-[#FFD580] rounded-full transition-all duration-500 delay-500 ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}></div>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            It's simple. We connect to your Follow Up Boss, work your leads, and keep everyone accountable. 
            You get the reporting and results.
          </p>
        </div>

        {/* Steps - Mobile-first approach */}
        <div className="relative mb-12 sm:mb-16">
          {/* Connection line - Only on desktop */}
          <div className="hidden lg:block absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
            <div className="relative h-0.5 bg-gradient-to-r from-[#FFD580] via-[#647b75] to-[#FFD580] opacity-30">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FFD580] via-[#647b75] to-[#FFD580] opacity-60 animate-pulse"></div>
            </div>
          </div>

          {/* Mobile: Simple vertical layout without connecting lines */}
          <div className="block md:hidden space-y-8">
            {steps.map((step, index) => (
              <div key={index} className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                   style={{ transitionDelay: `${600 + index * 200}ms` }}>
                <div className="flex items-center space-x-4">
                  {/* Step indicator */}
                  <div className="flex-shrink-0">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-sm font-black transition-all duration-300 ${activeStep === index ? 'bg-[#FFD580] text-gray-900 scale-110 shadow-lg' : 'bg-[#647b75] text-white'}`}>
                      <div className="flex flex-col items-center">
                        <div className="text-xs font-bold mb-0.5">{step.number}</div>
                        <div className="scale-75">{step.icon}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className={`bg-white rounded-xl p-6 shadow-lg flex-grow transition-all duration-500 relative ${activeStep === index ? 'ring-2 ring-[#FFD580] shadow-xl' : ''}`}>
                    {activeStep === index && (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#FFD580]/10 to-transparent opacity-100 transition-opacity duration-300 rounded-xl"></div>
                    )}
                    <div className="relative z-10">
                      <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {step.description}
                      </p>
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
                <div className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 text-center flex flex-col h-full group relative overflow-hidden ${activeStep === index ? 'ring-2 ring-[#FFD580] shadow-2xl scale-105' : ''}`}>
                  
                  {/* Active step glow */}
                  {activeStep === index && (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FFD580]/20 to-transparent opacity-100 transition-opacity duration-300"></div>
                  )}
                  
                  {/* Step Number with icon */}
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center text-xl font-black mx-auto mb-6 relative z-10 transition-all duration-300 ${activeStep === index ? 'bg-[#FFD580] text-gray-900 scale-110' : 'bg-[#647b75] text-white'}`}>
                    <div className="flex flex-col items-center">
                      <div className="text-xs font-bold mb-1">{step.number}</div>
                      <div className="scale-75">{step.icon}</div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-grow flex flex-col relative z-10">
                    <div className="min-h-[60px] flex items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#647b75] transition-colors duration-300">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Reporting Section - Mobile optimized */}
        <div className={`bg-white/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-12 shadow-xl border border-white/20 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-900 mb-3 sm:mb-4">
            You Get Complete{' '}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-[#647b75] to-[#5a6f69] bg-clip-text text-transparent">
                Reporting
              </span>
            </span>
          </h3>
          <p className="text-center text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto px-2">
            We track everything so you know exactly what's happening with your leads and your team.
          </p>
          
          {/* Mobile: 2x2 Grid, Desktop: 4 columns */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Metric 1 */}
            <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-[#FFD580] to-[#ffcf66] rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-md">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#647b75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">Contact Activity</h4>
              <p className="text-xs sm:text-sm text-gray-700 leading-tight">Calls, texts, emails sent and response rates</p>
            </div>

            {/* Metric 2 */}
            <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-[#9fe2bf] to-[#7dd3fc] rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-md">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#647b75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">Agent Performance</h4>
              <p className="text-xs sm:text-sm text-gray-700 leading-tight">Response times and follow-up activity</p>
            </div>

            {/* Metric 3 */}
            <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-[#647b75] to-[#5a6f69] rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-md">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#647b75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="font-bold text-white mb-1 sm:mb-2 text-sm sm:text-base">Lead Pipeline</h4>
              <p className="text-xs sm:text-sm text-white leading-tight">Stage movement and progression tracking</p>
            </div>

            {/* Metric 4 */}
            <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-green-500 to-green-600 rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-md">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-white mb-1 sm:mb-2 text-sm sm:text-base">Results</h4>
              <p className="text-xs sm:text-sm text-white leading-tight">Appointments and live transfers delivered</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}