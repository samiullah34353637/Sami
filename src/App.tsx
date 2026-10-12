import React, { useState, useEffect } from 'react';
import { 
  Header 
} from './components/Header';
import { 
  MissionInputForm 
} from './components/MissionInputForm';
import { 
  LogoSuiteSection 
} from './components/LogoSuiteSection';
import { 
  ColorPaletteSection 
} from './components/ColorPaletteSection';
import { 
  TypographySection 
} from './components/TypographySection';
import { 
  BrandCollateralSection 
} from './components/BrandCollateralSection';
import { 
  BrandStrategySection 
} from './components/BrandStrategySection';
import { 
  GeminiChatDrawer 
} from './components/GeminiChatDrawer';
import { 
  ExportModal 
} from './components/ExportModal';
import { 
  BrandBible, 
  ImageResolution, 
  ColorItem, 
  TypographyConfig 
} from './types';
import { 
  BRAND_PRESETS 
} from './utils/presets';
import { 
  loadGoogleFont 
} from './utils/fontLoader';
import { 
  Layers, 
  Palette, 
  Type, 
  Compass, 
  LayoutDashboard, 
  Image as ImageIcon,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export default function App() {
  // Initialize with the first curated preset so the user immediately has a live dashboard
  const [bible, setBible] = useState<BrandBible>(BRAND_PRESETS[0].initialBible);
  const [currentResolution, setCurrentResolution] = useState<ImageResolution>('1K');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'logos' | 'palette' | 'typography' | 'collateral' | 'strategy'>('all');

  // Load active fonts
  useEffect(() => {
    if (bible?.typography?.headerFont?.name) {
      loadGoogleFont(bible.typography.headerFont.name);
    }
    if (bible?.typography?.bodyFont?.name) {
      loadGoogleFont(bible.typography.bodyFont.name);
    }
  }, [bible?.typography?.headerFont?.name, bible?.typography?.bodyFont?.name]);

  // Handler: Generate complete Brand Bible from mission
  const handleGenerate = async (params: {
    brandName: string;
    mission: string;
    category: string;
    personality: string;
    imageResolution: ImageResolution;
    colorMood: string;
    generateLogoImmediately: boolean;
  }) => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/brand/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to generate Brand Bible');
      }

      const generatedData: BrandBible = await res.json();

      // Ensure proper secondary marks array structure
      const secondaryMarks = generatedData.logoPrompts?.secondaryMarks || [];
      const newBible: BrandBible = {
        ...generatedData,
        secondaryMarks: secondaryMarks.map((m: any) => ({
          ...m,
          isGenerating: false,
        })),
        primaryLogo: {
          prompt: generatedData.logoPrompts?.primary || '',
          imageSize: params.imageResolution,
          isGenerating: params.generateLogoImmediately,
        },
      };

      setBible(newBible);
      setCurrentResolution(params.imageResolution);

      // If user requested immediate logo generation with gemini-3-pro-image-preview
      if (params.generateLogoImmediately && generatedData.logoPrompts?.primary) {
        generatePrimaryLogo(generatedData.logoPrompts.primary, params.imageResolution, newBible);
      }
    } catch (error: any) {
      console.error('Error in generation:', error);
      alert(`Error generating Brand Bible: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  // Handler: Generate primary logo using gemini-3-pro-image-preview (1K, 2K, 4K)
  const generatePrimaryLogo = async (
    prompt: string, 
    resolution: ImageResolution, 
    targetBible: BrandBible = bible
  ) => {
    setBible(prev => ({
      ...prev,
      primaryLogo: {
        ...prev.primaryLogo,
        prompt,
        imageSize: resolution,
        isGenerating: true,
        error: undefined,
      },
    }));

    try {
      const res = await fetch('/api/image/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          imageSize: resolution,
          aspectRatio: '1:1',
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.imageUrl) {
        throw new Error(data.error || 'Failed to generate logo image');
      }

      setBible(prev => ({
        ...prev,
        primaryLogo: {
          ...prev.primaryLogo,
          imageUrl: data.imageUrl,
          isGenerating: false,
          imageSize: resolution,
        },
      }));
    } catch (err: any) {
      console.error('Failed to generate primary logo:', err);
      setBible(prev => ({
        ...prev,
        primaryLogo: {
          ...prev.primaryLogo,
          isGenerating: false,
          error: err.message,
        },
      }));
    }
  };

  // Handler: Generate secondary mark with gemini-3-pro-image-preview
  const generateSecondaryMark = async (
    index: number, 
    prompt: string, 
    resolution: ImageResolution
  ) => {
    setBible(prev => {
      const marks = [...(prev.secondaryMarks || prev.logoPrompts?.secondaryMarks || [])];
      if (marks[index]) {
        marks[index] = { ...marks[index], isGenerating: true, error: undefined };
      }
      return { ...prev, secondaryMarks: marks };
    });

    try {
      const res = await fetch('/api/image/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          imageSize: resolution,
          aspectRatio: '1:1',
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.imageUrl) {
        throw new Error(data.error || 'Failed to generate mark');
      }

      setBible(prev => {
        const marks = [...(prev.secondaryMarks || prev.logoPrompts?.secondaryMarks || [])];
        if (marks[index]) {
          marks[index] = { ...marks[index], imageUrl: data.imageUrl, isGenerating: false };
        }
        return { ...prev, secondaryMarks: marks };
      });
    } catch (err: any) {
      console.error(`Failed to generate secondary mark ${index}:`, err);
      setBible(prev => {
        const marks = [...(prev.secondaryMarks || prev.logoPrompts?.secondaryMarks || [])];
        if (marks[index]) {
          marks[index] = { ...marks[index], isGenerating: false, error: err.message };
        }
        return { ...prev, secondaryMarks: marks };
      });
    }
  };

  // Handler: Update palette color live
  const handleUpdatePaletteColor = (index: number, newColor: Partial<ColorItem>) => {
    setBible(prev => {
      const updatedPalette = [...prev.palette];
      if (updatedPalette[index]) {
        updatedPalette[index] = { ...updatedPalette[index], ...newColor };
      }
      return { ...prev, palette: updatedPalette };
    });
  };

  // Handler: Update typography live
  const handleUpdateTypography = (newTypography: TypographyConfig) => {
    setBible(prev => ({
      ...prev,
      typography: newTypography,
    }));
  };

  // Handler: Select preset
  const handleSelectPreset = (id: string) => {
    const preset = BRAND_PRESETS.find(p => p.id === id);
    if (preset) {
      setBible(preset.initialBible);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased">
      {/* Top Navigation */}
      <Header
        bible={bible}
        onOpenChat={() => setIsChatOpen(true)}
        onSelectPreset={handleSelectPreset}
        onOpenExport={() => setIsExportOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Mission Input & Generator Form */}
        <section id="generator-input">
          <MissionInputForm
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            currentResolution={currentResolution}
            onResolutionChange={setCurrentResolution}
          />
        </section>

        {/* Dashboard Navigation Tabs */}
        {bible && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-800/80 scrollbar-none">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'all'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              <span>Full Brand Bible</span>
            </button>

            <button
              onClick={() => setActiveTab('logos')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'logos'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <ImageIcon className="h-3.5 w-3.5" />
              <span>Logos & Marks</span>
            </button>

            <button
              onClick={() => setActiveTab('palette')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'palette'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Palette className="h-3.5 w-3.5" />
              <span>5-Color Palette</span>
            </button>

            <button
              onClick={() => setActiveTab('typography')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'typography'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Type className="h-3.5 w-3.5" />
              <span>Typography & Google Fonts</span>
            </button>

            <button
              onClick={() => setActiveTab('collateral')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'collateral'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Collateral & Mockups</span>
            </button>

            <button
              onClick={() => setActiveTab('strategy')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'strategy'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Compass className="h-3.5 w-3.5" />
              <span>Strategy & Tone</span>
            </button>
          </div>
        )}

        {/* Brand Bible Dashboard Sections */}
        {bible && (
          <div className="space-y-16">
            {/* 1. Logos & Secondary Marks Section */}
            {(activeTab === 'all' || activeTab === 'logos') && (
              <section id="logos" className="scroll-mt-24">
                <LogoSuiteSection
                  bible={bible}
                  onGeneratePrimaryLogo={(prompt, res) => generatePrimaryLogo(prompt, res)}
                  onGenerateSecondaryMark={(idx, prompt, res) => generateSecondaryMark(idx, prompt, res)}
                />
              </section>
            )}

            {/* 2. 5-Color Hex Palette & Usage Section */}
            {(activeTab === 'all' || activeTab === 'palette') && (
              <section id="palette" className="scroll-mt-24">
                <ColorPaletteSection
                  bible={bible}
                  onUpdatePaletteColor={handleUpdatePaletteColor}
                />
              </section>
            )}

            {/* 3. Typography & Google Fonts Section */}
            {(activeTab === 'all' || activeTab === 'typography') && (
              <section id="typography" className="scroll-mt-24">
                <TypographySection
                  bible={bible}
                  onUpdateTypography={handleUpdateTypography}
                />
              </section>
            )}

            {/* 4. Brand Collateral & Mockups Section */}
            {(activeTab === 'all' || activeTab === 'collateral') && (
              <section id="collateral" className="scroll-mt-24">
                <BrandCollateralSection
                  bible={bible}
                />
              </section>
            )}

            {/* 5. Brand Foundations & Voice Guidelines Section */}
            {(activeTab === 'all' || activeTab === 'strategy') && (
              <section id="strategy" className="scroll-mt-24">
                <BrandStrategySection
                  bible={bible}
                />
              </section>
            )}
          </div>
        )}
      </main>

      {/* Floating Chat Trigger Bar */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsChatOpen(true)}
          className="flex items-center gap-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 text-xs font-semibold text-white shadow-2xl shadow-indigo-600/40 hover:from-indigo-500 hover:to-violet-500 transition-all hover:scale-105 active:scale-95"
        >
          <Sparkles className="h-4 w-4" />
          <span>Consult Brand Strategist</span>
        </button>
      </div>

      {/* Multi-turn Gemini Chatbot Drawer */}
      <GeminiChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        bible={bible}
      />

      {/* Export Modal */}
      {bible && (
        <ExportModal
          isOpen={isExportOpen}
          onClose={() => setIsExportOpen(false)}
          bible={bible}
        />
      )}
    </div>
  );
}
