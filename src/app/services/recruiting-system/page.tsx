'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';

export default function RecruitingSystemPage() {
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: "Recruiting Specific Pond and Smart List",
      description: "An exclusive pond and smart list dedicated solely to your recruiting team for organized agent acquisition."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Recruiting Deal Board",
      description: "Monitor every aspect of your recruiting funnel from a single dashboard, and get the reporting insights you need."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      title: "Plug-and-Play Templates",
      description: "Don't reinvent the wheel—use our tried-and-true outreach email and text templates for proven results."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "Comprehensive Training",
      description: "Our training guide and videos ensure you hit the ground running and adopt the system immediately."
    }
  ];

  const benefits = [
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: "Immediate ROI",
      description: "Delivers quick returns by eliminating administrative burden and manual tracking upon integration."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
      ),
      title: "Scalable Solution",
      description: "Designed to grow with your organization—whether you're a solo agent, small team, or large operation."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      title: "Set it and Forget it",
      description: "Once implemented, requires no ongoing maintenance—freeing leadership to focus on agent recruitment."
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
              Recruiting Just Got a <span className="text-[#FFD580]">Whole Lot Easier</span>
            </h1>
            <div className="w-32 h-2 bg-[#FFD580] mb-12 rounded-full"></div>
            <p className="text-2xl md:text-3xl text-white/90 leading-relaxed font-light mb-12">
              Your one-stop recruiting solution for streamlined agent acquisition on Follow Up Boss. Less grind, more glory.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <a
                href="https://buy.stripe.com/dR62b6cD6dce06Y8x0"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FFD580] hover:bg-[#ffcf66] text-gray-900 font-black px-12 py-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl text-xl text-center"
              >
                Get Started — $499
              </a>
              <button
                onClick={openCalendly}
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold px-12 py-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 text-xl"
              >
                Schedule a Call
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
              Your Recruiting Superpower
            </h2>
            <div className="w-24 h-1 bg-[#FFD580] mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Stop struggling with endless recruiting tasks and scattered systems. Turn recruiting from a grind into an exhilarating growth engine with a streamlined system built right into Follow Up Boss.
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
                <h3 className="text-3xl font-bold text-gray-900 mb-4">The Recruiting Grind</h3>
                <p className="text-lg text-gray-600 mb-8">What recruiting looks like without a system:</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl border border-gray-200 min-h-[120px]">
                  <div className="flex-shrink-0 w-3 h-3 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Scattered Candidate Tracking</h4>
                    <p className="text-gray-600">Spreadsheets, notes, and emails everywhere with no central system</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl border border-gray-200 min-h-[120px]">
                  <div className="flex-shrink-0 w-3 h-3 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Manual Follow-Up Chaos</h4>
                    <p className="text-gray-600">Writing individual emails and texts from scratch every time</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl border border-gray-200 min-h-[120px]">
                  <div className="flex-shrink-0 w-3 h-3 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">No Pipeline Visibility</h4>
                    <p className="text-gray-600">No clear view of where candidates are in your recruiting funnel</p>
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
                <h3 className="text-3xl font-bold text-gray-900 mb-4">The Recruiting Superpower</h3>
                <p className="text-lg text-gray-600 mb-8">What recruiting looks like with our system:</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-[#9fe2bf]/10 to-white rounded-xl border border-[#9fe2bf]/30 min-h-[120px]">
                  <div className="flex-shrink-0 w-3 h-3 bg-[#9fe2bf] rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Dedicated Recruiting Pond</h4>
                    <p className="text-gray-600">All candidates organized in one place with smart lists for easy management</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-[#9fe2bf]/10 to-white rounded-xl border border-[#9fe2bf]/30 min-h-[120px]">
                  <div className="flex-shrink-0 w-3 h-3 bg-[#9fe2bf] rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Ready-to-Use Templates</h4>
                    <p className="text-gray-600">Proven email and text templates for consistent, effective outreach</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-[#FFD580]/20 to-white rounded-xl border border-[#FFD580]/40 min-h-[120px]">
                  <div className="flex-shrink-0 w-3 h-3 bg-[#FFD580] rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Complete Pipeline Visibility</h4>
                    <p className="text-gray-600">Deal board shows every candidate's status and your full recruiting funnel</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
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
              What's Included
            </h2>
            <div className="w-24 h-1 bg-[#FFD580] mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to transform your recruiting process, built directly into your Follow Up Boss.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-[#647b75] text-white rounded-2xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose This System */}
      <section className="py-32 bg-gradient-to-br from-[#647b75] to-[#5a6d66] relative">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Why Teams <span className="text-[#FFD580]">Love This System</span>
          </h2>
          <div className="w-24 h-1 bg-[#FFD580] mx-auto mb-8"></div>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-16">
            A one-time investment that pays for itself immediately and keeps working for you forever.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{benefit.title}</h4>
                <p className="text-white/80">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 bg-white relative">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
            One-Time Investment
          </h2>
          <div className="w-24 h-1 bg-[#FFD580] mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            We build it in your system. No monthly fees. No ongoing costs. Just results.
          </p>

          <div className="bg-gradient-to-br from-[#647b75] to-[#5a6d66] rounded-3xl p-12 shadow-2xl">
            <div className="text-6xl md:text-7xl font-black text-white mb-4">$499</div>
            <p className="text-xl text-white/90 mb-8">One-time setup fee</p>

            <ul className="text-left max-w-md mx-auto mb-10 space-y-4">
              <li className="flex items-center text-white">
                <svg className="w-6 h-6 text-[#FFD580] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Recruiting-specific pond and smart list
              </li>
              <li className="flex items-center text-white">
                <svg className="w-6 h-6 text-[#FFD580] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Complete recruiting deal board
              </li>
              <li className="flex items-center text-white">
                <svg className="w-6 h-6 text-[#FFD580] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Plug-and-play email and text templates
              </li>
              <li className="flex items-center text-white">
                <svg className="w-6 h-6 text-[#FFD580] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Comprehensive training guide and videos
              </li>
              <li className="flex items-center text-white">
                <svg className="w-6 h-6 text-[#FFD580] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                No ongoing maintenance required
              </li>
            </ul>

            <a
              href="https://buy.stripe.com/dR62b6cD6dce06Y8x0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#FFD580] hover:bg-[#ffcf66] text-gray-900 font-black px-12 py-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl text-xl"
            >
              Get Started Now
            </a>
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
            Ready for a Proven
            <span className="text-[#FFD580]"> Recruiting System?</span>
          </h3>
          <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Schedule a call to learn more about how we can help you streamline your agent acquisition.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="https://buy.stripe.com/dR62b6cD6dce06Y8x0"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FFD580] hover:bg-[#ffcf66] text-gray-900 font-black px-12 py-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl text-xl"
            >
              Get Started — $499
            </a>
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

      {/* Shared Contact Modal */}
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />

      {/* Calendly Modal */}
      {isCalendlyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={closeCalendly}></div>
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-[#9fe2bf] to-[#8dd9b1] flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800">Schedule Your Call</h3>
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
