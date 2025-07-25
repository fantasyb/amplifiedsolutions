// src/components/proposals/TestimonialCards.tsx
import { testimonials } from '@/data/services';
import { Quote, Star } from 'lucide-react';

export default function TestimonialCards() {
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">
          What People Say
        </h2>
        <p className="text-lg text-slate-600">
          Real results from real estate professionals like you
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <div 
            key={index}
            className="relative bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
          >
            {/* Quote Icon */}
            <div className="absolute -top-4 left-8">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Quote className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-4 pt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>

            {/* Testimonial Text */}
            <blockquote className="text-slate-700 text-lg leading-relaxed mb-6 italic">
              "{testimonial.text}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <div className="font-semibold text-slate-900">
                  {testimonial.name}
                </div>
                <div className="text-slate-600 text-sm">
                  {testimonial.company}
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-50 to-transparent rounded-full -translate-y-10 translate-x-10" />
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-green-50 to-transparent rounded-full translate-y-8 -translate-x-8" />
          </div>
        ))}
      </div>

      {/* Additional Social Proof */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-full border border-blue-100">
          <div className="flex -space-x-2">
            {[...Array(4)].map((_, i) => (
              <div 
                key={i}
                className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-full border-2 border-white flex items-center justify-center"
              >
                <span className="text-white text-xs font-semibold">
                  {String.fromCharCode(65 + i)}
                </span>
              </div>
            ))}
          </div>
          <span className="text-slate-700 font-medium ml-2">
            Join 200+ satisfied clients
          </span>
        </div>
      </div>
    </div>
  );
}