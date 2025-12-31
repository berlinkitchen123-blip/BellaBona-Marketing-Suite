import React from 'react';
import { Campaign } from '../types';
import { MoreHorizontal, Play, Pause, Edit3, Trash2, Plus } from 'lucide-react';

const mockCampaigns: Campaign[] = [
  { id: '1', name: 'Summer Collection Launch', status: 'active', platform: 'instagram', engagement: 84 },
  { id: '2', name: 'B2B Outreach Q3', status: 'draft', platform: 'linkedin', engagement: 0 },
  { id: '3', name: 'Loyalty Program Email', status: 'completed', platform: 'email', engagement: 45 },
  { id: '4', name: 'Flash Sale Alert', status: 'active', platform: 'twitter', engagement: 62 },
];

const Campaigns: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-secondary-900">Campaigns</h2>
          <p className="text-slate-500">Manage and track your marketing initiatives.</p>
        </div>
        <button className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-brand-200">
          <Plus className="w-4 h-4" />
          New Campaign
        </button>
      </div>

      <div className="glass-panel rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Campaign Name</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Platform</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Engagement</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mockCampaigns.map((campaign) => (
              <tr key={campaign.id} className="hover:bg-white/50 transition-colors group">
                <td className="px-6 py-4">
                  <span className="font-medium text-secondary-900">{campaign.name}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                    ${campaign.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 
                      campaign.status === 'draft' ? 'bg-slate-100 text-slate-800' : 
                      'bg-blue-100 text-blue-800'}`}>
                    {campaign.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-slate-600 capitalize">{campaign.platform}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 w-24 bg-slate-100 rounded-full h-2">
                        <div 
                            className="bg-brand-500 h-2 rounded-full" 
                            style={{width: `${campaign.engagement}%`}}
                        ></div>
                    </div>
                    <span className="text-xs text-slate-500">{campaign.engagement}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-slate-400 hover:text-brand-600 rounded-md hover:bg-brand-50">
                        <Edit3 className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md hover:bg-rose-50">
                        <Trash2 className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md">
                        <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Campaigns;
