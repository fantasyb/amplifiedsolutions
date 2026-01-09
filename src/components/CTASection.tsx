import Image from 'next/image';

interface CTASectionProps {
  onOpenModal: () => void;
}

export default function CTASection({ onOpenModal }: CTASectionProps) {
  return (
    <section className="py-20 bg-gradient-to-r from-[#FFD580] to-[#ffcf66]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900">
            Want to learn more?{' '}
            <button
              onClick={onOpenModal}
              className="text-gray-900 underline decoration-2 underline-offset-4 hover:text-[#647b75] transition-colors duration-200 font-light"
            >
              Let's talk!
            </button>
          </h2>
        </div>
      </div>
    </section>
  );
}