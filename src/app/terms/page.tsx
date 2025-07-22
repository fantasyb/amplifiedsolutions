'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function TermsOfServicePage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header onOpenModal={openModal} />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6"
                style={{fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'}}>
              Terms of Service
            </h1>
            <div className="flex justify-center mb-8">
              <div className="w-20 h-1 bg-[#FFD580] rounded-full"></div>
            </div>
            <p className="text-lg text-gray-600">
              Effective Date: January 1, 2025
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 prose prose-lg max-w-none">
            
            <div className="space-y-8">
              
              <section>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Welcome to Amplified Solutions! We appreciate you using our lead management and conversion services ("Services"). 
                  The Services are provided by Amplified Solutions Consulting LLC ("Amplified Solutions" or "Consultant"), 
                  with a principal place of business at 9320 Brumbelow Crossing Way, Alpharetta, GA 30022.
                </p>
                
                <p className="text-gray-700 leading-relaxed">
                  By using our Services, you are agreeing to these terms. Please read them carefully.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Scope of Services</h2>
                <p className="text-gray-700 mb-4">
                  Our services include lead management, Follow Up Boss optimization, ISA calling services, and lead conversion management 
                  as detailed in our service agreements ("Exhibit"). The nature and extent of the Services shall be set out in the Exhibit.
                </p>
                <p className="text-gray-700">
                  Either party may request changes to the Services by written notice. We reserve the right to provide estimates for 
                  proposed changes and may charge for costing change requests at our then-current daily rates.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Payment Terms</h2>
                <p className="text-gray-700 mb-4">
                  Fees are set out in the service agreement and may be stated as fixed monthly fees or on a time and materials basis. 
                  We reserve the right to increase fees with 30 days written notice.
                </p>
                <p className="text-gray-700">
                  Monthly service fees are due in advance unless otherwise specified. All invoices are due within 7 days of invoice date. 
                  A $50 late fee will be assessed for every 5 days past the due date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Client Responsibilities</h2>
                <p className="text-gray-700 mb-3">
                  To ensure effective service delivery, Client agrees to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Provide timely access to Follow Up Boss and other necessary systems</li>
                  <li>Cooperate in providing materials or information needed to complete work</li>
                  <li>Pay directly for any software subscriptions or hosting fees that remain with Client</li>
                  <li>Maintain current payment information for ongoing services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Service Term and Termination</h2>
                <p className="text-gray-700 mb-4">
                  This agreement becomes effective when signed by both parties and continues until terminated. Either party may terminate 
                  services with 30 days written notice without cause.
                </p>
                <p className="text-gray-700">
                  Upon termination, Consultant shall be entitled to full payment for services performed prior to the effective date of termination.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Independent Contractor Status</h2>
                <p className="text-gray-700 mb-3">
                  Amplified Solutions is an independent contractor. In this capacity:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>We have the right to perform services for others</li>
                  <li>We control the means and methods of performing our services</li>
                  <li>We provide our own equipment and materials (except when working within Client's systems)</li>
                  <li>Client shall not provide insurance coverage for Consultant</li>
                  <li>Client shall not withhold amounts that would normally be withheld from employee pay</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>
                <p className="text-gray-700 mb-4">
                  Consultant retains all intellectual property rights in work products created. Client receives a non-exclusive, 
                  worldwide license to use work products for developing and marketing Client's business, conditioned upon full payment of fees.
                </p>
                <p className="text-gray-700">
                  Consultant retains ownership of all proprietary materials, methodologies, and systems used in service delivery.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Confidentiality</h2>
                <p className="text-gray-700 mb-4">
                  We use reasonable care to protect Client's confidential information, meaning at least the same degree of care 
                  we use to protect our own confidential information.
                </p>
                <p className="text-gray-700">
                  Confidential information must be clearly marked as confidential or, if disclosed orally, summarized and identified 
                  as confidential in writing within 15 days of disclosure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data and Lead Management</h2>
                <p className="text-gray-700 mb-4">
                  In providing lead management and ISA services, we may access Client's customer relationship management systems 
                  and lead databases. We agree to:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Handle all lead data in accordance with applicable privacy laws</li>
                  <li>Use lead information solely for providing contracted services</li>
                  <li>Maintain appropriate security measures for data protection</li>
                  <li>Return or destroy lead data upon termination of services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Service Level Expectations</h2>
                <p className="text-gray-700 mb-4">
                  While we strive to provide excellent service, Client acknowledges that:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Lead conversion results depend on multiple factors including lead quality and market conditions</li>
                  <li>We provide services based on best practices but cannot guarantee specific outcomes</li>
                  <li>Our recommendations are based on information provided by Client and third parties</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Warranties and Disclaimers</h2>
                <p className="text-gray-700 font-semibold mb-3">
                  THE SERVICES ARE PROVIDED "AS IS" WITHOUT ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING WITHOUT LIMITATION 
                  ANY IMPLIED WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Limitation of Liability</h2>
                <p className="text-gray-700 mb-3">
                  Our liability is limited as follows:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>We shall not be liable for lost profits or special, incidental, or consequential damages</li>
                  <li>Our total liability shall not exceed the total fees paid by Client under the agreement</li>
                  <li>Client shall indemnify us against third-party claims arising from Client's performance under this agreement</li>
                  <li>We shall not be liable for recommendations based on third-party information we reasonably relied upon</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Dispute Resolution</h2>
                <p className="text-gray-700 mb-4">
                  If a dispute arises, the parties agree to first attempt resolution through mediation with a mutually agreed-upon 
                  mediator in Fulton County, Georgia.
                </p>
                <p className="text-gray-700">
                  If mediation fails, disputes shall be submitted to binding arbitration in Fulton County, Georgia. 
                  The arbitrator will allocate costs and attorney fees.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">13. General Provisions</h2>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Applicable Law</h4>
                    <p className="text-gray-700">This Agreement is governed by the laws of the state of Georgia.</p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Entire Agreement</h4>
                    <p className="text-gray-700">This Agreement constitutes the entire agreement between the parties.</p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Severability</h4>
                    <p className="text-gray-700">If any provision is held invalid, the remainder of the Agreement shall remain in effect.</p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">No Partnership</h4>
                    <p className="text-gray-700">This Agreement does not create a partnership or joint venture relationship.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
                <p className="text-gray-700">
                  For information about how to contact Amplified Solutions, please visit our contact page at: 
                  <a href="https://www.amplifiedsolutions.com/contact" className="text-[#647b75] hover:underline ml-1">
                    https://www.amplifiedsolutions.com/contact
                  </a>
                </p>
              </section>
              
            </div>
          </div>
        </div>
      </div>
      
      <Footer onOpenModal={openModal} />
    </>
  );
}