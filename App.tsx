import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CopyGen from './components/CopyGen';
import ImageGen from './components/ImageGen';
import Campaigns from './components/Campaigns';
import { AppView } from './types';
import { Bell, Search } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard />;
      case AppView.COPYWRITER:
        return <CopyGen />;
      case AppView.IMAGE_STUDIO:
        return <ImageGen />;
      case AppView.CAMPAIGNS:
        return <Campaigns />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#fdfbff] text-slate-900 font-sans">
      <Sidebar currentView={currentView} onChangeView={setCurrentView} />
      
      <main className="flex-1 ml-64 p-8 relative overflow-hidden">
        
        {/* Decorative background elements ("Antigravity" feel) */}
        <div className="fixed -top-[20%] -right-[10%] w-[800px] h-[800px] rounded-full bg-gradient-to-b from-brand-200/20 to-transparent blur-3xl pointer-events-none" />
        <div className="fixed top-[40%] -left-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-t from-blue-200/10 to-transparent blur-3xl pointer-events-none" />

        {/* Top Header */}
        <header className="flex justify-between items-center mb-8 relative z-10">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Search campaigns, assets..." 
                    className="pl-10 pr-4 py-2 bg-white/60 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 w-64 transition-all hover:bg-white"
                />
            </div>
            <div className="flex items-center gap-4">
                <button className="relative p-2 text-slate-500 hover:text-brand-600 transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
                </button>
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-500 to-indigo-500 border-2 border-white shadow-md cursor-pointer"></div>
            </div>
        </header>

        {/* Main Content Area */}
        <div className="relative z-10 max-w-7xl mx-auto">
            {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
