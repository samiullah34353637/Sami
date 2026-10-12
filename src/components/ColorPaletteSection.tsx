import React, { useState } from 'react';
import { 
  Palette, 
  Copy, 
  Check, 
  Sliders, 
  Sparkles, 
  Info, 
  ShieldCheck, 
  Download,
  Edit2
} from 'lucide-react';
import { BrandBible, ColorItem } from '../types';
import { getContrastRatio, getOptimalTextColor } from '../utils/fontLoader';

interface ColorPaletteSectionProps {
  bible: BrandBible;
  onUpdatePaletteColor: (index: number, newColor: Partial<ColorItem>) => void;
}

export const ColorPaletteSection: React.FC<ColorPaletteSectionProps> = ({
  bible,
  onUpdatePaletteColor,
}) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [editingColorIndex, setEditingColorIndex] = useState<number | null>(null);
  const [editHex, setEditHex] = useState('');
  const [editName, setEditName] = useState('');
  const [editUsage, setEditUsage] = useState('');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHex(text);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const copyAllPalette = () => {
    const text = bible.palette
      .map(c => `${c.role}: ${c.name} (${c.hex}) - ${c.usage}`)
      .join('\n');
    copyToClipboard(text);
  };

  const startEditing = (idx: number) => {
    const c = bible.palette[idx];
    setEditingColorIndex(idx);
    setEditHex(c.hex);
    setEditName(c.name);
    setEditUsage(c.usage);
  };

  const saveEditing = () => {
    if (editingColorIndex !== null) {
      onUpdatePaletteColor(editingColorIndex, {
        hex: editHex.trim().startsWith('#') ? editHex.trim() : `#${editHex.trim()}`,
        name: editName.trim() || bible.palette[editingColorIndex].name,
        usage: editUsage.trim() || bible.palette[editingColorIndex].usage,
      });
      setEditingColorIndex(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold tracking-wider uppercase">
            <Palette className="h-3.5 w-3.5" />
            <span>Chromatic System · 60-30-10 Rule</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
            5-Color Hex Palette & Usage Notes
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Semantic color tokens, accessibility contrast ratios, and strict placement guidelines.
          </p>
        </div>

        <button
          onClick={copyAllPalette}
          className="flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/80 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-600 transition-colors self-start sm:self-auto"
        >
          {copiedHex?.includes('\n') ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span>Copied All Codes!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-slate-400" />
              <span>Copy Full Palette</span>
            </>
          )}
        </button>
      </div>

      {/* 60-30-10 Proportion Visualizer */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          <span>Spatial Color Distribution (Interior & Interface Math)</span>
          <span className="text-indigo-400">60% Dominant · 30% Secondary · 10% Accent</span>
        </div>
        <div className="h-4 w-full rounded-lg overflow-hidden flex shadow-inner">
          <div 
            className="h-full transition-all duration-300" 
            style={{ width: '60%', backgroundColor: bible.palette[0]?.hex || '#0f172a' }}
            title={`${bible.palette[0]?.name || 'Dominant'}: 60%`}
          />
          <div 
            className="h-full transition-all duration-300" 
            style={{ width: '30%', backgroundColor: bible.palette[1]?.hex || '#94a3b8' }}
            title={`${bible.palette[1]?.name || 'Secondary'}: 30%`}
          />
          <div 
            className="h-full transition-all duration-300" 
            style={{ width: '10%', backgroundColor: bible.palette[2]?.hex || '#6366f1' }}
            title={`${bible.palette[2]?.name || 'Accent'}: 10%`}
          />
        </div>
      </div>

      {/* 5-Color Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {bible.palette.map((color, idx) => {
          const textColor = getOptimalTextColor(color.hex);
          const contrastLight = getContrastRatio(color.hex, '#FFFFFF');
          const contrastDark = getContrastRatio(color.hex, '#0F172A');
          const isCopied = copiedHex === color.hex;

          return (
            <div
              key={idx}
              className="rounded-2xl border border-slate-800/90 bg-slate-900/50 p-4 flex flex-col justify-between hover:border-slate-700/80 transition-all shadow-md group"
            >
              <div>
                {/* Visual Swatch */}
                <div
                  className="relative aspect-[4/3] w-full rounded-xl overflow-hidden shadow-inner flex flex-col justify-between p-3.5 transition-transform group-hover:scale-[1.02] duration-200"
                  style={{ backgroundColor: color.hex }}
                >
                  <div className="flex items-center justify-between">
                    <span 
                      className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded backdrop-blur-md bg-black/20"
                      style={{ color: textColor }}
                    >
                      {color.role}
                    </span>

                    <button
                      onClick={() => startEditing(idx)}
                      className="p-1.5 rounded-lg backdrop-blur-md bg-black/20 hover:bg-black/40 transition-colors"
                      style={{ color: textColor }}
                      title="Edit Color"
                    >
                      <Edit2 className="h-3 w-3" />
                    </button>
                  </div>

                  <div className="flex items-end justify-between">
                    <span 
                      className="font-mono text-xs font-bold tracking-wider"
                      style={{ color: textColor }}
                    >
                      {color.hex.toUpperCase()}
                    </span>

                    <button
                      onClick={() => copyToClipboard(color.hex)}
                      className="p-1 rounded bg-black/30 hover:bg-black/50 transition-colors"
                      style={{ color: textColor }}
                      title="Copy Hex"
                    >
                      {isCopied ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Color Information */}
                <div className="mt-3.5">
                  <h3 className="text-sm font-bold text-white">
                    {color.name}
                  </h3>
                  <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-400">
                    <span>vs Light: <strong className="text-slate-300">{contrastLight}:1</strong></span>
                    <span>·</span>
                    <span>vs Dark: <strong className="text-slate-300">{contrastDark}:1</strong></span>
                  </div>

                  {/* Accessibility badge */}
                  <div className="mt-1.5 flex items-center gap-1.5 text-[10px]">
                    <ShieldCheck className={`h-3 w-3 ${contrastLight >= 4.5 || contrastDark >= 4.5 ? 'text-emerald-400' : 'text-amber-400'}`} />
                    <span className="text-slate-400">
                      {contrastLight >= 7 || contrastDark >= 7 ? 'WCAG AAA (Enhanced)' : contrastLight >= 4.5 || contrastDark >= 4.5 ? 'WCAG AA (Compliant)' : 'Subtle Accent'}
                    </span>
                  </div>
                </div>

                {/* Usage Notes */}
                <div className="mt-3 pt-3 border-t border-slate-800/80">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                    Usage Notes & Rules
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {color.usage}
                  </p>
                </div>
              </div>

              {/* Bottom Quick Action */}
              <div className="mt-4 pt-2">
                <button
                  onClick={() => copyToClipboard(color.hex)}
                  className="w-full flex items-center justify-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950/70 hover:bg-slate-800/80 py-1.5 text-[11px] font-medium text-slate-300 hover:text-white transition-colors"
                >
                  {isCopied ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3 text-slate-400" />
                      <span>Copy Hex</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Color Edit Modal */}
      {editingColorIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white">
                Edit {bible.palette[editingColorIndex]?.role} Color
              </h3>
              <button
                onClick={() => setEditingColorIndex(null)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Swatch & Color Picker */}
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={editHex.startsWith('#') && editHex.length === 7 ? editHex : '#6366f1'}
                  onChange={(e) => setEditHex(e.target.value)}
                  className="h-14 w-14 rounded-xl cursor-pointer border border-slate-700 bg-transparent p-0"
                />
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Hex Code
                  </label>
                  <input
                    type="text"
                    value={editHex}
                    onChange={(e) => setEditHex(e.target.value)}
                    placeholder="#000000"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white font-mono uppercase focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Color Token Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Usage Rules & Context
                </label>
                <textarea
                  rows={3}
                  value={editUsage}
                  onChange={(e) => setEditUsage(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setEditingColorIndex(null)}
                className="rounded-xl border border-slate-700 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveEditing}
                className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-semibold text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/30"
              >
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
