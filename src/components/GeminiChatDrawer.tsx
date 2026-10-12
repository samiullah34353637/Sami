import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  X, 
  Trash2, 
  Bot, 
  User, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  ChevronRight,
  Copy,
  Check
} from 'lucide-react';
import { BrandBible, ChatMessage, ChatModelType } from '../types';

interface GeminiChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bible: BrandBible | null;
}

export const GeminiChatDrawer: React.FC<GeminiChatDrawerProps> = ({
  isOpen,
  onClose,
  bible,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I am your **Executive Brand Director & Design Strategist** powered by Gemini.

I can help you:
- **Critique & refine** your 5-color palette for WCAG AA/AAA contrast
- **Suggest alternative Google Font pairings** for your industry
- **Brainstorm punchier taglines** aligned with your company mission
- **Provide clearspace & logo lockup rules** for merchandise and packaging

How can I elevate your brand system today?`,
      timestamp: Date.now(),
      modelUsed: 'gemini-3.5-flash',
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modelType, setModelType] = useState<ChatModelType>('general');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const promptText = (textToSend || input).trim();
    if (!promptText || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: promptText,
      timestamp: Date.now(),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({
            role: m.role,
            content: m.content,
          })),
          modelType,
          brandContext: bible ? {
            brandName: bible.brandName,
            tagline: bible.tagline,
            missionStatement: bible.missionStatement,
            archetype: bible.archetype,
            palette: bible.palette,
            typography: bible.typography,
          } : undefined,
        }),
      });

      const data = await res.json();
      if (data.reply) {
        const assistantMsg: ChatMessage = {
          id: `asst-${Date.now()}`,
          role: 'assistant',
          content: data.reply,
          timestamp: Date.now(),
          modelUsed: data.modelUsed || (modelType === 'complex' ? 'gemini-3.1-pro-preview' : modelType === 'fast' ? 'gemini-3.1-flash-lite' : 'gemini-3.5-flash'),
        };
        setMessages(prev => [...prev, assistantMsg]);
      } else {
        throw new Error(data.error || 'No response returned');
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `I encountered an issue consulting the model: ${err.message || 'Please try again.'}`,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        content: 'Brand strategy session reset. What aspect of your Brand Bible shall we review next?',
        timestamp: Date.now(),
        modelUsed: 'gemini-3.5-flash',
      },
    ]);
  };

  const copyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col bg-slate-950 border-l border-slate-800 shadow-2xl animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 px-5 py-4 bg-slate-900/90 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/20">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">Brand Strategist</span>
              <span className="rounded bg-indigo-950 px-1.5 py-0.5 text-[9px] font-semibold text-indigo-300 border border-indigo-800">
                Gemini
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Multi-turn brand identity consultancy
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={clearChat}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            title="Clear Conversation"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            title="Close Drawer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Model Selector Bar (affordance for gemini-3.1-pro-preview, gemini-3.5-flash, gemini-3.1-flash-lite) */}
      <div className="border-b border-slate-800/80 bg-slate-900/50 p-2.5">
        <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2 mb-1.5">
          Select Gemini Intelligence Engine
        </div>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setModelType('complex')}
            className={`flex flex-col items-center py-1.5 px-2 rounded-lg text-center transition-all ${
              modelType === 'complex'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center gap-1 text-[11px] font-bold">
              <Cpu className="h-3 w-3" />
              <span>3.1 Pro</span>
            </div>
            <span className="text-[9px] opacity-80">Deep Strategy</span>
          </button>

          <button
            type="button"
            onClick={() => setModelType('general')}
            className={`flex flex-col items-center py-1.5 px-2 rounded-lg text-center transition-all ${
              modelType === 'general'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center gap-1 text-[11px] font-bold">
              <Sparkles className="h-3 w-3" />
              <span>3.5 Flash</span>
            </div>
            <span className="text-[9px] opacity-80">General Tasks</span>
          </button>

          <button
            type="button"
            onClick={() => setModelType('fast')}
            className={`flex flex-col items-center py-1.5 px-2 rounded-lg text-center transition-all ${
              modelType === 'fast'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center gap-1 text-[11px] font-bold">
              <Zap className="h-3 w-3" />
              <span>3.1 Flash-Lite</span>
            </div>
            <span className="text-[9px] opacity-80">Fast Iteration</span>
          </button>
        </div>
      </div>

      {/* Messages Thread */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
        {messages.map((m) => {
          const isUser = m.role === 'user';
          return (
            <div
              key={m.id}
              className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-900/60 text-indigo-300 border border-indigo-700/60 mt-1">
                  <Bot className="h-3.5 w-3.5" />
                </div>
              )}

              <div
                className={`group relative max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-900 border border-slate-800 text-slate-200'
                }`}
              >
                {/* Assistant Model Tag */}
                {!isUser && m.modelUsed && (
                  <div className="mb-2 flex items-center justify-between text-[10px] text-slate-500 border-b border-slate-800 pb-1.5">
                    <span className="font-mono">{m.modelUsed}</span>
                    <button
                      onClick={() => copyMessage(m.id, m.content)}
                      className="opacity-0 group-hover:opacity-100 hover:text-white transition-opacity"
                      title="Copy response"
                    >
                      {copiedId === m.id ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    </button>
                  </div>
                )}

                {/* Content with whitespace formatting */}
                <div className="whitespace-pre-wrap">
                  {m.content}
                </div>

                <div
                  className={`mt-2 text-[10px] ${
                    isUser ? 'text-indigo-200 text-right' : 'text-slate-500'
                  }`}
                >
                  {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>

              {isUser && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-300 mt-1">
                  <User className="h-3.5 w-3.5" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-900/60 text-indigo-300 border border-indigo-700/60">
              <Bot className="h-3.5 w-3.5" />
            </div>
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:-0.3s]" />
              <div className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:-0.15s]" />
              <div className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce" />
              <span className="text-xs text-slate-400 ml-1">Formulating strategic design advice...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Chips */}
      <div className="border-t border-slate-800/80 bg-slate-950 px-4 py-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
          <button
            onClick={() => handleSend('Critique our 5-color palette contrast and harmony.')}
            className="shrink-0 rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-slate-300 hover:border-indigo-500 hover:text-white transition-colors"
          >
            🎨 Palette Critique
          </button>
          <button
            onClick={() => handleSend('Suggest 5 punchier slogans for our company mission.')}
            className="shrink-0 rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-slate-300 hover:border-indigo-500 hover:text-white transition-colors"
          >
            ✨ 5 Slogan Variants
          </button>
          <button
            onClick={() => handleSend('Recommend guidelines for applying our circular stamp to physical packaging.')}
            className="shrink-0 rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-slate-300 hover:border-indigo-500 hover:text-white transition-colors"
          >
            📦 Packaging Rules
          </button>
        </div>
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="border-t border-slate-800/80 p-4 bg-slate-950"
      >
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder={`Ask Brand Strategist (${modelType === 'complex' ? '3.1 Pro' : modelType === 'fast' ? '3.1 Flash-Lite' : '3.5 Flash'})...`}
            className="flex-1 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow hover:bg-indigo-500 disabled:opacity-50 transition-all"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
