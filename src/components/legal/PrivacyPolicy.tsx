import React from 'react';
import { Header } from '../common/Header';
import { Footer } from '../common/Footer';
import { ShieldCheck, Lock, EyeOff, Cookie, Globe, Server, UserCheck } from 'lucide-react';

interface PrivacyPolicyProps {
  onNavigate: (path: string) => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onNavigate }) => {
  const lastUpdated = 'September 13, 2026';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header currentPath="/privacy-policy" onNavigate={onNavigate} />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Badge */}
        <div className="mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>GDPR, CCPA & Google AdSense Compliant</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-500">
            Last Updated: <span className="font-medium text-slate-700">{lastUpdated}</span> • Effective Date: January 1, 2025
          </p>
        </div>

        {/* Executive Summary Card */}
        <div className="bg-white border-2 border-emerald-200/80 rounded-2xl p-6 mb-10 shadow-xs">
          <div className="flex items-center space-x-2 text-emerald-900 font-bold text-base mb-2">
            <Lock className="w-5 h-5 text-emerald-600" />
            <span>Executive Privacy Commitment: 100% Client-Side Architecture</span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            At <strong>OnlineTrimmer</strong> (<a href="https://onlinetrimmer.com" className="text-emerald-700 underline font-medium">onlinetrimmer.com</a>), your privacy is our architectural foundation. Unlike conventional cloud media converters, <strong>none of your video files, audio tracks, or PDF documents are ever uploaded, transmitted, or stored on our servers</strong>. All decoding, timeline cutting, waveform rendering, and document signing occur exclusively within your device's web browser using client-side WebAssembly, HTML5 APIs, and vector engines.
          </p>
        </div>

        {/* Detailed Sections */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs space-y-10 text-sm text-slate-700 leading-relaxed">
          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center space-x-2">
              <EyeOff className="w-5 h-5 text-emerald-600" />
              <span>1. Information We Do NOT Collect (Your Media Files)</span>
            </h2>
            <p className="mb-3">
              When you use our Video Trimmer, Audio Cutter, Split PDF, or Sign PDF tools:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
              <li>Your video files (MP4, MOV, WebM, MKV, AVI) remain 100% on your local computer or smartphone.</li>
              <li>Your audio files (MP3, WAV, M4A) are processed entirely via the local Web Audio API.</li>
              <li>Your PDF files and electronic signatures are manipulated locally using client-side memory buffers.</li>
              <li>We operate zero remote storage buckets, zero conversion queues, and zero file caching servers.</li>
            </ul>
          </section>

          {/* Section 2: Google AdSense Mandatory Disclosures */}
          <section className="p-6 bg-slate-50 border border-slate-200 rounded-xl">
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center space-x-2">
              <Cookie className="w-5 h-5 text-emerald-600" />
              <span>2. Google AdSense & Third-Party Advertising Disclosures</span>
            </h2>
            <p className="mb-3">
              To keep our media utilities completely free and unrestricted, we partner with <strong>Google AdSense</strong> to display advertisements across our website. Google AdSense policies require the following mandatory disclosures:
            </p>
            <div className="space-y-3 pl-2 border-l-2 border-emerald-500 text-slate-800">
              <p>
                • <strong>Third-Party Vendors & Cookies:</strong> Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to our website or other websites across the Internet.
              </p>
              <p>
                • <strong>DoubleClick DART Cookies:</strong> Google's use of advertising cookies enables it and its partners to serve targeted, relevant ads to our users based on their visits to OnlineTrimmer and/or other sites on the Internet.
              </p>
              <p>
                • <strong>Opting Out of Personalized Advertising:</strong> Users may freely opt out of personalized advertising by visiting Google's official Ad Settings page at:{' '}
                <a
                  href="https://adssettings.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 underline font-semibold hover:text-emerald-800"
                >
                  https://adssettings.google.com
                </a>.
              </p>
              <p>
                • <strong>Digital Advertising Alliance (DAA) Opt-Out:</strong> Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting the Network Advertising Initiative (NAI) or AboutAds consumer choice page at:{' '}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 underline font-semibold hover:text-emerald-800"
                >
                  www.aboutads.info/choices
                </a>.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center space-x-2">
              <Server className="w-5 h-5 text-emerald-600" />
              <span>3. Information We Collect Automatically (Log & Diagnostic Data)</span>
            </h2>
            <p className="mb-3">
              Like virtually all web properties, our hosting infrastructure automatically collects standard, non-personally identifiable diagnostic data in web server access logs. This data includes:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
              <li>Browser type and version (User-Agent string)</li>
              <li>Operating system platform (Windows, macOS, iOS, Android, Linux)</li>
              <li>Referring URL and pages visited on OnlineTrimmer</li>
              <li>Date, time stamp, and anonymized IP address (used strictly for geolocation routing and DDoS mitigation)</li>
            </ul>
            <p className="mt-3">
              This diagnostic information is never linked to individual identity and is used purely to ensure server stability, bandwidth optimization, and anti-abuse defenses.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center space-x-2">
              <Globe className="w-5 h-5 text-emerald-600" />
              <span>4. European General Data Protection Regulation (GDPR) Rights</span>
            </h2>
            <p className="mb-3">
              If you reside within the European Economic Area (EEA) or the United Kingdom (UK), you possess statutory privacy rights under the EU General Data Protection Regulation (GDPR). OnlineTrimmer is designed to minimize personal data processing by design:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li><strong>Right to Access & Rectification:</strong> Since we do not require account registration and do not store personal profiles, we hold no user files or personally identifiable databases.</li>
              <li><strong>Right to Erasure (Right to be Forgotten):</strong> Any temporary in-memory buffers created by your browser are instantly wiped when you close or reload the browser tab.</li>
              <li><strong>Right to Withdraw Consent:</strong> You can withdraw consent for analytical or advertising cookies at any time via your browser settings or our Cookie Settings module.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center space-x-2">
              <UserCheck className="w-5 h-5 text-emerald-600" />
              <span>5. California Consumer Privacy Act (CCPA / CPRA) Disclosures</span>
            </h2>
            <p className="mb-3">
              Under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA), California residents have specific rights regarding their personal data:
            </p>
            <div className="bg-slate-50 p-4 rounded-xl space-y-2 text-slate-700">
              <p>• <strong>We Do Not Sell Your Personal Information:</strong> OnlineTrimmer does not sell, rent, or lease any personal data or user files to third parties for monetary consideration.</p>
              <p>• <strong>Non-Discrimination:</strong> We will never discriminate against any user for exercising their privacy rights under California law.</p>
              <p>• <strong>Do Not Track (DNT) Signals:</strong> We honor browser-level Do Not Track and Global Privacy Control (GPC) signals in accordance with relevant state guidelines.</p>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Children's Online Privacy Protection Act (COPPA)</h2>
            <p>
              OnlineTrimmer is a general audience media utility suite. We do not knowingly collect, solicit, or maintain personal information from children under the age of 13. If you believe a minor has inadvertently provided us with personal information, please contact us immediately, and we will delete such data promptly.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">7. Updates to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy periodically to reflect technological changes, regulatory guidelines, or updates to our advertising arrangements. When modifications are made, the "Last Updated" date at the top of this page will be revised. Continued use of our website constitutes your acceptance of the updated terms.
            </p>
          </section>

          {/* Section 8 */}
          <section className="pt-4 border-t border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-3">8. Contact Us Regarding Privacy Inquiries</h2>
            <p className="mb-3">
              If you have any questions, concerns, or requests regarding this Privacy Policy, our zero-upload architecture, or third-party advertising cookies, please reach out to our privacy officer:
            </p>
            <div className="bg-slate-50 p-4 rounded-xl text-xs space-y-1 text-slate-600">
              <p><strong>Entity:</strong> OnlineTrimmer Team (onlinetrimmer.com)</p>
              <p><strong>Email:</strong> <a href="mailto:privacy@onlinetrimmer.com" className="text-emerald-700 underline font-medium">privacy@onlinetrimmer.com</a></p>
              <p><strong>Direct Inquiries:</strong> <button onClick={() => onNavigate('/contact')} className="text-emerald-700 underline font-medium cursor-pointer">Visit our Contact Page</button></p>
            </div>
          </section>
        </div>
      </main>

      <Footer currentPath="/privacy-policy" onNavigate={onNavigate} />
    </div>
  );
};
