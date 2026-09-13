import React from 'react';
import { ToolConfig } from '../../types';
import { ShieldCheck, Zap, Scissors, Music, FileText, CheckCircle2, ArrowRight, Play, Volume2, Sparkles, Smartphone, Layers, Eye } from 'lucide-react';

interface ToolEditorialContentProps {
  toolConfig: ToolConfig;
  onNavigate: (path: string) => void;
}

export const ToolEditorialContent: React.FC<ToolEditorialContentProps> = ({
  toolConfig,
  onNavigate,
}) => {
  const isVideoTool =
    toolConfig.id === 'video-trimmer' ||
    toolConfig.path.includes('-trimmer') && toolConfig.id !== 'audio-trimmer';

  const isAudioTool = toolConfig.id === 'audio-trimmer';
  const isSplitPdfTool = toolConfig.id === 'split-pdf';
  const isSignPdfTool = toolConfig.id === 'sign-pdf';

  return (
    <div className="w-full space-y-12 mb-16 text-slate-800">
      {/* 1. VIDEO TRIMMER EDITORIAL SUITE (Modeled on online-video-cutter.com) */}
      {isVideoTool && (
        <>
          {/* Main Pillar: Cut Video Online Fast & Free */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-4">
              Free Online Video Cutter & Precision Trimmer
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              OnlineTrimmer is a high-speed, browser-based video cutter designed to trim, clip, and extract scenes from video files without the hassle of installing heavy desktop editing suites. Whether you want to remove an awkward pause from a presentation, cut out the funny highlight from a gameplay recording, or prepare a 9:16 vertical clip for TikTok, YouTube Shorts, or Instagram Reels, our engine gets it done in seconds.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Unlike traditional cloud-based video converters that force you to wait for gigabytes of video to upload over slow internet connections, OnlineTrimmer executes all video processing right on your computer. Your files never leave your device, ensuring maximum privacy, zero bandwidth waste, and lightning-fast downloads.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center space-x-2 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-2">
                  <Zap className="w-4 h-4" />
                  <span>Instant Local Rendering</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  No queue times or server waits. Slicing happens directly inside your web browser’s local cache using modern WebAssembly demuxers.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center space-x-2 text-sky-700 font-bold text-xs uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>100% Confidential & Secure</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Ideal for personal family videos, proprietary business calls, and confidential recordings. Zero bytes are uploaded to any external server.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center space-x-2 text-amber-700 font-bold text-xs uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>No Watermarks or Subscriptions</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Export clean, professional clips free from promotional stamps, logos, or artificial resolution downgrades.
                </p>
              </div>
            </div>
          </section>

          {/* Pillar 2: How to Trim a Video Online in 3 Steps */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
              How to Cut Video Online Step-by-Step
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Follow this quick three-step tutorial to trim any video clip in under thirty seconds.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">
                    Upload or Drop Your Video File
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Click the upload zone or drag and drop your file directly into OnlineTrimmer. We support all major video formats, including MP4, MOV, WebM, AVI, and MKV. You can also paste a direct media URL or click "Load Sample Video" to test the controls instantly.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">
                    Select Start & End Cut Points
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Scrub through the interactive timeline to pinpoint the exact scene. Drag the left handle to set the starting timestamp and the right handle to set the end. Use the precision millisecond increment buttons (+/- 100ms) or enter exact timestamps for frame-accurate cuts.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">
                    Preview Loop & Export Video
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Click "Play Selection" to preview your trimmed video loop. Choose your desired export container (MP4 or WebM) and click "Export Trimmed Video". Your browser generates the file locally, ready to download immediately.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Pillar 3: Social Media Video Specs Guide */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
              Video Trimming Specs for Social Media Creators
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Use these recommended dimensions and cut lengths to maximize engagement across modern platforms.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">TikTok</span>
                <span className="text-lg font-bold text-slate-900 block mb-1">9:16 Vertical</span>
                <p className="text-xs text-slate-600">Ideal cut: 15-30s. Cut directly to the action in the first 2 seconds to boost completion rate.</p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider block mb-1">YouTube Shorts</span>
                <span className="text-lg font-bold text-slate-900 block mb-1">9:16 Vertical</span>
                <p className="text-xs text-slate-600">Max length: 60s. Trim seamless loop points so the short repeats without awkward silence.</p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="text-xs font-bold text-purple-600 uppercase tracking-wider block mb-1">Instagram Reels</span>
                <span className="text-lg font-bold text-slate-900 block mb-1">9:16 or 4:5</span>
                <p className="text-xs text-slate-600">Optimal: 10-25s. Pair trimmed footage with trending audio hooks for maximum reach.</p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wider block mb-1">X (Twitter)</span>
                <span className="text-lg font-bold text-slate-900 block mb-1">16:9 Landscape</span>
                <p className="text-xs text-slate-600">Optimal: 20-45s. Trim long talks down to the core soundbite for viral retweets.</p>
              </div>
            </div>
          </section>
        </>
      )}

      {/* 2. AUDIO TRIMMER & MP3 CUTTER EDITORIAL SUITE (Modeled on audiotrimmer.com) */}
      {isAudioTool && (
        <>
          {/* Main Pillar: Free Audio Trimmer & Ringtone Maker */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-4">
              Free Online Audio Trimmer & MP3 Song Slicer
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              OnlineTrimmer Audio is a simple, browser-based audio cutter that lets you slice songs, podcast episodes, voice recordings, and sound effects on the fly. You do not need to install complex digital audio workstations (DAWs) like Audacity or GarageBand just to cut a 30-second chorus or remove a cough from an interview.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Our tool decodes raw PCM audio data directly into your browser using the native HTML5 Web Audio API, drawing an interactive high-resolution amplitude waveform. You can drag start and end handles, visually inspect sound peaks, and download your trimmed audio in pristine, high-fidelity WAV or MP3 format.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-100">
                <div className="flex items-center space-x-2 text-sky-800 font-bold text-xs uppercase tracking-wider mb-2">
                  <Volume2 className="w-4 h-4 text-sky-600" />
                  <span>Interactive Waveform Display</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Visually spot the chorus, drum drops, and vocal intakes with amplitude peaks drawn to the millisecond.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100">
                <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Fade In & Fade Out Filters</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Eliminate harsh clicks, pops, and sudden stops with automated anti-click volume envelope ramps.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100">
                <div className="flex items-center space-x-2 text-indigo-800 font-bold text-xs uppercase tracking-wider mb-2">
                  <Smartphone className="w-4 h-4 text-indigo-600" />
                  <span>Custom Phone Ringtone Maker</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Create custom ringtones and alarm notifications ready for iPhone (iOS) and Android smartphones.
                </p>
              </div>
            </div>
          </section>

          {/* Pillar 2: How to Make Custom Ringtones Online */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
              How to Make Custom Ringtones in Minutes
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Turn any favorite track into a custom incoming call ringtone or notification chime.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-sky-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">
                    Select Your Song or Voice Clip
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Upload an MP3, WAV, M4A, AAC, or OGG file. The file is analyzed instantly in local browser RAM without transmitting audio data across the web.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-sky-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">
                    Highlight 20 to 29 Seconds
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Most mobile carriers ring for 25 to 30 seconds before switching to voicemail. Drag the waveform boundaries to highlight the main hook or chorus. Enable "Fade In" and "Fade Out" to make repeated ringing smooth and pleasant.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-sky-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">
                    Save to Phone & Assign Ringtone
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Download your trimmed file. On Android, select it directly in Settings &gt; Sound &gt; Phone Ringtone. On iPhone, transfer it via the free iOS GarageBand app to set it as your default tone without iTunes.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Pillar 3: Supported Audio Formats */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
              Supported Audio Formats & Codecs
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              OnlineTrimmer supports all standard consumer and studio audio containers.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <strong className="block text-slate-900 font-bold mb-0.5">MP3 (MPEG Layer 3)</strong>
                <span className="text-slate-500">Universal playback on every mobile, car stereo, and PC.</span>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <strong className="block text-slate-900 font-bold mb-0.5">WAV (Linear PCM)</strong>
                <span className="text-slate-500">Uncompressed studio-quality audio with lossless dynamic range.</span>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <strong className="block text-slate-900 font-bold mb-0.5">M4A & AAC</strong>
                <span className="text-slate-500">Apple standard format for iTunes, iPhones, and voice memos.</span>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <strong className="block text-slate-900 font-bold mb-0.5">OGG Vorbis</strong>
                <span className="text-slate-500">Open-source streaming format favored by game developers and Spotify.</span>
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
              Split PDF Documents Online with Visual Page Thumbnails
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Extracting specific pages or separating a 50-page legal docket into individual contracts should not require uploading confidential papers to unsecured cloud converter servers. OnlineTrimmer Split PDF parses document structures directly in your browser memory, rendering sharp interactive thumbnails for every page.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              You can click individual pages to extract or remove, type complex ranges like "1-5, 8, 12-16", or invert your selections with a single click. When you hit export, a brand-new PDF is compiled locally using pdf-lib, preserving high-resolution vector paths, embedded fonts, and clickable hyperlinks.
            </p>
          </section>
        </>
      )}

      {/* 4. SIGN PDF EDITORIAL SUITE */}
      {isSignPdfTool && (
        <>
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-4">
              Add Signatures to PDF Online (Fast, Free & Private)
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Sign PDF allows you to add electronic signatures to rental agreements, permission slips, work orders, and invoices in seconds. Choose from three intuitive modes: draw with smooth digital ink, type your name using elegant cursive fonts, or upload an image of your signature with automated background transparency filtering.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Drag your signature to any page, adjust its dimensions, and download the signed document immediately. Because our signing engine is 100% client-side, your signature and document are never saved to any database.
            </p>
          </section>
        </>
      )}

      {/* Cross-Link Hub & Helpful Articles Callout */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Educational Resource Hub
            </span>
            <h3 className="text-lg sm:text-xl font-bold">
              Looking for In-Depth Guides & Technical Tutorials?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Read our comprehensive guides on lossless video compression, creating custom iPhone ringtones, understanding keyframes, and secure client-side document management.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('/articles')}
            className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 flex items-center space-x-2 transition-transform transform active:scale-95 cursor-pointer shrink-0"
          >
            <span>Explore All Guides & Articles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
