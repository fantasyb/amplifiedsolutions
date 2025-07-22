import { useState, useEffect, useRef } from 'react';

export default function ProblemSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [animateStats, setAnimateStats] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setAnimateStats(true), 500);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#FFD580]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-green-200/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">


        {/* Main Statement */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-gray-900 mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'}}>
            Your leads need someone to call them.{' '}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                We call them.
              </span>
              {/* Enhanced highlight */}
              <span className={`absolute bottom-1 left-0 w-full h-3 bg-[#FFD580] opacity-70 rounded-full transition-all duration-700 delay-800 ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}
                    style={{
                      borderRadius: '30px 20px 25px 15px',
                      transform: 'rotate(-0.3deg)',
                      transformOrigin: 'left center'
                    }}></span>
            </span>
          </h2>

          {/* Decorative Bar with animation */}
          <div className="flex justify-center mb-8">
            <div className={`w-16 h-1 bg-[#FFD580] rounded-full transition-all duration-500 delay-1000 ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}></div>
          </div>

          {/* Enhanced Description */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed mb-8">
              Most agents call once and move on. Your leads sit there, waiting. Someone needs to call them -{' '}
              <span className="relative">
                <span className="relative z-10 font-bold text-gray-800">we do</span>
                <span className="absolute bottom-0 left-0 w-full h-2 bg-[#FFD580] opacity-70" 
                      style={{
                        borderRadius: '30px 20px 25px 15px',
                        transform: 'rotate(-0.3deg)',
                      }}></span>
              </span>
              . We work every lead through 8-12 systematic touches, then monitor for activity. 
              When they heat up and hit your important activity smart lists, we call them again.
            </p>
            
            {/* Bottom line emphasis */}
            <div className="bg-gradient-to-r from-[#FFD580]/20 to-green-100/20 rounded-lg p-6 border border-[#FFD580]/30">
              <p className="text-xl font-semibold text-gray-800">
                It's simple: your leads need help, and we help them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Simple counter component for animated stats
function CountUp({ end, decimal = 0 }: { end: number; decimal?: number }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => {
        const increment = end / 30;
        const next = prev + increment;
        return next >= end ? end : next;
      });
    }, 50);
    
    return () => clearInterval(timer);
  }, [end]);
  
  return <span>{decimal > 0 ? count.toFixed(decimal) : Math.floor(count)}</span>;
}