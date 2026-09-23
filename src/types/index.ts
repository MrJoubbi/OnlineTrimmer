export type ToolId =
  | 'video-trimmer'
  | 'audio-trimmer'
  | 'split-pdf'
  | 'sign-pdf'
  | 'trim-mp4'
  | 'trim-mov'
  | 'trim-mkv'
  | 'cut-mp3'
  | 'cut-wav'
  | 'mp4-trimmer'
  | 'mov-trimmer'
  | 'webm-trimmer'
  | 'avi-trimmer'
  | 'mkv-trimmer'
  | 'cut-wav-audio'
  | 'cut-m4a'
  | 'make-iphone-ringtone'
  | 'tiktok-video-cutter'
  | 'youtube-shorts-cutter'
  | 'instagram-reels-cutter';

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ToolConfig {
  id: ToolId;
  path: string;
  name: string;
  shortName: string;
  badge?: string;
  title: string;
  metaDescription: string;
  h1: string;
  subheading: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  acceptedMimeTypes: string[];
  acceptedExtensions: string[];
  formatSpecific?: {
    formatName: string;
    description: string;
    advantages: string[];
    typicalUses: string[];
  };
  howItWorks: HowItWorksStep[];
  faqs: FAQItem[];
}

export interface ProcessingState {
  isProcessing: boolean;
  progress: number; // 0 - 100
  statusMessage: string;
  stage?: string;
  error?: string | null;
}

export interface PdfPagePreview {
  pageNumber: number;
  dataUrl: string;
  width: number;
  height: number;
}

export interface PlacedSignature {
  id: string;
  pageNumber: number;
  dataUrl: string;
  xPercent: number; // 0-100 relative to rendered page width
  yPercent: number; // 0-100 relative to rendered page height
  widthPercent: number;
  heightPercent: number;
  aspectRatio: number;
}

export interface PlacedTextStamp {
  id: string;
  pageNumber: number;
  text: string;
  fontSize: number;
  color: string;
  xPercent: number;
  yPercent: number;
}
