import { ToolEditorialBundle } from './types';

export const enEditorial: ToolEditorialBundle = {
  video: {
    pillarTitle: 'Free Online Video Cutter & Precision Trimmer',
    pillarP1:
      'OnlineTrimmer is a high-speed, browser-based video cutter designed to trim, clip, and extract scenes from video files without the hassle of installing heavy desktop editing suites. Whether you want to remove an awkward pause from a presentation, cut out the funny highlight from a gameplay recording, or prepare a 9:16 vertical clip for TikTok, YouTube Shorts, or Instagram Reels, our engine gets it done in seconds.',
    pillarP2:
      'Unlike traditional cloud-based video converters that force you to wait for gigabytes of video to upload over slow internet connections, OnlineTrimmer executes all video processing right on your computer. Your files never leave your device, ensuring maximum privacy, zero bandwidth waste, and lightning-fast downloads.',
    feature1Title: 'Instant Local Rendering',
    feature1Desc:
      'No queue times or server waits. Slicing happens directly inside your web browser’s local cache using modern WebAssembly demuxers.',
    feature2Title: '100% Confidential & Secure',
    feature2Desc:
      'Ideal for personal family videos, proprietary business calls, and confidential recordings. Zero bytes are uploaded to any external server.',
    feature3Title: 'No Watermarks or Subscriptions',
    feature3Desc:
      'Export clean, professional clips free from promotional stamps, logos, or artificial resolution downgrades.',
    howToTitle: 'How to Cut Video Online Step-by-Step',
    howToSubtitle:
      'Follow this quick three-step tutorial to trim any video clip in under thirty seconds.',
    step1Title: 'Upload or Drop Your Video File',
    step1Desc:
      'Click the upload zone or drag and drop your file directly into OnlineTrimmer. We support all major video formats, including MP4, MOV, WebM, AVI, and MKV. You can also paste a direct media URL or click "Load Sample Video" to test the controls instantly.',
    step2Title: 'Select Start & End Cut Points',
    step2Desc:
      'Scrub through the interactive timeline to pinpoint the exact scene. Drag the left handle to set the starting timestamp and the right handle to set the end. Use the precision millisecond increment buttons (+/- 100ms) or enter exact timestamps for frame-accurate cuts.',
    step3Title: 'Preview Loop & Export Video',
    step3Desc:
      'Click "Play Selection" to preview your trimmed video loop. Choose your desired export container (MP4 or WebM) and click "Export Trimmed Video". Your browser generates the file locally, ready to download immediately.',
    specsTitle: 'Video Trimming Specs for Social Media Creators',
    specsSubtitle:
      'Use these recommended dimensions and cut lengths to maximize engagement across modern platforms.',
    tiktokName: 'TikTok',
    tiktokRatio: '9:16 Vertical',
    tiktokDesc:
      'Ideal cut: 15–30s. Cut directly to the action in the first 2 seconds to boost completion rate.',
    shortsName: 'YouTube Shorts',
    shortsRatio: '9:16 Vertical',
    shortsDesc:
      'Max length: 60s. Trim seamless loop points so the short repeats without awkward silence.',
    reelsName: 'Instagram Reels',
    reelsRatio: '9:16 or 4:5',
    reelsDesc:
      'Optimal: 10–25s. Pair trimmed footage with trending audio hooks for maximum reach.',
    xName: 'X (Twitter)',
    xRatio: '16:9 Landscape',
    xDesc:
      'Optimal: 20–45s. Trim long talks down to the core soundbite for viral retweets.',
  },
  audio: {
    pillarTitle: 'Free Online Audio Trimmer & MP3 Song Slicer',
    pillarP1:
      'OnlineTrimmer Audio is a simple, browser-based audio cutter that lets you slice songs, podcast episodes, voice recordings, and sound effects on the fly. You do not need to install complex digital audio workstations (DAWs) like Audacity or GarageBand just to cut a 30-second chorus or remove a cough from an interview.',
    pillarP2:
      'Our tool decodes raw PCM audio data directly into your browser using the native HTML5 Web Audio API, drawing an interactive high-resolution amplitude waveform. You can drag start and end handles, visually inspect sound peaks, and download your trimmed audio in pristine, high-fidelity WAV or MP3 format.',
    feature1Title: 'Interactive Waveform Display',
    feature1Desc:
      'Visually spot the chorus, drum drops, and vocal intakes with amplitude peaks drawn to the millisecond.',
    feature2Title: 'Fade In & Fade Out Filters',
    feature2Desc:
      'Eliminate harsh clicks, pops, and sudden stops with automated anti-click volume envelope ramps.',
    feature3Title: 'Custom Phone Ringtone Maker',
    feature3Desc:
      'Create custom ringtones and alarm notifications ready for iPhone (iOS) and Android smartphones.',
    ringtoneTitle: 'How to Make Custom Ringtones in Minutes',
    ringtoneSubtitle:
      'Turn any favorite track into a custom incoming call ringtone or notification chime.',
    step1Title: 'Select Your Song or Voice Clip',
    step1Desc:
      'Upload an MP3, WAV, M4A, AAC, or OGG file. The file is analyzed instantly in local browser RAM without transmitting audio data across the web.',
    step2Title: 'Highlight 20 to 29 Seconds',
    step2Desc:
      'Most mobile carriers ring for 25 to 30 seconds before switching to voicemail. Drag the waveform boundaries to highlight the main hook or chorus. Enable "Fade In" and "Fade Out" to make repeated ringing smooth and pleasant.',
    step3Title: 'Save to Phone & Assign Ringtone',
    step3Desc:
      'Download your trimmed file. On Android, select it directly in Settings > Sound > Phone Ringtone. On iPhone, transfer it via the free iOS GarageBand app to set it as your default tone without iTunes.',
    formatsTitle: 'Supported Audio Formats & Codecs',
    formatsSubtitle:
      'OnlineTrimmer supports all standard consumer and studio audio containers.',
    formatMp3: 'MP3 (MPEG Layer 3)',
    formatMp3Desc: 'Universal playback on every mobile, car stereo, and PC.',
    formatWav: 'WAV (Linear PCM)',
    formatWavDesc: 'Uncompressed studio-quality audio with lossless dynamic range.',
    formatM4a: 'M4A & AAC',
    formatM4aDesc: 'Apple standard format for iTunes, iPhones, and voice memos.',
    formatOgg: 'OGG Vorbis',
    formatOggDesc: 'Open-source streaming format favored by game developers and Spotify.',
  },
  splitPdf: {
    pillarTitle: 'Split PDF Documents Online with Visual Page Thumbnails',
    pillarP1:
      'Extracting specific pages or separating a 50-page legal docket into individual contracts should not require uploading confidential papers to unsecured cloud converter servers. OnlineTrimmer Split PDF parses document structures directly in your browser memory, rendering sharp interactive thumbnails for every page.',
    pillarP2:
      'You can click individual pages to extract or remove, type complex ranges like "1-5, 8, 12-16", or invert your selections with a single click. When you hit export, a brand-new PDF is compiled locally using pdf-lib, preserving high-resolution vector paths, embedded fonts, and clickable hyperlinks.',
  },
  signPdf: {
    pillarTitle: 'Add Signatures to PDF Online (Fast, Free & Private)',
    pillarP1:
      'Sign PDF allows you to add electronic signatures to rental agreements, permission slips, work orders, and invoices in seconds. Choose from three intuitive modes: draw with smooth digital ink, type your name using elegant cursive fonts, or upload an image of your signature with automated background transparency filtering.',
    pillarP2:
      'Drag your signature to any page, adjust its dimensions, and download the signed document immediately. Because our signing engine is 100% client-side, your signature and document are never saved to any database.',
  },
  hub: {
    badge: 'Educational Resource Hub',
    title: 'Looking for In-Depth Guides & Technical Tutorials?',
    desc: 'Read our comprehensive guides on lossless video compression, creating custom iPhone ringtones, understanding keyframes, and secure client-side document management.',
    btn: 'Explore All Guides & Articles',
  },
};
