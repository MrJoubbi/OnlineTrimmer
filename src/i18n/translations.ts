import { SupportedLanguage } from './types';
import { enTranslations, majorTranslations } from './locales/major';
import { eastAsiaTranslations } from './locales/eastAsia';
import { middleEastAfricaTranslations } from './locales/middleEastAfrica';
import { southAsiaTranslations } from './locales/southAsia';
import { europeTranslations } from './locales/europe';
import { additionalGlobalTranslations } from './locales/additionalGlobal';

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

const rawTranslations: Record<Exclude<SupportedLanguage, 'en'>, Partial<TranslationDictionary>> = {
  ...majorTranslations,
  ...eastAsiaTranslations,
  ...middleEastAfricaTranslations,
  ...southAsiaTranslations,
  ...europeTranslations,
  ...additionalGlobalTranslations,
};

function createMergedDictionary(partial: Partial<TranslationDictionary>): TranslationDictionary {
  return {
    ...enTranslations,
    ...partial,
  };
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  en: enTranslations,
  es: createMergedDictionary(rawTranslations.es),
  zh: createMergedDictionary(rawTranslations.zh),
  'zh-TW': createMergedDictionary(rawTranslations['zh-TW']),
  hi: createMergedDictionary(rawTranslations.hi),
  ar: createMergedDictionary(rawTranslations.ar),
  pt: createMergedDictionary(rawTranslations.pt),
  bn: createMergedDictionary(rawTranslations.bn),
  ru: createMergedDictionary(rawTranslations.ru),
  ja: createMergedDictionary(rawTranslations.ja),
  de: createMergedDictionary(rawTranslations.de),
  fr: createMergedDictionary(rawTranslations.fr),
  ur: createMergedDictionary(rawTranslations.ur),
  id: createMergedDictionary(rawTranslations.id),
  it: createMergedDictionary(rawTranslations.it),
  tr: createMergedDictionary(rawTranslations.tr),
  ko: createMergedDictionary(rawTranslations.ko),
  vi: createMergedDictionary(rawTranslations.vi),
  tl: createMergedDictionary(rawTranslations.tl),
  pl: createMergedDictionary(rawTranslations.pl),
  uk: createMergedDictionary(rawTranslations.uk),
  nl: createMergedDictionary(rawTranslations.nl),
  th: createMergedDictionary(rawTranslations.th),
  fa: createMergedDictionary(rawTranslations.fa),
  el: createMergedDictionary(rawTranslations.el),
  cs: createMergedDictionary(rawTranslations.cs),
  sv: createMergedDictionary(rawTranslations.sv),
  ro: createMergedDictionary(rawTranslations.ro),
  hu: createMergedDictionary(rawTranslations.hu),
  he: createMergedDictionary(rawTranslations.he),
  da: createMergedDictionary(rawTranslations.da),
  fi: createMergedDictionary(rawTranslations.fi),
  no: createMergedDictionary(rawTranslations.no),
  sk: createMergedDictionary(rawTranslations.sk),
  ms: createMergedDictionary(rawTranslations.ms),
  bg: createMergedDictionary(rawTranslations.bg),
  hr: createMergedDictionary(rawTranslations.hr),
  sr: createMergedDictionary(rawTranslations.sr),
  lt: createMergedDictionary(rawTranslations.lt),
  sl: createMergedDictionary(rawTranslations.sl),
  lv: createMergedDictionary(rawTranslations.lv),
  et: createMergedDictionary(rawTranslations.et),
  sw: createMergedDictionary(rawTranslations.sw),
  mr: createMergedDictionary(rawTranslations.mr),
  te: createMergedDictionary(rawTranslations.te),
  ta: createMergedDictionary(rawTranslations.ta),
  gu: createMergedDictionary(rawTranslations.gu),
  kn: createMergedDictionary(rawTranslations.kn),
  ml: createMergedDictionary(rawTranslations.ml),
  pa: createMergedDictionary(rawTranslations.pa),
  jv: createMergedDictionary(rawTranslations.jv),
  my: createMergedDictionary(rawTranslations.my),
  am: createMergedDictionary(rawTranslations.am),
  so: createMergedDictionary(rawTranslations.so),
  ne: createMergedDictionary(rawTranslations.ne),
  si: createMergedDictionary(rawTranslations.si),
  km: createMergedDictionary(rawTranslations.km),
  az: createMergedDictionary(rawTranslations.az),
};
