'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';

export default function TestimonialsPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  const testimonials = [
    {
      quote: "Being an independent broker, there's no company resource to pull from when trying to scale a company. Indies either need to do it themselves or outsource it. And most entrepreneurs (like me) lack the attention to detail to put together the strategic items such as policies, handbooks, company structure, and all the super important things that a company needs to scale. Hiring the Amplified team took all the burden of those things and even things like lead distribution, CRM structure, out of our hands. I was able to work on the things that I was built to work on, like marketing, recruiting, and coaching. Could not have done it without Amplified Solutions!",
      name: "Ryan Rodenbeck",
      title: "Broker / Owner",
      company: "Spyglass Realty"
    },
    {
      quote: "After finding myself stuck with stagnant growth and absent a 5 year plan, I signed up for the Roadmap program. The Amplified team helped me create a plan that brought meaningful growth to my brokerage, so much so that I crushed my 5 year plan in 18 months. The focus and insight you'll gain is worth multiples of what you'll invest in the Roadmap plan, I highly recommend it!",
      name: "Nat Ferguson",
      title: "Owner",
      company: "Ferguson Realty"
    },
    {
      quote: "There are not enough words that could express the support and knowledge that the Amplified team bring to their trainings. I came to them with Real Estate experience, but no real lead coordination or database experience and I had only been in our systems a month. By the end of our sessions, I was proficient in our systems, I had a clear understanding of how our agent trainings need to go, and how to effectively manage our leads.",
      name: "Rachel Van Cleave",
      title: "Team Member",
      company: "The Stratton Group"
    },
    {
      quote: "Thank you for all of the hard work from the team at Amplified Solutions!!! They are intuitive, simplistic, detailed, advanced, conscientious, thorough, and extremely patient. They have been integral in the process of coaching and implementing the Follow Up Boss CRM. I am so thankful to have their guidance on an otherwise difficult transition.",
      name: "Cindy Greenya",
      title: "Owner",
      company: "The Greenya Group"
    },
    {
      quote: "The team at Amplified Solutions were instrumental in helping us use Follow Up Boss to its fullest potential. They helped us plan and implement a lead management strategy (including producing a Follow Up Boss handbook for our agents, video tutorials, drip campaigns and more), and made the process as painless as possible.",
      name: "Chip Craig & Caleb Hofheins",
      title: "Co-Owners",
      company: "Greybeard Realty"
    },
    {
      quote: "Working with the team at Amplified Solutions provides my team and I with a highly focused, strategic path to clearing the noise clutter we'd begun to accumulate in our real estate business. Now we all understand our individual roles in a concise way. Amplified Solutions gives us the direction to know where we're going and what each team member needs to do to get us there collectively.",
      name: "Dean Linnell",
      title: "Owner",
      company: "The Linnell Group"
    },
    {
      quote: "The team at Amplified Solutions provides just that, customized solutions, amplified for specifically for your needs. They are EXPERTS of process, procedure, and most importantly implementation. Our small real estate team in Tampa had needs specific to us and our market. They helped us first understand what we had that was working, assessed what we didn't have that we needed, and put into place a systemized series of plans and processes to help us achieve our goals.",
      name: "Anthony Malafronte",
      title: "Team Leader",
      company: "My Tampa Agent"
    },
    {
      quote: "Amplified Solutions make the hiring process, well, easy. As a busy professional, I simply don't have time to trim the fat when it comes to digging through hundreds of emails. They offered guidance as to what to look for when we were meeting with candidates and always gave us the best pick of our options!",
      name: "Anna Kilinski",
      title: "Owner",
      company: "Anna K Intown"
    },
    {
      quote: "In 2018, my firm consulted with Amplified Solutions with the goal of improving our staff hiring process. We wanted to not only make the process more efficient but also – and most importantly – identify the best candidate for the job and our culture. After working with Amplified Solutions, I was confident that our chances of making the right choice were strengthened significantly.",
      name: "Leigh Layton",
      title: "Manager",
      company: "RE/MAX Agent Development"
    },
    {
      quote: "We found launching an independent brokerage a bit daunting. From the very beginning, Amplified Solutions were genuinely interested in helping us achieve our business goals. They were able to lead us through a process and get us to reflect honestly on what we wanted. With their guidance, we were able to fast-track our plans and ultimately open the brokerage we had been dreaming about!",
      name: "Suzanne Dement & Traci Carney",
      title: "Co-Owners",
      company: "Nest Realty Jackson"
    },
    {
      quote: "My sister, Jane, and I were a small team in the process of starting our own boutique brokerage. We weren't quite sure how to get to the next step but we knew it started with the right hire. Lee and his team helped us to expand our thinking and get out of our 'comfort zone' in order to start thinking like a real business. We made a great hire and it was someone we probably would have never given a chance based on our limited experience.",
      name: "Kim Brogli",
      title: "Co-Owner",
      company: "Jane & Kim Brokerage"
    },
    {
      quote: "After working with Amplified Solutions, I can confidently say that my business has been impacted in ways I did not imagine. From the very beginning stages, I felt challenged, listened to and supported by the team. Not only did I walk away with a much clearer view of myself inside of my business, but also gained valuable insight into the type of real estate company I want to grow into.",
      name: "Naomi Hattaway",
      title: "Owner",
      company: "8th and Home"
    }
  ];

  return (
    <>
      <Header onOpenModal={openModal} />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Subtle Geometric Background */}
        <div className="fixed inset-0 opacity-[0.02] overflow-hidden">
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(30deg, #647b75 12%, transparent 12.5%, transparent 87%, #647b75 87.5%, #647b75),
                linear-gradient(150deg, #647b75 12%, transparent 12.5%, transparent 87%, #647b75 87.5%, #647b75),
                linear-gradient(30deg, #647b75 12%, transparent 12.5%, transparent 87%, #647b75 87.5%, #647b75),
                linear-gradient(150deg, #647b75 12%, transparent 12.5%, transparent 87%, #647b75 87.5%, #647b75)
              `,
              backgroundSize: '80px 140px',
              backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px'
            }}
          ></div>
        </div>

        <div className="relative z-10 pt-40 pb-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            
            {/* Header */}
            <div className="text-center mb-20">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6"
                  style={{fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'}}>
                Client Success Stories
              </h1>
              <div className="flex justify-center mb-8">
                <div className="w-20 h-1 bg-[#FFD580] rounded-full"></div>
              </div>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                See how real estate teams across North America have transformed their businesses with our lead operations expertise.
              </p>
            </div>

            {/* Featured Testimonial - Cindy Greenya */}
            <div className="mb-20">
              <div className="bg-gradient-to-br from-[#647b75] to-[#5a6d66] rounded-3xl p-12 md:p-16 text-white shadow-2xl">
                <div className="max-w-4xl mx-auto text-center">
                  <div className="text-6xl text-[#FFD580] mb-8">"</div>
                  <blockquote className="text-2xl md:text-3xl font-light leading-relaxed mb-8 italic">
                    {testimonials[3].quote}
                  </blockquote>
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-16 h-16 bg-[#FFD580] rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-900">
                        {testimonials[3].name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="text-left">
                      <div className="text-xl font-bold">{testimonials[3].name}</div>
                      <div className="text-[#9fe2bf]">{testimonials[3].title} at {testimonials[3].company}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonials Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {testimonials.filter((_, index) => index !== 3).map((testimonial, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className="flex flex-col h-full">
                    <div className="text-3xl text-[#FFD580] mb-4">"</div>
                    <blockquote className="text-gray-700 leading-relaxed mb-6 flex-grow italic">
                      {testimonial.quote.length > 200 ? `${testimonial.quote.substring(0, 200)}...` : testimonial.quote}
                    </blockquote>
                    <div className="mt-auto">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#9fe2bf] to-[#8dd9b1] rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-lg font-bold text-[#647b75]">
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{testimonial.name}</div>
                          <div className="text-sm text-[#647b75]">{testimonial.title}</div>
                          <div className="text-sm text-gray-500">{testimonial.company}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-[#9fe2bf] to-[#8dd9b1] rounded-3xl p-12 shadow-xl">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Ready to Join Them?</h3>
                <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                  Transform your lead management and conversion with our proven Follow Up Boss expertise.
                </p>
                <button
                  onClick={openModal}
                  className="bg-white hover:bg-gray-50 text-gray-800 font-bold px-8 py-4 rounded-xl transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg text-lg"
                >
                  Get Started Now
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
      
      <Footer onOpenModal={openModal} />
      
      {/* Contact Modal */}
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}