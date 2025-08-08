'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';

export default function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState<boolean>(false);

  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  const openCalendly = (): void => {
    setIsCalendlyOpen(true);
  };

  const closeCalendly = (): void => {
    setIsCalendlyOpen(false);
  };

  const coreTeam = [
    {
      name: "Joey Ahern", 
      title: "Co-Founder and Chief Executive Officer",
      image: "Headshot_Joey_C250.png"
    },
    {
      name: "Lee Adkins",
      title: "Co-Founder and Head of Product",
      image: "Headshot_Lee_C250.png"
    },
    {
      name: "Rosario Torres",
      title: "Director of Client Success",
      image: "Headshot_Rosario_C250.png"
    },
    {
      name: "Cynthia Howe",
      title: "Director of Project Management",
      image: "Headshot_HoweCynthia_C250.png"
    }
  ];

  const values = [
    {
      title: "Hard Work Pays Off",
      description: "If it was easy, everyone would do it. When times get hard, we lean into knowing that the hard work we're putting in will pay off.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Growth Mindset", 
      description: "Having a growth mindset means we can always get better. We will continue to look in the future & get better at everything we do.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      title: "Extreme Ownership",
      description: "We take complete responsibility for our results and our clients' success. We own our mistakes, learn from them, and always deliver on our commitments.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Have Fun",
      description: "We have fun! Work is better with friends, and a fun culture that works hard is our key to success.",
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
      
      {/* Hero Section - Full Screen */}
      <section className="min-h-screen bg-gradient-to-br from-[#647b75] via-[#5a6d66] to-[#4a5954] relative overflow-hidden flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#9fe2bf]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FFD580]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight"
              style={{fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'}}>
            About <span className="text-[#FFD580]">Amplified</span>
          </h1>
          <div className="w-32 h-2 bg-[#FFD580] mx-auto mb-12 rounded-full"></div>
          <p className="text-2xl md:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light">
            Your complete partner in real estate growth
          </p>
        </div>
      </section>

      {/* Mission Section - Clean & Powerful */}
      <section className="py-32 bg-white relative">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-12 leading-tight">
              Our Mission
            </h2>
            <p className="text-2xl md:text-3xl text-gray-700 leading-relaxed mb-8 font-light">
              To deliver complete lead-to-close solutions that transform how real estate teams scale their business.
            </p>
            <p className="text-xl text-gray-600 leading-relaxed mb-16">
              We generate high-intent local leads through targeted PPC, convert them with professional ISA services, and optimize your entire pipeline through Follow Up Boss management. From first click to closed deal, we handle the systems so you can focus on selling.
            </p>
            
            <button
              onClick={openModal}
              className="bg-[#FFD580] hover:bg-[#ffcf66] text-gray-900 font-black px-12 py-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl text-xl"
            >
              Start Growing Today
            </button>
          </div>
        </div>
      </section>

      {/* Values Section - Full Width Dark */}
      <section className="py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/AmplifiedSolutions_Logo-V2_Icon-01.png')] opacity-5 bg-repeat"
             style={{backgroundSize: '300px 300px'}}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">Our Values</h2>
            <div className="w-24 h-1 bg-[#FFD580] mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The principles that drive our relentless pursuit of excellence
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group">
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 h-full hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-4 hover:shadow-2xl border border-white/20">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#FFD580] rounded-2xl flex items-center justify-center mx-auto mb-6 text-gray-900 group-hover:scale-110 transition-transform duration-300">
                      {value.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-6">{value.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - Split Layout */}
      <section className="py-32 bg-gradient-to-br from-[#9fe2bf] to-[#8dd9b1] relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Content */}
            <div>
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
                Meet the Team
              </h2>
              <div className="w-24 h-1 bg-[#647b75] mb-8"></div>
              <p className="text-xl text-gray-700 leading-relaxed mb-12">
                The leaders driving innovation in real estate lead generation, conversion, and management. We're building the future of how teams scale.
              </p>
              
              <div className="space-y-6">
                {coreTeam.slice(0, 2).map((member, index) => (
                  <div key={index} className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 flex items-center space-x-6">
                    <div className="flex-shrink-0">
                      <Image 
                        src={`/${member.image}`}
                        alt={member.name}
                        width={80}
                        height={80}
                        className="rounded-xl object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                      <p className="text-[#647b75] font-semibold text-lg">{member.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right - Team Grid */}
            <div className="space-y-6">
              {coreTeam.slice(2).map((member, index) => (
                <div key={index} className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 flex items-center space-x-6">
                  <div className="flex-shrink-0">
                    <Image 
                      src={`/${member.image}`}
                      alt={member.name}
                      width={80}
                      height={80}
                      className="rounded-xl object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-[#647b75] font-semibold text-lg">{member.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Bold & Powerful */}
      <section className="py-32 bg-gradient-to-r from-[#647b75] to-[#5a6d66] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-80 h-80 bg-[#FFD580]/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#9fe2bf]/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <h3 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight">
            Ready to Scale Your 
            <span className="text-[#FFD580]"> Real Estate Business?</span>
          </h3>
          <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join hundreds of teams who trust us to generate, nurture, and manage their leads while they focus on what they do best - selling homes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={openModal}
              className="bg-[#FFD580] hover:bg-[#ffcf66] text-gray-900 font-black px-12 py-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl text-xl"
            >
              Get Started Today
            </button>
            <button
              onClick={openCalendly}
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold px-12 py-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 text-xl"
            >
              Schedule a Call
            </button>
          </div>
        </div>
      </section>
      
      <Footer onOpenModal={openModal} />
      
      {/* Contact Modal */}
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
      
      {/* Calendly Modal */}
      {isCalendlyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={closeCalendly}></div>
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-[#9fe2bf] to-[#8dd9b1] flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800">Schedule Your Strategy Call</h3>
              <button
                onClick={closeCalendly}
                className="text-gray-600 hover:text-gray-800 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-all duration-200"
              >
                ×
              </button>
            </div>
            <iframe
              src="https://calendly.com/joeyahern/meet-with-joey?embed_domain=yoursite.com&embed_type=Inline"
              width="100%"
              height="700"
              frameBorder="0"
              title="Schedule a meeting with Joey"
              className="w-full"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}