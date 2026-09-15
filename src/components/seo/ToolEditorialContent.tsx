import React from 'react';
import { ToolConfig } from '../../types';
import { ShieldCheck, Zap, Scissors, Music, FileText, CheckCircle2, ArrowRight, Play, Volume2, Sparkles, Smartphone, Layers, Eye } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { getLocalizedEditorial } from '../../i18n/editorial';

interface ToolEditorialContentProps {
  toolConfig: ToolConfig;
  onNavigate: (path: string) => void;
}

export const ToolEditorialContent: React.FC<ToolEditorialContentProps> = ({
  toolConfig,
  onNavigate,
}) => {
  const { language } = useLanguage();
  const editorial = getLocalizedEditorial(language);

  const isVideoTool =
    toolConfig.id === 'video-trimmer' ||
    (toolConfig.path.includes('-trimmer') && toolConfig.id !== 'audio-trimmer');

  const isAudioTool = toolConfig.id === 'audio-trimmer';
  const isSplitPdfTool = toolConfig.id === 'split-pdf';
  const isSignPdfTool = toolConfig.id === 'sign-pdf';

  return (
    <div className="w-full space-y-12 mb-16 text-slate-800">
      {/* 1. VIDEO TRIMMER EDITORIAL SUITE */}
      {isVideoTool && (
        <>
          {/* Main Pillar: Cut Video Online Fast & Free */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-4">
              {editorial.video.pillarTitle}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              {editorial.video.pillarP1}
            </p>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {editorial.video.pillarP2}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center space-x-2 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-2">
                  <Zap className="w-4 h-4" />
                  <span>{editorial.video.feature1Title}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {editorial.video.feature1Desc}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center space-x-2 text-sky-700 font-bold text-xs uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{editorial.video.feature2Title}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {editorial.video.feature2Desc}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center space-x-2 text-amber-700 font-bold text-xs uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>{editorial.video.feature3Title}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {editorial.video.feature3Desc}
                </p>
              </div>
            </div>
          </section>

          {/* Pillar 2: How to Trim a Video Online in 3 Steps */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
              {editorial.video.howToTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              {editorial.video.howToSubtitle}
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">
                    {editorial.video.step1Title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {editorial.video.step1Desc}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">
                    {editorial.video.step2Title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {editorial.video.step2Desc}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">
                    {editorial.video.step3Title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {editorial.video.step3Desc}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Pillar 3: Social Media Video Specs Guide */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
              {editorial.video.specsTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              {editorial.video.specsSubtitle}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                  {editorial.video.tiktokName}
                </span>
                <span className="text-lg font-bold text-slate-900 block mb-1">
                  {editorial.video.tiktokRatio}
                </span>
                <p className="text-xs text-slate-600">{editorial.video.tiktokDesc}</p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider block mb-1">
                  {editorial.video.shortsName}
                </span>
                <span className="text-lg font-bold text-slate-900 block mb-1">
                  {editorial.video.shortsRatio}
                </span>
                <p className="text-xs text-slate-600">{editorial.video.shortsDesc}</p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="text-xs font-bold text-purple-600 uppercase tracking-wider block mb-1">
                  {editorial.video.reelsName}
                </span>
                <span className="text-lg font-bold text-slate-900 block mb-1">
                  {editorial.video.reelsRatio}
                </span>
                <p className="text-xs text-slate-600">{editorial.video.reelsDesc}</p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wider block mb-1">
                  {editorial.video.xName}
                </span>
                <span className="text-lg font-bold text-slate-900 block mb-1">
                  {editorial.video.xRatio}
                </span>
                <p className="text-xs text-slate-600">{editorial.video.xDesc}</p>
              </div>
            </div>
          </section>
        </>
      )}

      {/* 2. AUDIO TRIMMER & MP3 CUTTER EDITORIAL SUITE */}
      {isAudioTool && (
        <>
          {/* Main Pillar: Free Audio Trimmer & Ringtone Maker */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-4">
              {editorial.audio.pillarTitle}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              {editorial.audio.pillarP1}
            </p>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {editorial.audio.pillarP2}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-100">
                <div className="flex items-center space-x-2 text-sky-800 font-bold text-xs uppercase tracking-wider mb-2">
                  <Volume2 className="w-4 h-4 text-sky-600" />
                  <span>{editorial.audio.feature1Title}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {editorial.audio.feature1Desc}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100">
                <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>{editorial.audio.feature2Title}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {editorial.audio.feature2Desc}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100">
                <div className="flex items-center space-x-2 text-indigo-800 font-bold text-xs uppercase tracking-wider mb-2">
                  <Smartphone className="w-4 h-4 text-indigo-600" />
                  <span>{editorial.audio.feature3Title}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {editorial.audio.feature3Desc}
                </p>
              </div>
            </div>
          </section>

          {/* Pillar 2: How to Make Custom Ringtones Online */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
              {editorial.audio.ringtoneTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              {editorial.audio.ringtoneSubtitle}
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-sky-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">
                    {editorial.audio.step1Title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {editorial.audio.step1Desc}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-sky-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">
                    {editorial.audio.step2Title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {editorial.audio.step2Desc}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-sky-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">
                    {editorial.audio.step3Title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {editorial.audio.step3Desc}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Pillar 3: Supported Audio Formats */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
              {editorial.audio.formatsTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              {editorial.audio.formatsSubtitle}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <strong className="block text-slate-900 font-bold mb-0.5">{editorial.audio.formatMp3}</strong>
                <span className="text-slate-500">{editorial.audio.formatMp3Desc}</span>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <strong className="block text-slate-900 font-bold mb-0.5">{editorial.audio.formatWav}</strong>
                <span className="text-slate-500">{editorial.audio.formatWavDesc}</span>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <strong className="block text-slate-900 font-bold mb-0.5">{editorial.audio.formatM4a}</strong>
                <span className="text-slate-500">{editorial.audio.formatM4aDesc}</span>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <strong className="block text-slate-900 font-bold mb-0.5">{editorial.audio.formatOgg}</strong>
                <span className="text-slate-500">{editorial.audio.formatOggDesc}</span>
              </div>
            </div>
          </section>
        </>
      )}

      {/* 3. SPLIT PDF EDITORIAL SUITE */}
      {isSplitPdfTool && (
        <>
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-4">
              {editorial.splitPdf.pillarTitle}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              {editorial.splitPdf.pillarP1}
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              {editorial.splitPdf.pillarP2}
            </p>
          </section>
        </>
      )}

      {/* 4. SIGN PDF EDITORIAL SUITE */}
      {isSignPdfTool && (
        <>
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-4">
              {editorial.signPdf.pillarTitle}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              {editorial.signPdf.pillarP1}
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              {editorial.signPdf.pillarP2}
            </p>
          </section>
        </>
      )}

      {/* Cross-Link Hub & Helpful Articles Callout */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              {editorial.hub.badge}
            </span>
            <h3 className="text-lg sm:text-xl font-bold">
              {editorial.hub.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {editorial.hub.desc}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('/articles')}
            className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 flex items-center space-x-2 transition-transform transform active:scale-95 cursor-pointer shrink-0"
          >
            <span>{editorial.hub.btn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
