import React, { useState } from 'react';
import { 
  Sparkles, 
  Smartphone, 
  CreditCard, 
  Package, 
  Monitor, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { BrandBible } from '../types';

interface BrandCollateralSectionProps {
  bible: BrandBible;
}

export const BrandCollateralSection: React.FC<BrandCollateralSectionProps> = ({ bible }) => {
  const [activeTab, setActiveTab] = useState<'card' | 'app' | 'packaging' | 'web'>('web');

  const dominantColor = bible.palette[0]?.hex || '#0f172a';
  const secondaryColor = bible.palette[1]?.hex || '#94a3b8';
  const accentColor = bible.palette[2]?.hex || '#6366f1';
  const darkNeutral = bible.palette[3]?.hex || '#1e293b';
  const lightNeutral = bible.palette[4]?.hex || '#f8fafc';

  const logoImg = bible.primaryLogo?.imageUrl;
  const iconMarkImg = bible.secondaryMarks?.[0]?.imageUrl;
  const stampMarkImg = bible.secondaryMarks?.[1]?.imageUrl;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold tracking-wider uppercase">
            <Layers className="h-3.5 w-3.5" />
            <span>Real-World Identity Mockups</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
            Brand Collateral & Applications
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            See your primary logo, color palette, and Google Fonts working in harmony across physical and digital touchpoints.
          </p>
        </div>

        {/* Collateral Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800/80 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('web')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'web' ? 'bg-indigo-600 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="h-3.5 w-3.5" />
            <span>Digital Web</span>
          </button>
          <button
            onClick={() => setActiveTab('card')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'card' ? 'bg-indigo-600 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <CreditCard className="h-3.5 w-3.5" />
            <span>Business Card</span>
          </button>
          <button
            onClick={() => setActiveTab('app')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'app' ? 'bg-indigo-600 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            <span>App Icon</span>
          </button>
          <button
            onClick={() => setActiveTab('packaging')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'packaging' ? 'bg-indigo-600 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Package className="h-3.5 w-3.5" />
            <span>Packaging</span>
          </button>
        </div>
      </div>

      {/* Main Showcase Container */}
      <div className="rounded-2xl border border-slate-800/90 bg-slate-950/80 p-6 md:p-8 shadow-xl min-h-[440px] flex items-center justify-center">
        {/* 1. DIGITAL WEB HERO MOCKUP */}
        {activeTab === 'web' && (
          <div className="w-full max-w-4xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden animate-in fade-in duration-200">
            {/* Browser chrome bar */}
            <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="rounded-md bg-slate-900 px-8 py-1 text-[11px] font-mono text-slate-400 border border-slate-800">
                https://www.{bible.brandName.toLowerCase().replace(/\s+/g, '')}.com
              </div>
              <div className="w-12" />
            </div>

            {/* Simulated Website Content */}
            <div 
              className="p-8 sm:p-12 transition-colors relative overflow-hidden"
              style={{ backgroundColor: lightNeutral }}
            >
              {/* Navbar */}
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-5">
                <div className="flex items-center gap-3">
                  {logoImg ? (
                    <img src={logoImg} alt="Logo" referrerPolicy="no-referrer" className="h-9 w-9 object-contain" />
                  ) : (
                    <div 
                      className="h-8 w-8 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                      style={{ backgroundColor: dominantColor }}
                    >
                      {bible.brandName.charAt(0)}
                    </div>
                  )}
                  <span 
                    className="font-bold text-lg tracking-tight"
                    style={{ 
                      fontFamily: `"${bible.typography.headerFont.name}", sans-serif`,
                      color: dominantColor 
                    }}
                  >
                    {bible.brandName}
                  </span>
                </div>

                <div className="hidden sm:flex items-center gap-6 text-xs font-medium" style={{ color: darkNeutral }}>
                  <span>Philosophy</span>
                  <span>Systems</span>
                  <span>Manifesto</span>
                  <span>Contact</span>
                </div>

                <button
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-sm transition-transform hover:scale-105"
                  style={{ backgroundColor: accentColor }}
                >
                  Get Started
                </button>
              </div>

              {/* Hero Section */}
              <div className="py-12 sm:py-16 max-w-2xl">
                <div 
                  className="text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ color: accentColor }}
                >
                  {bible.archetype}
                </div>
                <h1 
                  className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.15]"
                  style={{ 
                    fontFamily: `"${bible.typography.headerFont.name}", sans-serif`,
                    color: dominantColor 
                  }}
                >
                  {bible.tagline}
                </h1>
                <p 
                  className="mt-4 text-sm sm:text-base leading-relaxed"
                  style={{ 
                    fontFamily: `"${bible.typography.bodyFont.name}", sans-serif`,
                    color: darkNeutral 
                  }}
                >
                  {bible.missionStatement}
                </p>

                <div className="mt-8 flex items-center gap-3">
                  <button 
                    className="px-6 py-3 rounded-xl text-xs font-semibold text-white shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
                    style={{ backgroundColor: dominantColor }}
                  >
                    <span>Explore System</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                  <button 
                    className="px-6 py-3 rounded-xl text-xs font-semibold border transition-colors"
                    style={{ 
                      borderColor: secondaryColor,
                      color: dominantColor,
                      backgroundColor: 'white'
                    }}
                  >
                    Read Brand Book
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. BUSINESS CARD MOCKUP */}
        {activeTab === 'card' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl animate-in fade-in duration-200">
            {/* Front Card */}
            <div 
              className="aspect-[1.75/1] rounded-2xl p-6 shadow-2xl flex flex-col justify-between border border-slate-700/50 transition-transform hover:-translate-y-1 duration-200"
              style={{ backgroundColor: dominantColor }}
            >
              <div className="flex justify-end">
                <div 
                  className="h-2 w-8 rounded-full" 
                  style={{ backgroundColor: accentColor }} 
                />
              </div>
              <div className="flex items-center gap-4">
                {logoImg ? (
                  <img src={logoImg} alt="Logo" referrerPolicy="no-referrer" className="h-16 w-16 object-contain drop-shadow" />
                ) : (
                  <div className="h-14 w-14 rounded-xl bg-white/10 flex items-center justify-center text-white font-bold text-xl">
                    {bible.brandName.charAt(0)}
                  </div>
                )}
                <div>
                  <h3 
                    className="text-2xl font-bold tracking-tight text-white"
                    style={{ fontFamily: `"${bible.typography.headerFont.name}", sans-serif` }}
                  >
                    {bible.brandName}
                  </h3>
                  <p className="text-xs text-white/70">
                    {bible.tagline}
                  </p>
                </div>
              </div>
              <div className="text-[9px] font-mono tracking-widest text-white/40 uppercase">
                Front Side · 350gsm Silk Finish
              </div>
            </div>

            {/* Back Card */}
            <div 
              className="aspect-[1.75/1] rounded-2xl p-6 shadow-2xl flex flex-col justify-between border border-slate-200/80 transition-transform hover:-translate-y-1 duration-200"
              style={{ backgroundColor: lightNeutral }}
            >
              <div>
                <h4 
                  className="text-base font-bold"
                  style={{ 
                    fontFamily: `"${bible.typography.headerFont.name}", sans-serif`,
                    color: dominantColor 
                  }}
                >
                  Elena Vance
                </h4>
                <p 
                  className="text-[11px] font-medium"
                  style={{ color: accentColor }}
                >
                  Founder & Principal Strategist
                </p>
              </div>

              <div 
                className="space-y-1 text-xs"
                style={{ 
                  fontFamily: `"${bible.typography.bodyFont.name}", sans-serif`,
                  color: darkNeutral 
                }}
              >
                <div>hello@{bible.brandName.toLowerCase().replace(/\s+/g, '')}.com</div>
                <div>+1 (555) 902-1400</div>
                <div>san francisco · tokyo · london</div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-300 pt-2 text-[9px] font-mono text-slate-500 uppercase">
                <span>Back Side · Minimalist</span>
                <span style={{ color: accentColor }}>●</span>
              </div>
            </div>
          </div>
        )}

        {/* 3. MOBILE APP ICON MOCKUP */}
        {activeTab === 'app' && (
          <div className="flex flex-col items-center justify-center gap-6 animate-in fade-in duration-200 py-6">
            <div className="relative">
              {/* App Icon Container with iOS Squircle */}
              <div 
                className="h-32 w-32 rounded-[28px] shadow-2xl p-4 flex items-center justify-center border border-white/20 transition-transform hover:scale-105 duration-200 relative overflow-hidden"
                style={{ backgroundColor: dominantColor }}
              >
                {/* Subtle top glare highlight */}
                <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

                {iconMarkImg ? (
                  <img src={iconMarkImg} alt="App Icon" referrerPolicy="no-referrer" className="h-20 w-20 object-contain drop-shadow" />
                ) : logoImg ? (
                  <img src={logoImg} alt="App Icon" referrerPolicy="no-referrer" className="h-20 w-20 object-contain drop-shadow" />
                ) : (
                  <div className="text-white font-bold text-4xl">
                    {bible.brandName.charAt(0)}
                  </div>
                )}
              </div>
            </div>

            <div className="text-center">
              <h4 
                className="text-base font-bold text-white"
                style={{ fontFamily: `"${bible.typography.headerFont.name}", sans-serif` }}
              >
                {bible.brandName}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                iOS & Android Native App Icon (1024x1024 Adaptive)
              </p>
            </div>
          </div>
        )}

        {/* 4. LUXURY PACKAGING & TOTE BAG MOCKUP */}
        {activeTab === 'packaging' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl animate-in fade-in duration-200">
            {/* Kraft/Luxury Box */}
            <div 
              className="aspect-square rounded-2xl p-6 shadow-2xl flex flex-col items-center justify-center text-center border border-slate-700/50"
              style={{ backgroundColor: dominantColor }}
            >
              {stampMarkImg ? (
                <img src={stampMarkImg} alt="Packaging Stamp" referrerPolicy="no-referrer" className="h-24 w-24 object-contain invert opacity-90 drop-shadow" />
              ) : logoImg ? (
                <img src={logoImg} alt="Packaging" referrerPolicy="no-referrer" className="h-20 w-20 object-contain invert opacity-90 drop-shadow" />
              ) : (
                <div className="h-16 w-16 rounded-full border-2 border-white/60 flex items-center justify-center text-white text-xl font-bold">
                  {bible.brandName.charAt(0)}
                </div>
              )}
              <h4 
                className="mt-4 text-sm font-bold text-white tracking-widest uppercase"
                style={{ fontFamily: `"${bible.typography.headerFont.name}", sans-serif` }}
              >
                {bible.brandName}
              </h4>
              <span className="text-[10px] text-white/60 uppercase tracking-widest mt-1">
                Foil Embossed Luxury Rigid Box
              </span>
            </div>

            {/* Cotton Tote / Parchment pouch */}
            <div 
              className="aspect-square rounded-2xl p-6 shadow-2xl flex flex-col items-center justify-center text-center border border-slate-300"
              style={{ backgroundColor: lightNeutral }}
            >
              {stampMarkImg ? (
                <img src={stampMarkImg} alt="Stamp" referrerPolicy="no-referrer" className="h-24 w-24 object-contain opacity-85" />
              ) : (
                <div className="h-16 w-16 rounded-full border-2 border-slate-800 flex items-center justify-center text-slate-900 text-xl font-bold">
                  {bible.brandName.charAt(0)}
                </div>
              )}
              <h4 
                className="mt-4 text-sm font-bold tracking-widest uppercase"
                style={{ 
                  fontFamily: `"${bible.typography.headerFont.name}", sans-serif`,
                  color: darkNeutral 
                }}
              >
                {bible.brandName}
              </h4>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">
                Heavyweight Organic Canvas Tote
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
