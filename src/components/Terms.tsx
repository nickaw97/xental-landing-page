import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function Terms() {
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
          <h1 className="text-4xl font-bold mb-8 text-white">Terms of Service</h1>
          
          <div className="text-gray-300 leading-relaxed space-y-6">
            <div className="text-lg space-y-2">
              <p><strong>Effective Date:</strong> 6/15/2025</p>
              <p><strong>Company:</strong> Xental AI, Inc.</p>
            </div>
            
            <p>
              By accessing this website (the "Site"), you agree to be bound by the following terms and conditions ("Terms"). If you do not agree, please do not use the Site.
            </p>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-teal-400">1. Use of the Site</h2>
              <p>
                The Site is provided for informational purposes only. Xental AI is currently in development and not yet offering a commercial product or service.
              </p>
              
              <div className="mt-4">
                <p className="font-semibold">You may:</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Browse the website for personal, non-commercial use</li>
                  <li>Sign up to receive updates or join our waitlist</li>
                </ul>
              </div>

              <div className="mt-4">
                <p className="font-semibold">You may not:</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Attempt to hack, reverse-engineer, or disrupt the Site</li>
                  <li>Use the Site in a way that violates laws or infringes rights</li>
                  <li>Collect information from other users or our systems without permission</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-teal-400">2. Intellectual Property</h2>
              <p>
                All content on the Site—including logos, branding, text, and graphics—is the property of Xental AI, Inc. and may not be copied or used without written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-teal-400">3. Email Signup and Communication</h2>
              <p>
                By submitting your email, you agree to receive occasional communications from us. You may unsubscribe at any time. We are not responsible for delays or delivery issues with your email provider.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-teal-400">4. Disclaimer</h2>
              <p>
                The Site and all content are provided "as is" without warranties of any kind. We do not guarantee accuracy, completeness, or availability.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-teal-400">5. Limitation of Liability</h2>
              <p>
                To the fullest extent allowed by law, Xental AI will not be liable for any indirect, incidental, or consequential damages arising from your use of the Site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-teal-400">6. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of Pennsylvania, without regard to conflict of law principles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-teal-400">7. Changes to Terms</h2>
              <p>
                We may update these Terms at any time. Continued use of the Site after changes constitutes your acceptance of the revised Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-teal-400">8. Contact</h2>
              <p>For any legal or support questions, contact:</p>
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

export default Terms;