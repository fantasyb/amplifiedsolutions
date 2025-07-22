import Image from 'next/image';

export default function SocialProofSection() {
  // Your actual client logos
  const logos = [
    { name: "Kris Lindahl", src: "/5014_logo_kris-lindahl-white-65px-20230605091758.png" },
    { name: "Active", src: "/ACTIVE_logo_wt.png" },
    { name: "McCarthy", src: "/McCarthy_Logo_01_Full-White.svg" },
    { name: "REX", src: "/REX.webp" },
    { name: "Century 21 Results", src: "/c21-results2.png" },
    { name: "Benchmark", src: "/benchmark2.png" },
    { name: "Ansley", src: "/ansley.svg" },
    { name: "Anthony Djon", src: "/anthony djon2.png" },
    { name: "Frontgate", src: "/frontgate.png" },
    { name: "MTA", src: "/mta.webp" },
    { name: "The Realty Firm", src: "/therealtyfirm.png" },
    { name: "Home Squad", src: "/home squad.png" },
    { name: "LMSPI", src: "/lmspi.png" },
    { name: "Spyglass", src: "/spyglass.webp" },
    { name: "Tribeca", src: "/tribeca.png" },
    { name: "Zander", src: "/zander.png" },
    { name: "OH", src: "/OH.png" },
    { name: "SG", src: "/SG.png" }
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6"
              style={{fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'}}>
            Companies hire us because we deliver results.
          </h2>
          <div className="flex justify-center mb-8">
            <div className="w-16 h-1 bg-[#FFD580] rounded-full"></div>
          </div>
        </div>

        {/* Logo Grid - Responsive layout with even bigger logos */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {logos.map((logo, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center p-4 transition-all duration-300 opacity-70 hover:opacity-100 w-full h-38"
            >
              <Image
                src={logo.src}
                alt={`${logo.name} logo`}
                width={180}
                height={90}
                className="max-w-full max-h-full object-contain filter brightness-0 contrast-100"
                style={{
                  filter: 'brightness(0) saturate(100%) invert(20%) sepia(8%) saturate(1000%) hue-rotate(180deg) brightness(95%) contrast(88%)'
                }}
              />
            </div>
          ))}
        </div>

       
      </div>
    </section>
  );
}