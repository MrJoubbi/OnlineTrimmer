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
  }
};

export const ALL_TOOLS_LIST = [
  TOOLS_CONFIG['video-trimmer'],
  TOOLS_CONFIG['audio-trimmer'],
  TOOLS_CONFIG['split-pdf'],
  TOOLS_CONFIG['sign-pdf'],
  TOOLS_CONFIG['mp4-trimmer'],
  TOOLS_CONFIG['mov-trimmer'],
  TOOLS_CONFIG['webm-trimmer'],
  TOOLS_CONFIG['avi-trimmer'],
  TOOLS_CONFIG['mkv-trimmer'],
];

export const CORE_NAV_TOOLS = [
  { id: 'video-trimmer', name: 'Video Trimmer', path: '/' },
  { id: 'audio-trimmer', name: 'Audio Trimmer', path: '/audio-trimmer' },
  { id: 'split-pdf', name: 'Split PDF', path: '/split-pdf' },
  { id: 'sign-pdf', name: 'Sign PDF', path: '/sign-pdf' },
  { id: 'mp4-trimmer', name: 'MP4 Trimmer', path: '/mp4-trimmer' },
];

export const FORMAT_TRIMMER_KEYS: ToolId[] = [
  'mp4-trimmer',
  'mov-trimmer',
  'webm-trimmer',
  'avi-trimmer',
  'mkv-trimmer',
];
