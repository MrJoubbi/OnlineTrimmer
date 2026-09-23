import React from 'react';
import { Home, Search, Video, Music, FileText, PenTool, ArrowRight } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';

interface NotFoundProps {
  onNavigate: (path: string) => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Header currentPath="/404" onNavigate={onNavigate} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-16 flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-700 font-extrabold text-3xl mb-6 shadow-xs border border-emerald-200">
          404
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Page Not Found
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-md mb-8 leading-relaxed">
          The tool or guide page you were looking for doesn&apos;t exist or has moved. Explore our popular free, browser-based media utilities below.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mb-10 text-left">
          <button
            onClick={() => onNavigate('/video-trimmer')}
            className="p-4 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-sm transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">Video Trimmer</div>
                <div className="text-xs text-slate-500">Cut MP4, MOV, WebM, MKV</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
          </button>

          <button
            onClick={() => onNavigate('/audio-trimmer')}
            className="p-4 rounded-xl bg-white border border-slate-200 hover:border-sky-500 hover:shadow-sm transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                <Music className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors">Audio Trimmer</div>
                <div className="text-xs text-slate-500">Cut MP3, WAV, ringtones</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-0.5 transition-all" />
          </button>

          <button
            onClick={() => onNavigate('/split-pdf')}
            className="p-4 rounded-xl bg-white border border-slate-200 hover:border-amber-500 hover:shadow-sm transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors">Split PDF</div>
                <div className="text-xs text-slate-500">Extract & delete pages</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
          </button>

          <button
            onClick={() => onNavigate('/sign-pdf')}
            className="p-4 rounded-xl bg-white border border-slate-200 hover:border-indigo-500 hover:shadow-sm transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <PenTool className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Sign PDF</div>
                <div className="text-xs text-slate-500">Free digital electronic sign</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
          </button>
        </div>

        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};
