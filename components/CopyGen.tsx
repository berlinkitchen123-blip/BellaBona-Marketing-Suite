import React, { useState } from 'react';
import { generateMarketingCopy } from '../services/geminiService';
import { Sparkles, Copy, Check, Loader2, RefreshCw } from 'lucide-react';

const CopyGen: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Professional');
  const [audience, setAudience] = useState('');
  const [format, setFormat] = useState('Instagram Caption');
  const [generatedText, setGeneratedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    setCopied(false);
    try {
      const text = await generateMarketingCopy(topic, tone, audience, format);
      setGeneratedText(text);
    } catch (e) {
      console.error(e);
      setGeneratedText("Error generating content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-secondary-900">AI Copywriter</h2>
        <p className="text-slate-500">Generate high-converting marketing copy in seconds.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Controls */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-2xl shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Topic / Product</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Summer Skincare Sale"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Target Audience</label>
              <input
                type="text"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="e.g., Women 25-35, professionals"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tone</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                >
                  <option>Professional</option>
                  <option>Witty</option>
                  <option>Urgent</option>
                  <option>Luxury</option>
                  <option>Friendly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Format</label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                >
                  <option>Instagram Caption</option>
                  <option>LinkedIn Post</option>
                  <option>Email Subject Line</option>
                  <option>Blog Intro</option>
                  <option>Ad Headline</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !topic}
              className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white py-3 rounded-lg font-medium transition-all shadow-lg shadow-brand-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
              {loading ? 'Generating...' : 'Generate Magic'}
            </button>
          </div>
        </div>

        {/* Output */}
        <div className="lg:col-span-3">
          <div className="glass-panel p-6 rounded-2xl shadow-sm h-full min-h-[400px] flex flex-col relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-secondary-900">Generated Content</h3>
              {generatedText && (
                 <div className="flex gap-2">
                    <button 
                        onClick={handleGenerate} 
                        className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                        title="Regenerate"
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                    >
                        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Copied' : 'Copy'}
                    </button>
                 </div>
              )}
            </div>
            
            <div className="flex-1 bg-white/50 rounded-xl border border-slate-100 p-6 overflow-y-auto">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-3">
                   <Loader2 className="w-8 h-8 animate-spin text-brand-300" />
                   <p className="animate-pulse">Consulting the muse...</p>
                </div>
              ) : generatedText ? (
                <p className="whitespace-pre-wrap text-slate-700 leading-relaxed text-lg">{generatedText}</p>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400 italic">
                  Enter details and hit generate to start writing.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopyGen;
