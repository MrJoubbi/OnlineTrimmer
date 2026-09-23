import React from 'react';
import { ShieldCheck, Zap, Lock, Globe, BookOpen } from 'lucide-react';
import { ALL_TOOLS_LIST } from '../../config/tools';
import { SEO_ARTICLES } from '../../config/articles';
import { useLanguage } from '../../i18n/LanguageContext';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t, language, setLanguage, availableLanguages } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-14 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Col 1: Brand & Guarantee */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <div
              className="flex items-center cursor-pointer select-none"
              onClick={() => onNavigate('/')}
            >
              <BrandLogo variant="light" height={36} className="hover:opacity-90 transition-opacity" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t('footerDescription')}
            </p>
            <div className="flex items-center space-x-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span>{t('zeroStorage')}</span>
            </div>
          </div>

          {/* Col 2: Core Media Utilities */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              {t('footerMediaUtils')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  id="footer-link-video-trimmer"
                  onClick={() => onNavigate('/')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  {t('navVideo')}
                </button>
              </li>
              <li>
                <button
                  id="footer-link-audio-trimmer"
                  onClick={() => onNavigate('/audio-trimmer')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  {t('navAudio')}
                </button>
              </li>
              <li>
                <button
                  id="footer-link-split-pdf"
                  onClick={() => onNavigate('/split-pdf')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  {t('navSplitPdf')}
                </button>
              </li>
              <li>
                <button
                  id="footer-link-sign-pdf"
                  onClick={() => onNavigate('/sign-pdf')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  {t('navSignPdf')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Format Trimmers (SEO Programmatic Routes) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              {t('footerFormatTrimmers')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  id="footer-link-trim-mp4"
                  onClick={() => onNavigate('/trim-mp4')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left font-medium text-emerald-300"
                >
                  Trim MP4 Online
                </button>
              </li>
              <li>
                <button
                  id="footer-link-cut-mp3"
                  onClick={() => onNavigate('/cut-mp3')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left font-medium text-emerald-300"
                >
                  Cut MP3 Online
                </button>
              </li>
              <li>
                <button
                  id="footer-link-trim-mov"
                  onClick={() => onNavigate('/trim-mov')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Trim MOV Online
                </button>
              </li>
              <li>
                <button
                  id="footer-link-trim-mkv"
                  onClick={() => onNavigate('/trim-mkv')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Trim MKV Online
                </button>
              </li>
              <li>
                <button
                  id="footer-link-cut-wav"
                  onClick={() => onNavigate('/cut-wav')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  Cut WAV Online
                </button>
              </li>
              {ALL_TOOLS_LIST.filter((t) => t.path.includes('-trimmer') && t.path !== '/audio-trimmer').slice(0, 4).map((t) => (
                <li key={t.id}>
                  <button
                    id={`footer-link-${t.id}`}
                    onClick={() => onNavigate(t.path)}
                    className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                  >
                    {t.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: SEO Articles & Knowledge Hub */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 flex items-center space-x-1.5">
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t('footerGuidesHub')}</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  id="footer-link-all-articles"
                  onClick={() => onNavigate('/articles')}
                  className="hover:text-emerald-400 font-semibold text-emerald-300 transition-colors cursor-pointer text-left"
                >
                  {t('navGuides')} →
                </button>
              </li>
              {SEO_ARTICLES.slice(0, 4).map((art) => (
                <li key={art.id}>
                  <button
                    id={`footer-art-${art.id}`}
                    onClick={() => onNavigate(`/articles/${art.slug}`)}
                    className="hover:text-emerald-400 transition-colors cursor-pointer text-left line-clamp-1"
                    title={art.title}
                  >
                    {art.title.split('(')[0]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Privacy & Security */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              {t('footerBrowserTech')}
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Files are processed locally in your browser.</span>
              </div>
              <div className="flex items-start space-x-2">
                <Lock className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                <span>Zero server uploads — 100% private.</span>
              </div>
              <div className="flex items-start space-x-2">
                <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Instant client-side processing with no waiting queues.</span>
              </div>
            </div>
            <div className="pt-2">
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white"
              >
                <Globe className="w-3 h-3" />
                <span>Sitemap</span>
              </a>
            </div>
          </div>
        </div>

        {/* 50 Global Languages Quick Access Strip */}
        <div className="pt-8 pb-6 border-t border-slate-800/80 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-200">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>Available in 50 Global Languages</span>
              <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] px-1.5 py-0.5 rounded-full font-normal">
                50 / 50 Supported
              </span>
            </div>
            <span className="text-[11px] text-slate-400">
              Instant in-browser translation • No reload needed
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
            {availableLanguages.map((lang) => {
              const isSelected = lang.code === language;
              return (
                <button
                  key={lang.code}
                  id={`footer-lang-${lang.code}`}
                  onClick={() => setLanguage(lang.code)}
                  className={`inline-flex items-center space-x-1 px-2 py-1 rounded-md text-[11px] transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-750 hover:text-white border border-slate-700/60'
                  }`}
                  title={`${lang.name} (${lang.nativeName})`}
                >
                  <span className="text-xs">{lang.flag}</span>
                  <span>{lang.nativeName}</span>
                  {lang.rank && <span className="text-[9px] opacity-60">#{lang.rank}</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom bar with Company & Legal Links */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} OnlineTrimmer (onlinetrimmer.com). All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs">
            <button
              id="footer-about-link"
              onClick={() => onNavigate('/about')}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              About Us
            </button>
            <button
              id="footer-contact-link"
              onClick={() => onNavigate('/contact')}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Contact Us
            </button>
            <button
              id="footer-privacy-link"
              onClick={() => onNavigate('/privacy-policy')}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              id="footer-terms-link"
              onClick={() => onNavigate('/terms-of-service')}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
