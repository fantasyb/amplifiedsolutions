'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';

export default function LeadManagementPage() {
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

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Smart Lead Routing",
      description: "We configure your Follow Up Boss to automatically route leads to the right agents based on source, location, and availability."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Agent Accountability",
      description: "Agent nudging and follow-up reminders ensure your agents stay on top of every lead opportunity."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      title: "Lead Reassignment",
      description: "When agents don't respond or leads need better handling, we manually reassign to available agents."
    }
  ];

  const processSteps = [
    {
      number: "01",
      title: "FUB System Analysis",
      description: "We audit your current Follow Up Boss setup and identify bottlenecks in your lead routing and agent workflows."
    },
    {
      number: "02", 
      title: "Custom Configuration",
      description: "We optimize your lead routing, set up manual nudging systems, and create smart lists for better lead management."
    },
    {
      number: "03",
      title: "Ongoing Management",
      description: "We monitor performance, make adjustments, and provide regular reporting to keep your system running smoothly."
    }
  ];

  const includedServices = [
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Lead Routing Setup",
      description: "Smart assignment based on agent availability and expertise"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Agent Nudging",
      description: "Personal reminders and escalation for missed follow-ups"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      title: "Lead Reassignment",
      description: "Manual reassignment when agents don't respond to leads"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      title: "Stage Management",
      description: "Proper lead staging and releasing unworked leads to ponds when agents aren't following up"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: "Monthly Reporting",
      description: "Detailed insights on lead flow and agent performance"
    }
  ];

  return (
    <>
      <Header onOpenModal={openModal} />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url('/Amp_Sol_Texture_Green.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#647b75]/60 via-[#5a6d66]/50 to-[#4a5954]/60"></div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#9fe2bf]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FFD580]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight"
                style={{fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'}}>
              Turn Your <span className="text-[#FFD580]">Follow Up Boss</span><br/>
              Into a Lead Machine
            </h1>
            <div className="w-32 h-2 bg-[#FFD580] mb-12 rounded-full"></div>
            <p className="text-2xl md:text-3xl text-white/90 leading-relaxed font-light mb-12">
              Stop losing leads to broken systems and missed follow-ups. We manage your entire lead lifecycle from first contact to conversion.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button
                onClick={openModal}
                className="bg-[#FFD580] hover:bg-[#ffcf66] text-gray-900 font-black px-12 py-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl text-xl"
              >
                Get Started
              </button>
              <button
                onClick={openCalendly}
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold px-12 py-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 text-xl"
              >
                Schedule Strategy Call
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem vs Solution */}
      <section className="py-32 bg-white relative">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Stop the Follow Up Boss Chaos
            </h2>
            <div className="w-24 h-1 bg-[#FFD580] mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Most teams have Follow Up Boss set up wrong. Leads get lost, agents miss opportunities, and no one knows what's happening. We fix it.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-start mb-20">
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.98-.833-2.75 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">The FUB Problem</h3>
                <p className="text-lg text-gray-600 mb-8">What happens when your system isn't optimized:</p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl border border-gray-200 min-h-[120px]">
                  <div className="flex-shrink-0 w-3 h-3 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Leads Go to Wrong Agents</h4>
                    <p className="text-gray-600">Poor routing means leads get assigned to busy or unavailable agents</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl border border-gray-200 min-h-[120px]">
                  <div className="flex-shrink-0 w-3 h-3 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Agents Don't Follow Up</h4>
                    <p className="text-gray-600">No systematic nudging or reassignment means leads get ignored and go cold</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl border border-gray-200 min-h-[120px]">
                  <div className="flex-shrink-0 w-3 h-3 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Agents Hoard Leads</h4>
                    <p className="text-gray-600">Agents hold onto leads they aren't working, preventing opportunities from being redistributed</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#9fe2bf] rounded-full mb-6">
                  <svg className="w-8 h-8 text-[#647b75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Optimized System</h3>
                <p className="text-lg text-gray-600 mb-8">What happens when we manage your FUB:</p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-[#9fe2bf]/10 to-white rounded-xl border border-[#9fe2bf]/30 min-h-[120px]">
                  <div className="flex-shrink-0 w-3 h-3 bg-[#9fe2bf] rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Smart Lead Routing</h4>
                    <p className="text-gray-600">Leads automatically go to the right agent based on availability and expertise</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-[#9fe2bf]/10 to-white rounded-xl border border-[#9fe2bf]/30 min-h-[120px]">
                  <div className="flex-shrink-0 w-3 h-3 bg-[#9fe2bf] rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Agent Nudging & Reassignment</h4>
                    <p className="text-gray-600">We personally nudge agents to follow up and reassign leads when they don't respond</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-[#FFD580]/20 to-white rounded-xl border border-[#FFD580]/40 min-h-[120px]">
                  <div className="flex-shrink-0 w-3 h-3 bg-[#FFD580] rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Active Lead Distribution</h4>
                    <p className="text-gray-600">We monitor lead activity and release unworked leads to ponds so fresh agents can work them</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 bg-gradient-to-br from-[#f4f2ed] to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 overflow-hidden">
          <div 
            className="absolute -inset-[100%] w-[300%] h-[300%]"
            style={{
              backgroundImage: `url('/AmplifiedSolutions_Logo-V2_Icon-01.png')`,
              backgroundSize: '200px 200px',
              backgroundRepeat: 'repeat',
              transform: 'rotate(45deg)',
              transformOrigin: 'center'
            }}
          ></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              How We Transform Your FUB
            </h2>
            <div className="w-24 h-1 bg-[#FFD580] mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We don't just set it up - we optimize, monitor, and maintain your Follow Up Boss system for maximum lead conversion.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-[#647b75] text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-xl font-black">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-32 bg-gradient-to-br from-[#647b75] to-[#5a6d66] relative">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Everything <span className="text-[#FFD580]">We Handle</span>
          </h2>
          <div className="w-24 h-1 bg-[#FFD580] mx-auto mb-8"></div>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-16">
            Complete Follow Up Boss optimization and management. You focus on closing deals, we handle the system.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {includedServices.map((service, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{service.title}</h4>
                <p className="text-white/80">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-r from-[#647b75] to-[#5a6d66] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-80 h-80 bg-[#FFD580]/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#9fe2bf]/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <h3 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight">
            Ready to Fix Your 
            <span className="text-[#FFD580]"> FUB System?</span>
          </h3>
          <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Stop losing leads to broken routing and missed follow-ups. Let us optimize your Follow Up Boss system for maximum conversion.
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
              Schedule Strategy Call
            </button>
          </div>
        </div>
      </section>
      
      <Footer onOpenModal={openModal} />
      
      {/* Shared Contact Modal */}
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