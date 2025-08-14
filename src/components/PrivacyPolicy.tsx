import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img 
                src="/xental logo copy 3.png" 
                alt="Xental Logo" 
                className="w-8 h-8 filter brightness-0 invert"
              />
              <span className="text-2xl font-bold text-teal-400">Xental</span>
            </Link>
            <Link 
              to="/" 
              className="flex items-center gap-2 text-gray-400 hover:text-teal-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-invert prose-teal max-w-none">
          <h1 className="text-4xl font-bold mb-8 text-white">Privacy Policy</h1>
          
          <div className="text-gray-300 leading-relaxed space-y-6">
            <p className="text-lg">
              <strong>Effective Date:</strong> 6/15/2025
            </p>
            
            <p>
              Xental AI, Inc. ("Xental," "we," "us," or "our") respects your privacy. This Privacy Policy explains how we collect, use, and protect your information when you visit our website (the "Site").
            </p>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-teal-400">1. Information We Collect</h2>
              <p>We collect only the information you voluntarily provide:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email address when you join our waitlist or request updates.</li>
              </ul>
              <p>We do not collect any health, diagnostic, financial, or sensitive personal data at this time.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-teal-400">2. How We Use Your Information</h2>
              <p>We may use the email address you provide to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Send updates about Xental and our launch timeline</li>
                <li>Offer early access or invitations to join the beta</li>
                <li>Share occasional insights or announcements related to dental technology and AI</li>
              </ul>
              <p className="font-semibold text-teal-400">We will never sell your data.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-teal-400">3. How We Store and Protect Your Data</h2>
              <p>
                Your email address is securely stored using industry-standard services. We take appropriate technical and organizational measures to protect your data against unauthorized access or disclosure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-teal-400">4. Third-Party Services</h2>
              <p>
                We may use third-party tools for analytics, email marketing, or hosting (e.g., Google Analytics, Vercel, Mailchimp). These tools may collect non-identifiable usage data (such as page views or device type) to help us improve the site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-teal-400">5. Your Rights</h2>
              <p>You may:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Unsubscribe from emails at any time using the link in our emails</li>
                <li>Request deletion of your data by contacting us at support@xental.ai</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-teal-400">6. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy as we grow. The effective date at the top will always reflect the most current version.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-teal-400">7. Contact</h2>
              <p>If you have questions or concerns, please contact us at:</p>
              <p className="text-teal-400">📧 support@xental.ai</p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800 mt-16">
        <div className="max-w-4xl mx-auto text-center text-gray-500 text-sm">
          © 2024 Xental AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default PrivacyPolicy;