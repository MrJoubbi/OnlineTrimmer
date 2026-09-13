import React from 'react';
import { Header } from '../common/Header';
import { Footer } from '../common/Footer';
import { ShieldCheck, Cpu, Zap, Heart, Award, ArrowRight, Video, Music, FileText } from 'lucide-react';

interface AboutUsProps {
  onNavigate: (path: string) => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header currentPath="/about" onNavigate={onNavigate} />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Badge */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span>Our Mission & Technology</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
            About OnlineTrimmer
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            We are redefining media editing on the web: high-speed, 100% private, browser-native tools that never upload your videos, audios, or documents to remote servers.
          </p>
        </div>

        {/* The Origin Story */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs mb-8 space-y-6 text-sm text-slate-700 leading-relaxed">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Why We Built OnlineTrimmer
          </h2>
          <p>
            For years, trimming a 5-second segment out of a video or extracting pages from a PDF meant uploading large, sensitive files to cloud converters. Users were forced to wait through slow upload progress bars, endure queue processing times, and accept severe privacy risks — trusting unknown cloud servers with confidential contracts, personal family videos, or proprietary work files.
          </p>
          <p>
            We realized modern web browsers now possess immense computational power. Through <strong>WebAssembly (Wasm)</strong>, the <strong>HTML5 Web Audio API</strong>, and modern client-side memory buffers, modern laptops and smartphones can process media files locally with near-instant speed and zero risk of data leakage.
          </p>
          <p>
            <strong>OnlineTrimmer</strong> was born to make professional, zero-upload media tools freely accessible to everyone around the world — without paywalls, signups, or storage quotas.
          </p>
        </div>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-100">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">100% Private By Design</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your media never touches any remote server. Everything is decoded and rendered in local memory. Once you close the tab, all memory is immediately reclaimed.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4 border border-sky-100">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Zero Waiting Queues</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No server upload bottlenecks or slow rendering queues. Files open instantly and exports take seconds because your local CPU and GPU do the work directly.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 border border-amber-100">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Modern Web Standards</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Engineered with WebAssembly, Web Audio waveform engines, and vector-accurate PDF manipulators for pixel-perfect fidelity.
            </p>
          </div>
        </div>

        {/* Editorial Standards & How We Fund the Platform */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs mb-8 space-y-4 text-sm text-slate-700 leading-relaxed">
          <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center space-x-2">
            <Heart className="w-5 h-5 text-rose-500" />
            <span>How We Keep OnlineTrimmer Free</span>
          </h2>
          <p>
            OnlineTrimmer is completely free for all users. We never charge subscription fees, sell user information, or lock features behind premium tiers.
          </p>
          <p>
            To cover domain maintenance, technical research, and guide publication, we display clean, non-intrusive advertisements served through <strong>Google AdSense</strong>. We carefully ensure ad units never interfere with your editing workflow, never disguise themselves as download buttons, and strictly adhere to Google's Better Ads Standards.
          </p>
        </div>

        {/* Quick Tools Navigation */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div>
            <h3 className="text-xl font-bold mb-1">Ready to edit your media?</h3>
            <p className="text-xs text-slate-300">
              Start trimming videos, audio clips, or signing PDFs right now in your browser.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs py-3 px-5 rounded-xl transition-all cursor-pointer shrink-0"
          >
            <span>Launch Video Trimmer</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      <Footer currentPath="/about" onNavigate={onNavigate} />
    </div>
  );
};
