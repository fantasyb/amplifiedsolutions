// src/app/newsletter/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, CheckCircle, ArrowLeft, Loader2, TrendingUp, Code, Building } from 'lucide-react';

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
        setEmail('');
        setFirstName('');
        setLastName('');
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            {/* Back Link */}
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            {/* Success Message */}
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              
              <h1 className="text-2xl font-bold text-slate-900 mb-4">
                Welcome to the journey!
              </h1>
              
              <p className="text-slate-600 mb-6">
                You're now following my complete build-in-public journey as I use my own technology to scale from 0 to 50+ closings per month.
              </p>

              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>What to expect:</strong> Weekly updates with real numbers, wins, failures, and lessons learned as I build Trevy AI and scale Amplified Real Estate.
                </p>
              </div>

              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue to Website
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          {/* Back Link */}
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Newsletter Signup Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Follow My Build-in-Public Journey
              </h1>
              
              <p className="text-slate-600">
                Watch me use my own technology to scale a real estate brokerage from 0 to 50+ closings per month.
              </p>
            </div>

            {/* Journey Preview */}
            <div className="mb-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Code className="w-4 h-4" />
                The Experiment
              </h3>
              <p className="text-sm text-slate-700">
                I've built technology for 250+ real estate teams over 8 years. Now I'm putting it all together - Trevy AI + lead generation + ISA services - to prove it works in my own brokerage.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your first name"
                  required
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your last name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Joining...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    Follow the Journey
                  </>
                )}
              </button>
            </form>

            {/* What to Expect */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Building className="w-4 h-4" />
                What you'll get each week:
              </h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  Real numbers: leads generated, closings completed, revenue
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  Behind-the-scenes: what's working, what's failing
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  System breakdowns: how Trevy AI + services are performing
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  Lessons learned from scaling operations
                </li>
              </ul>
            </div>

            <p className="text-xs text-slate-500 mt-6 text-center">
              By subscribing, you agree to receive updates about my build-in-public journey. 
              You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}