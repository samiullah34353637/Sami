import React, { useState, useEffect } from 'react';
import { 
  Type, 
  ExternalLink, 
  Sparkles, 
  RefreshCw, 
  Sliders, 
  Check, 
  Layers, 
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { BrandBible, TypographyConfig } from '../types';
import { loadGoogleFont } from '../utils/fontLoader';
import { CURATED_FONT_PAIRINGS } from '../utils/presets';

interface TypographySectionProps {
  bible: BrandBible;
  onUpdateTypography: (newTypography: TypographyConfig) => void;
}

export const TypographySection: React.FC<TypographySectionProps> = ({
  bible,
  onUpdateTypography,
}) => {
  const [sampleHeadline, setSampleHeadline] = useState(
    bible.tagline || 'Design that transcends the physical realm.'
  );
  const [sampleBody, setSampleBody] = useState(
    bible.missionStatement || 'We build foundational systems where elegance meets uncompromising precision.'
  );
  const [isSuggestingAi, setIsSuggestingAi] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<any[]>([]);

  const headerFont = bible.typography.headerFont;
  const bodyFont = bible.typography.bodyFont;

  // Ensure fonts are loaded dynamically into DOM
  useEffect(() => {
    if (headerFont?.name) loadGoogleFont(headerFont.name);
    if (bodyFont?.name) loadGoogleFont(bodyFont.name);
  }, [headerFont?.name, bodyFont?.name]);

  const handleApplyCuratedPairing = (pairing: typeof CURATED_FONT_PAIRINGS[0]) => {
    loadGoogleFont(pairing.headerFont.name);
    loadGoogleFont(pairing.bodyFont.name);
    onUpdateTypography({
      headerFont: pairing.headerFont,
      bodyFont: pairing.bodyFont,
      pairingRationale: pairing.rationale,
    });
  };

  const handleRequestAiFontSuggestions = async () => {
    setIsSuggestingAi(true);
    try {
      const res = await fetch('/api/brand/suggest-fonts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandName: bible.brandName,
          mission: bible.missionStatement,
          currentHeader: headerFont.name,
          currentBody: bodyFont.name,
        }),
      });
      const data = await res.json();
      if (data.suggestions && Array.isArray(data.suggestions)) {
        setAiSuggestions(data.suggestions);
        // Pre-load these fonts
        data.suggestions.forEach((s: any) => {
          if (s.headerFont) loadGoogleFont(s.headerFont);
          if (s.bodyFont) loadGoogleFont(s.bodyFont);
        });
      }
    } catch (err) {
      console.error('Failed to get font suggestions:', err);
    } finally {
      setIsSuggestingAi(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold tracking-wider uppercase">
            <Type className="h-3.5 w-3.5" />
            <span>Typography System · Google Fonts Live</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
            Suggested Google Font Pairings & Type Scale
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Harmonious headline and body pairings dynamically injected and rendered in real-time.
          </p>
        </div>

        {/* AI Suggest Alternative Pairings */}
        <button
          onClick={handleRequestAiFontSuggestions}
          disabled={isSuggestingAi}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-3.5 py-2 text-xs font-semibold text-white shadow transition-all disabled:opacity-50 self-start sm:self-auto"
        >
          <Sparkles className={`h-3.5 w-3.5 ${isSuggestingAi ? 'animate-spin' : ''}`} />
          <span>{isSuggestingAi ? 'Consulting Gemini...' : 'AI Suggest Alternative Pairings'}</span>
        </button>
      </div>

      {/* Font Duo Cards (Header Font + Body Font) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Header Font Card */}
        <div className="rounded-2xl border border-slate-800/90 bg-slate-900/50 p-6 flex flex-col justify-between shadow-md">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Primary Display & Header Font
              </span>
              <a
                href={`https://fonts.google.com/specimen/${encodeURIComponent(headerFont.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-indigo-300 transition-colors"
              >
                <span>Google Fonts</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <div className="py-2">
              <h3 
                className="text-3xl sm:text-4xl font-bold text-white tracking-tight"
                style={{ fontFamily: `"${headerFont.name}", sans-serif` }}
              >
                {headerFont.name}
              </h3>
              <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-300 uppercase">
                  {headerFont.category}
                </span>
                <span>·</span>
                <span>Weights: {headerFont.weights?.join(', ') || '600, 700'}</span>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-slate-800/80 bg-slate-950/60 p-4">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Display Usage Guidelines
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {headerFont.usage}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80">
            <span className="text-[11px] font-mono text-slate-400">
              font-family: "{headerFont.name}", sans-serif;
            </span>
          </div>
        </div>

        {/* Body Font Card */}
        <div className="rounded-2xl border border-slate-800/90 bg-slate-900/50 p-6 flex flex-col justify-between shadow-md">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Primary Body & Interface Font
              </span>
              <a
                href={`https://fonts.google.com/specimen/${encodeURIComponent(bodyFont.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-emerald-300 transition-colors"
              >
                <span>Google Fonts</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <div className="py-2">
              <h3 
                className="text-3xl sm:text-4xl font-normal text-white"
                style={{ fontFamily: `"${bodyFont.name}", sans-serif` }}
              >
                {bodyFont.name}
              </h3>
              <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-300 uppercase">
                  {bodyFont.category}
                </span>
                <span>·</span>
                <span>Weights: {bodyFont.weights?.join(', ') || '400, 500'}</span>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-slate-800/80 bg-slate-950/60 p-4">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Body Prose Guidelines
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {bodyFont.usage}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80">
            <span className="text-[11px] font-mono text-slate-400">
              font-family: "{bodyFont.name}", sans-serif;
            </span>
          </div>
        </div>
      </div>

      {/* Pairing Rationale Banner */}
      <div className="rounded-2xl border border-indigo-900/40 bg-gradient-to-r from-indigo-950/40 to-slate-900/50 p-5 flex items-start gap-3.5">
        <BookOpen className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 block mb-1">
            Typographic Pairing Rationale
          </span>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {bible.typography.pairingRationale}
          </p>
        </div>
      </div>

      {/* AI Suggestions Row (If triggered) */}
      {aiSuggestions.length > 0 && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
              Gemini Recommended Alternative Pairings (Fast Engine)
            </span>
            <button
              onClick={() => setAiSuggestions([])}
              className="text-xs text-slate-500 hover:text-slate-300"
            >
              Dismiss
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {aiSuggestions.map((s, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider block">
                    {s.styleLabel || 'Curated Pair'}
                  </span>
                  <div className="mt-1 font-bold text-white text-sm">
                    {s.headerFont} <span className="text-slate-500 font-normal">&</span> {s.bodyFont}
                  </div>
                  <p className="mt-1.5 text-[11px] text-slate-400 line-clamp-2">
                    {s.rationale}
                  </p>
                </div>
                <button
                  onClick={() => {
                    loadGoogleFont(s.headerFont);
                    loadGoogleFont(s.bodyFont);
                    onUpdateTypography({
                      headerFont: { name: s.headerFont, category: 'Sans-Serif', weights: ['700'], usage: 'Display headings' },
                      bodyFont: { name: s.bodyFont, category: 'Sans-Serif', weights: ['400'], usage: 'Body prose' },
                      pairingRationale: s.rationale,
                    });
                  }}
                  className="mt-3 flex items-center justify-center gap-1 rounded-lg bg-indigo-600/20 border border-indigo-500/40 px-3 py-1.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-600 hover:text-white transition-all"
                >
                  <span>Apply This Pair</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Curated Classic Pairings Carousel / Buttons */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Quick Swap: Top Curated Pairings
          </span>
          <span className="text-[11px] text-slate-500">
            Tested for contrast & rhythm
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {CURATED_FONT_PAIRINGS.map((pair, idx) => {
            const isCurrent = pair.headerFont.name === headerFont.name && pair.bodyFont.name === bodyFont.name;
            return (
              <button
                key={idx}
                onClick={() => handleApplyCuratedPairing(pair)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isCurrent
                    ? 'border-indigo-500 bg-indigo-950/40 text-white'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <div className="text-[10px] font-semibold text-indigo-400 truncate">
                  {pair.name}
                </div>
                <div className="mt-1 text-xs font-bold text-white truncate">
                  {pair.headerFont.name}
                </div>
                <div className="text-[11px] text-slate-400 truncate">
                  + {pair.bodyFont.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Interactive Type Scale Specimen & Sandbox */}
      <div className="rounded-2xl border border-slate-800/90 bg-slate-950/80 p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-white">
              Live Type Scale Specimen
            </h3>
            <p className="text-xs text-slate-400">
              Test real responsive hierarchy rendered in {headerFont.name} and {bodyFont.name}.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Custom Headline Text:</span>
            <input
              type="text"
              value={sampleHeadline}
              onChange={(e) => setSampleHeadline(e.target.value)}
              placeholder="Type your own headline..."
              className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none w-48 sm:w-64"
            />
          </div>
        </div>

        {/* Type Scale Elements */}
        <div className="space-y-6">
          {/* H1 Display */}
          <div className="border-b border-slate-850 pb-5">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">
              H1 Display · 54px · 700 Weight
            </div>
            <div
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight"
              style={{ fontFamily: `"${headerFont.name}", sans-serif` }}
            >
              {sampleHeadline}
            </div>
          </div>

          {/* H2 Section */}
          <div className="border-b border-slate-850 pb-5">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">
              H2 Section Title · 32px · 600 Weight
            </div>
            <div
              className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-100"
              style={{ fontFamily: `"${headerFont.name}", sans-serif` }}
            >
              {bible.tagline || 'Pioneering calm intelligence for human flourishing.'}
            </div>
          </div>

          {/* H3 Subtitle */}
          <div className="border-b border-slate-850 pb-5">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">
              H3 Subsection Title · 22px · 600 Weight
            </div>
            <div
              className="text-xl font-medium text-slate-200"
              style={{ fontFamily: `"${headerFont.name}", sans-serif` }}
            >
              Architected with zero compromise. Grounded in restorative simplicity.
            </div>
          </div>

          {/* Body Prose */}
          <div className="border-b border-slate-850 pb-5">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">
              Body Copy · 16px · 1.6 Line Height · {bodyFont.name}
            </div>
            <p
              className="text-base text-slate-300 leading-relaxed max-w-3xl"
              style={{ fontFamily: `"${bodyFont.name}", sans-serif` }}
            >
              {sampleBody}
            </p>
          </div>

          {/* Metadata / Tracking Test */}
          <div>
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">
              Micro Label & Metadata · 12px · Tracking +0.08em
            </div>
            <div
              className="text-xs uppercase tracking-widest text-indigo-400 font-semibold"
              style={{ fontFamily: `"${bodyFont.name}", sans-serif` }}
            >
              CONFIDENTIAL · {bible.brandName.toUpperCase()} BRAND IDENTITY SYSTEM · RELEASE V1.0
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
