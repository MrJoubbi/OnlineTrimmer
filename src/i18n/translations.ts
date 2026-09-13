import { SupportedLanguage } from './types';

export interface TranslationDictionary {
  // Brand & Navigation
  brandName: string;
  brandTagline: string;
  navVideo: string;
  navAudio: string;
  navSplitPdf: string;
  navSignPdf: string;
  navGuides: string;
  navFormats: string;
  formatSpecificTitle: string;
  privacyBadge: string;

  // Value props
  clientSide: string;
  zeroStorage: string;
  noWatermarks: string;

  // Common UI actions
  chooseFile: string;
  dropFileOrClick: string;
  dropVideoHere: string;
  dropAudioHere: string;
  dropPdfHere: string;
  loadSampleVideo: string;
  loadSampleAudio: string;
  loadSamplePdf: string;
  orPasteUrl: string;
  pasteUrlPlaceholder: string;
  loadUrlBtn: string;
  startTime: string;
  endTime: string;
  duration: string;
  playSelection: string;
  pause: string;
  changeFile: string;
  exportVideo: string;
  exportAudio: string;
  extractPages: string;
  downloadSignedPdf: string;
  processing: string;
  fadeIn: string;
  fadeOut: string;
  ringtoneMode: string;
  outputFormat: string;
  selectPagesPrompt: string;
  selectAll: string;
  deselectAll: string;
  invertSelection: string;
  pageRangePlaceholder: string;
  applyRange: string;
  drawSignature: string;
  typeSignature: string;
  uploadSignature: string;
  clearSignature: string;
  dragSignatureHint: string;

  // Tool Headers & Subtitles
  videoH1: string;
  videoSub: string;
  audioH1: string;
  audioSub: string;
  splitPdfH1: string;
  splitPdfSub: string;
  signPdfH1: string;
  signPdfSub: string;

  // How it works titles & headings
  howItWorksTitle: string;
  howItWorksSubtitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;

  // FAQ section
  faqTitle: string;
  faqSubtitle: string;

  // Competitor Comparison
  comparisonBadge: string;
  comparisonTitle: string;
  comparisonSubtitle: string;
  featureCol: string;
  onlineTrimmerCol: string;
  competitorVideoCol: string;
  competitorAudioCol: string;
  competitorCloudCol: string;
  compUploadReq: string;
  compUploadNo: string;
  compUploadYes: string;
  compPrivacy: string;
  compPrivacyZero: string;
  compPrivacyStored: string;
  compWatermark: string;
  compWatermarkNone: string;
  compWatermarkHuge: string;
  compSpeed: string;
  compSpeedInstant: string;
  compSpeedSlow: string;
  compQuality: string;
  compQualityLossless: string;
  compQualityLossy: string;
  compSize: string;
  compSizeNoLimit: string;
  compSizeLimit500: string;
  compCost: string;
  compCostFree: string;
  compCostSub: string;

  // Footer
  footerDescription: string;
  footerMediaUtils: string;
  footerFormatTrimmers: string;
  footerGuidesHub: string;
  footerBrowserTech: string;
  footerNoCookies: string;
  footerAllRights: string;

  // Additional Common Keys
  dropzoneTitle: string;
  dropzoneSubtitle: string;
  trySample: string;
  pasteUrl: string;
  playbackPreview: string;
  play: string;
  makeRingtone: string;
  download: string;
  cutAudio: string;
  signPdf: string;
  articlesHubTitle: string;
  articlesHubBadge: string;
  articlesHubDesc: string;
  allArticles: string;
  searchPlaceholder: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    brandName: 'OnlineTrimmer',
    brandTagline: 'Client-Side Media Tools',
    navVideo: 'Video Trimmer',
    navAudio: 'Audio Trimmer',
    navSplitPdf: 'Split PDF',
    navSignPdf: 'Sign PDF',
    navGuides: 'Guides & SEO',
    navFormats: 'More Formats',
    formatSpecificTitle: 'Format Specific Trimmers',
    privacyBadge: '100% In-Browser Privacy',

    clientSide: '100% Client-Side',
    zeroStorage: 'Zero Server Storage',
    noWatermarks: 'No Watermarks or Fees',

