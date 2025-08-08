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
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-36 lg:pb-32 min-h-screen flex items-center overflow-hidden">
      {/* Mobile-Optimized Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f4f2ed] via-[#f8f6f1] to-[#f4f2ed]"></div>
        
        {/* Desktop background texture */}
        <div className="hidden md:block absolute inset-0">
          <Image
            src="/Amp_Sol_Texture_Green.png"
            alt="Background texture"
            fill
            className="object-cover object-center opacity-30"
            priority
          />
        </div>
        
        {/* Mobile-friendly decorative elements */}
        <div className="absolute top-20 right-4 md:top-20 md:right-20 w-16 h-16 md:w-32 md:h-32 bg-[#FFD580]/20 rounded-full blur-2xl md:blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 left-4 md:bottom-32 md:left-16 w-12 h-12 md:w-24 md:h-24 bg-green-200/30 rounded-full blur-xl md:blur-2xl animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Main Content - Centered */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight text-gray-900 mb-6" 
                style={{fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif'}}>
              <span className="inline">
                Revenue starts
              </span>
              {' '}
              <span className="inline text-[#FFD580]">
                here.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 mb-4">
              Your partner in lead generation, conversion, and pipeline management.
            </p>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-10">
              We deliver complete solutions to scale your real estate business.
            </p>

            {/* CTA Button */}
            <div className="pt-2">
              <button
                onClick={onOpenModal}
                className="group inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-bold text-gray-800 bg-[#FFD580] rounded-lg transition-all duration-200 hover:bg-[#ffcf66] hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 uppercase tracking-wider"
              >
                Get Started Today
                <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}