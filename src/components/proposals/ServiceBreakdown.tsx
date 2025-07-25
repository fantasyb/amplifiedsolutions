// src/components/proposals/ServiceBreakdown.tsx
import { Service } from '@/types/proposal';
import { CheckCircle, Star } from 'lucide-react';

interface ServiceBreakdownProps {
  services: Service[];
}

export default function ServiceBreakdown({ services }: ServiceBreakdownProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">
          Your Custom Solution
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          We've selected these services specifically for your business needs and growth objectives.
        </p>
      </div>

      <div className="grid gap-6 lg:gap-8">
        {services.map((service, index) => (
          <div 
            key={service.id}
            className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${
              service.highlighted 
                ? 'border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-sm' 
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            {/* Highlight Badge */}
            {service.highlighted && (
              <div className="absolute top-4 right-4">
                <div className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                  <Star className="w-3 h-3" />
                  Featured
                </div>
              </div>
            )}

            <div className="p-8">
              <div className="flex items-start gap-4">
                {/* Service Number */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${
                  service.highlighted
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700'
                }`}>
                  {index + 1}
                </div>

                <div className="flex-1">
                  {/* Service Title & Description */}
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-900 mb-3">What's included:</h4>
                    <div className="grid gap-3">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-3">
                          <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                            service.highlighted ? 'text-blue-600' : 'text-green-600'
                          }`} />
                          <span className="text-slate-700 leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            {service.highlighted && (
              <>
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-transparent rounded-full -translate-x-16 -translate-y-16" />
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-indigo-200/30 to-transparent rounded-full translate-x-12 translate-y-12" />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}