import { ToolConfig, ToolId } from '../types';

export const TOOLS_CONFIG: Record<ToolId, ToolConfig> = {
  'video-trimmer': {
    id: 'video-trimmer',
    path: '/',
    name: 'Video Trimmer',
    shortName: 'Video',
    title: 'Video Trimmer — Free Online Video Cutter (No Uploads)',
    metaDescription: 'Trim, cut, and crop videos directly in your browser. No files uploaded to any server, 100% private, supports MP4, MOV, WEBM, AVI, and MKV with millisecond precision.',
    h1: 'Video Trimmer',
    subheading: 'Cut and trim video clips instantly in your browser. 100% private with no server uploads.',
    primaryKeyword: 'video trimmer',
    secondaryKeywords: ['cut video online', 'video cutter', 'trim mp4 online', 'clip video free'],
    acceptedMimeTypes: ['video/mp4', 'video/quicktime', 'video/webm', 'video/x-msvideo', 'video/x-matroska', 'video/*'],
    acceptedExtensions: ['.mp4', '.mov', '.webm', '.avi', '.mkv'],
    howItWorks: [
      {
        step: 1,
        title: 'Select Video File',
        description: 'Drag and drop your video file or click to browse. The video stays safely on your device.'
      },
      {
        step: 2,
        title: 'Scrub Timeline & Set Markers',
        description: 'Drag the start and end handles, scrub through frames, or enter exact timestamps down to the millisecond.'
      },
      {
        step: 3,
        title: 'Preview & Export',
        description: 'Review the trimmed loop in real-time, choose your preferred export format, and save the trimmed video.'
      }
    ],
    faqs: [
      {
        question: 'Are my videos uploaded to a remote server?',
        answer: 'Never. OnlineTrimmer processes everything entirely inside your browser using client-side WebAssembly and modern browser media APIs. Your files never leave your computer.'
      },
      {
        question: 'What video formats are supported?',
        answer: 'OnlineTrimmer supports all major modern video formats including MP4, MOV, WEBM, AVI, and MKV.'
      },
      {
        question: 'Is there a file size limit or watermarks added?',
        answer: 'There are zero watermarks and no hidden fees. Because processing runs locally in your browser memory, performance depends on your device RAM, with videos up to 1GB processing smoothly.'
      },
      {
        question: 'Can I trim video to specific timestamps?',
        answer: 'Yes, you can scrub the interactive timeline visually or input exact minutes, seconds, and milliseconds for frame-accurate cuts.'
      }
    ]
  },

  'audio-trimmer': {
    id: 'audio-trimmer',
    path: '/audio-trimmer',
    name: 'Audio Trimmer',
    shortName: 'Audio',
    badge: 'Waveform',
    title: 'Audio Trimmer & MP3 Cutter — Free Online Audio Editor',
    metaDescription: 'Cut and trim MP3, WAV, and M4A audio files online. Interactive visual waveform editor, fade in/out options, and 100% private client-side audio rendering.',
    h1: 'Audio Trimmer',
    subheading: 'Cut MP3, WAV, and M4A files with an interactive waveform visualizer. Instant, free, and private.',
    primaryKeyword: 'audio trimmer',
    secondaryKeywords: ['mp3 cutter', 'cut audio online', 'trim song', 'ringtone maker'],
    acceptedMimeTypes: ['audio/mpeg', 'audio/wav', 'audio/x-m4a', 'audio/mp4', 'audio/aac', 'audio/ogg', 'audio/*'],
    acceptedExtensions: ['.mp3', '.wav', '.m4a', '.aac', '.ogg'],
    howItWorks: [
      {
        step: 1,
        title: 'Drop Your Audio File',
        description: 'Upload any MP3, WAV, or M4A track. Audio analysis runs locally in your browser.'
      },
      {
        step: 2,
        title: 'Inspect Waveform & Adjust Handles',
        description: 'Scrub across audio peaks, drag the start and end boundary cursors, or zoom into specific transients.'
      },
      {
        step: 3,
        title: 'Listen to Selection & Download',
        description: 'Play just the selected portion, apply optional fade effects, and export the trimmed audio instantly.'
      }
    ],
    faqs: [
      {
        question: 'How does the waveform visualizer work?',
        answer: 'OnlineTrimmer decodes your audio file into PCM channel data using the native Web Audio API and draws high-resolution amplitude peaks on an interactive HTML5 canvas.'
      },
      {
        question: 'Can I make phone ringtones with this tool?',
        answer: 'Yes! Simply select a 20-30 second highlight of your favorite song, preview the loop, and download as an MP3 or WAV ringtone ready for iOS or Android.'
      },
      {
        question: 'Does trimming degrade the audio quality?',
        answer: 'No. The audio engine exports the selected range using pure high-fidelity 44.1kHz / 48kHz audio buffers with optional anti-click fade ramps.'
      },
      {
        question: 'Is my audio private?',
        answer: 'Yes. Just like all OnlineTrimmer utilities, the audio data never touches any external server.'
      }
    ]
  },

  'split-pdf': {
    id: 'split-pdf',
    path: '/split-pdf',
    name: 'Split PDF',
    shortName: 'Split PDF',
    badge: 'Fast',
    title: 'Split PDF Online — Extract or Remove Pages from PDF Free',
    metaDescription: 'Split PDF files and extract individual pages in your browser. Visual page thumbnail picker, page range selection, and 100% client-side processing with pdf-lib.',
    h1: 'Split PDF',
    subheading: 'Extract specific pages or remove unwanted sheets with visual thumbnails. 100% private in-browser tool.',
    primaryKeyword: 'split pdf',
    secondaryKeywords: ['extract pages from pdf', 'remove pages from pdf', 'separate pdf pages', 'cut pdf'],
    acceptedMimeTypes: ['application/pdf'],
    acceptedExtensions: ['.pdf'],
    howItWorks: [
      {
        step: 1,
        title: 'Select PDF Document',
        description: 'Upload your document to generate instant interactive thumbnail previews of every page.'
      },
      {
        step: 2,
        title: 'Choose Pages to Extract or Delete',
        description: 'Click individual page cards, enter page ranges (e.g. 1-3, 5), or use Quick Select buttons.'
      },
      {
        step: 3,
        title: 'Generate & Download New PDF',
        description: 'Click Split PDF to compile a new clean document containing only your chosen pages.'
      }
    ],
    faqs: [
      {
        question: 'How do I extract only certain pages from my PDF?',
        answer: 'Upload your PDF, click on the thumbnails of the pages you want to keep (or type a range like 1-5, 8), and click "Extract Selected Pages".'
      },
      {
        question: 'Can confidential documents be split safely?',
        answer: 'Absolutely. Because OnlineTrimmer operates client-side with zero server transmission, bank statements, tax documents, and contracts remain private on your computer.'
      },
      {
        question: 'Will hyperlinks and vector graphics be preserved?',
        answer: 'Yes. The underlying pdf-lib engine copies the native PDF page dictionaries, retaining vector paths, fonts, and annotations without rasterizing them.'
      },
      {
        question: 'Is there a limit on how many pages can be split?',
        answer: 'You can split documents with dozens of pages effortlessly directly in your browser.'
      }
    ]
  },

  'sign-pdf': {
    id: 'sign-pdf',
    path: '/sign-pdf',
    name: 'Sign PDF',
    shortName: 'Sign PDF',
    badge: 'eSign',
    title: 'Sign PDF Online — Free Electronic Signature Tool',
    metaDescription: 'Add signatures to PDF documents directly in your browser. Draw, type, or upload your signature, drag and position it on any page, and download the signed PDF.',
    h1: 'Sign PDF',
    subheading: 'Draw, type, or upload your signature and place it anywhere on your PDF. Fast, secure, and client-side.',
    primaryKeyword: 'sign pdf',
    secondaryKeywords: ['pdf signature', 'esign pdf free', 'sign document online', 'electronic signature pdf'],
    acceptedMimeTypes: ['application/pdf'],
    acceptedExtensions: ['.pdf'],
    howItWorks: [
      {
        step: 1,
        title: 'Open Your PDF',
        description: 'Select your PDF contract, lease, or form. Pages are rendered immediately in your browser.'
      },
      {
        step: 2,
        title: 'Create Your Signature',
        description: 'Draw freehand with smooth digital ink, type your name in elegant script styles, or upload an existing signature image.'
      },
      {
        step: 3,
        title: 'Position, Resize & Save',
        description: 'Drag the signature to the exact signature line on any page, adjust scale, and download your signed document.'
      }
    ],
    faqs: [
      {
        question: 'Is this an electronic signature or a digital certificate?',
        answer: 'OnlineTrimmer provides a visual electronic signature (e-signature) embedded directly onto the PDF canvas. It is not a cryptographic certificate-based digital signature (PKI/cryptographic signature). It is ideal for everyday agreements, permission slips, invoices, and standard business approvals.'
      },
      {
        question: 'Can I type my name instead of drawing?',
        answer: 'Yes! You can switch to the "Type" tab and select from multiple calligraphy and handwritten cursive font styles, complete with ink color options.'
      },
      {
        question: 'Can I add multiple signatures or a date stamp?',
        answer: 'Yes, you can place signatures across any page, adjust their dimensions, and even add custom date stamps.'
      },
      {
        question: 'Do you store a copy of my signature or document?',
        answer: 'No. No data or signature images are ever sent to or saved on any server. Everything is rendered and embedded locally.'
      }
    ]
  },

  'mp4-trimmer': {
    id: 'mp4-trimmer',
    path: '/mp4-trimmer',
    name: 'MP4 Trimmer',
    shortName: 'MP4',
    title: 'MP4 Trimmer — Cut MP4 Videos Online for Free',
    metaDescription: 'Trim and cut MP4 video files online with zero quality loss. Precise timeline scrubbing, instant preview, and fast client-side MP4 cutting without uploading.',
    h1: 'MP4 Trimmer',
    subheading: 'Cut, clip, and shorten MP4 video files in seconds directly in your web browser.',
    primaryKeyword: 'mp4 trimmer',
    secondaryKeywords: ['cut mp4 online', 'mp4 cutter', 'trim mp4 video', 'shorten mp4'],
    acceptedMimeTypes: ['video/mp4', 'video/*'],
    acceptedExtensions: ['.mp4', '.m4v'],
    formatSpecific: {
      formatName: 'MP4 (MPEG-4 Part 14)',
      description: 'The global standard for video playback across YouTube, Instagram, TikTok, iPhones, Android, and all web browsers.',
      advantages: [
        'Universal compatibility on 99.9% of devices',
        'Efficient H.264 and AAC compression',
        'Fast lossless keyframe trimming in browser'
      ],
      typicalUses: ['Social media clips', 'Screen recordings', 'Mobile camera video', 'Presentations']
    },
    howItWorks: [
      {
        step: 1,
        title: 'Upload MP4 File',
        description: 'Drop your MP4 file onto the trimmer. The file loads directly into local browser memory.'
      },
      {
        step: 2,
        title: 'Adjust Start and End Times',
        description: 'Scrub through the timeline, fine-tune using precision buttons, and preview the cut section.'
      },
      {
        step: 3,
        title: 'Export Trimmed MP4',
        description: 'Download the cut MP4 clip instantly without any watermarks or encoding queues.'
      }
    ],
    faqs: [
      {
        question: 'Can I trim MP4 videos without re-encoding?',
        answer: 'Yes, OnlineTrimmer uses fast stream-copy slicing whenever possible to keep the exact original H.264 video quality intact.'
      },
      {
        question: 'Does it work on iPhone and Android MP4 recordings?',
        answer: 'Yes! Standard MP4 files captured on smartphones, GoPro, or cameras can be trimmed directly in mobile Safari or Chrome.'
      },
      {
        question: 'Why choose OnlineTrimmer over other MP4 cutters?',
        answer: 'Most competitors upload your video to slow cloud servers. OnlineTrimmer trims 100% on your device, giving you instant results and complete privacy.'
      }
    ]
  },

  'mov-trimmer': {
    id: 'mov-trimmer',
    path: '/mov-trimmer',
    name: 'MOV Trimmer',
    shortName: 'MOV',
    title: 'MOV Trimmer — Cut QuickTime MOV Videos Online',
    metaDescription: 'Trim Apple QuickTime MOV videos online for free. Ideal for iPhone, iPad, and Mac video clips. Cut video segments privately in your browser without uploading.',
    h1: 'MOV Trimmer',
    subheading: 'Trim and cut Apple QuickTime MOV video files online with frame-by-frame precision.',
    primaryKeyword: 'mov trimmer',
    secondaryKeywords: ['cut mov online', 'quicktime video trimmer', 'trim iphone video', 'mov cutter'],
    acceptedMimeTypes: ['video/quicktime', 'video/mp4', 'video/*'],
    acceptedExtensions: ['.mov', '.qt'],
    formatSpecific: {
      formatName: 'MOV (Apple QuickTime)',
      description: 'The native recording container used by Apple iPhones, iPads, Macs, and professional digital cinema cameras.',
      advantages: [
        'High-bitrate ProRes and Apple HEVC/H.264 support',
        'Preserves Apple HDR and wide color gamut metadata',
        'Direct trimming without converting on Mac or iOS'
      ],
      typicalUses: ['iPhone 4K 60fps clips', 'Final Cut Pro exports', 'Cinematic video b-roll']
    },
    howItWorks: [
      {
        step: 1,
        title: 'Select MOV Recording',
        description: 'Drop your Apple QuickTime .MOV file into the browser.'
      },
      {
        step: 2,
        title: 'Set In/Out Cut Points',
        description: 'Use the visual scrub bar to isolate the exact clip you need.'
      },
      {
        step: 3,
        title: 'Save Trimmed Clip',
        description: 'Download the cut video as MOV or convert it to universal MP4 on the fly.'
      }
    ],
    faqs: [
      {
        question: 'Can I trim large 4K iPhone MOV files?',
        answer: 'Yes! Because modern browsers support hardware-accelerated video decoding, 4K iPhone MOV files scrub smoothly.'
      },
      {
        question: 'Can I convert my trimmed MOV to MP4?',
        answer: 'Yes. You can choose to download the trimmed file as an MP4 for wider compatibility across non-Apple devices.'
      },
      {
        question: 'Are my personal family videos uploaded anywhere?',
        answer: 'No. Everything stays in your browser cache and is never sent to any third-party server.'
      }
    ]
  },

  'webm-trimmer': {
    id: 'webm-trimmer',
    path: '/webm-trimmer',
    name: 'WebM Trimmer',
    shortName: 'WebM',
    title: 'WebM Trimmer — Cut WebM Videos Online for Free',
    metaDescription: 'Fast, free WebM video trimmer. Cut VP8 and VP9 WebM clips from screen recordings, Discord, or web browsers. 100% client-side with instant preview.',
    h1: 'WebM Trimmer',
    subheading: 'Cut and trim VP8/VP9 WebM videos online. Optimized for web screen captures and Discord clips.',
    primaryKeyword: 'webm trimmer',
    secondaryKeywords: ['cut webm online', 'webm cutter', 'trim webm video', 'discord video cutter'],
    acceptedMimeTypes: ['video/webm', 'video/*'],
    acceptedExtensions: ['.webm'],
    formatSpecific: {
      formatName: 'WebM (VP8/VP9/AV1)',
      description: 'The open, royalty-free web video format developed by Google, standard for browser screen recordings and WebRTC.',
      advantages: [
        'Exceptional compression efficiency for web use',
        'Native browser support without proprietary codecs',
        'Ultra-fast processing in modern Chromium and Firefox'
      ],
      typicalUses: ['OBS screen recordings', 'Discord memes & game clips', 'HTML5 web video']
    },
    howItWorks: [
      {
        step: 1,
        title: 'Upload WebM Video',
        description: 'Drag and drop your .webm screen capture or clip.'
      },
      {
        step: 2,
        title: 'Select Video Segment',
        description: 'Pinpoint the exact start and finish timestamps with interactive timeline scrubbing.'
      },
      {
        step: 3,
        title: 'Instant Download',
        description: 'Export your trimmed WebM clip ready to share on Discord, Slack, or social media.'
      }
    ],
    faqs: [
      {
        question: 'Why is WebM trimming so fast?',
        answer: 'WebM is natively supported by modern web browsers, enabling hardware-accelerated seek times and instant stream slicing.'
      },
      {
        question: 'Can I trim screen recordings made with Chrome or OBS?',
        answer: 'Yes! Chrome, Edge, and OBS output WebM files by default when capturing tabs or screens. OnlineTrimmer cuts them instantly.'
      },
      {
        question: 'Does this tool support WebM with transparency (alpha channel)?',
        answer: 'Yes, standard WebM streams are supported.'
      }
    ]
  },

  'avi-trimmer': {
    id: 'avi-trimmer',
    path: '/avi-trimmer',
    name: 'AVI Trimmer',
    shortName: 'AVI',
    title: 'AVI Trimmer — Cut AVI Videos Online Free',
    metaDescription: 'Trim AVI video files online. Cut segments from legacy AVI movies and recordings without installing bulky desktop software. Free and private.',
    h1: 'AVI Trimmer',
    subheading: 'Quickly cut and extract scenes from AVI video files directly in your browser.',
    primaryKeyword: 'avi trimmer',
    secondaryKeywords: ['cut avi online', 'avi cutter', 'trim avi file'],
    acceptedMimeTypes: ['video/x-msvideo', 'video/avi', 'video/*'],
    acceptedExtensions: ['.avi'],
    formatSpecific: {
      formatName: 'AVI (Audio Video Interleave)',
      description: 'The classic multimedia container developed by Microsoft, widely used in older digital cameras, DV tapes, and Windows PCs.',
      advantages: [
        'Widespread legacy playback support',
        'Uncompressed or high-bitrate video storage'
      ],
      typicalUses: ['Archival footage', 'Camcorder digital rips', 'Older Windows recordings']
    },
    howItWorks: [
      {
        step: 1,
        title: 'Load AVI Video',
        description: 'Select your AVI file from your local hard drive.'
      },
      {
        step: 2,
        title: 'Define Cut Range',
        description: 'Drag the timeline markers to isolate the scene you want to keep.'
      },
      {
        step: 3,
        title: 'Download Clip',
        description: 'Save your trimmed clip in standard web-friendly format.'
      }
    ],
    faqs: [
      {
        question: 'Can I export my trimmed AVI as MP4?',
        answer: 'Yes! You can choose to export as universal MP4 so you can play it on phones and modern tablets that do not support AVI.'
      },
      {
        question: 'Are there file size restrictions on AVI files?',
        answer: 'AVI files can be large, but OnlineTrimmer handles files smoothly in client memory.'
      }
    ]
  },

  'mkv-trimmer': {
    id: 'mkv-trimmer',
    path: '/mkv-trimmer',
    name: 'MKV Trimmer',
    shortName: 'MKV',
    title: 'MKV Trimmer — Cut MKV Videos Online Free',
    metaDescription: 'Cut MKV Matroska videos online. Trim HD movies, anime clips, and screen captures with precision in your browser without uploading.',
    h1: 'MKV Trimmer',
    subheading: 'Trim Matroska MKV video files online with millisecond accuracy and zero quality loss.',
    primaryKeyword: 'mkv trimmer',
    secondaryKeywords: ['cut mkv online', 'mkv cutter', 'trim mkv video'],
    acceptedMimeTypes: ['video/x-matroska', 'video/mkv', 'video/*'],
    acceptedExtensions: ['.mkv'],
    formatSpecific: {
      formatName: 'MKV (Matroska Video)',
      description: 'The flexible open-standard container capable of holding unlimited video, audio, and subtitle streams.',
      advantages: [
        'Supports modern AV1, HEVC, and VP9 video codecs',
        'Popular for high-definition film and anime editing'
      ],
      typicalUses: ['High-definition rips', 'OBS studio recording output', 'Multi-audio clips']
    },
    howItWorks: [
      {
        step: 1,
        title: 'Add MKV File',
        description: 'Drop your MKV video directly into the trimmer.'
      },
      {
        step: 2,
        title: 'Position Markers',
        description: 'Scrub through the video and pinpoint the start and end of the scene.'
      },
      {
        step: 3,
        title: 'Save Clip',
        description: 'Export the cut clip directly to your downloads folder.'
      }
    ],
    faqs: [
      {
        question: 'Why do streamers use MKV for recordings?',
        answer: 'Programs like OBS record to MKV because it resists file corruption if the PC crashes. OnlineTrimmer lets you easily trim these MKV files for social clips.'
      },
      {
        question: 'Can I convert trimmed MKV to MP4 for TikTok/YouTube?',
        answer: 'Yes, select MP4 export in the output options for instantaneous compatibility.'
      }
    ]
  },

  'cut-wav-audio': {
    id: 'cut-wav-audio',
    path: '/cut-wav-audio',
    name: 'WAV Audio Cutter',
    shortName: 'WAV Cutter',
    badge: 'Lossless',
    title: 'WAV Cutter Online — Cut & Trim WAV Audio Losslessly',
    metaDescription: 'Free online WAV audio cutter and trimmer. Cut uncompressed WAV sound files directly in your browser with interactive waveform view and zero quality loss.',
    h1: 'Cut WAV Audio Online',
    subheading: 'Trim uncompressed WAV files with millisecond accuracy and zero audio compression artifacts.',
    primaryKeyword: 'cut wav audio online',
    secondaryKeywords: ['wav cutter', 'trim wav file', 'cut wav online free', 'wav audio trimmer'],
    acceptedMimeTypes: ['audio/wav', 'audio/x-wav', 'audio/wave', 'audio/*'],
    acceptedExtensions: ['.wav'],
    formatSpecific: {
      formatName: 'WAV (Waveform Audio)',
      description: 'Uncompressed pulse-code modulation (PCM) audio format prized for studio-grade clarity and mastering fidelity.',
      advantages: [
        'Pure uncompressed audio with zero loss in fidelity',
        'Direct sample-accurate waveform precision',
        'Industry standard for sound design, recording studios, and podcasts'
      ],
      typicalUses: ['Studio recordings', 'Podcast master audio', 'Sound effects', 'Music production stems']
    },
    howItWorks: [
      { step: 1, title: 'Upload WAV File', description: 'Select or drop your .wav audio file. It loads directly into your device RAM.' },
      { step: 2, title: 'Mark Cut In & Out', description: 'Scrub through the generated multi-channel waveform or use 1-click duration presets.' },
      { step: 3, title: 'Export Lossless WAV', description: 'Listen to the trimmed segment in real time and download your crystal-clear audio snippet.' }
    ],
    faqs: [
      { question: 'Is WAV audio re-encoded or compressed?', answer: 'No. OnlineTrimmer cuts your WAV file using client-side Web Audio buffers, keeping PCM samples intact.' },
      { question: 'Can I use keyboard shortcuts to cut WAV?', answer: 'Yes! Press Space to toggle play, [ to set In point, ] to set Out point, and arrow keys to step frame-by-frame.' },
      { question: 'Are large WAV files supported?', answer: 'Yes, files up to several hundred megabytes process locally in your browser memory without server upload delays.' }
    ]
  },

  'cut-m4a': {
    id: 'cut-m4a',
    path: '/cut-m4a',
    name: 'M4A Audio Trimmer',
    shortName: 'M4A Cutter',
    badge: 'Apple Audio',
    title: 'Cut M4A Online — Free M4A Audio Cutter & Voice Memo Trimmer',
    metaDescription: 'Trim and cut Apple M4A, AAC, and voice memo audio files online. Clean in-browser waveform editor with instant client-side playback and privacy.',
    h1: 'Cut M4A Online',
    subheading: 'Slice Apple voice memos and M4A audio tracks directly in your browser without file uploads.',
    primaryKeyword: 'cut m4a online',
    secondaryKeywords: ['m4a cutter', 'trim m4a audio', 'cut voice memo online', 'm4a trimmer free'],
    acceptedMimeTypes: ['audio/x-m4a', 'audio/m4a', 'audio/mp4', 'audio/aac', 'audio/*'],
    acceptedExtensions: ['.m4a', '.aac'],
    formatSpecific: {
      formatName: 'M4A (MPEG-4 Audio)',
      description: 'Standard Apple audio format encoded with AAC or ALAC for high-efficiency mobile playback and voice recordings.',
      advantages: [
        'Native format for iPhone Voice Memos and Apple Music',
        'Superior acoustic quality compared to MP3 at equivalent bitrates',
        'Compact file sizes ideal for rapid sharing and playback'
      ],
      typicalUses: ['iPhone Voice Memos', 'Audiobook chapters', 'Podcast interview snippets', 'Music previews']
    },
    howItWorks: [
      { step: 1, title: 'Drop M4A Audio', description: 'Choose your Apple Voice Memo or M4A music track.' },
      { step: 2, title: 'Set Audio Boundaries', description: 'Isolate speech or music segments visually on the interactive audio canvas.' },
      { step: 3, title: 'Download Trimmed Audio', description: 'Preview your clean cut and save instantly to your device.' }
    ],
    faqs: [
      { question: 'Can I trim iPhone Voice Memos saved as M4A?', answer: 'Yes! AirDrop or transfer your .m4a voice memo to your computer or phone and trim it directly here.' },
      { question: 'Does trimming M4A require uploading my confidential audio?', answer: 'No. The audio never leaves your device. All decoding and slicing happens 100% client-side.' }
    ]
  },

  'make-iphone-ringtone': {
    id: 'make-iphone-ringtone',
    path: '/make-iphone-ringtone',
    name: 'iPhone Ringtone Maker',
    shortName: 'Ringtone Maker',
    badge: 'Preset 29s',
    title: 'Make iPhone Ringtone Online — Free M4R & MP3 Ringtone Cutter',
    metaDescription: 'Create custom iPhone and Android ringtones online. Trim any song to 29 seconds with automatic fade in and fade out. 100% private in your browser.',
    h1: 'Make iPhone Ringtone Online',
    subheading: 'Turn your favorite songs and audio clips into custom iOS and Android ringtones with 1-click 29s trim and smooth fades.',
    primaryKeyword: 'make iphone ringtone online',
    secondaryKeywords: ['ringtone maker', 'create iphone ringtone', 'custom ringtone cutter', 'm4r ringtone trimmer'],
    acceptedMimeTypes: ['audio/*', 'video/*'],
    acceptedExtensions: ['.mp3', '.m4a', '.wav', '.aac', '.ogg'],
    howItWorks: [
      { step: 1, title: 'Select Song or Sound', description: 'Upload any MP3, M4A, or WAV track you wish to convert into a ringtone.' },
      { step: 2, title: 'Click 29s Ringtone Preset', description: 'Click our dedicated "Ringtone (29s) + Fade" preset to automatically set the ideal iOS duration and smooth fade-in/fade-out.' },
      { step: 3, title: 'Save & Set as Ringtone', description: 'Download your trimmed audio clip ready for iTunes / Finder / GarageBand syncing.' }
    ],
    faqs: [
      { question: 'Why is the ringtone preset limited to 29 seconds?', answer: 'Apple iOS strictly enforces a 30-second maximum duration limit for custom ringtone audio files (.m4r). Keeping it at 29s guarantees seamless looping.' },
      { question: 'Does it apply fade-in and fade-out?', answer: 'Yes, our 1-click ringtone preset automatically applies smooth fades so your phone rings naturally without jarring audio clicks.' }
    ]
  },

  'tiktok-video-cutter': {
    id: 'tiktok-video-cutter',
    path: '/tiktok-video-cutter',
    name: 'TikTok Video Cutter',
    shortName: 'TikTok Cutter',
    badge: 'Social 9:16',
    title: 'TikTok Video Cutter — Trim & Cut Videos for TikTok Online',
    metaDescription: 'Cut and trim videos for TikTok online. Fast 15s and 60s presets, client-side lossless clipping, and zero watermarks. Ready for TikTok uploads.',
    h1: 'TikTok Video Cutter',
    subheading: 'Trim punchy highlights for TikTok feeds and Stories with 1-click duration presets and no watermarks.',
    primaryKeyword: 'tiktok video cutter',
    secondaryKeywords: ['cut video for tiktok', 'trim tiktok video', 'tiktok video trimmer online', 'crop video tiktok free'],
    acceptedMimeTypes: ['video/mp4', 'video/quicktime', 'video/webm', 'video/*'],
    acceptedExtensions: ['.mp4', '.mov', '.webm'],
    howItWorks: [
      { step: 1, title: 'Add TikTok Footage', description: 'Drop your vertical (9:16) or horizontal video file.' },
      { step: 2, title: 'Apply 15s or 60s Preset', description: 'Click the TikTok preset button or scrub to your favorite punchline or hook.' },
      { step: 3, title: 'Export Without Watermark', description: 'Download clean, unwatermarked video instantly ready for posting on TikTok.' }
    ],
    faqs: [
      { question: 'Will this add any watermark to my TikTok videos?', answer: 'Never. OnlineTrimmer is 100% watermark-free, preserving your original production branding.' },
      { question: 'What is the best clip length for TikTok algorithm retention?', answer: 'Clips between 12 to 25 seconds consistently achieve the highest complete-watch ratios on TikTok.' }
    ]
  },

  'youtube-shorts-cutter': {
    id: 'youtube-shorts-cutter',
    path: '/youtube-shorts-cutter',
    name: 'YouTube Shorts Cutter',
    shortName: 'Shorts Cutter',
    badge: 'Under 60s',
    title: 'YouTube Shorts Cutter — Trim Videos Under 60 Seconds Online',
    metaDescription: 'Trim and edit videos for YouTube Shorts. Guarantee your clips remain strictly under the 60-second YouTube Shorts threshold with millisecond precision.',
    h1: 'YouTube Shorts Cutter',
    subheading: 'Snip vertical video clips under 60 seconds with frame accuracy so YouTube automatically categorizes them as Shorts.',
    primaryKeyword: 'youtube shorts cutter',
    secondaryKeywords: ['trim video for youtube shorts', 'cut youtube shorts online', '60 second video cutter', 'youtube shorts trimmer'],
    acceptedMimeTypes: ['video/mp4', 'video/quicktime', 'video/webm', 'video/*'],
    acceptedExtensions: ['.mp4', '.mov', '.webm'],
    howItWorks: [
      { step: 1, title: 'Upload Your Video', description: 'Select any MP4, MOV, or WEBM video recording.' },
      { step: 2, title: 'Enforce Under-60s Boundary', description: 'Use the 1-click "Shorts (60s)" preset to guarantee your clip stays under 59.9 seconds.' },
      { step: 3, title: 'Export & Upload to YouTube', description: 'Download your trimmed video and upload directly to YouTube Shorts with #shorts.' }
    ],
    faqs: [
      { question: 'Why is it important that Shorts are under 60 seconds?', answer: 'YouTube automatically classifies vertical videos as regular videos if they exceed 60.0 seconds by even a fraction of a frame.' },
      { question: 'Can I trim gaming and podcast clips for YouTube Shorts?', answer: 'Yes! Simply scrub to your highlight moment and export in seconds.' }
    ]
  },

  'instagram-reels-cutter': {
    id: 'instagram-reels-cutter',
    path: '/instagram-reels-cutter',
    name: 'Instagram Reels Cutter',
    shortName: 'Reels Cutter',
    badge: '30s / 90s',
    title: 'Instagram Reels Cutter — Cut & Trim Video for Instagram Online',
    metaDescription: 'Trim video clips for Instagram Reels and Stories online. Fast presets for 15s, 30s, and 90s reels with private in-browser rendering and zero watermarks.',
    h1: 'Instagram Reels Cutter',
    subheading: 'Cut smooth clips for Instagram Reels and Stories with 1-click presets and crystal clear lossless quality.',
    primaryKeyword: 'instagram reels cutter',
    secondaryKeywords: ['cut video for instagram reels', 'trim reels video', 'instagram video cutter online', 'reels video trimmer'],
    acceptedMimeTypes: ['video/mp4', 'video/quicktime', 'video/webm', 'video/*'],
    acceptedExtensions: ['.mp4', '.mov', '.webm'],
    howItWorks: [
      { step: 1, title: 'Choose Reel Footage', description: 'Drop your high-resolution video clip into the trimmer.' },
      { step: 2, title: 'Select Reels 30s Preset', description: 'Choose between 15s Story, 30s Reel, or custom timestamps with precision playhead scrubbing.' },
      { step: 3, title: 'Download Clean MP4', description: 'Export instantly without cloud waiting queues or compression degradation.' }
    ],
    faqs: [
      { question: 'What video format does Instagram Reels prefer?', answer: 'Instagram prefers H.264 MP4 with AAC audio at 1080x1920 (9:16 vertical).' },
      { question: 'Can I trim videos on my mobile phone browser?', answer: 'Yes! OnlineTrimmer runs natively on Safari, Chrome, and Firefox on both iOS and Android.' }
    ]
  },

  'trim-mp4': {
    id: 'trim-mp4',
    path: '/trim-mp4',
    name: 'Trim MP4 Online',
    shortName: 'Trim MP4',
    badge: 'Lossless MP4',
    title: 'Trim MP4 Online Free, No Upload | OnlineTrimmer',
    metaDescription: 'Trim and cut MP4 videos online free with zero quality loss. Fast client-side MP4 cutting directly in your browser with no upload and no watermark.',
    h1: 'Trim MP4 Online Free, No Upload',
    subheading: 'Cut MP4 clips with frame-accurate precision directly in your browser. 100% private with no server uploads.',
    primaryKeyword: 'trim mp4 online',
    secondaryKeywords: ['cut mp4 online', 'mp4 trimmer free', 'lossless mp4 cutter', 'trim mp4 no upload'],
    acceptedMimeTypes: ['video/mp4', 'video/*'],
    acceptedExtensions: ['.mp4', '.m4v'],
    formatSpecific: {
      formatName: 'MP4 (H.264 / AAC)',
      description: 'The global standard for video across all devices, social media platforms, iPhones, and Android.',
      advantages: [
        'Universal compatibility on 100% of modern web browsers and phones',
        'Lossless stream slicing without re-encoding quality degradation',
        'Lightweight, clean playback with zero generational artifacts'
      ],
      typicalUses: ['Social media videos', 'Screen recordings', 'Camera footage clips', 'Presentations']
    },
    howItWorks: [
      { step: 1, title: 'Choose MP4 Video', description: 'Drag and drop your MP4 file or click to select from your device.' },
      { step: 2, title: 'Set Cut Points (MM:SS)', description: 'Drag the timeline handles or type exact minutes and seconds for the cut.' },
      { step: 3, title: 'Download Trimmed MP4', description: 'Export your new MP4 clip instantly without watermarks or waiting queues.' }
    ],
    faqs: [
      { question: 'Does trimming MP4 reduce the video quality?', answer: 'No. OnlineTrimmer uses lossless stream extraction, preserving the exact original H.264 video bitrate, color range, and resolution.' },
      { question: 'Is my MP4 video uploaded to any server?', answer: 'Never. Processing is 100% client-side in your local browser memory using modern WebAssembly media APIs.' },
      { question: 'What is the maximum MP4 file size?', answer: 'Because files are decoded directly in local RAM, MP4 files up to 1GB and beyond can be trimmed smoothly.' },
      { question: 'Can I trim MP4 on mobile phones?', answer: 'Yes! OnlineTrimmer runs natively in Safari on iOS and Chrome on Android without installing any app.' }
    ]
  },

  'trim-mov': {
    id: 'trim-mov',
    path: '/trim-mov',
    name: 'Trim MOV Online',
    shortName: 'Trim MOV',
    badge: 'Apple QuickTime',
    title: 'Trim MOV Online Free, No Upload | OnlineTrimmer',
    metaDescription: 'Trim Apple QuickTime MOV videos online free. Cut iPhone and Mac MOV recordings without uploading to any server. 100% private and lossless.',
    h1: 'Trim MOV Online Free, No Upload',
    subheading: 'Cut QuickTime MOV files from iPhone, iPad, and Mac cameras directly in your browser without quality loss.',
    primaryKeyword: 'trim mov online',
    secondaryKeywords: ['cut mov online', 'mov trimmer free', 'trim iphone video', 'quicktime cutter'],
    acceptedMimeTypes: ['video/quicktime', 'video/mp4', 'video/*'],
    acceptedExtensions: ['.mov', '.qt'],
    formatSpecific: {
      formatName: 'QuickTime MOV',
      description: 'Apple native high-bitrate video container used by iPhone cameras, Final Cut Pro, and macOS screen recordings.',
      advantages: [
        'Preserves high dynamic range (HDR) and iPhone camera bitrates',
        'Direct browser slicing with optional MP4 conversion',
        'Zero upload latency for large 4K iPhone video files'
      ],
      typicalUses: ['iPhone 4K recordings', 'macOS QuickTime screen captures', 'Final Cut Pro rushes']
    },
    howItWorks: [
      { step: 1, title: 'Select QuickTime MOV File', description: 'Upload your iPhone MOV or macOS recording directly into the browser.' },
      { step: 2, title: 'Scrub Timeline & Set Marks', description: 'Use the visual scrubber or minute/second inputs to pick the exact scene.' },
      { step: 3, title: 'Save Trimmed Clip', description: 'Download the cut video instantly with zero compression artifacts.' }
    ],
    faqs: [
      { question: 'Can I trim large 4K MOV files from iPhone?', answer: 'Yes. Since the video stays on your device and does not upload across the internet, large 4K MOV clips process with lightning speed.' },
      { question: 'Can I export the cut MOV as MP4?', answer: 'Yes, you can choose MP4 export for universal playback on Windows and Android.' }
    ]
  },

  'trim-mkv': {
    id: 'trim-mkv',
    path: '/trim-mkv',
    name: 'Trim MKV Online',
    shortName: 'Trim MKV',
    badge: 'Matroska',
    title: 'Trim MKV Online Free, No Upload | OnlineTrimmer',
    metaDescription: 'Trim and cut MKV video files online free with no upload. Cut OBS recordings, anime, and movies with frame accuracy and complete privacy.',
    h1: 'Trim MKV Online Free, No Upload',
    subheading: 'Slice Matroska MKV files and OBS recordings directly in your browser with millisecond precision and no watermarks.',
    primaryKeyword: 'trim mkv online',
    secondaryKeywords: ['cut mkv online', 'mkv video trimmer', 'trim obs recording', 'mkv cutter free'],
    acceptedMimeTypes: ['video/x-matroska', 'video/mkv', 'video/*'],
    acceptedExtensions: ['.mkv'],
    formatSpecific: {
      formatName: 'MKV (Matroska Multimedia)',
      description: 'Open container holding multiple audio and subtitle streams, widely used in OBS streaming and high-def films.',
      advantages: [
        'Crash-resistant stream structure preferred by OBS Studio streamers',
        'Supports modern AV1, HEVC, and VP9 video codecs',
        'Lossless in-browser packet extraction'
      ],
      typicalUses: ['OBS gameplay captures', 'High-definition video clips', 'Multi-audio recordings']
    },
    howItWorks: [
      { step: 1, title: 'Load MKV Recording', description: 'Drag and drop your OBS MKV video file into the cutter.' },
      { step: 2, title: 'Isolate Best Moments', description: 'Pinpoint highlight scenes with visual timeline handles.' },
      { step: 3, title: 'Export Clip', description: 'Save your trimmed clip with zero watermarks.' }
    ],
    faqs: [
      { question: 'Why trim OBS MKV files here?', answer: 'You do not need to convert MKV files or install heavy desktop editors like Premiere just to extract a 30-second gaming highlight.' },
      { question: 'Are files kept confidential?', answer: 'Yes, 100% client-side execution ensures your recordings remain strictly on your computer.' }
    ]
  },

  'cut-mp3': {
    id: 'cut-mp3',
    path: '/cut-mp3',
    name: 'Cut MP3 Online',
    shortName: 'Cut MP3',
    badge: 'MP3 Waveform',
    title: 'Cut MP3 Online Free, No Upload | OnlineTrimmer',
    metaDescription: 'Cut and trim MP3 audio files online free with no upload. Interactive visual waveform editor, ringtone maker (29s), and smooth audio fade in/out.',
    h1: 'Cut MP3 Online Free, No Upload',
    subheading: 'Trim songs, cut audio clips, and create phone ringtones with a visual waveform visualizer. 100% private in-browser tool.',
    primaryKeyword: 'cut mp3 online',
    secondaryKeywords: ['mp3 cutter free', 'trim mp3 online', 'cut audio online', 'ringtone cutter mp3'],
    acceptedMimeTypes: ['audio/mpeg', 'audio/mp3', 'audio/*'],
    acceptedExtensions: ['.mp3'],
    formatSpecific: {
      formatName: 'MP3 (MPEG-1 Audio Layer III)',
      description: 'The world standard compressed audio format supported by every phone, speaker, car audio, and web browser.',
      advantages: [
        'Universal playback on 100% of consumer audio hardware',
        'Interactive real-time waveform decoding via Web Audio API',
        'Built-in 29s ringtone preset with anti-click fade ramps'
      ],
      typicalUses: ['Custom phone ringtones', 'Podcast audio highlights', 'Song intro/outro trimming', 'Speech soundbites']
    },
    howItWorks: [
      { step: 1, title: 'Drop MP3 Audio', description: 'Select your song or voice recording to generate an immediate amplitude waveform.' },
      { step: 2, title: 'Highlight Audio Selection', description: 'Drag the green In and Out markers or click "Make Ringtone (29s)" for auto-fade.' },
      { step: 3, title: 'Download Clean MP3', description: 'Preview the loop and download your cut audio with zero quality loss.' }
    ],
    faqs: [
      { question: 'Can I create iPhone and Android ringtones?', answer: 'Yes! Click "Make Ringtone" to automatically select a 29-second clip with smooth fade-in and fade-out.' },
      { question: 'Does trimming MP3 degrade audio quality?', answer: 'No. The audio engine exports the selected portion using high-fidelity 44.1kHz/48kHz buffers.' },
      { question: 'Are my audio files uploaded to any server?', answer: 'Never. All decoding, waveform drawing, and cutting run 100% client-side in your browser.' }
    ]
  },

  'cut-wav': {
    id: 'cut-wav',
    path: '/cut-wav',
    name: 'Cut WAV Online',
    shortName: 'Cut WAV',
    badge: 'Studio WAV',
    title: 'Cut WAV Online Free, No Upload | OnlineTrimmer',
    metaDescription: 'Cut and trim uncompressed WAV audio files online free. Studio-grade lossless audio slicing with interactive waveform and zero quality loss.',
    h1: 'Cut WAV Online Free, No Upload',
    subheading: 'Trim uncompressed studio WAV audio files with sample-accurate precision directly in your browser with zero compression.',
    primaryKeyword: 'cut wav online',
    secondaryKeywords: ['wav cutter free', 'trim wav online', 'lossless wav audio cutter', 'cut wav no upload'],
    acceptedMimeTypes: ['audio/wav', 'audio/x-wav', 'audio/*'],
    acceptedExtensions: ['.wav'],
    formatSpecific: {
      formatName: 'WAV (Pulse-Code Modulation PCM)',
      description: 'Uncompressed audio format prized by recording engineers and musicians for maximum acoustic transparency.',
      advantages: [
        '100% bit-perfect audio reproduction without psychoacoustic compression',
        'Direct sample-accurate waveform rendering in browser RAM',
        'Zero upload latency even on large 24-bit 96kHz studio recordings'
      ],
      typicalUses: ['Music production stems', 'Studio vocal takes', 'Podcast master tracks', 'Sound effects design']
    },
    howItWorks: [
      { step: 1, title: 'Select WAV Audio File', description: 'Choose your uncompressed WAV file for instantaneous local waveform analysis.' },
      { step: 2, title: 'Set Accurate Cut Marks', description: 'Pinpoint precise musical beats or vocal pauses with timeline scrubbing.' },
      { step: 3, title: 'Export Bit-Perfect Audio', description: 'Save your trimmed WAV snippet with original studio fidelity.' }
    ],
    faqs: [
      { question: 'Is WAV audio re-encoded or compressed?', answer: 'No. The engine extracts the PCM audio buffer directly, keeping every sample intact.' },
      { question: 'Is there a file size limit for WAV files?', answer: 'Large WAV files up to several hundred megabytes process smoothly in memory.' }
    ]
  }
};

