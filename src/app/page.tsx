// src/app/page.tsx
'use client';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ProblemSection from '@/components/ProblemSection';
import ServicesSection from '@/components/ServicesSection';
import SocialProofSection from '@/components/SocialProofSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import CTASection from '@/components/CTASection';
import ContactModal from '@/components/ContactModal';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Header - Fixed at top */}
      <Header onOpenModal={handleOpenModal} />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <Hero onOpenModal={handleOpenModal} />
        
        {/* Services Section */}
        <ServicesSection />
        
        {/* Social Proof Section */}
        <SocialProofSection />
        
        {/* How It Works Section */}
        <HowItWorksSection />
        
        {/* Call to Action Section */}
        <CTASection onOpenModal={handleOpenModal} />
      </main>

      {/* Footer */}
      <Footer onOpenModal={handleOpenModal} />
      
      {/* Contact Modal - Fixed props */}
      <ContactModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal} 
      />
    </>
  );
}