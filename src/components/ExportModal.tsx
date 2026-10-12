import React, { useState } from 'react';
import { 
  Download, 
  Copy, 
  Check, 
  X, 
  FileCode, 
  FileText, 
  FileJson,
  Printer
} from 'lucide-react';
import { BrandBible } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  bible: BrandBible;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  bible,
}) => {
  const [activeTab, setActiveTab] = useState<'css' | 'json' | 'markdown'>('css');
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  // Generate CSS Variables
  const cssVariables = `:root {
  /* ${bible.brandName} Brand System Design Tokens */
  --brand-name: "${bible.brandName}";

  /* Color Palette Tokens */
  --color-dominant: ${bible.palette[0]?.hex || '#0f172a'}; /* ${bible.palette[0]?.name} (60%) */
  --color-secondary: ${bible.palette[1]?.hex || '#94a3b8'}; /* ${bible.palette[1]?.name} (30%) */
  --color-accent: ${bible.palette[2]?.hex || '#6366f1'}; /* ${bible.palette[2]?.name} (10%) */
  --color-dark-neutral: ${bible.palette[3]?.hex || '#1e293b'}; /* ${bible.palette[3]?.name} */
  --color-light-neutral: ${bible.palette[4]?.hex || '#f8fafc'}; /* ${bible.palette[4]?.name} */

  /* Typography Font Families (Google Fonts) */
  --font-display: "${bible.typography.headerFont.name}", sans-serif;
  --font-body: "${bible.typography.bodyFont.name}", sans-serif;
}`;

  // Generate Markdown Brand Book
  const markdownBook = `# ${bible.brandName} — Brand Bible & Identity Guidelines

> *"${bible.tagline}"*

---

## 1. Mission & Vision
- **Mission:** ${bible.missionStatement}
- **Vision:** ${bible.visionStatement}
- **Archetype:** ${bible.archetype}
- **Personality Adjectives:** ${bible.personalityAdjectives.join(', ')}

---

## 2. Chromatic System (5-Color Hex Palette)
${bible.palette.map((c, i) => `### ${c.role}: ${c.name} (\`${c.hex}\`)
- **Usage:** ${c.usage}
`).join('\n')}

---

## 3. Typographic System (Google Fonts)
- **Display & Headlines:** ${bible.typography.headerFont.name} (${bible.typography.headerFont.category})
  - *Weights:* ${bible.typography.headerFont.weights.join(', ')}
  - *Usage:* ${bible.typography.headerFont.usage}
- **Body & Controls:** ${bible.typography.bodyFont.name} (${bible.typography.bodyFont.category})
  - *Weights:* ${bible.typography.bodyFont.weights.join(', ')}
  - *Usage:* ${bible.typography.bodyFont.usage}
- **Pairing Rationale:** ${bible.typography.pairingRationale}

---

## 4. Voice & Tone
- **Tone:** ${bible.voiceGuidelines?.tone}
- **Dos:**
${bible.voiceGuidelines?.dos?.map(d => `  - ${d}`).join('\n')}
- **Don'ts:**
${bible.voiceGuidelines?.donts?.map(d => `  - ${d}`).join('\n')}
`;

  // JSON string
  const jsonString = JSON.stringify(bible, null, 2);

  const getCurrentContent = () => {
    switch (activeTab) {
      case 'css': return cssVariables;
      case 'markdown': return markdownBook;
      case 'json': return jsonString;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCurrentContent());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = `${bible.brandName.toLowerCase().replace(/\s+/g, '-')}-brand-bible.${
      activeTab === 'css' ? 'css' : activeTab === 'markdown' ? 'md' : 'json'
    }`;
    const blob = new Blob([getCurrentContent()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-white">
              Export Brand Bible & Design Tokens
            </h3>
            <p className="text-xs text-slate-400">
              Download or copy code ready for production codebases and design books.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('css')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'css' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileCode className="h-3.5 w-3.5" />
              <span>CSS Variables</span>
            </button>
            <button
              onClick={() => setActiveTab('markdown')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'markdown' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Markdown Book</span>
            </button>
            <button
              onClick={() => setActiveTab('json')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'json' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileJson className="h-3.5 w-3.5" />
              <span>Raw JSON</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="hidden sm:flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800"
              title="Print Brand Bible"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print Sheet</span>
            </button>
          </div>
        </div>

        {/* Code View */}
        <div className="mt-4 flex-1 overflow-auto rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-300">
          <pre className="whitespace-pre-wrap">{getCurrentContent()}</pre>
        </div>

        {/* Footer Actions */}
        <div className="mt-5 flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          >
            {isCopied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy to Clipboard</span>
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2 text-xs font-semibold text-white shadow hover:bg-indigo-500 transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download File</span>
          </button>
        </div>
      </div>
    </div>
  );
};
