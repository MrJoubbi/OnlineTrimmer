import React, { useState } from 'react';
import { ChevronDown, Menu, X, Video, Music, FileText, PenTool, BookOpen } from 'lucide-react';
import { CORE_NAV_TOOLS, FORMAT_TRIMMER_KEYS, TOOLS_CONFIG } from '../../config/tools';
import { ToolId } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const { t } = useLanguage();
  const [isFormatsOpen, setIsFormatsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getToolName = (id: string, defaultName: string) => {
    switch (id) {
      case 'video-trimmer':
        return t('navVideo');
      case 'audio-trimmer':
        return t('navAudio');
      case 'split-pdf':
        return t('navSplitPdf');
      case 'sign-pdf':
        return t('navSignPdf');
      default:
        return defaultName;
    }
  };

  const getIcon = (id: string) => {
    switch (id) {
      case 'video-trimmer':
        return <Video className="w-4 h-4 text-emerald-600" />;
      case 'audio-trimmer':
        return <Music className="w-4 h-4 text-sky-600" />;
      case 'split-pdf':
        return <FileText className="w-4 h-4 text-amber-600" />;
      case 'sign-pdf':
        return <PenTool className="w-4 h-4 text-indigo-600" />;
      default:
        return <Video className="w-4 h-4 text-emerald-600" />;
    }
  };

  const isArticlesActive = currentPath.startsWith('/articles');

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              id="header-logo-btn"
              onClick={() => onNavigate('/')}
              className="flex items-center group text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg py-1 px-1.5 -ml-1.5 transition-colors hover:bg-slate-50"
              aria-label="OnlineTrimmer Home"
            >
              <BrandLogo height={40} />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {CORE_NAV_TOOLS.map((tool) => {
              const isActive = currentPath === tool.path;
              return (
                <button
                  key={tool.id}
                  id={`nav-link-${tool.id}`}
                  onClick={() => onNavigate(tool.path)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {getIcon(tool.id)}
                  <span>{getToolName(tool.id, tool.name)}</span>
                </button>
              );
            })}

            {/* Guides & Knowledge Hub Link */}
            <button
              id="nav-link-articles"
              onClick={() => onNavigate('/articles')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isArticlesActive
                  ? 'bg-emerald-50 text-emerald-800 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>{t('navGuides')}</span>
            </button>

            {/* Formats Dropdown */}
            <div className="relative">
              <button
                id="nav-formats-dropdown-btn"
                onClick={() => setIsFormatsOpen(!isFormatsOpen)}
                onBlur={() => setTimeout(() => setIsFormatsOpen(false), 200)}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <span>{t('navFormats')}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isFormatsOpen ? 'rotate-180' : ''}`} />
              </button>

              {isFormatsOpen && (
                <div className="absolute right-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-slate-150 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-semibold tracking-wider uppercase text-slate-400">
                    {t('formatSpecificTitle')}
                  </div>
                  {FORMAT_TRIMMER_KEYS.map((key) => {
                    const cfg = TOOLS_CONFIG[key as ToolId];
                    const isActive = currentPath === cfg.path;
                    return (
                      <button
                        key={key}
                        id={`dropdown-link-${key}`}
                        onClick={() => {
                          onNavigate(cfg.path);
                          setIsFormatsOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                          isActive ? 'text-emerald-700 font-semibold bg-emerald-50/50' : 'text-slate-700'
                        }`}
                      >
                        <span>{cfg.name}</span>
                        <span className="font-mono text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                          {cfg.formatSpecific?.formatName.split(' ')[0] || key.replace('-trimmer', '').toUpperCase()}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right Controls: Language Selector */}
          <div className="flex items-center space-x-3">
            <LanguageSelector variant="header" />

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                id="mobile-menu-toggle-btn"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2">
          {/* Mobile Language Selector */}
          <LanguageSelector variant="mobile" />

          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 pt-2 mb-1">
            Media Tools
          </div>
          {CORE_NAV_TOOLS.map((tool) => (
            <button
              key={tool.id}
              id={`mobile-nav-${tool.id}`}
              onClick={() => {
                onNavigate(tool.path);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentPath === tool.path
                  ? 'bg-emerald-50 text-emerald-800 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {getIcon(tool.id)}
              <span>{getToolName(tool.id, tool.name)}</span>
            </button>
          ))}

          <button
            id="mobile-nav-articles"
            onClick={() => {
              onNavigate('/articles');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
              isArticlesActive
                ? 'bg-emerald-50 text-emerald-800 font-semibold'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>{t('navGuides')}</span>
          </button>

          <div className="pt-2 border-t border-slate-100 text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-1">
            {t('formatSpecificTitle')}
          </div>
          <div className="grid grid-cols-2 gap-1 px-1">
            {FORMAT_TRIMMER_KEYS.map((key) => {
              const cfg = TOOLS_CONFIG[key as ToolId];
              return (
                <button
                  key={key}
                  id={`mobile-format-${key}`}
                  onClick={() => {
                    onNavigate(cfg.path);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-lg text-xs text-left ${
                    currentPath === cfg.path
                      ? 'bg-emerald-50 text-emerald-800 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {cfg.name}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
