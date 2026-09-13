import React, { useEffect } from 'react';
import { SeoArticle, SEO_ARTICLES } from '../../config/articles';
import { Header } from '../common/Header';
import { Footer } from '../common/Footer';
import { ChevronRight, Clock, Calendar, User, ArrowLeft, ArrowRight, Lightbulb, CheckCircle, Sparkles, BookOpen, Share2 } from 'lucide-react';
import { updateArticleSEO } from '../../lib/seo';
import { AdUnit } from '../ads/AdUnit';
import { ADSENSE_CONFIG } from '../../config/adsense';

interface ArticleReaderProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const ArticleReader: React.FC<ArticleReaderProps> = ({ slug, onNavigate }) => {
  const article = SEO_ARTICLES.find((a) => a.slug === slug);

  useEffect(() => {
    if (article) {
      updateArticleSEO(article);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header currentPath="/articles" onNavigate={onNavigate} />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <BookOpen className="w-16 h-16 text-slate-300 mb-4" />
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Guide Not Found</h1>
          <p className="text-sm text-slate-500 max-w-md mb-6">
            The guide or tutorial you requested could not be located. Browse our full library of audio, video, and PDF trimming tutorials.
          </p>
          <button
            onClick={() => onNavigate('/articles')}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
          >
            Return to All Guides
          </button>
        </div>
        <Footer onNavigate={onNavigate} />
      </div>
    );
  }

  // Related articles
  const otherArticles = SEO_ARTICLES.filter((a) => a.id !== article.id).slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-emerald-100 selection:text-emerald-900">
      <Header currentPath="/articles" onNavigate={onNavigate} />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500 mb-6 flex-wrap">
          <button
            onClick={() => onNavigate('/')}
            className="hover:text-slate-800 transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <button
            onClick={() => onNavigate('/articles')}
            className="hover:text-slate-800 transition-colors cursor-pointer"
          >
            Guides
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-semibold truncate max-w-[200px] sm:max-w-md">
            {article.title}
          </span>
        </nav>

        {/* Article Header Card */}
        <header className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200/60">
              {article.category} Tutorial
            </span>
            <div className="flex items-center space-x-1 text-xs text-slate-500">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readingTime}</span>
            </div>
            <span className="text-slate-300">•</span>
            <div className="flex items-center space-x-1 text-xs text-slate-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>Updated {article.updatedDate}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            {article.h1}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl mb-6">
            {article.subtitle}
          </p>

          <div className="flex items-center space-x-3 pt-6 border-t border-slate-100">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-xs border border-slate-200">
              OT
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">{article.author}</div>
              <div className="text-[11px] text-slate-400">{article.authorRole}</div>
            </div>
          </div>
        </header>

        {/* 2-Column Content Layout: TOC & Body */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Article Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Key Takeaways Box (Google Featured Snippet Anchor & GEO direct-answer snippet) */}
            <div className="article-direct-answer bg-emerald-50/60 border-2 border-emerald-200 rounded-2xl p-6 shadow-xs">
              <div className="flex items-center space-x-2 text-emerald-900 font-bold text-sm mb-3">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span className="article-key-takeaway">Key Takeaways (Executive Summary)</span>
              </div>
              <ul className="space-y-2.5">
                {article.summaryPoints.map((point, index) => (
                  <li key={index} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Embedded Action CTA to Related Tool */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[11px] uppercase font-bold tracking-wider text-emerald-100 block mb-0.5">
                  Try the Browser Utility Free
                </span>
                <h4 className="text-base font-bold">
                  Use our {article.relatedToolName}
                </h4>
                <p className="text-xs text-emerald-100/90 mt-1">
                  100% Client-side. No registration, no watermarks, no upload limits.
                </p>
              </div>
              <button
                onClick={() => onNavigate(article.relatedToolPath)}
                className="px-5 py-2.5 rounded-xl bg-white text-emerald-800 text-xs font-bold hover:bg-emerald-50 transition-transform active:scale-95 shrink-0 flex items-center space-x-2 shadow-xs cursor-pointer"
              >
                <span>Launch Tool Now</span>
                <ArrowRight className="w-4 h-4 text-emerald-600" />
              </button>
            </div>

            {/* Content Sections */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-10">
              {article.contentSections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-24 space-y-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-1">
                      {section.heading}
                    </h2>
                    {section.subheading && (
                      <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                        {section.subheading}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    {section.paragraphs.map((p, idx) => (
                      <p key={idx} className="text-sm text-slate-700 leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>

                  {/* Bullet Points */}
                  {section.bulletPoints && section.bulletPoints.length > 0 && (
                    <ul className="space-y-2 bg-slate-50 rounded-xl p-4 border border-slate-100">
                      {section.bulletPoints.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-2" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Pro Tip Box */}
                  {section.proTip && (
                    <div className="flex items-start space-x-3 p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs sm:text-sm leading-relaxed">
                      <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold block mb-0.5 text-amber-950">Expert Pro Tip:</strong>
                        <span>{section.proTip}</span>
                      </div>
                    </div>
                  )}

                  {/* Data Table */}
                  {section.table && (
                    <div className="overflow-x-auto my-4 border border-slate-200 rounded-xl">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
                          <tr>
                            {section.table.headers.map((h, idx) => (
                              <th key={idx} className="p-3">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {section.table.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-50/50">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="p-3 text-slate-700">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* In-Article AdSense Unit */}
            <AdUnit
              slotId={ADSENSE_CONFIG.slots.articleMidBanner}
              className="my-8"
              label="Advertisement"
            />

            {/* Bottom Tool CTA */}
            <div className="text-center p-8 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Ready to Put This Guide into Practice?
              </h3>
              <p className="text-xs text-slate-500 max-w-lg mx-auto mb-6 leading-relaxed">
                Experience instantaneous, zero-upload media trimming directly in your browser with OnlineTrimmer.
              </p>
              <button
                onClick={() => onNavigate(article.relatedToolPath)}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 inline-flex items-center space-x-2 transition-transform active:scale-95 cursor-pointer"
              >
                <span>Open {article.relatedToolName}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sticky Table of Contents Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="sticky top-24 space-y-6">
              {/* Table of Contents Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Table of Contents</span>
                </div>
                <nav className="space-y-1.5">
                  {article.tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block text-xs text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/50 px-2.5 py-1.5 rounded-lg transition-colors leading-snug"
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Related Articles Card */}
              {otherArticles.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Related Tutorials
                  </div>
                  <div className="space-y-3">
                    {otherArticles.map((rel) => (
                      <div
                        key={rel.id}
                        onClick={() => onNavigate(`/articles/${rel.slug}`)}
                        className="group cursor-pointer"
                      >
                        <h5 className="text-xs font-bold text-slate-800 group-hover:text-emerald-700 leading-snug">
                          {rel.title}
                        </h5>
                        <span className="text-[10px] text-slate-400 mt-0.5 block">
                          {rel.readingTime}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};