    chooseFile: 'Choose File',
    dropFileOrClick: 'or drop your file here',
    dropVideoHere: 'Drop your video file here or click to browse',
    dropAudioHere: 'Drop your audio song or voice note here',
    dropPdfHere: 'Drop your PDF document here or click to browse',
    loadSampleVideo: 'Load Sample Video',
    loadSampleAudio: 'Load Sample Song',
    loadSamplePdf: 'Load Sample PDF',
    orPasteUrl: 'Or paste direct media URL',
    pasteUrlPlaceholder: 'https://example.com/media.mp4',
    loadUrlBtn: 'Load URL',
    startTime: 'Start Time',
    endTime: 'End Time',
    duration: 'Selection Duration',
    playSelection: 'Play Selection',
    pause: 'Pause',
    changeFile: 'Change File',
    exportVideo: 'Export Trimmed Video',
    exportAudio: 'Export Trimmed Audio',
    extractPages: 'Extract & Download Pages',
    downloadSignedPdf: 'Download Signed PDF',
    processing: 'Processing locally in browser RAM...',
    fadeIn: 'Fade In (Smooth Start)',
    fadeOut: 'Fade Out (Smooth End)',
    ringtoneMode: 'Ringtone Interval (29s)',
    outputFormat: 'Export Format',
    selectPagesPrompt: 'Click pages to select/unselect for extraction',
    selectAll: 'Select All',
    deselectAll: 'Deselect All',
    invertSelection: 'Invert Selection',
    pageRangePlaceholder: 'e.g. 1-3, 5, 8-10',
    applyRange: 'Apply Range',
    drawSignature: 'Draw Ink',
    typeSignature: 'Type Cursive',
    uploadSignature: 'Upload Image',
    clearSignature: 'Clear Canvas',
    dragSignatureHint: 'Click anywhere on page to place your signature',

    videoH1: 'Online Video Trimmer & Cutter',
    videoSub: 'Cut, trim, and clip video files instantly in your browser. 100% private with no server uploads.',
    audioH1: 'Audio Trimmer & MP3 Cutter',
    audioSub: 'Cut songs, create custom ringtones, and trim audio clips directly in your browser. 100% private.',
    splitPdfH1: 'Split PDF & Extract Pages',
    splitPdfSub: 'Extract specific pages or remove sheets from your PDF in seconds. Zero cloud uploads.',
    signPdfH1: 'Sign PDF Online (eSign Document)',
    signPdfSub: 'Add visual electronic signatures or text stamps to your PDF documents privately in your browser.',

    howItWorksTitle: 'How It Works',
    howItWorksSubtitle: 'Three simple steps to trim and edit your media with instantaneous results.',
    step1Title: 'Select Your File',
    step1Desc: 'Drag and drop your media file or click to browse. The file stays safely on your physical device.',
    step2Title: 'Scrub Timeline & Set Markers',
    step2Desc: 'Drag the boundary handles, inspect waveforms or video frames, and fine-tune down to the millisecond.',
    step3Title: 'Preview & Export Clean File',
    step3Desc: 'Preview the trimmed loop in real-time, select your export format, and save without watermarks.',

    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Common questions about in-browser media editing and security.',

    comparisonBadge: 'Transparent Feature Matrix',
    comparisonTitle: 'How OnlineTrimmer Compares to Competitors',
    comparisonSubtitle: 'Why creators and privacy-conscious professionals choose our in-browser engine over legacy cloud-upload tools.',
    featureCol: 'Key Capability',
    onlineTrimmerCol: 'OnlineTrimmer',
    competitorVideoCol: 'Online-Video-Cutter',
    competitorAudioCol: 'AudioTrimmer',
    competitorCloudCol: 'Clideo / Kapwing',
    compUploadReq: 'Server Upload Required?',
    compUploadNo: 'No (100% Local)',
    compUploadYes: 'Yes (Cloud Upload)',
    compPrivacy: 'Privacy & File Storage',
    compPrivacyZero: 'Zero Storage (100% Private)',
    compPrivacyStored: 'Stored for 2-6 hrs on servers',
    compWatermark: 'Watermarks on Free Export',
    compWatermarkNone: 'Never (100% Clean)',
    compWatermarkHuge: 'Huge Watermark on Free Tier',
    compSpeed: 'Processing Speed',
    compSpeedInstant: 'Instantaneous (1-3 sec)',
    compSpeedSlow: 'Slow (Upload + queue wait)',
    compQuality: 'Quality Preservation',
    compQualityLossless: 'Lossless (Zero Re-encoding)',
    compQualityLossy: 'Transcoded (Generational Loss)',
    compSize: 'Max Free File Size',
    compSizeNoLimit: 'No Artificial Limit (1GB+ RAM)',
    compSizeLimit500: '500MB Free Limit',
    compCost: 'Cost & Subscriptions',
    compCostFree: 'Free Forever ($0)',
    compCostSub: '$9 - $16 / month',

