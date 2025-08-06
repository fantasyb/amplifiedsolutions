// src/app/newsletter/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';

export default function NewsletterPage() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !firstName) {
      setError('Email and first name are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          firstName: firstName.trim(),
          lastName: lastName.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-[#647b75] hover:text-gray-900 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <div className="bg-white border border-gray-200 rounded-2xl p-12 shadow-lg">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                You're in! 🎉
              </h1>
              
              <p className="text-lg text-gray-600 mb-8">
                Welcome to 2,500+ real estate professionals following our journey building Amplified Real Estate.
              </p>

              <div className="bg-[#647b75]/10 rounded-lg p-6 mb-8">
                <p className="text-[#647b75] text-sm">
                  <strong>Next:</strong> Check your email for a welcome message. You'll get weekly updates on our progress building from 0 to 50+ closings.
                </p>
              </div>

              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFD580] hover:bg-[#ffcf66] text-gray-900 rounded-lg transition-colors font-bold"
              >
                Back to Website
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-[#647b75] hover:text-gray-900 mb-12 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="text-center mb-16">
            <Image 
              src="/AmplifiedSolutions_Logo-V2_Main.png" 
              alt="Amplified Solutions" 
              width={250} 
              height={80}
              className="h-12 w-auto mx-auto mb-12"
            />

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Building
              <span className="block text-[#647b75]">
                Amplified Real Estate
              </span>
              <span className="block text-gray-900">
                from 0 to 50+ closings/month
              </span>
            </h1>

            <h2 className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
              I've built technology for 250+ real estate teams over 8 years. Now I'm putting it all together — <strong>Trevy AI + lead generation + ISA services</strong> — to prove it works in my own brokerage.
            </h2>

            <div className="bg-gray-50 rounded-2xl p-8 mb-12 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Follow Our Journey</h3>
              <p className="text-gray-600 mb-6">
                Get weekly behind-the-scenes updates as we build Amplified Real Estate from 0 to 50+ closings per month.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#647b75] focus:border-transparent"
                    placeholder="First Name"
                    required
                  />
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#647b75] focus:border-transparent"
                    placeholder="Last Name (Optional)"
                  />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#647b75] focus:border-transparent"
                  placeholder="Email Address"
                  required
                />
                
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#FFD580] hover:bg-[#ffcf66] text-gray-900 rounded-lg disabled:opacity-50 transition-all font-bold"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      Join 2,500+ Subscribers
                    </>
                  )}
                </button>
              </form>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                Real updates. Real numbers. Unsubscribe anytime.
              </p>
            </div>

            {/* What You'll Get */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#647b75] flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900">Live Progress Reports</div>
                    <div className="text-gray-600 text-sm">Monthly closing numbers and revenue from Amplified Real Estate</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#647b75] flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900">Trevy AI Implementation</div>
                    <div className="text-gray-600 text-sm">How we use AI for lead qualification and nurturing</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#647b75] flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900">Lead Generation Strategies</div>
                    <div className="text-gray-600 text-sm">Exact campaigns and funnels driving our growth</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#647b75] flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900">ISA Service Systems</div>
                    <div className="text-gray-600 text-sm">Inside sales team structure and training methods</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#647b75] flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900">Real Conversion Data</div>
                    <div className="text-gray-600 text-sm">Lead-to-closing ratios and what's working</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#647b75] flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900">Behind-the-Scenes Access</div>
                    <div className="text-gray-600 text-sm">Challenges, failures, and lessons learned</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}