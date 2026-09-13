import React, { useState } from 'react';
import { SEO_ARTICLES, SeoArticle } from '../../config/articles';
import { BookOpen, Clock, Calendar, ArrowRight, Video, Music, FileText, Shield, Search, ChevronRight } from 'lucide-react';
import { Header } from '../common/Header';
import { Footer } from '../common/Footer';
import { useLanguage } from '../../i18n/LanguageContext';

interface ArticlesHubProps {
  onNavigate: (path: string) => void;
}

export const ArticlesHub: React.FC<ArticlesHubProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredArticles = SEO_ARTICLES.filter((art) => {
    const matchesCategory = selectedCategory === 'all' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.metaDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.targetKeywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'video':
        return <Video className="w-4 h-4 text-emerald-600" />;
      case 'audio':
        return <Music className="w-4 h-4 text-sky-600" />;
      case 'pdf':
        return <FileText className="w-4 h-4 text-amber-600" />;
      default:
        return <Shield className="w-4 h-4 text-indigo-600" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-emerald-100 selection:text-emerald-900">
      <Header currentPath="/articles" onNavigate={onNavigate} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <button
            onClick={() => onNavigate('/')}
            className="hover:text-slate-800 transition-colors cursor-pointer"
          >
            {t('navVideo')}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-semibold">{t('articlesHubTitle')}</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100/70 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('articlesHubBadge')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            {t('articlesHubTitle')}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {t('articlesHubDesc')}
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
          {/* Category Tabs */}
          <div className="flex items-center space-x-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: t('allArticles') },
              { id: 'video', label: t('navVideo') },
              { id: 'audio', label: t('navAudio') },
              { id: 'pdf', label: t('navSplitPdf') },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-bold text-slate-700">No articles matched your criteria</p>
            <p className="text-xs text-slate-400 mt-1">Try clearing your search query or picking another category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                onClick={() => onNavigate(`/articles/${article.slug}`)}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Meta tag & Reading Time */}
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <div className="flex items-center space-x-1.5 font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                      {getCategoryIcon(article.category)}
                      <span className="capitalize">{article.category} Guide</span>
                    </div>
                    <div className="flex items-center space-x-1 text-slate-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{article.readingTime}</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug mb-2">
                    {article.title}
                  </h2>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                    {article.metaDescription}
                  </p>

                  {/* Key Takeaways Pill Summary */}
                  <div className="space-y-1.5 pt-2 mb-4 border-t border-slate-100">
                    {article.summaryPoints.slice(0, 2).map((pt, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-[11px] text-slate-500">
                        <div className="w-1 h-1 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                        <span className="line-clamp-1">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1 text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Updated {article.updatedDate}</span>
                  </div>
                  <span className="font-bold text-emerald-600 group-hover:translate-x-0.5 transition-transform inline-flex items-center space-x-1">
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};