    footerDescription: 'Fast, privacy-first media utilities that process video, audio, and PDF documents 100% inside your browser. No files are ever sent to any remote server.',
    footerMediaUtils: 'Media Utilities',
    footerFormatTrimmers: 'Format Trimmers',
    footerGuidesHub: 'Guides & SEO Hub',
    footerBrowserTech: 'Privacy & Security',
    footerNoCookies: 'No cookies stored',
    footerAllRights: 'All rights reserved.',

    dropzoneTitle: 'Select or drop media file',
    dropzoneSubtitle: 'Fast client-side processing • Never leaves your device',
    trySample: 'Try Sample Media',
    pasteUrl: 'Paste Direct URL',
    playbackPreview: 'Listen Selection',
    play: 'Play Trim',
    makeRingtone: 'Make Ringtone (29s)',
    download: 'Download',
    cutAudio: 'Cut & Export Audio',
    signPdf: 'Save & Download Signed PDF',
    articlesHubTitle: 'Media Editing, Ringtone & PDF Guides',
    articlesHubBadge: 'Knowledge Base & Technical Guides',
    articlesHubDesc: 'In-depth technical tutorials, lossless compression deep-dives, mobile ringtone walkthroughs, and client-side privacy blueprints written by audio-video engineers.',
    allArticles: 'All Articles',
    searchPlaceholder: 'Search guides or keywords...',
  },

  fr: {
    brandName: 'OnlineTrimmer',
    brandTagline: 'Outils Multimédias Côté Client',
    navVideo: 'Coupeur Vidéo',
    navAudio: 'Coupeur Audio',
    navSplitPdf: 'Diviser PDF',
    navSignPdf: 'Signer PDF',
    navGuides: 'Guides & Tutoriels',
    navFormats: 'Plus de formats',
    formatSpecificTitle: 'Coupeurs par Format',
    privacyBadge: '100% Privé dans le Navigateur',

    clientSide: '100% Côté Client',
    zeroStorage: 'Zéro Stockage Serveur',
    noWatermarks: 'Sans Filigrane ni Frais',

    chooseFile: 'Choisir un fichier',
    dropFileOrClick: 'ou glissez votre fichier ici',
    dropVideoHere: 'Déposez votre fichier vidéo ici ou cliquez pour parcourir',
    dropAudioHere: 'Déposez votre musique ou enregistrement vocal ici',
    dropPdfHere: 'Déposez votre document PDF ici ou cliquez pour parcourir',
    loadSampleVideo: 'Charger une vidéo exemple',
    loadSampleAudio: 'Charger un audio exemple',
    loadSamplePdf: 'Charger un PDF exemple',
    orPasteUrl: 'Ou collez une URL directe de média',
    pasteUrlPlaceholder: 'https://exemple.com/media.mp4',
    loadUrlBtn: 'Charger l\'URL',
    startTime: 'Début',
    endTime: 'Fin',
    duration: 'Durée sélectionnée',
    playSelection: 'Lire la sélection',
    pause: 'Pause',
    changeFile: 'Changer de fichier',
    exportVideo: 'Exporter la vidéo coupée',
    exportAudio: 'Exporter l\'audio coupé',
    extractPages: 'Extraire et télécharger les pages',
    downloadSignedPdf: 'Télécharger le PDF signé',
    processing: 'Traitement local en mémoire RAM...',
    fadeIn: 'Fondu d\'ouverture (Départ doux)',
    fadeOut: 'Fondu de fermeture (Fin douce)',
    ringtoneMode: 'Intervalle sonnerie (29s)',
    outputFormat: 'Format d\'export',
    selectPagesPrompt: 'Cliquez sur les pages à sélectionner ou désélectionner',
    selectAll: 'Tout sélectionner',
    deselectAll: 'Tout désélectionner',
    invertSelection: 'Inverser la sélection',
    pageRangePlaceholder: 'ex: 1-3, 5, 8-10',
    applyRange: 'Appliquer l\'intervalle',
    drawSignature: 'Dessiner à la plume',
    typeSignature: 'Texte cursif',
    uploadSignature: 'Téléverser image',
    clearSignature: 'Effacer le canevas',
    dragSignatureHint: 'Cliquez n\'importe où sur la page pour apposer votre signature',

    videoH1: 'Coupeur Vidéo en Ligne Gratuit',
    videoSub: 'Coupez, tronquez et ajustez vos fichiers vidéo instantanément dans votre navigateur. 100% privé sans aucun téléversement.',
    audioH1: 'Coupeur Audio & Séquenceur MP3',
    audioSub: 'Coupez des chansons, créez des sonneries personnalisées et rognez des fichiers audio directement dans votre navigateur.',
    splitPdfH1: 'Diviser un PDF & Extraire des Pages',
    splitPdfSub: 'Extrayez des pages spécifiques ou supprimez des feuilles de vos PDF en quelques secondes. Zéro téléversement cloud.',
    signPdfH1: 'Signer un PDF en Ligne (eSignature)',
    signPdfSub: 'Ajoutez des signatures électroniques ou des tampons de texte à vos documents PDF en toute confidentialité.',

    howItWorksTitle: 'Comment ça marche',
    howItWorksSubtitle: 'Trois étapes faciles pour couper et modifier vos fichiers multimédias avec un résultat instantané.',
    step1Title: 'Sélectionnez votre fichier',
    step1Desc: 'Glissez-déposez votre média ou cliquez pour parcourir. Le fichier reste sécurisé sur votre appareil physique.',
    step2Title: 'Réglez les curseurs & horodatages',
    step2Desc: 'Déplacez les poignées, observez la forme d\'onde ou les images, et ajustez précisément à la milliseconde.',
    step3Title: 'Aperçu & Exportation Propre',
    step3Desc: 'Écoutez ou visualisez votre boucle en temps réel, choisissez le format et enregistrez sans filigrane.',

    faqTitle: 'Foire Aux Questions',
    faqSubtitle: 'Questions courantes sur le traitement multimédia en navigateur et la confidentialité.',

    comparisonBadge: 'Matrice Comparative Transparente',
    comparisonTitle: 'Comment OnlineTrimmer se compare à la concurrence',
    comparisonSubtitle: 'Pourquoi les créateurs et professionnels soucieux de leur vie privée choisissent notre moteur local.',
    featureCol: 'Capacité Clé',
    onlineTrimmerCol: 'OnlineTrimmer',
    competitorVideoCol: 'Online-Video-Cutter',
    competitorAudioCol: 'AudioTrimmer',
    competitorCloudCol: 'Clideo / Kapwing',
    compUploadReq: 'Téléversement serveur requis ?',
    compUploadNo: 'Non (100% Local)',
    compUploadYes: 'Oui (Upload Cloud)',
    compPrivacy: 'Confidentialité & Stockage',
    compPrivacyZero: 'Zéro Stockage (100% Privé)',
    compPrivacyStored: 'Stocké 2-6 heures sur serveur',
    compWatermark: 'Filigrane sur version gratuite',
    compWatermarkNone: 'Jamais (100% Net)',
    compWatermarkHuge: 'Filigrane énorme',
    compSpeed: 'Vitesse de traitement',
    compSpeedInstant: 'Instantané (1-3 sec)',
    compSpeedSlow: 'Lent (Attente upload + file)',
    compQuality: 'Préservation de la qualité',
    compQualityLossless: 'Sans perte (Zéro ré-encodage)',
    compQualityLossy: 'Ré-encodé (Perte de qualité)',
    compSize: 'Taille max gratuite',
    compSizeNoLimit: 'Sans limite artificielle (1Go+ RAM)',
    compSizeLimit500: 'Limite 500Mo gratuite',
    compCost: 'Tarif & Abonnements',
    compCostFree: 'Gratuit pour toujours (0 €)',
    compCostSub: '9 € - 16 € / mois',

    footerDescription: 'Utilitaires multimédias rapides et respectueux de la vie privée qui traitent vidéos, audios et PDF 100% dans votre navigateur.',
    footerMediaUtils: 'Utilitaires Multimédias',
    footerFormatTrimmers: 'Coupeurs par Format',
    footerGuidesHub: 'Guides & Articles SEO',
    footerBrowserTech: 'Confidentialité & Sécurité',
    footerNoCookies: 'Aucun cookie stocké',
    footerAllRights: 'Tous droits réservés.',

    dropzoneTitle: 'Sélectionnez ou déposez votre fichier média',
    dropzoneSubtitle: 'Traitement ultra-rapide côté client • Ne quitte jamais votre appareil',
    trySample: 'Essayer un extrait média',
    pasteUrl: 'Coller une URL directe',
    playbackPreview: 'Écouter la sélection',
    play: 'Lire l\'extrait',
    makeRingtone: 'Créer une sonnerie (29s)',
    download: 'Télécharger',
    cutAudio: 'Couper & Exporter l\'audio',
    signPdf: 'Enregistrer & Télécharger le PDF signé',
    articlesHubTitle: 'Guides Vidéo, Sonnerie & PDF',
    articlesHubBadge: 'Base de Connaissances & Guides Techniques',
    articlesHubDesc: 'Tutoriels techniques approfondis, découpage sans perte, guides de sonneries pour iPhone et Android rédigés par des ingénieurs multimédias.',
    allArticles: 'Tous les articles',
    searchPlaceholder: 'Rechercher des guides ou mots-clés...',
  },

  ar: {
    brandName: 'OnlineTrimmer',
    brandTagline: 'أدوات وسائط فائقة الخصوصية في المتصفح',
    navVideo: 'قص الفيديو',
    navAudio: 'قص الصوت',
    navSplitPdf: 'تقسيم PDF',
    navSignPdf: 'توقيع PDF',
    navGuides: 'الأدلة والشروحات',
    navFormats: 'المزيد من الصيغ',
    formatSpecificTitle: 'أدوات مخصصة حسب التنسيق',
    privacyBadge: 'خصوصية 100% في المتصفح',

    clientSide: 'معالجة داخلية 100%',
    zeroStorage: 'بدون تخزين سحابي',
    noWatermarks: 'بدون علامة مائية أو رسوم',

    chooseFile: 'اختر ملفاً',
    dropFileOrClick: 'أو أسقط الملف هنا',
    dropVideoHere: 'أسقط ملف الفيديو هنا أو انقر للاختيار من جهازك',
    dropAudioHere: 'أسقط المقطع الصوتي أو التسجيل هنا للقص الفوري',
    dropPdfHere: 'أسقط مستند PDF هنا أو انقر للاستعراض',
    loadSampleVideo: 'تجربة فيديو توضيحي',
    loadSampleAudio: 'تجربة مقطع صوتي',
    loadSamplePdf: 'تجربة مستند PDF',
    orPasteUrl: 'أو الصق رابط الوسائط المباشر',
    pasteUrlPlaceholder: 'https://example.com/video.mp4',
    loadUrlBtn: 'فتح الرابط',
    startTime: 'وقت البداية',
    endTime: 'وقت النهاية',
    duration: 'مدة التحديد',
    playSelection: 'تشغيل التحديد',
    pause: 'إيقاف مؤقت',
    changeFile: 'تغيير الملف',
    exportVideo: 'تصدير الفيديو المقصوص',
    exportAudio: 'تصدير المقطع الصوتي',
    extractPages: 'استخراج الصفحات وتنزيلها',
    downloadSignedPdf: 'تنزيل مستند PDF الموقّع',
    processing: 'جارٍ المعالجة في ذاكرة المتصفح محلياً...',
    fadeIn: 'تلاشٍ تصاعدي (بداية هادئة)',
    fadeOut: 'تلاشٍ تنازلي (نهاية ناعمة)',
    ringtoneMode: 'تحديد طول نغمة الرنين (29 ثانية)',
    outputFormat: 'صيغة التصدير',
    selectPagesPrompt: 'انقر فوق الصفحات لتحديدها أو إلغاء تحديدها للاستخراج',
    selectAll: 'تحديد الكل',
    deselectAll: 'إلغاء تحديد الكل',
    invertSelection: 'عكس التحديد',
    pageRangePlaceholder: 'مثال: 1-3, 5, 8-10',
    applyRange: 'تطبيق النطاق',
    drawSignature: 'رسم التوقيع بالقلم',
    typeSignature: 'كتابة بخط يدوي',
    uploadSignature: 'رفع صورة التوقيع',
    clearSignature: 'مسح لوحة التوقيع',
    dragSignatureHint: 'انقر في أي مكان داخل الصفحة لوضع التوقيع',

    videoH1: 'أداة قص الفيديو أونلاين مجاناً',
    videoSub: 'قص وقطع وتجزئة مقاطع الفيديو فورياً في متصفحك. خصوصية كاملة 100% دون رفع الملفات إلى أي خادم خارجي.',
    audioH1: 'أداة قص الصوت وتقطيع MP3 أونلاين',
    audioSub: 'قص الأغاني وإنشاء نغمات رنين مخصصة للهاتف وتعديل الملفات الصوتية بمخطط موجي دقيق داخل المتصفح.',
    splitPdfH1: 'تقسيم ملفات PDF واستخراج الصفحات',
    splitPdfSub: 'استخرج صفحات محددة أو احذف أوراقاً من ملفات PDF في ثوانٍ مع الحفاظ على أعلى درجات الأمان والسرية.',
    signPdfH1: 'توقيع مستندات PDF إلكترونياً مجاناً',
    signPdfSub: 'أضف توقيعك البصري الإلكتروني أو أختام نصية إلى ملفات PDF بخصوصية مطلقة داخل متصفحك.',

    howItWorksTitle: 'كيف تعمل الأداة؟',
    howItWorksSubtitle: 'ثلاث خطوات بسيطة لقص وتعديل وسائطك بنتائج فورية فائقة السرعة.',
    step1Title: 'اختر ملفك',
    step1Desc: 'اسحب وأفلت الملف أو اضغط للاختيار. يبقى الملف محفوظاً داخل جهازك دون إرسال أي بايت للإنترنت.',
    step2Title: 'حدد نقاط البداية والنهاية',
    step2Desc: 'حرك مقابض التحديد، وتفحص الموجات الصوتية أو لقطات الفيديو بدقة تصل إلى أجزاء من الألف من الثانية.',
    step3Title: 'معاينة وتصدير فوري نظيف',
    step3Desc: 'شاهد التحديد بالوقت الفعلي، واختر تنسيق التصدير، وحمّل ملفك فوراً دون أي علامات مائية.',

    faqTitle: 'الأسئلة الشائعة',
    faqSubtitle: 'إجابات عن التحرير المحلي للوسائط ومعايير الأمان والخصوصية.',

    comparisonBadge: 'جدول المقارنة الشفاف',
    comparisonTitle: 'كيف يتفوق OnlineTrimmer على الأدوات الأخرى؟',
    comparisonSubtitle: 'لماذا يفضل المحترفون وأصحاب البيانات الحساسة معالجتنا الداخلية على مواقع الرفع السحابي القديمة.',
    featureCol: 'الميزة الأساسية',
    onlineTrimmerCol: 'OnlineTrimmer',
    competitorVideoCol: 'Online-Video-Cutter',
    competitorAudioCol: 'AudioTrimmer',
    competitorCloudCol: 'Clideo / Kapwing',
    compUploadReq: 'هل يلزم رفع الملف إلى السيرفر؟',
    compUploadNo: 'لا (معالجة محلية 100%)',
    compUploadYes: 'نعم (رفع سحابي بطيء)',
    compPrivacy: 'الخصوصية وتخزين الملفات',
    compPrivacyZero: 'صفر تخزين (خصوصية تامة)',
    compPrivacyStored: 'يُحفظ من 2 إلى 6 ساعات في السيرفر',
    compWatermark: 'علامات مائية على التصدير المجاني',
    compWatermarkNone: 'أبداً (ملفات نظيفة تماماً)',
    compWatermarkHuge: 'علامة مائية ضخمة في النسخة المجانية',
    compSpeed: 'سرعة المعالجة',
    compSpeedInstant: 'فورية (من 1 إلى 3 ثوانٍ)',
    compSpeedSlow: 'بطيئة (انتظار الرفع والتحويل)',
    compQuality: 'الحفاظ على جودة الملف الأصلية',
    compQualityLossless: 'دون أي فقدان (بدون إعادة تشفير)',
    compQualityLossy: 'إعادة تشفير (تشويش وتدهور الجودة)',
    compSize: 'أقصى حجم للملف مجاناً',
    compSizeNoLimit: 'بدون قيود سحابية (1 جيجابايت وأكثر)',
    compSizeLimit500: 'حد أقصى 500 ميجابايت',
    compCost: 'التكلفة والاشتراكات',
    compCostFree: 'مجاني للأبد (0 دولار)',
    compCostSub: 'من 9 إلى 16 دولاراً شهرياً',

    footerDescription: 'أدوات وسائط خفيفة وفائقة الخصوصية تعالج الفيديو والصوت وPDF داخل متصفحك 100%. لا تُرسل أي ملفات لأي خوادم خارجية.',
    footerMediaUtils: 'أدوات الوسائط',
    footerFormatTrimmers: 'أدوات حسب التنسيق',
    footerGuidesHub: 'الأدلة والشروحات',
    footerBrowserTech: 'الخصوصية والأمان',
    footerNoCookies: 'لا يتم تخزين أي ملفات تعريف ارتباط (كوكيز)',
    footerAllRights: 'جميع الحقوق محفوظة.',

    dropzoneTitle: 'اختر أو أسقط ملف الوسائط',
    dropzoneSubtitle: 'معالجة سريعة للغاية داخل المتصفح • لا يغادر جهازك أبداً',
    trySample: 'تجربة وسائط توضيحية',
    pasteUrl: 'لصق رابط مباشر',
    playbackPreview: 'الاستماع إلى التحديد',
    play: 'تشغيل المقطع',
    makeRingtone: 'إنشاء نغمة رنين (29 ثانية)',
    download: 'تنزيل',
    cutAudio: 'قص وتصدير الصوت',
    signPdf: 'حفظ وتنزيل مستند PDF الموقّع',
    articlesHubTitle: 'أدلة الفيديو والنغمات ومستندات PDF',
    articlesHubBadge: 'قاعدة المعرفة والشروحات التقنية',
    articlesHubDesc: 'شروحات تقنية متعمقة، وقص الوسائط دون فقدان الجودة، ودليل نغمات iPhone وAndroid بقلم مهندسي وسائط.',
    allArticles: 'جميع المقالات',
    searchPlaceholder: 'ابحث في الأدلة أو الكلمات الدلالية...',
  },

  ru: {
    brandName: 'OnlineTrimmer',
    brandTagline: 'Медиа-инструменты в браузере',
    navVideo: 'Обрезка видео',
    navAudio: 'Обрезка аудио',
    navSplitPdf: 'Разделить PDF',
    navSignPdf: 'Подписать PDF',
    navGuides: 'Руководства и статьи',
    navFormats: 'Другие форматы',
    formatSpecificTitle: 'Инструменты по форматам',
    privacyBadge: '100% Конфиденциально в браузере',

    clientSide: '100% В вашем браузере',
    zeroStorage: 'Без загрузки на сервер',
    noWatermarks: 'Без водяных знаков и оплат',

    chooseFile: 'Выбрать файл',
    dropFileOrClick: 'или перетащите файл сюда',
    dropVideoHere: 'Перетащите видеофайл сюда или нажмите для выбора',
    dropAudioHere: 'Перетащите аудиофайл или голосовую запись сюда',
    dropPdfHere: 'Перетащите PDF-документ сюда или нажмите для выбора',
    loadSampleVideo: 'Загрузить тестовое видео',
    loadSampleAudio: 'Загрузить тестовый трек',
    loadSamplePdf: 'Загрузить тестовый PDF',
    orPasteUrl: 'Или вставьте прямую ссылку на медиа',
    pasteUrlPlaceholder: 'https://example.com/video.mp4',
    loadUrlBtn: 'Загрузить ссылку',
    startTime: 'Время начала',
    endTime: 'Время окончания',
    duration: 'Длительность отрезка',
    playSelection: 'Воспроизвести отрезок',
    pause: 'Пауза',
    changeFile: 'Заменить файл',
    exportVideo: 'Экспортировать обрезанное видео',
    exportAudio: 'Экспортировать обрезанное аудио',
    extractPages: 'Извлечь и скачать страницы',
    downloadSignedPdf: 'Скачать подписанный PDF',
    processing: 'Обработка в оперативной памяти браузера...',
    fadeIn: 'Плавное нарастание (Fade In)',
    fadeOut: 'Плавное затухание (Fade Out)',
    ringtoneMode: 'Длина рингтона (29 сек)',
    outputFormat: 'Формат экспорта',
    selectPagesPrompt: 'Нажмите на страницы для выбора или отмены извлечения',
    selectAll: 'Выбрать все',
    deselectAll: 'Снять выбор',
    invertSelection: 'Инвертировать выбор',
    pageRangePlaceholder: 'например: 1-3, 5, 8-10',
    applyRange: 'Применить диапазон',
    drawSignature: 'Нарисовать пером',
    typeSignature: 'Ввести рукописным шрифтом',
    uploadSignature: 'Загрузить изображение',
    clearSignature: 'Очистить холст',
    dragSignatureHint: 'Нажмите в любом месте страницы, чтобы разместить подпись',

    videoH1: 'Бесплатная обрезка видео онлайн',
    videoSub: 'Быстро обрезайте, нарезайте и разделяйте видеоклипы прямо в браузере. 100% приватность без передачи на сервер.',
    audioH1: 'Обрезка музыки и нарезка MP3 онлайн',
    audioSub: 'Обрезайте песни, делайте рингтоны для телефонов и редактируйте аудио по наглядной звуковой волне прямо в браузере.',
    splitPdfH1: 'Разделение PDF и извлечение страниц',
    splitPdfSub: 'Извлекайте нужные страницы или удаляйте лишние листы из PDF за секунды. Без загрузки в облачные сервисы.',
    signPdfH1: 'Электронная подпись PDF онлайн',
    signPdfSub: 'Добавляйте визуальные подписи или текстовые штампы в документы PDF конфиденциально прямо в браузере.',

    howItWorksTitle: 'Как это работает',
    howItWorksSubtitle: 'Три простых шага для быстрой обрезки и редактирования файлов с мгновенным результатом.',
    step1Title: 'Выберите файл',
    step1Desc: 'Перетащите файл или нажмите для выбора. Файл обрабатывается исключительно на вашем устройстве.',
    step2Title: 'Укажите метки начала и конца',
    step2Desc: 'Перемещайте ползунки, изучайте звуковую волну или кадры с точностью до миллисекунд.',
    step3Title: 'Предпросмотр и скачивание',
    step3Desc: 'Проверьте получившийся отрезок в реальном времени, выберите формат и сохраните без водяных знаков.',

    faqTitle: 'Часто задаваемые вопросы',
    faqSubtitle: 'Ответы на популярные вопросы о локальной обработке медиа и безопасности данных.',

    comparisonBadge: 'Честное сравнение возможностей',
    comparisonTitle: 'Преимущества OnlineTrimmer перед конкурентами',
    comparisonSubtitle: 'Почему создатели контента и специалисты выбирают локальную обработку вместо загрузки в облако.',
    featureCol: 'Ключевая возможность',
    onlineTrimmerCol: 'OnlineTrimmer',
    competitorVideoCol: 'Online-Video-Cutter',
    competitorAudioCol: 'AudioTrimmer',
    competitorCloudCol: 'Clideo / Kapwing',
    compUploadReq: 'Требуется загрузка на сервер?',
    compUploadNo: 'Нет (100% Локально)',
    compUploadYes: 'Да (Облачная загрузка)',
    compPrivacy: 'Конфиденциальность и хранение',
    compPrivacyZero: 'Не сохраняется (100% Приватно)',
    compPrivacyStored: 'Хранится 2-6 часов на серверах',
    compWatermark: 'Водяные знаки в бесплатной версии',
    compWatermarkNone: 'Никогда (Чистый экспорт)',
    compWatermarkHuge: 'Огромный водяной знак',
    compSpeed: 'Скорость обработки',
    compSpeedInstant: 'Мгновенно (1-3 секунды)',
    compSpeedSlow: 'Медленно (Очередь + долгая загрузка)',
    compQuality: 'Сохранение исходного качества',
    compQualityLossless: 'Без потерь (Без перекодирования)',
    compQualityLossy: 'С перекодированием (Сжатие и артефакты)',
    compSize: 'Максимальный размер файла',
    compSizeNoLimit: 'Без искусственных ограничений (1ГБ+)',
    compSizeLimit500: 'Ограничение 500 МБ',
    compCost: 'Стоимость и тарифы',
    compCostFree: 'Бесплатно навсегда (0 ₽)',
    compCostSub: '$9 - $16 в месяц',

    footerDescription: 'Быстрые и конфиденциальные медиа-утилиты, работающие на 100% в вашем браузере. Файлы никогда не отправляются на удаленные серверы.',
    footerMediaUtils: 'Медиа-инструменты',
    footerFormatTrimmers: 'Инструменты по форматам',
    footerGuidesHub: 'Статьи и руководства',
    footerBrowserTech: 'Конфиденциальность и безопасность',
    footerNoCookies: 'Файлы cookie не сохраняются',
    footerAllRights: 'Все права защищены.',

    dropzoneTitle: 'Выберите или перетащите медиафайл',
    dropzoneSubtitle: 'Быстрая обработка в браузере • Файл не покидает ваше устройство',
    trySample: 'Попробовать тестовый файл',
    pasteUrl: 'Вставить прямую ссылку',
    playbackPreview: 'Прослушать отрезок',
    play: 'Воспроизвести',
    makeRingtone: 'Создать рингтон (29 сек)',
    download: 'Скачать',
    cutAudio: 'Обрезать и экспортировать аудио',
    signPdf: 'Сохранить и скачать подписанный PDF',
    articlesHubTitle: 'Статьи по видео, аудио и PDF',
    articlesHubBadge: 'База знаний и технические руководства',
    articlesHubDesc: 'Подробные инструкции, обрезка видео без потери качества, создание рингтонов для смартфонов от медиа-инженеров.',
    allArticles: 'Все статьи',
    searchPlaceholder: 'Поиск статей или ключевых слов...',
  },
};
