import React, { useEffect, useState } from 'react';
import { ChevronDown, Shield, Zap, Lock, Sparkles, Check } from 'lucide-react';
import { ToolConfig } from '../../types';
import { Header } from './Header';
import { Footer } from './Footer';
import { updatePageSEO } from '../../lib/seo';
import { CompetitorComparison } from '../seo/CompetitorComparison';
import { ToolEditorialContent } from '../seo/ToolEditorialContent';
import { AdUnit } from '../ads/AdUnit';
import { useLanguage } from '../../i18n/LanguageContext';
import { LOCALIZED_TOOL_CONTENT } from '../../i18n/toolContent';
import { Breadcrumbs } from './Breadcrumbs';

interface ToolLayoutProps {
  toolConfig: ToolConfig;
  currentPath: string;
  onNavigate: (path: string) => void;
  children: React.ReactNode;
}

export const ToolLayout: React.FC<ToolLayoutProps> = ({
  toolConfig,
  currentPath,
  onNavigate,
  children,
}) => {
  const { language, t } = useLanguage();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Retrieve localized content for current language, fallback to English / toolConfig defaults
  const localized = LOCALIZED_TOOL_CONTENT[language]?.[toolConfig.id];
  const activeH1 = localized?.h1 || toolConfig.h1;
  const activeSubheading = localized?.subheading || toolConfig.subheading;
  const activeHowItWorks = localized?.howItWorks || toolConfig.howItWorks;
  const activeFaqs = localized?.faqs || toolConfig.faqs;

  // Sync SEO metadata and JSON-LD schema on route/config/language change
  useEffect(() => {
    updatePageSEO(toolConfig, language);
  }, [toolConfig, language]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Navigation */}
      <Header currentPath={currentPath} onNavigate={onNavigate} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Visual Breadcrumb navigation for SEO & User Hierarchy */}
        {currentPath !== '/' && (
          <Breadcrumbs
            items={[
              { label: 'Tools', path: '/' },
              { label: activeH1 || toolConfig.name }
            ]}
            onNavigate={onNavigate}
            className="mb-6"
          />
        )}

        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          {toolConfig.badge && (
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100/70 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>{toolConfig.badge}</span>
            </div>
          )}

          {/* Semantic H1 matching primary target keyword in active language */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
            {activeH1}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto direct-answer-summary">
            {activeSubheading}
          </p>

          {/* Value props micro-bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-4 text-xs font-medium text-slate-500">
            <span className="inline-flex items-center space-x-1">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t('clientSide')}</span>
            </span>
            <span className="inline-flex items-center space-x-1">
              <Lock className="w-3.5 h-3.5 text-sky-600" />
              <span>{t('zeroStorage')}</span>
            </span>
            <span className="inline-flex items-center space-x-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>{t('noWatermarks')}</span>
            </span>
          </div>
        </section>

        {/* Primary Tool UI Area */}
        <section className="w-full mb-12">
          {children}
        </section>

        {/* Compliant Google AdSense Placement below tool */}
        <AdUnit className="mb-14" />

        {/* Format Specific Deep Dive (for programmatic SEO routes) */}
        {toolConfig.formatSpecific && (
          <section className="mb-16 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              About {toolConfig.formatSpecific.formatName}
            </h2>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              {toolConfig.formatSpecific.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                  Key Advantages
                </h3>
                <ul className="space-y-2">
                  {toolConfig.formatSpecific.advantages.map((adv, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs text-slate-600">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                  Typical Use Cases
                </h3>
                <ul className="space-y-2">
                  {toolConfig.formatSpecific.typicalUses.map((use, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                      <span>{use}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* In-depth Editorial Content Pillars */}
        <ToolEditorialContent toolConfig={toolConfig} onNavigate={onNavigate} />

        {/* Competitor Comparison Matrix */}
        <CompetitorComparison />

        {/* How It Works Section */}
        <section className="mb-16">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
              {t('howItWorksTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {t('howItWorksSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeHowItWorks.map((step) => (
              <div
                key={step.step}
                id={`step-${step.step}`}
                className="how-to-step-summary bg-white rounded-2xl border border-slate-200 p-6 relative shadow-xs hover:border-emerald-300 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-sm flex items-center justify-center mb-4 border border-emerald-100">
                  {step.step}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section (Accordion + JSON-LD) */}
        <section className="max-w-3xl mx-auto mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
              {t('faqTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {t('faqSubtitle')}
            </p>
          </div>

          <div className="space-y-3">
            {activeFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs"
                >
                  <button
                    type="button"
                    id={`faq-btn-${index}`}
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer hover:bg-slate-50/80 transition-colors"
                  >
                    <span className="text-sm font-bold text-slate-800 pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-emerald-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Shared Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
};
