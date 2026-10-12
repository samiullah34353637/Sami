import React, { useState } from 'react';
import { 
  Sparkles, 
  Download, 
  RefreshCw, 
  Eye, 
  Maximize2, 
  Layers, 
  Sliders, 
  Image as ImageIcon,
  Check,
  AlertCircle,
  Copy
} from 'lucide-react';
import { BrandBible, ImageResolution, SecondaryMark } from '../types';

interface LogoSuiteSectionProps {
  bible: BrandBible;
  onGeneratePrimaryLogo: (prompt: string, resolution: ImageResolution) => Promise<void>;
  onGenerateSecondaryMark: (index: number, prompt: string, resolution: ImageResolution) => Promise<void>;
}

export const LogoSuiteSection: React.FC<LogoSuiteSectionProps> = ({
  bible,
  onGeneratePrimaryLogo,
  onGenerateSecondaryMark,
}) => {
  // Backdrop simulator states: 'white' | 'dark' | 'dominant' | 'grid'
  const [backdrop, setBackdrop] = useState<'white' | 'dark' | 'dominant' | 'grid'>('white');
  const [selectedResolution, setSelectedResolution] = useState<ImageResolution>(bible.primaryLogo?.imageSize || '1K');
  
  // Prompt edit modal
  const [editingPromptModal, setEditingPromptModal] = useState<{
    isOpen: boolean;
    target: 'primary' | number;
    prompt: string;
    resolution: ImageResolution;
  }>({
    isOpen: false,
    target: 'primary',
    prompt: '',
    resolution: '1K',
  });

  const dominantColor = bible.palette.find(c => c.role.includes('Dominant'))?.hex || '#0f172a';

  const downloadImage = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openPromptEditor = (target: 'primary' | number) => {
    if (target === 'primary') {
      setEditingPromptModal({
        isOpen: true,
        target: 'primary',
        prompt: bible.primaryLogo?.prompt || bible.logoPrompts?.primary || '',
        resolution: selectedResolution,
      });
    } else {
      const mark = bible.secondaryMarks?.[target] || bible.logoPrompts?.secondaryMarks?.[target];
      setEditingPromptModal({
        isOpen: true,
        target,
        prompt: mark?.prompt || '',
        resolution: '1K',
      });
    }
  };

  const handleModalSubmit = async () => {
    const { target, prompt, resolution } = editingPromptModal;
    setEditingPromptModal(prev => ({ ...prev, isOpen: false }));
    if (target === 'primary') {
      await onGeneratePrimaryLogo(prompt, resolution);
    } else {
      await onGenerateSecondaryMark(target, prompt, resolution);
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold tracking-wider uppercase">
            <ImageIcon className="h-3.5 w-3.5" />
            <span>Identity Architecture · gemini-3-pro-image-preview</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
            Logo System & Secondary Marks
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Primary emblem, circular monochrome seal, application icon, and horizontal lockup.
          </p>
        </div>

        {/* Global Canvas Backdrop Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800/80 self-start sm:self-auto">
          <span className="text-[11px] font-medium text-slate-400 px-2">Backdrop:</span>
          <button
            onClick={() => setBackdrop('white')}
            className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
              backdrop === 'white' ? 'bg-white text-slate-950 font-semibold shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Light
          </button>
          <button
            onClick={() => setBackdrop('dark')}
            className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
              backdrop === 'dark' ? 'bg-slate-950 text-white font-semibold shadow-sm border border-slate-800' : 'text-slate-400 hover:text-white'
            }`}
          >
            Dark
          </button>
          <button
            onClick={() => setBackdrop('dominant')}
            className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
              backdrop === 'dominant' ? 'text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
            style={{ backgroundColor: backdrop === 'dominant' ? dominantColor : undefined }}
          >
            Brand
          </button>
          <button
            onClick={() => setBackdrop('grid')}
            className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
              backdrop === 'grid' ? 'bg-slate-800 text-indigo-300 font-semibold shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Grid
          </button>
        </div>
      </div>

      {/* Main Grid: Primary Logo (2 cols) and Secondary Marks (3 cols below) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Primary Logo Card (5 cols on lg) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800/90 bg-slate-900/50 p-6 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Primary Brand Mark
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] rounded bg-indigo-950/80 px-2 py-0.5 font-semibold text-indigo-300 border border-indigo-800/60 uppercase">
                  {bible.primaryLogo?.imageSize || selectedResolution} Res
                </span>
              </div>
            </div>

            {/* Display Canvas */}
            <div 
              className={`relative aspect-square w-full rounded-xl overflow-hidden border border-slate-800/80 flex items-center justify-center transition-all ${
                backdrop === 'white'
                  ? 'bg-white'
                  : backdrop === 'dark'
                  ? 'bg-slate-950'
                  : backdrop === 'dominant'
                  ? ''
                  : 'bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] bg-slate-100'
              }`}
              style={{ backgroundColor: backdrop === 'dominant' ? dominantColor : undefined }}
            >
              {bible.primaryLogo?.isGenerating ? (
                <div className="flex flex-col items-center justify-center gap-3 p-6 text-center">
                  <div className="h-10 w-10 animate-spin rounded-full border-3 border-indigo-500 border-t-transparent" />
                  <p className="text-xs font-semibold text-slate-700">
                    Generating with gemini-3-pro-image-preview...
                  </p>
                  <span className="text-[11px] text-slate-500">
                    Rendering at {selectedResolution} resolution
                  </span>
                </div>
              ) : bible.primaryLogo?.imageUrl ? (
                <img
                  src={bible.primaryLogo.imageUrl}
                  alt={`${bible.brandName} Primary Logo`}
                  referrerPolicy="no-referrer"
                  className="max-h-[82%] max-w-[82%] object-contain drop-shadow-md transition-transform hover:scale-105 duration-300"
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 p-6 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 shadow-inner">
                    <Sparkles className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Primary Logo Not Generated
                    </p>
                    <p className="mt-1 text-xs text-slate-500 max-w-xs">
                      Ready to synthesize with gemini-3-pro-image-preview at {selectedResolution} resolution.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Prompt preview */}
            <div className="mt-4 rounded-xl border border-slate-800/60 bg-slate-950/60 p-3">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Design Prompt
              </span>
              <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                {bible.primaryLogo?.prompt || bible.logoPrompts?.primary}
              </p>
            </div>
          </div>

          {/* Controls Footer */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-3">
            {/* Image Resolution Affordance (1K, 2K, 4K) */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Resolution Size:</span>
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                {(['1K', '2K', '4K'] as ImageResolution[]).map((res) => (
                  <button
                    key={res}
                    onClick={() => setSelectedResolution(res)}
                    className={`px-2.5 py-0.5 text-xs font-semibold rounded transition-colors ${
                      selectedResolution === res
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {res}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onGeneratePrimaryLogo(
                  bible.primaryLogo?.prompt || bible.logoPrompts?.primary || '',
                  selectedResolution
                )}
                disabled={bible.primaryLogo?.isGenerating}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow hover:bg-indigo-500 disabled:opacity-50 transition-all"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${bible.primaryLogo?.isGenerating ? 'animate-spin' : ''}`} />
                <span>{bible.primaryLogo?.imageUrl ? 'Regenerate Logo' : 'Generate Logo'}</span>
              </button>

              <button
                onClick={() => openPromptEditor('primary')}
                className="flex items-center justify-center rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                title="Edit Prompt & Settings"
              >
                <Sliders className="h-4 w-4" />
              </button>

              {bible.primaryLogo?.imageUrl && (
                <button
                  onClick={() => downloadImage(bible.primaryLogo!.imageUrl!, `${bible.brandName.toLowerCase().replace(/\s+/g, '-')}-primary-logo-${selectedResolution}.png`)}
                  className="flex items-center justify-center rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                  title="Download High-Res Logo"
                >
                  <Download className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Secondary Marks (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Secondary Brand Marks & Submarks
              </span>
              <span className="text-[11px] text-slate-500">
                3 responsive lockup variations
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(bible.secondaryMarks || bible.logoPrompts?.secondaryMarks || []).map((mark: SecondaryMark, idx: number) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-800/90 bg-slate-900/40 p-4 flex flex-col justify-between hover:border-slate-700/80 transition-all shadow-md"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-white line-clamp-1">
                        {mark.title}
                      </span>
                      <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[9px] font-medium text-slate-300 uppercase">
                        {mark.type}
                      </span>
                    </div>

                    {/* Canvas */}
                    <div 
                      className={`relative aspect-square w-full rounded-xl overflow-hidden border border-slate-800/80 flex items-center justify-center transition-all ${
                        backdrop === 'white'
                          ? 'bg-white'
                          : backdrop === 'dark'
                          ? 'bg-slate-950'
                          : backdrop === 'dominant'
                          ? ''
                          : 'bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:14px_14px] bg-slate-100'
                      }`}
                      style={{ backgroundColor: backdrop === 'dominant' ? dominantColor : undefined }}
                    >
                      {mark.isGenerating ? (
                        <div className="flex flex-col items-center justify-center gap-2 p-3 text-center">
                          <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
                          <span className="text-[10px] text-slate-700 font-medium">Rendering...</span>
                        </div>
                      ) : mark.imageUrl ? (
                        <img
                          src={mark.imageUrl}
                          alt={mark.title}
                          referrerPolicy="no-referrer"
                          className="max-h-[85%] max-w-[85%] object-contain drop-shadow transition-transform hover:scale-105 duration-200"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center p-3 text-center">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 mb-1">
                            <Layers className="h-5 w-5" />
                          </div>
                          <span className="text-[11px] font-semibold text-slate-800">
                            {mark.type === 'icon' ? 'Icon' : mark.type === 'monochrome' ? 'Seal' : 'Lockup'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Usage rule */}
                    <div className="mt-3">
                      <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                        Usage Context
                      </span>
                      <p className="mt-0.5 text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                        {mark.usage}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-1.5">
                    <button
                      onClick={() => onGenerateSecondaryMark(idx, mark.prompt, selectedResolution)}
                      disabled={mark.isGenerating}
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 px-2.5 py-1.5 text-[11px] font-semibold text-white transition-colors disabled:opacity-50"
                    >
                      <RefreshCw className={`h-3 w-3 ${mark.isGenerating ? 'animate-spin' : ''}`} />
                      <span>{mark.imageUrl ? 'Re-roll' : 'Generate'}</span>
                    </button>

                    <button
                      onClick={() => openPromptEditor(idx)}
                      className="rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-800 p-1.5 text-slate-400 hover:text-white transition-colors"
                      title="Edit Prompt"
                    >
                      <Sliders className="h-3 w-3" />
                    </button>

                    {mark.imageUrl && (
                      <button
                        onClick={() => downloadImage(mark.imageUrl!, `${bible.brandName.toLowerCase().replace(/\s+/g, '-')}-${mark.type}-mark.png`)}
                        className="rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-800 p-1.5 text-slate-400 hover:text-white transition-colors"
                        title="Download Mark"
                      >
                        <Download className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Guidelines Banner */}
          <div className="mt-4 rounded-xl border border-slate-800/80 bg-slate-950/40 p-3.5 flex items-start gap-3">
            <Layers className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-white">Clearspace & Scaling Rule:</strong> Always maintain a minimum exclusion zone equal to 50% of the mark's height around all logos. Do not compress, skew, or outline the emblems.
            </div>
          </div>
        </div>
      </div>

      {/* Prompt & Settings Edit Modal */}
      {editingPromptModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white">
                Customize Visual Prompt & Resolution
              </h3>
              <button
                onClick={() => setEditingPromptModal(prev => ({ ...prev, isOpen: false }))}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Design Prompt (gemini-3-pro-image-preview)
                </label>
                <textarea
                  rows={4}
                  value={editingPromptModal.prompt}
                  onChange={(e) => setEditingPromptModal(prev => ({ ...prev, prompt: e.target.value }))}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Image Resolution
                </label>
                <div className="flex items-center gap-2">
                  {(['1K', '2K', '4K'] as ImageResolution[]).map((res) => (
                    <button
                      key={res}
                      type="button"
                      onClick={() => setEditingPromptModal(prev => ({ ...prev, resolution: res }))}
                      className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        editingPromptModal.resolution === res
                          ? 'border-indigo-500 bg-indigo-600/20 text-indigo-300'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                      }`}
                    >
                      {res} ({res === '1K' ? '1024px' : res === '2K' ? '2048px' : '4096px'})
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setEditingPromptModal(prev => ({ ...prev, isOpen: false }))}
                className="rounded-xl border border-slate-700 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleModalSubmit}
                className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-semibold text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/30"
              >
                Generate Mark
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
