'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface HeaderProps {
  onOpenModal: () => void;
}

export default function Header({ onOpenModal }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 transition-all duration-300">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center mr-8">
              <Image 
                src="/AmplifiedSolutions_Logo-V2_Main.png" 
                alt="Amplified Solutions Logo" 
                width={180} 
                height={60}
                className="h-12 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation - Right next to logo */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link
                href="/about" 
                className="text-gray-700 hover:text-[#647b75] font-medium transition-colors duration-200"
              >
                About
              </Link>
              
              <Link 
                href="/testimonials" 
                className="text-gray-700 hover:text-[#647b75] font-medium transition-colors duration-200"
              >
                Testimonials
              </Link>
              
              <Link 
                href="https://blog.amplifiedsolutions.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-[#647b75] font-medium transition-colors duration-200"
              >
                Blog
              </Link>
              
              <Link 
                href="/newsletter" 
                className="text-gray-700 hover:text-[#647b75] font-medium transition-colors duration-200"
              >
                Newsletter
              </Link>
              
              <Link 
                href="/contact" 
                className="text-gray-700 hover:text-[#647b75] font-medium transition-colors duration-200"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right side - CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4 ml-auto">
            <Link 
              href="https://university.amplifiedsolutions.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#647b75] hover:text-white font-medium border border-[#647b75] hover:bg-[#647b75] px-4 py-2 rounded-lg transition-all duration-200"
            >
              University Login
            </Link>
            <button
              onClick={onOpenModal}
              className="bg-[#FFD580] hover:bg-[#ffcf66] text-gray-800 font-bold px-6 py-3 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg"
            >
              Hire Us
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden ml-auto">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-700 hover:text-tertiary-sage focus:outline-none focus:ring-2 focus:ring-tertiary-sage"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
            <Link
              href="/about" 
              className="block px-3 py-2 text-gray-700 hover:text-[#647b75] font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            
            <Link 
              href="/testimonials" 
              className="block px-3 py-2 text-gray-700 hover:text-[#647b75] font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </Link>
            
            <Link 
              href="https://blog.amplifiedsolutions.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 text-gray-700 hover:text-[#647b75] font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            
            <Link 
              href="/newsletter" 
              className="block px-3 py-2 text-gray-700 hover:text-[#647b75] font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Newsletter
            </Link>
            
            <Link 
              href="/contact" 
              className="block px-3 py-2 text-gray-700 hover:text-[#647b75] font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
            
            {/* Mobile CTA Buttons */}
            <div className="px-3 pt-4 space-y-2 border-t border-gray-200">
              <Link 
                href="https://university.amplifiedsolutions.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center border border-[#647b75] text-[#647b75] px-4 py-2 rounded-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                University Login
              </Link>
              <button
                onClick={() => {
                  onOpenModal();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-center bg-[#FFD580] text-gray-800 font-bold px-4 py-3 rounded-lg"
              >
                Hire Us
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}