import React from 'react';
import { Header } from '../common/Header';
import { Footer } from '../common/Footer';
import { Cookie, CheckCircle2, ShieldCheck, Sliders, ExternalLink } from 'lucide-react';

interface CookiePolicyProps {
  onNavigate: (path: string) => void;
}

export const CookiePolicy: React.FC<CookiePolicyProps> = ({ onNavigate }) => {
  const lastUpdated = 'September 13, 2026';

  const triggerCookieSettings = () => {
    window.dispatchEvent(new CustomEvent('openCookieSettings'));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header currentPath="/cookie-policy" onNavigate={onNavigate} />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Badge */}
        <div className="mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
            <Cookie className="w-3.5 h-3.5 text-emerald-600" />
            <span>ePrivacy & GDPR Disclosures</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
            Cookie Policy
          </h1>
          <p className="text-sm text-slate-500">
            Last Updated: <span className="font-medium text-slate-700">{lastUpdated}</span>
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs space-y-10 text-sm text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center space-x-2">
              <Cookie className="w-5 h-5 text-emerald-600" />
              <span>1. What Are Cookies and Local Storage?</span>
            </h2>
            <p>
              Cookies are small text files that websites store on your computer or mobile device when you visit them. Along with HTML5 LocalStorage, they enable the site to remember your preferences (such as language selection or volume level) over time, and allow third-party partners like Google AdSense to serve relevant advertisements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>2. Categories of Cookies We Use</span>
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="font-bold text-slate-900 text-sm mb-1 flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>A. Strictly Necessary & Functional Cookies</span>
                </h3>
                <p className="text-xs text-slate-600">
                  These items are essential to provide core website functionality. For example, storing your language preference (English, French, Arabic, Russian) and recording whether you have acknowledged our Cookie Consent banner. They do not track your personal identity across other websites.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h3 className="font-bold text-slate-900 text-sm mb-1 flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>B. Advertising Cookies (Google AdSense)</span>
                </h3>
                <p className="text-xs text-slate-600 mb-2">
                  We use Google AdSense to serve advertisements on OnlineTrimmer. Google and its third-party advertising partners use cookies (such as the DoubleClick DART cookie) to serve relevant ads based on your visits to our site and other websites across the web.
                </p>
                <p className="text-xs text-slate-600">
                  These cookies help prevent the same ad from repeatedly appearing, detect and prevent click fraud, and display ads that are relevant to your general browsing interests.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center space-x-2">
              <Sliders className="w-5 h-5 text-emerald-600" />
              <span>3. How You Can Control and Manage Cookies</span>
            </h2>
            <p className="mb-3">
              You have the absolute right to decide whether to accept or reject cookies. You can manage your preferences through the following methods:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>
                <strong>On-Site Cookie Settings:</strong> You can adjust your consent on OnlineTrimmer at any time by clicking the{' '}
                <button
                  onClick={triggerCookieSettings}
                  className="text-emerald-700 underline font-semibold cursor-pointer"
                >
                  Adjust Cookie Settings
                </button>{' '}
                button.
              </li>
              <li>
                <strong>Google Ad Settings:</strong> Customize or opt out of Google's personalized advertising across the web at:{' '}
                <a
                  href="https://adssettings.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 underline font-medium inline-flex items-center space-x-1"
                >
                  <span>Google Ad Settings</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <strong>Browser Controls:</strong> Most web browsers (Chrome, Safari, Firefox, Edge) allow you to block third-party cookies or wipe all cookie history via their Privacy & Security settings.
              </li>
            </ul>
          </section>

          <section className="pt-4 border-t border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-2">4. Questions About Cookies?</h2>
            <p className="text-xs text-slate-600">
              For any additional details regarding our cookie practices or data privacy standards, please email our privacy team at{' '}
              <a href="mailto:privacy@onlinetrimmer.com" className="text-emerald-700 underline font-medium">
                privacy@onlinetrimmer.com
              </a>.
            </p>
          </section>
        </div>
      </main>

      <Footer currentPath="/cookie-policy" onNavigate={onNavigate} />
    </div>
  );
};
