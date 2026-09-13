import React from 'react';
import { Header } from '../common/Header';
import { Footer } from '../common/Footer';
import { FileText, CheckCircle2, AlertTriangle, ShieldCheck, Scale } from 'lucide-react';

interface TermsOfServiceProps {
  onNavigate: (path: string) => void;
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({ onNavigate }) => {
  const lastUpdated = 'September 13, 2026';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header currentPath="/terms-of-service" onNavigate={onNavigate} />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
            <Scale className="w-3.5 h-3.5 text-emerald-600" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
            Terms of Service
          </h1>
          <p className="text-sm text-slate-500">
            Last Updated: <span className="font-medium text-slate-700">{lastUpdated}</span> • Effective Date: January 1, 2025
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs space-y-10 text-sm text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center space-x-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              <span>1. Agreement to Terms</span>
            </h2>
            <p>
              Welcome to <strong>OnlineTrimmer</strong> ("we," "our," or "us"). By accessing or utilizing our website located at{' '}
              <a href="https://onlinetrimmer.com" className="text-emerald-700 underline font-medium">onlinetrimmer.com</a> and its suite of browser-based media tools (including Video Trimmer, Audio Trimmer, Split PDF, and Sign PDF), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please discontinue use of our site immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>2. Permitted Use & Free Access</span>
            </h2>
            <p className="mb-3">
              OnlineTrimmer provides browser-based utilities free of charge for both personal and commercial purposes. You are granted a non-exclusive, revocable, non-transferable license to use the tools in compliance with these terms:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
              <li>You may trim, edit, split, and sign your own audio, video, and PDF files.</li>
              <li>You do not need to register an account or provide payment credentials.</li>
              <li>You agree not to reverse engineer, scrape, frame, or launch automated bot crawlers that disrupt site performance or bypass advertising units.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>3. User Content & Intellectual Property Ownership</span>
            </h2>
            <p className="mb-3">
              <strong>You retain 100% of your intellectual property rights.</strong> Because our tools execute entirely within client-side memory in your browser:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
              <li>OnlineTrimmer claims no ownership, copyright, or licensing rights over the videos, songs, voice recordings, or documents you load into our tools.</li>
              <li>We never view, copy, syndicate, or distribute your content.</li>
              <li>You warrant that you possess all legal rights and permissions to edit and export the files you process using our services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <span>4. Disclaimer of Warranties</span>
            </h2>
            <p className="mb-3">
              OnlineTrimmer and all associated tools are provided on an <strong>"AS IS"</strong> and <strong>"AS AVAILABLE"</strong> basis without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
            </p>
            <p>
              While we engineer our client-side software to operate reliably across modern browsers, we do not warrant that the website will be error-free, uninterrupted, or compatible with obsolete browser versions or corrupted media containers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by applicable law, in no event shall OnlineTrimmer, its operators, creators, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, data, or files arising out of or related to your use of or inability to use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Advertising & Third-Party Links</h2>
            <p>
              Our website displays third-party advertisements served by Google AdSense and may contain links to external websites. We do not endorse or assume responsibility for the content, privacy practices, or goods offered by third-party advertisers. Your interactions with advertisers are governed solely by their respective terms and privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">7. Modifications to the Service and Terms</h2>
            <p>
              We reserve the right to modify, suspend, or discontinue any aspect of OnlineTrimmer at any time without prior notice. We may update these Terms of Service periodically, and the revised version will be effective immediately upon publication on this page.
            </p>
          </section>

          <section className="pt-4 border-t border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-3">8. Contact Information</h2>
            <p className="mb-2">
              For legal inquiries, copyright notices, or questions regarding these Terms of Service, please contact:
            </p>
            <div className="bg-slate-50 p-4 rounded-xl text-xs space-y-1 text-slate-600">
              <p><strong>OnlineTrimmer Legal Team</strong></p>
              <p>Email: <a href="mailto:legal@onlinetrimmer.com" className="text-emerald-700 underline font-medium">legal@onlinetrimmer.com</a></p>
              <p>Website: <a href="https://onlinetrimmer.com" className="text-emerald-700 underline font-medium">https://onlinetrimmer.com</a></p>
            </div>
          </section>
        </div>
      </main>

      <Footer currentPath="/terms-of-service" onNavigate={onNavigate} />
    </div>
  );
};
