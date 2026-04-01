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
              Effective Date: April 1, 2026
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 prose prose-lg max-w-none">
            
            <div className="space-y-8">

              <section>
                <p className="text-gray-700 leading-relaxed mb-6">
                  These Terms of Service govern the relationship between you ("Client") and Amplified Solutions Consulting LLC
                  ("Amplified Solutions," "Consultant," "we," or "us"), with a principal place of business at 9320 Brumbelow Crossing Way,
                  Alpharetta, GA 30022.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  By engaging our Services, you agree to these terms. Please read them carefully.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Scope of Services</h2>
                <p className="text-gray-700 mb-4">
                  Amplified Solutions provides ongoing automation and technology services for real estate businesses, including but not limited to:
                  CRM setup and optimization, automated reporting and dashboards, transaction coordination workflows, follow-up and nurture systems,
                  content systems, data cleanup, and custom automation development (collectively, "Services"). The specific scope of Services
                  for each Client is defined in the applicable service agreement or proposal ("Exhibit").
                </p>
                <p className="text-gray-700">
                  Services are provided on an ongoing, embedded basis. Amplified Solutions operates as a fractional technology partner,
                  continuously identifying and implementing automation opportunities within Client's operations. Either party may request
                  changes to the scope of Services by written notice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Payment Terms</h2>
                <p className="text-gray-700 mb-4">
                  Fees are set out in the service agreement and are billed as recurring monthly fees unless otherwise specified.
                  Monthly fees are charged in advance on the same date each month via the payment method on file.
                  We reserve the right to increase fees with 30 days written notice.
                </p>
                <p className="text-gray-700 mb-4">
                  If a payment fails, we will attempt to charge the payment method on file up to two additional times within 7 days.
                  If payment remains unsuccessful after 7 days, Services may be suspended until the account is brought current.
                  A late fee of $50 will be assessed for every 7 days past the due date.
                </p>
                <p className="text-gray-700">
                  Suspension of Services due to non-payment does not relieve Client of the obligation to pay outstanding balances,
                  nor does it constitute termination of this agreement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Client Responsibilities</h2>
                <p className="text-gray-700 mb-3">
                  To ensure effective service delivery, Client agrees to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Provide timely access to CRM platforms, email systems, and other tools necessary for automation development</li>
                  <li>Maintain active subscriptions to all third-party platforms required by the automations (e.g., Follow Up Boss, hosting providers, API services)</li>
                  <li>Cooperate in providing materials, information, and feedback needed to build and refine automations</li>
                  <li>Maintain current payment information for ongoing services</li>
                  <li>Not attempt to reverse-engineer, copy, or recreate proprietary automations, workflows, or systems built by Amplified Solutions</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Intellectual Property and Automation Licensing</h2>
                <p className="text-gray-700 mb-4">
                  This is a licensing arrangement, not a sale. All automations, workflows, systems, code, integrations, dashboards,
                  templates, and other work products created by Amplified Solutions ("Automation Systems") remain the sole intellectual
                  property of Amplified Solutions Consulting LLC. Client receives a non-exclusive, non-transferable, revocable license
                  to use the Automation Systems for the duration of the active service agreement and only for Client's own business operations.
                </p>
                <p className="text-gray-700 mb-4">
                  The license to use Automation Systems is contingent upon Client maintaining an active, paid subscription.
                  If the service agreement is terminated for any reason, the license is automatically revoked and Client must
                  immediately cease use of all Automation Systems.
                </p>
                <p className="text-gray-700 mb-4">
                  Client may not sublicense, resell, distribute, share, or make available any Automation Systems to third parties
                  without prior written consent from Amplified Solutions.
                </p>
                <p className="text-gray-700">
                  Amplified Solutions retains the right to use similar methodologies, techniques, and system architectures
                  for other clients. General knowledge, skills, and experience gained during the engagement remain with the Consultant.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Buyout Option</h2>
                <p className="text-gray-700 mb-4">
                  Client may request to purchase full ownership of some or all Automation Systems built for their business.
                  A buyout transfers intellectual property rights for the specified systems from Amplified Solutions to Client.
                </p>
                <p className="text-gray-700 mb-4">
                  Buyout pricing is determined on a case-by-case basis and considers the complexity, development time, and ongoing
                  value of the systems in question. Buyout terms must be agreed upon in writing by both parties before any transfer of ownership occurs.
                </p>
                <p className="text-gray-700">
                  Upon completion of a buyout, Amplified Solutions provides the systems "as-is" with no ongoing obligation to maintain,
                  update, or support the purchased systems unless a separate maintenance agreement is executed.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. System Access and Credentials</h2>
                <p className="text-gray-700 mb-4">
                  To perform Services, Amplified Solutions requires access to Client's third-party platforms, including but not limited to
                  CRM systems, email accounts, hosting platforms, and API credentials. Client agrees to provide necessary access levels
                  and credentials promptly upon request.
                </p>
                <p className="text-gray-700 mb-4">
                  Amplified Solutions will use Client credentials solely for the purpose of delivering contracted Services and will
                  follow reasonable security practices in storing and handling credentials.
                </p>
                <p className="text-gray-700">
                  Upon termination of services, Amplified Solutions will revoke its own access to Client platforms within 14 days
                  and will not retain copies of Client credentials. Client is responsible for revoking any access not directly
                  controlled by Amplified Solutions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Service Term and Termination</h2>
                <p className="text-gray-700 mb-4">
                  This agreement becomes effective when signed by both parties (or upon first payment, whichever occurs first)
                  and continues on a month-to-month basis until terminated.
                </p>
                <p className="text-gray-700 mb-4">
                  Either party may terminate this agreement with 30 days written notice. Written notice must be sent via email
                  to the address on file for the other party. The 30-day notice period begins on the date the notice is sent.
                </p>
                <p className="text-gray-700 mb-4">
                  Upon termination:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Client's license to use all Automation Systems is immediately revoked at the end of the notice period</li>
                  <li>Amplified Solutions will disable, remove, or deactivate Automation Systems within 14 days of the termination date</li>
                  <li>Client retains full ownership of their own data, contacts, leads, and any content they provided or created</li>
                  <li>Amplified Solutions retains ownership of all Automation Systems, code, workflows, and integrations</li>
                  <li>Client is responsible for payment through the end of the 30-day notice period regardless of whether Services are utilized during that time</li>
                  <li>Any outstanding balances become immediately due on the termination date</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  If Client wishes to retain any Automation Systems after termination, the Buyout Option (Section 5) must be exercised
                  prior to or during the 30-day notice period.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Independent Contractor Status</h2>
                <p className="text-gray-700 mb-3">
                  Amplified Solutions is an independent contractor. In this capacity:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>We have the right to perform services for others, including competitors of Client</li>
                  <li>We control the means, methods, and schedule of performing our services</li>
                  <li>We provide our own equipment and materials (except when working within Client's systems)</li>
                  <li>Client shall not provide insurance coverage or withhold taxes for Consultant</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Confidentiality</h2>
                <p className="text-gray-700 mb-4">
                  Both parties agree to protect confidential information disclosed during the engagement using at least the same
                  degree of care used to protect their own confidential information.
                </p>
                <p className="text-gray-700 mb-4">
                  Confidential information includes but is not limited to: business strategies, client lists, lead data, system
                  credentials, financial information, and proprietary automation logic.
                </p>
                <p className="text-gray-700">
                  Confidentiality obligations survive termination of this agreement for a period of two (2) years.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Data Ownership and Handling</h2>
                <p className="text-gray-700 mb-4">
                  Client's data remains Client's property at all times. This includes contacts, leads, transaction records,
                  communications, and any content provided by Client.
                </p>
                <p className="text-gray-700 mb-4">
                  In providing Services, Amplified Solutions may access Client's CRM, email systems, and databases. We agree to:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Handle all client data in accordance with applicable privacy laws</li>
                  <li>Use client data solely for providing contracted Services</li>
                  <li>Maintain appropriate security measures for data protection</li>
                  <li>Return or make available all client data upon termination of services</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  For clarity: Client owns their data. Amplified Solutions owns the systems that process, organize, and automate that data.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Service Level Expectations</h2>
                <p className="text-gray-700 mb-4">
                  While we strive to provide reliable automation systems, Client acknowledges that:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Automation performance depends on third-party platforms (CRM, email providers, APIs) that are outside our control</li>
                  <li>We do not guarantee specific business outcomes, revenue increases, or lead conversion rates</li>
                  <li>Third-party platform changes, outages, or API modifications may temporarily affect automation functionality</li>
                  <li>We will make reasonable efforts to address and resolve issues in a timely manner</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Warranties and Disclaimers</h2>
                <p className="text-gray-700 font-semibold mb-3">
                  THE SERVICES AND AUTOMATION SYSTEMS ARE PROVIDED "AS IS" WITHOUT ANY EXPRESS OR IMPLIED WARRANTIES,
                  INCLUDING WITHOUT LIMITATION ANY IMPLIED WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.
                  AMPLIFIED SOLUTIONS DOES NOT WARRANT THAT AUTOMATION SYSTEMS WILL OPERATE WITHOUT INTERRUPTION OR ERROR.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Limitation of Liability</h2>
                <p className="text-gray-700 mb-3">
                  Our liability is limited as follows:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>We shall not be liable for lost profits, lost data, or special, incidental, or consequential damages arising from the use or inability to use Automation Systems</li>
                  <li>Our total liability shall not exceed the total fees paid by Client in the six (6) months preceding the claim</li>
                  <li>We shall not be liable for disruptions caused by third-party platform changes, outages, or API modifications</li>
                  <li>Client shall indemnify us against third-party claims arising from Client's use of the Automation Systems</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Dispute Resolution</h2>
                <p className="text-gray-700 mb-4">
                  If a dispute arises, the parties agree to first attempt resolution through good-faith negotiation.
                  If negotiation fails within 30 days, the parties agree to mediation with a mutually agreed-upon mediator
                  in Fulton County, Georgia.
                </p>
                <p className="text-gray-700">
                  If mediation fails, disputes shall be submitted to binding arbitration in Fulton County, Georgia.
                  The prevailing party shall be entitled to recover reasonable attorney fees and costs.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">15. General Provisions</h2>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Applicable Law</h4>
                    <p className="text-gray-700">This Agreement is governed by the laws of the state of Georgia.</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Entire Agreement</h4>
                    <p className="text-gray-700">This Agreement, together with any Exhibits or service agreements, constitutes the entire agreement between the parties and supersedes all prior agreements.</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Severability</h4>
                    <p className="text-gray-700">If any provision is held invalid, the remainder of the Agreement shall remain in effect.</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">No Partnership</h4>
                    <p className="text-gray-700">This Agreement does not create a partnership, joint venture, or employment relationship.</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Assignment</h4>
                    <p className="text-gray-700">Client may not assign this Agreement without prior written consent. Amplified Solutions may assign this Agreement in connection with a merger, acquisition, or sale of substantially all of its assets.</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Amendments</h4>
                    <p className="text-gray-700">We may update these Terms from time to time. Material changes will be communicated with 30 days notice. Continued use of Services after changes take effect constitutes acceptance of the updated Terms.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
                <p className="text-gray-700">
                  For questions about these Terms, contact us at joey@amplifiedsolutions.com.
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