export type ImageResolution = '1K' | '2K' | '4K';

export interface ColorItem {
  role: string; // e.g., "Dominant (60%)", "Secondary (30%)", "Accent (10%)", "Dark Neutral", "Light Neutral"
  name: string;
  hex: string;
  usage: string;
}

export interface FontItem {
  name: string;
  category: string;
  weights: string[];
  usage: string;
}

export interface TypographyConfig {
  headerFont: FontItem;
  bodyFont: FontItem;
  pairingRationale: string;
}

export interface SecondaryMark {
  type: 'icon' | 'monochrome' | 'lockup';
  title: string;
  prompt: string;
  usage: string;
  imageUrl?: string;
  isGenerating?: boolean;
  error?: string;
}

export interface BrandPillar {
  title: string;
  description: string;
}

export interface VoiceGuidelines {
  tone: string;
  dos: string[];
  donts: string[];
}

export interface BrandBible {
  brandName: string;
  tagline: string;
  missionStatement: string;
  visionStatement: string;
  archetype: string;
  personalityAdjectives: string[];
  targetAudience: string;
  brandPillars: BrandPillar[];
  voiceGuidelines: VoiceGuidelines;
  palette: ColorItem[];
  typography: TypographyConfig;
  logoPrompts: {
    primary: string;
    secondaryMarks: SecondaryMark[];
  };
  primaryLogo: {
    prompt: string;
    imageUrl?: string;
    isGenerating?: boolean;
    error?: string;
    imageSize?: ImageResolution;
  };
  secondaryMarks?: SecondaryMark[];
}

export type ChatModelType = 'complex' | 'general' | 'fast';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  modelUsed?: string;
}
