import React, { useState } from 'react';
import { 
  Sparkles, 
  MessageSquare, 
  Download, 
  Layers, 
  FileText, 
  Code, 
  Check, 
  Share2, 
  FolderOpen,
  Printer
} from 'lucide-react';
import { BrandBible } from '../types';
import { BRAND_PRESETS } from '../utils/presets';

interface HeaderProps {
  bible: BrandBible | null;
  onOpenChat: () => void;
  onSelectPreset: (id: string) => void;
  onOpenExport: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  bible,
  onOpenChat,
  onSelectPreset,
  onOpenExport,
}) => {
  const [showPresetsMenu, setShowPresetsMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Studio Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-700 shadow-md shadow-indigo-500/20">
            <Layers className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-white">Brand Bible</span>
              <span className="rounded bg-indigo-950/80 px-1.5 py-0.5 text-[10px] font-semibold tracking-wider text-indigo-300 border border-indigo-800/60 uppercase">
                AI Studio
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              {bible?.brandName ? `${bible.brandName} Identity System` : 'Identity Generator & Design System'}
            </p>
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2.5">
          {/* Preset Selector */}
          <div className="relative">
            <button
              onClick={() => setShowPresetsMenu(!showPresetsMenu)}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-600 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <FolderOpen className="h-3.5 w-3.5 text-slate-400" />
              <span className="hidden sm:inline">Sample</span> Presets
            </button>

            {showPresetsMenu && (
              <div 
                className="absolute right-0 mt-2 w-72 rounded-xl border border-slate-800 bg-slate-900/95 p-2 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onClick={() => setShowPresetsMenu(false)}
              >
                <div className="px-2 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Curated Brand Systems
                </div>
                {BRAND_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => onSelectPreset(preset.id)}
                    className="w-full text-left rounded-lg p-2.5 hover:bg-slate-800/90 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white group-hover:text-indigo-300">
                        {preset.name}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {preset.category}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-1 text-[11px] text-slate-400">
                      {preset.mission}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Export Brand Bible */}
          {bible && (
            <button
              onClick={onOpenExport}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-600 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <Download className="h-3.5 w-3.5 text-slate-400" />
              <span>Export</span>
            </button>
          )}

          {/* Gemini Chatbot Trigger */}
          <button
            onClick={onOpenChat}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 active:bg-indigo-700 transition-all shadow-indigo-600/20"
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-200" />
            <span>Brand Strategist</span>
          </button>
        </div>
      </div>
    </header>
  );
};