export const ALL_TOOLS_LIST = [
  TOOLS_CONFIG['video-trimmer'],
  TOOLS_CONFIG['audio-trimmer'],
  TOOLS_CONFIG['split-pdf'],
  TOOLS_CONFIG['sign-pdf'],
  TOOLS_CONFIG['trim-mp4'],
  TOOLS_CONFIG['trim-mov'],
  TOOLS_CONFIG['trim-mkv'],
  TOOLS_CONFIG['cut-mp3'],
  TOOLS_CONFIG['cut-wav'],
  TOOLS_CONFIG['mp4-trimmer'],
  TOOLS_CONFIG['mov-trimmer'],
  TOOLS_CONFIG['webm-trimmer'],
  TOOLS_CONFIG['avi-trimmer'],
  TOOLS_CONFIG['mkv-trimmer'],
  TOOLS_CONFIG['cut-wav-audio'],
  TOOLS_CONFIG['cut-m4a'],
  TOOLS_CONFIG['make-iphone-ringtone'],
  TOOLS_CONFIG['tiktok-video-cutter'],
  TOOLS_CONFIG['youtube-shorts-cutter'],
  TOOLS_CONFIG['instagram-reels-cutter'],
];

export const CORE_NAV_TOOLS = [
  { id: 'video-trimmer', name: 'Video Trimmer', path: '/video-trimmer' },
  { id: 'audio-trimmer', name: 'Audio Trimmer', path: '/audio-trimmer' },
  { id: 'split-pdf', name: 'Split PDF', path: '/split-pdf' },
  { id: 'sign-pdf', name: 'Sign PDF', path: '/sign-pdf' },
  { id: 'trim-mp4', name: 'Trim MP4', path: '/trim-mp4' },
  { id: 'cut-mp3', name: 'Cut MP3', path: '/cut-mp3' },
];

export const FORMAT_TRIMMER_KEYS: ToolId[] = [
  'trim-mp4',
  'trim-mov',
  'trim-mkv',
  'cut-mp3',
  'cut-wav',
  'mp4-trimmer',
  'mov-trimmer',
  'webm-trimmer',
  'avi-trimmer',
  'mkv-trimmer',
  'cut-wav-audio',
  'cut-m4a',
  'make-iphone-ringtone',
  'tiktok-video-cutter',
  'youtube-shorts-cutter',
  'instagram-reels-cutter',
];
