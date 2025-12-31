import React from 'react';
import { LayoutDashboard, PenTool, Image as ImageIcon, BarChart3, Settings, Zap } from 'lucide-react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  onChangeView: (view: AppView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  const menuItems = [
    { id: AppView.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: AppView.COPYWRITER, label: 'Copywriter', icon: PenTool },
    { id: AppView.IMAGE_STUDIO, label: 'Image Studio', icon: ImageIcon },
    { id: AppView.CAMPAIGNS, label: 'Campaigns', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 bg-secondary-900 text-white h-screen flex flex-col fixed left-0 top-0 z-50 shadow-2xl">
      <div className="p-8 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-serif font-bold tracking-wide">Bellabona</h1>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive 
                  ? 'bg-brand-600 text-white shadow-lg shadow-brand-900/50' 
                  : 'text-slate-400 hover:bg-secondary-800 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-secondary-800">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors">
          <Settings className="w-5 h-5" />
          <span className="font-medium text-sm">Settings</span>
        </button>
        <div className="mt-4 px-4 py-3 rounded-lg bg-secondary-800/50 border border-secondary-800 text-xs text-slate-500">
          <p>Bellabona Suite v1.4.0</p>
          <p className="mt-1 opacity-50">Powered by Gemini</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
