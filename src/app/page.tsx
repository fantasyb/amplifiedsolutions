'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProblemSection from '@/components/ProblemSection';
import ServicesSection from '@/components/ServicesSection';
import SocialProofSection from '@/components/SocialProofSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main>
      <Header onOpenModal={openModal} />
      <Hero onOpenModal={openModal} />
      <ProblemSection />
      <ServicesSection />
      <SocialProofSection />
      <HowItWorksSection />
      <CTASection onOpenModal={openModal} />
      <Footer onOpenModal={openModal} />

      {/* Contact Modal - Rendered at body level */}
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </main>
  );
}