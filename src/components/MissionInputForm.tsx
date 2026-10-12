import React, { useState } from 'react';
import { 
  Sparkles, 
  Wand2, 
  Sliders, 
  HelpCircle, 
  Palette, 
  Maximize2, 
  Image as ImageIcon,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { ImageResolution } from '../types';

interface MissionInputFormProps {
  onGenerate: (params: {
    brandName: string;
    mission: string;
    category: string;
    personality: string;
    imageResolution: ImageResolution;
    colorMood: string;
    generateLogoImmediately: boolean;
  }) => void;
  isGenerating: boolean;
  currentResolution: ImageResolution;
  onResolutionChange: (res: ImageResolution) => void;
}

export const MissionInputForm: React.FC<MissionInputFormProps> = ({
  onGenerate,
  isGenerating,
  currentResolution,
  onResolutionChange,
}) => {
  const [brandName, setBrandName] = useState('');
  const [mission, setMission] = useState('');
  const [category, setCategory] = useState('Sustainable Tech & Lifestyle');
  const [personality, setPersonality] = useState('Visionary, intentional, polished, timeless');
  const [colorMood, setColorMood] = useState('High contrast modern minimalism with vivid accent');
  const [generateLogoImmediately, setGenerateLogoImmediately] = useState(true);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const sampleMissionSuggestions = [
    {
      title: 'Ocean Bioplastics',
      name: 'Pelagia',
      text: 'To replace petroleum single-use packaging with marine-degradable kelp polymers that nourish coastal ecosystems.',
    },
    {
      title: 'Neuro-Adaptive Sleep',
      name: 'Somna',
      text: 'To restore deep restorative delta sleep through acoustic neuro-synchronization and adaptive thermal circadian beds.',
    },
    {
      title: 'Autonomous Farm Robotics',
      name: 'Verdant Swarm',
      text: 'To cultivate regenerative micro-yield agriculture using solar robotic swarms that eliminate synthetic pesticides.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mission.trim()) return;

    onGenerate({
      brandName: brandName.trim() || 'Untitled Brand',
      mission: mission.trim(),
      category: category.trim(),
      personality: personality.trim(),
      imageResolution: currentResolution,
      colorMood: colorMood.trim(),
      generateLogoImmediately,
    });
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800/90 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/80 p-6 md:p-8 shadow-xl">
      {/* Decorative gradient glow */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />

      <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold tracking-wider uppercase mb-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI Brand Identity Architect</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Transform Your Mission into a Complete Brand Bible
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Define your core purpose. Gemini will synthesize primary & secondary logos, a 5-color usage palette, and Google Font pairings.
          </p>
        </div>

        {/* Brand Name & Category Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Company / Brand Name <span className="text-slate-500 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="e.g. EcoSphere, Aura, Kinetic Pods"
              className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Industry or Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Clean Energy, Fintech, Luxury Hospitality"
              className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
            />
          </div>
        </div>

        {/* Company Mission Statement (Core Input) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Company Mission Statement <span className="text-indigo-400">*</span>
            </label>
            <span className="text-[11px] text-slate-500">
              The foundational north star for your identity
            </span>
          </div>
          <textarea
            rows={3}
            value={mission}
            onChange={(e) => setMission(e.target.value)}
            required
            placeholder="Describe what your company does, who it serves, and the world it envisions creating..."
            className="w-full rounded-xl border border-slate-800 bg-slate-950/80 p-4 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors resize-none leading-relaxed"
          />

          {/* Prompt Ingestion Chips */}
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] text-slate-500 mr-1">Need inspiration? Try:</span>
            {sampleMissionSuggestions.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setBrandName(item.name);
                  setMission(item.text);
                }}
                className="rounded-lg border border-slate-800/80 bg-slate-900/60 px-2.5 py-1 text-xs text-slate-300 hover:border-indigo-500/50 hover:bg-slate-800 hover:text-white transition-all text-left"
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>

        {/* Image Size Affordance (1K, 2K, 4K) using gemini-3-pro-image-preview */}
        <div className="rounded-xl border border-slate-800/90 bg-slate-950/60 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-indigo-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-white">
                  Logo Image Resolution (gemini-3-pro-image-preview)
                </span>
              </div>
              <p className="mt-0.5 text-xs text-slate-400">
                Choose default rendering resolution for primary logos & secondary marks.
              </p>
            </div>

            {/* Resolution Selector Buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800/80">
              {(['1K', '2K', '4K'] as ImageResolution[]).map((res) => (
                <button
                  key={res}
                  type="button"
                  onClick={() => onResolutionChange(res)}
                  className={`flex flex-col items-center px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    currentResolution === res
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <span>{res}</span>
                  <span className="text-[10px] font-normal opacity-75">
                    {res === '1K' ? '1024px' : res === '2K' ? '2048px' : '4096px'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Advanced Options Accordion */}
        <div className="border-t border-slate-800/80 pt-3">
          <button
            type="button"
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
          >
            <Sliders className="h-3.5 w-3.5" />
            <span>Customize Brand Personality & Color Mood</span>
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isAdvancedOpen ? 'rotate-180' : ''}`} />
          </button>

          {isAdvancedOpen && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Brand Vibe & Personality
                </label>
                <input
                  type="text"
                  value={personality}
                  onChange={(e) => setPersonality(e.target.value)}
                  placeholder="e.g. Minimalist, bold, organic, tech-forward"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Color Mood Preference
                </label>
                <input
                  type="text"
                  value={colorMood}
                  onChange={(e) => setColorMood(e.target.value)}
                  placeholder="e.g. Deep obsidian and electric neon accent"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
              </div>

              <div className="sm:col-span-2 flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="genLogoCheckbox"
                  checked={generateLogoImmediately}
                  onChange={(e) => setGenerateLogoImmediately(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-950"
                />
                <label htmlFor="genLogoCheckbox" className="text-xs text-slate-300 cursor-pointer">
                  Automatically synthesize primary logo image upon generation (with gemini-3-pro-image-preview)
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isGenerating || !mission.trim()}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 hover:from-indigo-500 hover:to-violet-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isGenerating ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Synthesizing Brand Bible & Identity...</span>
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4" />
                <span>Generate Complete Brand Bible</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
