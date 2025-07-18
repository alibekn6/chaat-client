import React from 'react'

export const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none text-left">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using Reeply ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
              <p className="text-gray-700 mb-4">
                These Terms of Service ("Terms") govern your use of our AI-powered chatbot generation service, which automatically creates customized chatbots for businesses based on provided information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 mb-4">
              Reeply provides an AI-powered platform that:
              </p>
              <ul className="list-none pl-0 mb-4 text-gray-700">
                <li>Automatically generates customized chatbots for businesses</li>
                <li>Uses artificial intelligence to create responses based on business information</li>
                <li>Provides tools for managing and customizing chatbot behavior</li>
                <li>Offers analytics and performance monitoring for chatbots</li>
                <li>Integrates with various platforms and communication channels</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts and Registration</h2>
              <p className="text-gray-700 mb-4">
                To use our Service, you must:
              </p>
              <ul className="list-none pl-0 mb-4 text-gray-700">
                <li>Be at least 18 years old or have parental consent</li>
                <li>Register for an account using valid information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized use</li>
                <li>Be responsible for all activities under your account</li>
              </ul>
              <p className="text-gray-700 mb-4">
                You may register using Google OAuth or other approved authentication methods. By using these services, you agree to their respective terms of service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Acceptable Use Policy</h2>
              <p className="text-gray-700 mb-4">
                You agree not to use the Service to:
              </p>
              <ul className="list-none pl-0 mb-4 text-gray-700">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Transmit harmful, offensive, or inappropriate content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with the proper functioning of the Service</li>
                <li>Use the Service for spam or unsolicited communications</li>
                <li>Create chatbots that promote illegal activities</li>
                <li>Impersonate others or provide false information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Business Information and Content</h2>
              <p className="text-gray-700 mb-4">
                When using our Service, you may provide business information, including:
              </p>
              <ul className="list-none pl-0 mb-4 text-gray-700">
                <li>Business descriptions and policies</li>
                <li>Customer service procedures</li>
                <li>Frequently asked questions and responses</li>
                <li>Brand guidelines and tone preferences</li>
                <li>Industry-specific information</li>
              </ul>
              <p className="text-gray-700 mb-4">
                You represent and warrant that:
              </p>
              <ul className="list-none pl-0 mb-4 text-gray-700">
                <li>You have the right to provide this information</li>
                <li>The information is accurate and up-to-date</li>
                <li>The information does not violate any third-party rights</li>
                <li>The information complies with applicable laws</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. AI-Generated Content</h2>
              <p className="text-gray-700 mb-4">
                Our Service uses artificial intelligence to generate chatbot responses and content. You acknowledge that:
              </p>
              <ul className="list-none pl-0 mb-4 text-gray-700">
                <li>AI-generated content may not always be accurate or appropriate</li>
                <li>You are responsible for reviewing and approving all generated content</li>
                <li>We are not liable for any consequences of AI-generated responses</li>
                <li>You should monitor and test your chatbots regularly</li>
                <li>AI responses are based on the information you provide</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Intellectual Property Rights</h2>
              <p className="text-gray-700 mb-4">
                <strong>Our Rights:</strong> The Service and its original content, features, and functionality are owned by Reeply and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Your Rights:</strong> You retain ownership of your business information and content. However, you grant us a limited license to use this information to provide our Service.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>AI-Generated Content:</strong> You own the rights to chatbot responses generated specifically for your business, subject to our right to use aggregated, anonymized data for service improvement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Privacy and Data Protection</h2>
              <p className="text-gray-700 mb-4">
                Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
              </p>
              <p className="text-gray-700 mb-4">
                You agree to comply with applicable data protection laws and regulations when using our Service, including but not limited to GDPR, CCPA, and other privacy frameworks.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Service Availability and Modifications</h2>
              <p className="text-gray-700 mb-4">
                We strive to provide reliable service but cannot guarantee:
              </p>
              <ul className="list-none pl-0 mb-4 text-gray-700">
                <li>Uninterrupted or error-free operation</li>
                <li>Specific response times or availability</li>
                <li>Compatibility with all devices or browsers</li>
                <li>Preservation of all data or settings</li>
              </ul>
              <p className="text-gray-700 mb-4">
                We may modify, suspend, or discontinue the Service at any time with reasonable notice. We will notify you of any material changes to the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Payment Terms</h2>
              <p className="text-gray-700 mb-4">
                Some features of our Service may require payment. By subscribing to paid services, you agree to:
              </p>
              <ul className="list-none pl-0 mb-4 text-gray-700">
                <li>Pay all fees in advance</li>
                <li>Provide accurate billing information</li>
                <li>Authorize recurring payments if applicable</li>
                <li>Notify us of any billing disputes within 30 days</li>
              </ul>
              <p className="text-gray-700 mb-4">
                All fees are non-refundable except as required by law or as specified in our refund policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, Reeply SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-none pl-0 mb-4 text-gray-700">
                <li>Loss of profits, data, or business opportunities</li>
                <li>Damages resulting from AI-generated content</li>
                <li>Service interruptions or technical issues</li>
                <li>Third-party actions or content</li>
                <li>Security breaches or data loss</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Our total liability shall not exceed the amount paid by you for the Service in the 12 months preceding the claim.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Disclaimer of Warranties</h2>
              <p className="text-gray-700 mb-4">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-none pl-0 mb-4 text-gray-700">
                <li>Warranties of merchantability or fitness for a particular purpose</li>
                <li>Warranties regarding accuracy or reliability of AI-generated content</li>
                <li>Warranties of non-infringement</li>
                <li>Warranties regarding security or data protection</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Indemnification</h2>
              <p className="text-gray-700 mb-4">
                You agree to indemnify and hold harmless Reeply, its officers, directors, employees, and agents from and against any claims, damages, losses, and expenses (including reasonable attorneys' fees) arising out of or relating to:
              </p>
              <ul className="list-none pl-0 mb-4 text-gray-700">
                <li>Your use of the Service</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any third-party rights</li>
                <li>Content provided by you or your chatbots</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Termination</h2>
              <p className="text-gray-700 mb-4">
                You may terminate your account at any time by contacting us. We may terminate or suspend your access to the Service immediately, without prior notice, for any reason, including:
              </p>
              <ul className="list-none pl-0 mb-4 text-gray-700">
                <li>Violation of these Terms</li>
                <li>Fraudulent or illegal activity</li>
                <li>Non-payment of fees</li>
                <li>Extended periods of inactivity</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Upon termination, your right to use the Service will cease immediately, and we may delete your account and data in accordance with our data retention policies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Governing Law and Dispute Resolution</h2>
              <p className="text-gray-700 mb-4">
                These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
              </p>
              <p className="text-gray-700 mb-4">
                Any disputes arising from these Terms or the Service shall be resolved through binding arbitration in accordance with the rules of [Arbitration Organization]. The arbitration shall be conducted in [City, State/Country].
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">16. Severability</h2>
              <p className="text-gray-700 mb-4">
                If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">17. Entire Agreement</h2>
              <p className="text-gray-700 mb-4">
                These Terms, together with our Privacy Policy, constitute the entire agreement between you and Reeply regarding the Service and supersede all prior agreements and understandings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">18. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these Terms at any time. We will notify you of any material changes by:
              </p>
              <ul className="list-none pl-0 mb-4 text-gray-700">
                <li>Posting the updated Terms on our website</li>
                <li>Sending you an email notification</li>
                <li>Displaying a notice in our application</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Your continued use of the Service after any changes constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">19. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> legal@Reeply.com<br />
                  <strong>Address:</strong> Kazakhstan, Almaty, Satbayev 22<br />
                  <strong>Phone:</strong> +77056146518
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">20. Force Majeure</h2>
              <p className="text-gray-700 mb-4">
                Neither party shall be liable for any failure or delay in performance under these Terms due to circumstances beyond their reasonable control, including but not limited to acts of God, natural disasters, war, terrorism, riots, fire, labor disputes, or government actions.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
} 