'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [activeTab, setActiveTab] = useState<'book' | 'message'>('book');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/fub-webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        if (typeof window !== 'undefined' && window.fbq) {
          window.fbq('track', 'Lead', {
            content_name: 'Contact Modal Form',
            value: 100,
            currency: 'USD'
          });
        }

        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'generate_lead', {
            event_category: 'Contact',
            event_label: 'Modal Form',
            value: 100
          });
        }

        if (typeof window !== 'undefined' && window.widgetTracker) {
          window.widgetTracker('send', 'event', 'Contact', 'Modal Form Submit');
        }

        alert('Thank you! Someone from our team will be in touch within 24 hours.');

        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          phone: '',
          notes: ''
        });
        onClose();
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error submitting your form. Please try again or contact us directly at joey@amplifiedsolutions.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Reset to book tab when modal opens
  useEffect(() => {
    if (isOpen) setActiveTab('book');
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 z-10"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Modal Content */}
          <div className="p-8">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <Image
                src="/AmplifiedSolutions_Logo-V2_Main.png"
                alt="Amplified Solutions Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </div>

            {/* Heading */}
            <div className="text-center mb-6">
              <h2 className="text-3xl font-black text-black mb-3">
                Tell us what you're doing manually.
              </h2>
            </div>

            {/* Tabs */}
            <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('book')}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-md transition-all duration-200 ${
                  activeTab === 'book'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Book a call
              </button>
              <button
                onClick={() => setActiveTab('message')}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-md transition-all duration-200 ${
                  activeTab === 'message'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Send a message
              </button>
            </div>

            {/* Book a Call Tab */}
            {activeTab === 'book' && (
              <div>
                <div className="rounded-xl overflow-hidden border border-gray-200">
                  <iframe
                    src="https://calendly.com/joeyahern/meet-with-joey?embed_domain=amplifiedsolutions.com&embed_type=Inline&hide_gdpr_banner=1"
                    width="100%"
                    height="580"
                    frameBorder="0"
                    title="Book a call with Joey"
                    className="w-full"
                  />
                </div>
              </div>
            )}

            {/* Send a Message Tab */}
            {activeTab === 'message' && (
              <div>
                <p className="text-gray-600 text-sm mb-4">
                  We'll get back to you within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD580] focus:border-[#FFD580] transition-colors duration-200 text-gray-800 placeholder-gray-400 text-sm"
                        placeholder="First name *"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD580] focus:border-[#FFD580] transition-colors duration-200 text-gray-800 placeholder-gray-400 text-sm"
                        placeholder="Last name *"
                      />
                    </div>
                  </div>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD580] focus:border-[#FFD580] transition-colors duration-200 text-gray-800 placeholder-gray-400 text-sm"
                    placeholder="Email *"
                  />

                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD580] focus:border-[#FFD580] transition-colors duration-200 text-gray-800 placeholder-gray-400 text-sm"
                    placeholder="Company *"
                  />

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD580] focus:border-[#FFD580] transition-colors duration-200 text-gray-800 placeholder-gray-400 text-sm"
                    placeholder="Phone (optional)"
                  />

                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD580] focus:border-[#FFD580] transition-colors duration-200 text-gray-800 placeholder-gray-400 resize-none text-sm"
                    placeholder="What's taking too long? What would you automate if you could?"
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#FFD580] hover:bg-[#ffcf66] text-gray-800 font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </div>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>

                <div className="text-center mt-4">
                  <p className="text-xs text-gray-400">
                    By submitting, you agree to be contacted.{' '}
                    <a href="/privacy" className="text-[#647b75] hover:underline">Privacy Policy</a>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
