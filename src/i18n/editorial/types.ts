export interface EditorialStep {
  step: number;
  title: string;
  desc: string;
}

export interface VideoEditorialData {
  pillarTitle: string;
  pillarP1: string;
  pillarP2: string;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  howToTitle: string;
  howToSubtitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  specsTitle: string;
  specsSubtitle: string;
  tiktokName: string;
  tiktokRatio: string;
  tiktokDesc: string;
  shortsName: string;
  shortsRatio: string;
  shortsDesc: string;
  reelsName: string;
  reelsRatio: string;
  reelsDesc: string;
  xName: string;
  xRatio: string;
  xDesc: string;
}

export interface AudioEditorialData {
  pillarTitle: string;
  pillarP1: string;
  pillarP2: string;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  ringtoneTitle: string;
  ringtoneSubtitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  formatsTitle: string;
  formatsSubtitle: string;
  formatMp3: string;
  formatMp3Desc: string;
  formatWav: string;
  formatWavDesc: string;
  formatM4a: string;
  formatM4aDesc: string;
  formatOgg: string;
  formatOggDesc: string;
}

export interface SplitPdfEditorialData {
  pillarTitle: string;
  pillarP1: string;
  pillarP2: string;
}

export interface SignPdfEditorialData {
  pillarTitle: string;
  pillarP1: string;
  pillarP2: string;
}

export interface HubEditorialData {
  badge: string;
  title: string;
  desc: string;
  btn: string;
}

export interface ToolEditorialBundle {
  video: VideoEditorialData;
  audio: AudioEditorialData;
  splitPdf: SplitPdfEditorialData;
  signPdf: SignPdfEditorialData;
  hub: HubEditorialData;
}
