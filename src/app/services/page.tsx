'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';

export default function ServicesPage() {
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

  const services = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Hyperlocal PPC Leads",
      subtitle: "Precision Marketing Strategy",
      description: "Lead generation is complicated. Facebook's algorithm changes constantly, and Google's policies shift weekly. Our proven strategies not only help align your campaigns with platform best practices, they ensure optimal lead quality across all channels in your exact farm areas.",
      price: "Starting at $2,500/month + ad spend",
      color: "from-[#FFD580] to-[#ffcf66]"
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "ISA Services",
      subtitle: "Speed to Lead Excellence",
      description: "Your leads don't follow a linear path to conversion. Prospects consult multiple sources and 90% switch between platforms before deciding. Winning ISA strategies require immediate response and optimization across all touchpoints.",
      price: "Starting at $1,500/month",
      color: "from-[#9fe2bf] to-[#8dd9b1]"
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "CRM Management", 
      subtitle: "Daily Database Oversight",
      description: "Database management is where deals are won or lost. Your CRM contains your revenue engine, but most teams let it run wild. We orchestrate lead management that delivers tangible, transformative outcomes for your business.",
      price: "Starting at $1,000/month",
      color: "from-[#647b75] to-[#5a6d66]"
    }
  ];

  return (
    <>
      <Header onOpenModal={openModal} />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Background Image */}
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
        
        {/* Main Content */}
        <div className="relative z-20 flex-1 flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 w-full">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal text-white mb-8 leading-tight"
                  style={{fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'}}>
                We develop lead operations solutions that accelerate revenue growth.
              </h1>
              
              <div className="w-16 h-1 bg-[#FFD580] mb-8"></div>
              
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl leading-relaxed mb-12 font-light">
                We find your leads, call your leads, and manage your leads so you can close more deals and keep 100% of your commission.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={openModal}
                  className="bg-[#FFD580] hover:bg-[#ffcf66] text-gray-900 font-semibold px-8 py-4 rounded-lg transition-all duration-200"
                >
                  Learn more
                </button>
                <button
                  onClick={openCalendly}
                  className="border border-[#FFD580] text-[#FFD580] hover:bg-[#FFD580] hover:text-gray-900 font-semibold px-8 py-4 rounded-lg transition-all duration-200"
                >
                  Hire us
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Partner Logos Strip */}
        <div className="bg-[#FFD580] py-12 relative z-30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-5 gap-8 items-center">
              
              {/* Follow Up Boss */}
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="text-gray-900 text-4xl font-bold">FUB</div>
                </div>
                <div className="text-gray-900 font-semibold text-sm">Verified Partner</div>
              </div>
              
              {/* Google */}
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <svg className="w-16 h-16" viewBox="0 0 272 92" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#374151" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
                    <path fill="#374151" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
                    <path fill="#374151" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"/>
                    <path fill="#374151" d="M225 3v65h-9.5V3h9.5z"/>
                    <path fill="#374151" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"/>
                  </svg>
                </div>
                <div className="text-gray-900 font-semibold text-sm">Premier Partner</div>
              </div>
              
              {/* Meta */}
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <svg className="w-16 h-16" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#374151" d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM349.3 793.7H230.6V411.9h118.7v381.8zm-59.3-434a68.8 68.8 0 1168.8-68.8c-.1 38-30.9 68.8-68.8 68.8zm503.7 434H675.1V608c0-44.3-.8-101.2-61.7-101.2-61.7 0-71.2 48.2-71.2 98v188.9H423.7V411.9h113.8v52.2h1.6c15.8-30 54.5-61.7 112.3-61.7 120.2 0 142.3 79.1 142.3 181.9v209.4z"/>
                  </svg>
                </div>
                <div className="text-gray-900 font-semibold text-sm">Business Partner</div>
              </div>
              
              {/* Microsoft */}
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <svg className="w-16 h-16" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#374151" d="M0 0h11v11H0V0z"/>
                    <path fill="#374151" d="M12 0h11v11H12V0z"/>
                    <path fill="#374151" d="M0 12h11v11H0V12z"/>
                    <path fill="#374151" d="M12 12h11v11H12V12z"/>
                  </svg>
                </div>
                <div className="text-gray-900 font-semibold text-sm">Select Partner</div>
              </div>
              
              {/* CRM Partner */}
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="text-gray-900 text-3xl font-bold">CRM</div>
                </div>
                <div className="text-gray-900 font-semibold text-sm">Marketing Partner</div>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              We develop lead operations that accelerate revenue growth
            </h2>
            <div className="w-24 h-1 bg-[#FFD580] mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Lead generation is in our DNA, and it always will be. But to drive true revenue growth we look at the complete lead operations picture. We're specialists, not generalists. Our company was built to provide deep expertise in real estate lead operations that are extremely complex, and changing daily.
            </p>
          </div>

          {/* Service Cards */}
          <div className="grid lg:grid-cols-3 gap-12">
            {services.map((service, index) => (
              <div key={index} className="group">
                <div className={`bg-gradient-to-br ${service.color} rounded-3xl p-8 h-full hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4`}>
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  
                  <h3 className="text-3xl font-black text-white mb-2">{service.title}</h3>
                  <p className="text-white/90 font-semibold text-lg mb-4">{service.subtitle}</p>
                  <p className="text-white/80 leading-relaxed mb-8">{service.description}</p>
                  
                  <div className="mt-auto">
                    <p className="text-2xl font-bold text-white mb-6">{service.price}</p>
                    <button
                      onClick={openModal}
                      className="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 backdrop-blur-sm"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Stats */}
      <section className="py-32 bg-gradient-to-br from-[#9fe2bf] to-[#8dd9b1] relative">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
            Results That <span className="text-[#647b75]">Matter</span>
          </h2>
          <div className="w-24 h-1 bg-[#647b75] mx-auto mb-8"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-16">
            We're the only agency that controls every variable in your revenue equation. When you control ads, calls, and follow-up, revenue becomes predictable.
          </p>
          
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8">
              <div className="text-5xl font-black text-[#647b75] mb-4">396%</div>
              <div className="text-gray-700 font-semibold">Average ROI</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8">
              <div className="text-5xl font-black text-[#647b75] mb-4">5min</div>
              <div className="text-gray-700 font-semibold">Response Time</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8">
              <div className="text-5xl font-black text-[#647b75] mb-4">25%</div>
              <div className="text-gray-700 font-semibold">Appt to Close</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8">
              <div className="text-5xl font-black text-[#647b75] mb-4">$45</div>
              <div className="text-gray-700 font-semibold">Cost Per Lead</div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Want $25K+ in Monthly Revenue?
            </h3>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              We can tell you exactly how much ad spend you need, how many leads we'll generate, and what ROI to expect. That's the power of controlling every step of your revenue engine.
            </p>
            <button
              onClick={openModal}
              className="bg-[#FFD580] hover:bg-[#ffcf66] text-gray-900 font-black px-12 py-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl text-xl"
            >
              Get Your Revenue Forecast
            </button>
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
            Ready to Scale Your 
            <span className="text-[#FFD580]"> Revenue?</span>
          </h3>
          <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join the growing community of real estate professionals who are keeping 100% of their commission while scaling their business with predictable growth.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={openModal}
              className="bg-[#FFD580] hover:bg-[#ffcf66] text-gray-900 font-black px-12 py-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl text-xl"
            >
              Hire Us Today
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