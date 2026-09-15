import { SupportedLanguage } from '../types';
import { ToolEditorialBundle } from './types';
import { enEditorial } from './en';
import { esEditorial } from './es';
import { frEditorial } from './fr';
import { deEditorial } from './de';
import { ptEditorial } from './pt';
import { itEditorial } from './it';
import { ruEditorial } from './ru';
import { zhEditorial, zhTwEditorial } from './zh';
import { jaEditorial, koEditorial } from './ja';
import { arEditorial, hiEditorial } from './ar';
import { idEditorial, trEditorial, viEditorial } from './id';
import { globalEditorialLocales } from './globalLocales';

const editorialRegistry: Partial<Record<SupportedLanguage, ToolEditorialBundle>> = {
  en: enEditorial,
  es: esEditorial,
  fr: frEditorial,
  de: deEditorial,
  pt: ptEditorial,
  it: itEditorial,
  ru: ruEditorial,
  zh: zhEditorial,
  'zh-TW': zhTwEditorial,
  ja: jaEditorial,
  ko: koEditorial,
  ar: arEditorial,
  hi: hiEditorial,
  id: idEditorial,
  tr: trEditorial,
  vi: viEditorial,
  ...globalEditorialLocales,
};

/**
 * Returns complete localized editorial copy for any of the 50 supported languages,
 * gracefully falling back to English for any undefined fields.
 */
export function getLocalizedEditorial(lang: SupportedLanguage): ToolEditorialBundle {
  const selected = editorialRegistry[lang];
  if (!selected) {
    return enEditorial;
  }
  return {
    video: { ...enEditorial.video, ...selected.video },
    audio: { ...enEditorial.audio, ...selected.audio },
    splitPdf: { ...enEditorial.splitPdf, ...selected.splitPdf },
    signPdf: { ...enEditorial.signPdf, ...selected.signPdf },
    hub: { ...enEditorial.hub, ...selected.hub },
  };
}

export * from './types';
