import React from 'react'

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none text-left">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                Welcome to Reeply ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered chatbot generation service.
              </p>
              <p className="text-gray-700 mb-4">
                Our service automatically generates customized chatbots for businesses based on information provided by users about their business operations, customer service needs, and specific requirements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-medium text-gray-900 mb-3">2.1 Personal Information</h3>
              <p className="text-gray-700 mb-4">
                We collect the following personal information:
              </p>
              <ul className="list-none pl-0 mb-4 text-gray-700">
                <li>Name and email address (when you register or sign in via Google OAuth)</li>
                <li>Business information you provide during onboarding</li>
                <li>Customer service data and business requirements</li>
                <li>Chatbot configuration preferences</li>
                <li>Usage data and interaction patterns</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 mb-3">2.2 Business Information</h3>
              <p className="text-gray-700 mb-4">
                We collect business-specific information including:
              </p>
              <ul className="list-none pl-0 mb-4 text-gray-700">
                <li>Business name and description</li>
                <li>Industry and sector information</li>
                <li>Customer service policies and procedures</li>
                <li>Frequently asked questions and responses</li>
                <li>Brand guidelines and tone preferences</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 mb-3">2.3 Technical Information</h3>
              <p className="text-gray-700 mb-4">
                We automatically collect technical information including:
              </p>
              <ul className="list-none pl-0 mb-4 text-gray-700">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Usage analytics and performance data</li>
                <li>Error logs and debugging information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use the collected information for the following purposes:
              </p>
              <ul className="list-none pl-0 mb-4 text-gray-700">
                <li>To provide and maintain our AI chatbot generation service</li>
                <li>To create customized chatbots based on your business requirements</li>
                <li>To improve our AI algorithms and service quality</li>
                <li>To communicate with you about your account and service updates</li>
                <li>To provide customer support and technical assistance</li>
                <li>To ensure security and prevent fraud</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. AI and Machine Learning</h2>
              <p className="text-gray-700 mb-4">
                Our service uses artificial intelligence and machine learning to:
              </p>
              <ul className="list-none pl-0 mb-4 text-gray-700">
                <li>Generate customized chatbot responses based on your business information</li>
                <li>Learn from user interactions to improve chatbot performance</li>
                <li>Analyze patterns to enhance service quality</li>
                <li>Optimize chatbot configurations for better user experience</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Your business information is used solely to train and improve the AI models for your specific chatbot. We do not use your data to train general-purpose AI models that could benefit other users.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Information Sharing and Disclosure</h2>
              <p className="text-gray-700 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties, except in the following circumstances:
              </p>
              <ul className="list-none pl-0 mb-4 text-gray-700">
                <li>With your explicit consent</li>
                <li>To comply with legal requirements or court orders</li>
                <li>To protect our rights, property, or safety</li>
                <li>To service providers who assist in operating our service (under strict confidentiality agreements)</li>
                <li>In connection with a business transfer or merger (with notice to users)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate technical and organizational security measures to protect your information, including:
              </p>
              <ul className="list-none pl-0 mb-4 text-gray-700">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication measures</li>
                <li>Secure data centers and infrastructure</li>
                <li>Employee training on data protection</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Your Rights and Choices</h2>
              <p className="text-gray-700 mb-4">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-none pl-0 mb-4 text-gray-700">
                <li>Access and review your personal information</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to processing of your information</li>
                <li>Request data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
              <p className="text-gray-700 mb-4">
                To exercise these rights, please contact us at privacy@reeply.works
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar tracking technologies to:
              </p>
              <ul className="list-none pl-0 mb-4 text-gray-700">
                <li>Remember your preferences and settings</li>
                <li>Analyze website usage and performance</li>
                <li>Provide personalized content and features</li>
                <li>Ensure security and prevent fraud</li>
              </ul>
              <p className="text-gray-700 mb-4">
                You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Third-Party Services</h2>
              <p className="text-gray-700 mb-4">
                Our service integrates with third-party services including:
              </p>
              <ul className="list-none pl-0 mb-4 text-gray-700">
                <li>Google OAuth for authentication</li>
                <li>Cloud hosting and infrastructure services</li>
                <li>Analytics and monitoring tools</li>
                <li>Customer support platforms</li>
              </ul>
              <p className="text-gray-700 mb-4">
                These services have their own privacy policies, and we encourage you to review them.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Data Retention</h2>
              <p className="text-gray-700 mb-4">
                We retain your personal information for as long as necessary to:
              </p>
              <ul className="list-none pl-0 mb-4 text-gray-700">
                <li>Provide our services to you</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes and enforce agreements</li>
                <li>Improve our services</li>
              </ul>
              <p className="text-gray-700 mb-4">
                When you delete your account, we will delete or anonymize your personal information within 30 days, except where retention is required by law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. International Data Transfers</h2>
              <p className="text-gray-700 mb-4">
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy and applicable data protection laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Children's Privacy</h2>
              <p className="text-gray-700 mb-4">
                Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by:
              </p>
              <ul className="list-none pl-0 mb-4 text-gray-700">
                <li>Posting the updated policy on our website</li>
                <li>Sending you an email notification</li>
                <li>Displaying a notice in our application</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Your continued use of our service after any changes constitutes acceptance of the updated Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> privacy@reeply.works<br />
                  <strong>Address:</strong> Kazakhstan, Almaty, Satbayev 22<br />
                  <strong>Phone:</strong> +77056146518
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Legal Basis for Processing (GDPR)</h2>
              <p className="text-gray-700 mb-4">
                For users in the European Union, our legal basis for processing your personal information includes:
              </p>
              <ul className="list-none pl-0 mb-4 text-gray-700">
                <li>Consent (when you explicitly agree to processing)</li>
                <li>Contract performance (to provide our services)</li>
                <li>Legitimate interests (to improve our services and ensure security)</li>
                <li>Legal obligations (to comply with applicable laws)</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
} 