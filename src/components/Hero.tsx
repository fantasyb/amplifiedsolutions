'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface HeroProps {
  onOpenModal: () => void;
}

export default function Hero({ onOpenModal }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative pt-20 pb-16 md:pt-24 md:pb-20 lg:pt-28 lg:pb-24 overflow-hidden">
      {/* Enhanced Background with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Amp_Sol_Texture_Green.png"
          alt="Background texture"
          fill
          className="object-cover object-center opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#f4f2ed]/70 via-[#f4f2ed]/50 to-transparent"></div>
        {/* Subtle geometric shapes for visual interest */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-[#FFD580]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 left-16 w-24 h-24 bg-green-200/30 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-center min-h-[70vh]">
          {/* Left Content */}
          <div className={`lg:col-span-7 space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-gray-900" style={{fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif'}}>
              <span className="relative inline-block">
                We turn cold leads into
                <br />
                <span className="relative">
                  <span className="relative z-10 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    warm conversations.
                  </span>
                  {/* Enhanced hand-drawn style highlighter with animation */}
                  <span 
                    className="absolute bottom-1 left-0 w-full h-4 bg-[#FFD580] opacity-70 transform rotate-1 rounded-full transition-all duration-700 delay-500" 
                    style={{
                      borderRadius: '50px 30px 40px 20px',
                      transform: isVisible ? 'rotate(-0.5deg) skewX(-1deg) scaleX(1)' : 'rotate(-0.5deg) skewX(-1deg) scaleX(0)',
                      transformOrigin: 'left center'
                    }}
                  ></span>
                </span>
              </span>
            </h1>

            {/* Subheader */}
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
              While your competition lets leads go cold, we work new leads and smart lists 
              through systematic follow-up to deliver 
              <span className="font-semibold text-gray-800"> live transfers and appointments </span> 
              ready for your agents to close.
            </p>

            {/* CTA */}
            <div className="pt-2">
              <button
                onClick={onOpenModal}
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-gray-800 bg-[#FFD580] rounded-lg transition-all duration-200 hover:bg-[#ffcf66] hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
              >
                Stop Wasting Leads
                <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Content - Clean illustration */}
          <div className={`lg:col-span-5 hidden lg:flex items-center justify-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="relative w-full h-96">
              <Image
                src="/Amp_Illustration_ISA.jpg"
                alt="ISA calling leads"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
}