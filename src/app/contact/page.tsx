'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';

// Define the type for activeOption
type ActiveOptionType = 'calendar' | 'form' | null;

// Define the interface for form data
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  interestedIn: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    interestedIn: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [activeOption, setActiveOption] = useState<ActiveOptionType>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

const handleSubmit = async (): Promise<void> => {
  setIsSubmitting(true);

  try {
    const response = await fetch('/api/fub-contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Thank you! Someone from our team will be in touch soon.');
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        interestedIn: '',
        message: ''
      });
    } else {
      throw new Error('Failed to submit');
    }
  } catch (error) {
    console.error('Form submission error:', error);
    alert('There was an error submitting your form. Please try again or contact us directly.');
  } finally {
    setIsSubmitting(false);
  }
};
  return (
    <>
      <Header onOpenModal={openModal} />
      
      <div className="min-h-screen bg-gradient-to-br from-[#f4f2ed] via-white to-[#f4f2ed]" id="contact">
        <div className="relative z-10 pt-40 pb-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6"
                  style={{fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'}}>
                Contact Us
              </h1>
              <div className="flex justify-center mb-8">
                <div className="w-20 h-1 bg-[#FFD580] rounded-full"></div>
              </div>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Ready to transform your lead management? Choose how you'd like to connect with our team.
              </p>
            </div>

            {/* Two-Option Layout */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Left - Schedule Call (Primary) */}
              <div className="bg-gradient-to-br from-[#9fe2bf] to-[#8dd9b1] rounded-3xl p-8 text-center flex flex-col h-full">
                <div className="flex-1">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-[#647b75]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Schedule a Call</h3>
                  <p className="text-gray-700 mb-6">
                    Book a 30-minute strategy call with Joey to discuss your lead operations and growth goals.
                  </p>
                  <div className="flex items-center justify-center space-x-6 text-sm text-gray-700 mb-6">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>30 Minutes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Free</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setActiveOption('calendar')}
                  className="w-full bg-white hover:bg-gray-50 text-gray-800 font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg mt-auto"
                >
                  Schedule Now
                </button>
              </div>

              {/* Right - Send Message (Secondary) */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 text-center border border-gray-200 flex flex-col h-full">
                <div className="flex-1">
                  <div className="w-16 h-16 bg-[#FFD580] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Send a Message</h3>
                  <p className="text-gray-600 mb-6">
                    Prefer to send details first? Fill out our form and we'll get back to you within 24 hours.
                  </p>
                  <div className="flex items-center justify-center space-x-6 text-sm text-gray-600 mb-6">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>24 Hour Response</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Detailed</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setActiveOption('form')}
                  className="w-full bg-[#FFD580] hover:bg-[#ffcf66] text-gray-800 font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg mt-auto"
                >
                  Send Message
                </button>
              </div>
            </div>

            {/* Content Based on Selection */}
            {activeOption && (
              <div className="max-w-4xl mx-auto">
                {activeOption === 'calendar' ? (
                  // Embedded Calendly
                  <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
                    <div className="p-6 bg-gradient-to-r from-[#9fe2bf] to-[#8dd9b1] text-center">
                      <h3 className="text-2xl font-bold text-gray-800">Schedule Your Strategy Call</h3>
                      <p className="text-gray-700 mt-2">Choose a time that works best for you</p>
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
                ) : (
                  // Contact Form
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/20">
                    <div className="mb-8 text-center">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Send Us a Message</h3>
                      <p className="text-gray-600">
                        Tell us about your team and we'll show you exactly how our lead management services can help you convert more leads.
                      </p>
                    </div>

                    <div className="space-y-6">
                      {/* Email & Phone Row */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-3">
                            Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FFD580] focus:border-[#FFD580] transition-all duration-200 text-gray-800 placeholder-gray-400 bg-white/80"
                            placeholder="john@company.com"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-3">
                            Phone
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FFD580] focus:border-[#FFD580] transition-all duration-200 text-gray-800 placeholder-gray-400 bg-white/80"
                            placeholder="+1"
                          />
                        </div>
                      </div>

                      {/* First Name & Last Name Row */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-bold text-gray-700 mb-3">
                            First Name *
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FFD580] focus:border-[#FFD580] transition-all duration-200 text-gray-800 placeholder-gray-400 bg-white/80"
                            placeholder="First Name"
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-bold text-gray-700 mb-3">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FFD580] focus:border-[#FFD580] transition-all duration-200 text-gray-800 placeholder-gray-400 bg-white/80"
                            placeholder="Last Name"
                          />
                        </div>
                      </div>

                      {/* Company */}
                      <div>
                        <label htmlFor="company" className="block text-sm font-bold text-gray-700 mb-3">
                          Company *
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          required
                          className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FFD580] focus:border-[#FFD580] transition-all duration-200 text-gray-800 placeholder-gray-400 bg-white/80"
                          placeholder="Your Real Estate Company"
                        />
                      </div>

                      {/* I'm interested in dropdown */}
                      <div>
                        <label htmlFor="interestedIn" className="block text-sm font-bold text-gray-700 mb-3">
                          I'm interested in... *
                        </label>
                        <select
                          id="interestedIn"
                          name="interestedIn"
                          value={formData.interestedIn}
                          onChange={handleInputChange}
                          required
                          className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FFD580] focus:border-[#FFD580] transition-all duration-200 text-gray-800 bg-white/80"
                        >
                          <option value="">Select an option...</option>
                          <option value="Becoming a Client">Becoming a Client</option>
                          <option value="Partnership Opportunities">Partnership Opportunities</option>
                          <option value="General Question">General Question</option>
                        </select>
                      </div>

                      {/* Message field - shows when General Question is selected */}
                      {formData.interestedIn === 'General Question' && (
                        <div>
                          <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-3">
                            Your Question *
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={5}
                            required
                            className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FFD580] focus:border-[#FFD580] transition-all duration-200 text-gray-800 placeholder-gray-400 bg-white/80 resize-none"
                            placeholder="What would you like to know about our services?"
                          />
                        </div>
                      )}

                      {/* Submit Button */}
                      <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full bg-[#FFD580] hover:bg-[#ffcf66] text-gray-800 font-black py-5 px-8 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                          </div>
                        ) : (
                          'Submit'
                        )}
                      </button>
                    </div>

                    {/* Consent and Privacy */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <p className="text-xs text-gray-500 leading-relaxed text-center">
                        By clicking the button below, you consent for Amplified Solutions and partners to use automated technology, including pre-recorded messages, cell phones and texts, and email to contact you at the number and email address provided. This includes if the number is currently on any Do Not Call Lists. This consent is not required to make a purchase. 
                        <a href="/privacy" className="text-[#647b75] hover:underline ml-1">Privacy Policy</a>.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Back Button */}
            {activeOption && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setActiveOption(null)}
                  className="text-[#647b75] hover:text-gray-800 font-medium transition-colors duration-200"
                >
                  ← Back to options
                </button>
              </div>
            )}

            {/* Bottom Info - only show when no option selected */}
            {!activeOption && (
              <div className="text-center mt-12">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                  <p className="text-gray-600 mb-2">
                    <strong>Questions? We're here to help!</strong>
                  </p>
                  <p className="text-sm text-gray-500">
                    Get answers about our services and see if we're a good fit in just 30 minutes.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer onOpenModal={openModal} />
      
      {/* Contact Modal */}
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}