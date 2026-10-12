import React from 'react';
import { 
  Compass, 
  Target, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Award, 
  ShieldCheck,
  BookOpen
} from 'lucide-react';
import { BrandBible } from '../types';

interface BrandStrategySectionProps {
  bible: BrandBible;
}

export const BrandStrategySection: React.FC<BrandStrategySectionProps> = ({ bible }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold tracking-wider uppercase">
          <Compass className="h-3.5 w-3.5" />
          <span>Brand Core & Positioning</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
          Brand Foundations, Voice & Strategic Pillars
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          The non-negotiable ethos, archetypes, and conversational guidelines guiding all communications.
        </p>
      </div>

      {/* Mission & Vision Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mission Statement */}
        <div className="rounded-2xl border border-slate-800/90 bg-slate-900/50 p-6 flex flex-col justify-between shadow-md">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Target className="h-4 w-4" />
              <span>Mission Statement</span>
            </div>
            <p className="text-base sm:text-lg font-medium text-slate-100 leading-relaxed">
              "{bible.missionStatement}"
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-500">
            Why we exist in the present moment · Grounding purpose
          </div>
        </div>

        {/* Vision Statement */}
        <div className="rounded-2xl border border-slate-800/90 bg-slate-900/50 p-6 flex flex-col justify-between shadow-md">
          <div>
            <div className="flex items-center gap-2 text-violet-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="h-4 w-4" />
              <span>Vision Statement</span>
            </div>
            <p className="text-base sm:text-lg font-medium text-slate-100 leading-relaxed">
              "{bible.visionStatement}"
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-500">
            The future state we are relentlessly building toward
          </div>
        </div>
      </div>

      {/* Archetype & Personality Adjectives */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Primary Brand Archetype
            </span>
            <div className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="h-5 w-5 text-indigo-400 shrink-0" />
              <span>{bible.archetype}</span>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              The psychological persona that drives customer emotional connection.
            </p>
          </div>

          <div className="md:col-span-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              Core Personality Attributes
            </span>
            <div className="flex flex-wrap gap-2">
              {bible.personalityAdjectives.map((adj, idx) => (
                <span
                  key={idx}
                  className="rounded-lg border border-slate-800 bg-slate-950/80 px-3 py-1.5 text-xs font-semibold text-indigo-200"
                >
                  {adj}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Brand Pillars */}
      {bible.brandPillars && bible.brandPillars.length > 0 && (
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Three Foundational Pillars
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {bible.brandPillars.map((pillar, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800/90 bg-slate-900/50 p-5 shadow-sm"
              >
                <div className="text-xs font-mono font-bold text-indigo-400 mb-1">
                  0{idx + 1}
                </div>
                <h4 className="text-base font-bold text-white mb-2">
                  {pillar.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Voice Guidelines: Tone, Dos, Don'ts */}
      <div className="rounded-2xl border border-slate-800/90 bg-slate-900/50 p-6 md:p-8 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block mb-1">
            Tone of Voice
          </span>
          <p className="text-base text-slate-200 font-medium leading-relaxed">
            {bible.voiceGuidelines?.tone}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800/80">
          {/* Dos */}
          <div className="rounded-xl border border-emerald-950/40 bg-emerald-950/10 p-5">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
              <CheckCircle2 className="h-4 w-4" />
              <span>Voice & Copy Dos</span>
            </div>
            <ul className="space-y-2.5">
              {bible.voiceGuidelines?.dos?.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Don'ts */}
          <div className="rounded-xl border border-rose-950/40 bg-rose-950/10 p-5">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-3">
              <XCircle className="h-4 w-4" />
              <span>Voice & Copy Don'ts</span>
            </div>
            <ul className="space-y-2.5">
              {bible.voiceGuidelines?.donts?.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
