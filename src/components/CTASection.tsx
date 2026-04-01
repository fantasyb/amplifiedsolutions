import Image from 'next/image';

interface CTASectionProps {
  onOpenModal: () => void;
}

export default function CTASection({ onOpenModal }: CTASectionProps) {
  return (
    <section className="py-20 bg-gradient-to-r from-[#FFD580] to-[#ffcf66]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-8"
              style={{fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'}}>
            Tell us what's taking too long.
          </h2>
          <button
            onClick={onOpenModal}
            className="group inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-bold text-gray-800 bg-gray-900 text-white rounded-lg transition-all duration-200 hover:bg-gray-800 hover:shadow-xl transform hover:-translate-y-1 uppercase tracking-wider"
          >
            Get in touch
            <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}