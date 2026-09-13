import React, { useState } from 'react';
import { Header } from '../common/Header';
import { Footer } from '../common/Footer';
import { Mail, MessageSquare, Clock, CheckCircle2, Send, HelpCircle, ShieldCheck } from 'lucide-react';

interface ContactUsProps {
  onNavigate: (path: string) => void;
}

export const ContactUs: React.FC<ContactUsProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Question',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate swift client processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header currentPath="/contact" onNavigate={onNavigate} />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Badge */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
            <Mail className="w-3.5 h-3.5 text-emerald-600" />
            <span>Support & Inquiries</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
            Contact Us
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Have a question about our client-side tools, found a bug in a specific video format, or have a business inquiry? We're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Details Column */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Direct Channels</span>
              </h2>

              <div className="space-y-3 text-xs text-slate-600">
                <div>
                  <span className="font-semibold text-slate-800 block mb-0.5">Support & Feedback:</span>
                  <a
                    href="mailto:support@onlinetrimmer.com"
                    className="text-emerald-700 hover:text-emerald-800 font-medium underline"
                  >
                    support@onlinetrimmer.com
                  </a>
                </div>

                <div>
                  <span className="font-semibold text-slate-800 block mb-0.5">Privacy & Legal:</span>
                  <a
                    href="mailto:privacy@onlinetrimmer.com"
                    className="text-emerald-700 hover:text-emerald-800 font-medium underline"
                  >
                    privacy@onlinetrimmer.com
                  </a>
                </div>

                <div>
                  <span className="font-semibold text-slate-800 block mb-0.5">Partnerships & Ads:</span>
                  <a
                    href="mailto:ads@onlinetrimmer.com"
                    className="text-emerald-700 hover:text-emerald-800 font-medium underline"
                  >
                    ads@onlinetrimmer.com
                  </a>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center space-x-2 text-xs text-slate-500">
                <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Response time: Usually within 24–48 hours</span>
              </div>
            </div>

            {/* Quick Help Card */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 text-xs text-emerald-950 space-y-2">
              <div className="font-bold flex items-center space-x-1.5 text-emerald-900">
                <HelpCircle className="w-4 h-4 text-emerald-700" />
                <span>Frequently Asked Questions</span>
              </div>
              <p className="text-emerald-800 leading-relaxed">
                Looking for answers about file formats, codec limitations, or audio waveforms? Check our comprehensive guides:
              </p>
              <button
                onClick={() => onNavigate('/articles')}
                className="text-emerald-700 hover:text-emerald-900 font-semibold underline cursor-pointer inline-block pt-1"
              >
                Browse Articles & Guides →
              </button>
            </div>
          </div>

          {/* Interactive Contact Form Column */}
          <div className="md:col-span-2">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Message Received!</h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out to OnlineTrimmer. Our team has received your message and will reply to <span className="font-semibold text-slate-800">{formData.email}</span> within 24 to 48 hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', subject: 'General Question', message: '' });
                    }}
                    className="inline-flex items-center text-xs text-emerald-700 font-semibold hover:underline pt-2 cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block font-semibold text-slate-700 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 text-xs transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block font-semibold text-slate-700 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 text-xs transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block font-semibold text-slate-700 mb-1.5">
                      Subject Topic
                    </label>
                    <select
                      id="contact-subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 text-xs transition-all bg-white"
                    >
                      <option value="General Question">General Question</option>
                      <option value="Bug Report or Format Issue">Bug Report or Format Issue</option>
                      <option value="Feature Request">Feature Request</option>
                      <option value="Privacy or Data Protection">Privacy or Data Protection</option>
                      <option value="Advertising or Partnership">Advertising / Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block font-semibold text-slate-700 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please describe your question or issue in detail..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 text-xs transition-all leading-relaxed"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 flex items-center space-x-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>We never share your email address.</span>
                    </span>

                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-5 rounded-xl transition-all cursor-pointer shadow-xs disabled:opacity-50"
                    >
                      <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer currentPath="/contact" onNavigate={onNavigate} />
    </div>
  );
};
