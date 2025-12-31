import React, { useState } from 'react';
import { generateMarketingImage } from '../services/geminiService';
import { Image as ImageIcon, Download, Loader2, Sparkles, Maximize2 } from 'lucide-react';

const ImageGen: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<"1:1" | "16:9" | "3:4">("1:1");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    setGeneratedImage(null);
    try {
      const imgData = await generateMarketingImage(prompt, aspectRatio);
      setGeneratedImage(imgData);
    } catch (e) {
      console.error(e);
      alert("Failed to generate image. Please try a different prompt.");
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `bellabona-creative-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="max-w-5xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-secondary-900">Image Studio</h2>
        <p className="text-slate-500">Create stunning visuals for your campaigns.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Controls */}
        <div className="w-full lg:w-1/3 space-y-6">
          <div className="glass-panel p-6 rounded-2xl shadow-sm">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Visual Prompt</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the image you want to create... e.g., 'Minimalist perfume bottle on a marble table with soft sunlight'"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all h-32 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Aspect Ratio</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["1:1", "16:9", "3:4"] as const).map((ratio) => (
                    <button
                      key={ratio}
                      onClick={() => setAspectRatio(ratio)}
                      className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all ${
                        aspectRatio === ratio
                          ? 'bg-brand-50 border-brand-500 text-brand-700 ring-1 ring-brand-500'
                          : 'border-slate-200 text-slate-600 hover:border-brand-300'
                      }`}
                    >
                      {ratio}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading || !prompt}
                className="w-full mt-4 flex items-center justify-center gap-2 bg-secondary-900 hover:bg-secondary-800 text-white py-3 rounded-lg font-medium transition-all shadow-lg shadow-secondary-900/20 disabled:opacity-70"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5 text-brand-300" />}
                {loading ? 'Designing...' : 'Generate Visual'}
              </button>
            </div>
          </div>
        </div>

        {/* Preview Stage */}
        <div className="w-full lg:w-2/3">
          <div className="glass-panel p-2 rounded-2xl shadow-sm h-[500px] flex items-center justify-center bg-slate-50 relative overflow-hidden group">
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{backgroundImage: 'radial-gradient(#4a044e 1px, transparent 1px)', backgroundSize: '24px 24px'}}>
            </div>

            {loading ? (
               <div className="flex flex-col items-center gap-4 z-10">
                   <div className="relative">
                     <div className="w-16 h-16 rounded-full border-4 border-slate-200 border-t-brand-600 animate-spin"></div>
                     <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-brand-600 animate-pulse" />
                     </div>
                   </div>
                   <p className="text-slate-500 font-medium animate-pulse">Rendering high-res assets...</p>
               </div>
            ) : generatedImage ? (
                <div className="relative w-full h-full flex items-center justify-center p-4">
                  <img 
                    src={generatedImage} 
                    alt="Generated output" 
                    className="max-h-full max-w-full rounded-lg shadow-2xl object-contain"
                  />
                  <div className="absolute bottom-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                        onClick={downloadImage}
                        className="bg-white/90 hover:bg-white text-secondary-900 p-3 rounded-full shadow-lg backdrop-blur-sm transition-transform hover:scale-105"
                        title="Download"
                    >
                        <Download className="w-5 h-5" />
                    </button>
                    <button 
                        className="bg-white/90 hover:bg-white text-secondary-900 p-3 rounded-full shadow-lg backdrop-blur-sm transition-transform hover:scale-105"
                        title="Full Screen"
                    >
                        <Maximize2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
            ) : (
                <div className="text-center z-10 p-8">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                        <ImageIcon className="w-10 h-10" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900">Canvas Empty</h3>
                    <p className="text-slate-500 max-w-sm mx-auto mt-2">
                        Use the controls on the left to generate professional marketing visuals using Gemini.
                    </p>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGen;
