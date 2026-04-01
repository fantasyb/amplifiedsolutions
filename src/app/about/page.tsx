'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';

export default function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  const values = [
    {
      title: "Hard Work Pays Off",
      description: "If it was easy, everyone would do it. When it gets hard, we lean in.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Growth Mindset",
      description: "We can always get better. Every system we build is better than the last one.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      title: "Extreme Ownership",
      description: "Your operations are our operations. We own the outcome, not just the deliverable.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Have Fun",
      description: "Work is better when you like the people you're working with. We keep it real.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <>
      <Header onOpenModal={openModal} />

      {/* Hero Section */}
      <section className="min-h-[60vh] bg-gradient-to-br from-[#647b75] via-[#5a6d66] to-[#4a5954] relative overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#9fe2bf]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FFD580]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight"
              style={{fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'}}>
            We got tired of watching teams do everything by hand.
          </h1>
          <div className="w-24 h-1 bg-[#FFD580] mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="space-y-6 text-xl text-gray-700 leading-relaxed">
            <p>
              I spent 8 years inside 500+ real estate teams. Every single one had the same problem — people doing work that should have been automated years ago. Pulling reports by hand. Copy-pasting contract details. Chasing follow-ups that nobody remembered to send.
            </p>
            <p>
              The tools existed. The teams just didn't have anyone who knew how to wire it all together. They had agents, admins, TCs, VAs — but no one whose job was to look at the whole operation and say "this should run itself."
            </p>
            <p>
              That's what Amplified Solutions does. We embed with your team as a fractional technology partner. We find what's manual, we automate it, and we keep going until there's nothing left to do by hand.
            </p>
          </div>

          <div className="mt-16 text-center">
            <button
              onClick={openModal}
              className="bg-[#FFD580] hover:bg-[#ffcf66] text-gray-900 font-bold px-10 py-5 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl text-lg"
            >
              Talk to Us
            </button>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/AmplifiedSolutions_Logo-V2_Icon-01.png')] opacity-5 bg-repeat"
             style={{backgroundSize: '300px 300px'}}></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">How we work</h2>
            <div className="w-20 h-1 bg-[#FFD580] mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 h-full hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 border border-white/20">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#FFD580] rounded-2xl flex items-center justify-center mx-auto mb-6 text-gray-900 group-hover:scale-110 transition-transform duration-300">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                    <p className="text-gray-300 leading-relaxed text-sm">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#FFD580] to-[#ffcf66]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-8"
                style={{fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'}}>
              Tell us what's taking too long.
            </h2>
            <button
              onClick={openModal}
              className="group inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gray-900 rounded-lg transition-all duration-200 hover:bg-gray-800 hover:shadow-xl transform hover:-translate-y-1"
            >
              Get in touch
              <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <Footer onOpenModal={openModal} />

      {/* Contact Modal */}
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}
