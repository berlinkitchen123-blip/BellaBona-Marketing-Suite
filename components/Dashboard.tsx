import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Users, Activity, DollarSign, MousePointerClick } from 'lucide-react';
import { ChartDataPoint } from '../types';

const data: ChartDataPoint[] = [
  { name: 'Mon', value: 4000, value2: 2400 },
  { name: 'Tue', value: 3000, value2: 1398 },
  { name: 'Wed', value: 2000, value2: 9800 },
  { name: 'Thu', value: 2780, value2: 3908 },
  { name: 'Fri', value: 1890, value2: 4800 },
  { name: 'Sat', value: 2390, value2: 3800 },
  { name: 'Sun', value: 3490, value2: 4300 },
];

const StatCard: React.FC<{ title: string; value: string; trend: number; icon: React.ElementType }> = ({ title, value, trend, icon: Icon }) => (
  <div className="glass-panel p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-brand-50 rounded-lg">
        <Icon className="w-6 h-6 text-brand-600" />
      </div>
      <span className={`flex items-center text-sm font-medium ${trend >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
        {trend >= 0 ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
        {Math.abs(trend)}%
      </span>
    </div>
    <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
    <p className="text-2xl font-bold text-secondary-900">{value}</p>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-secondary-900">Dashboard</h2>
          <p className="text-slate-500">Welcome back to Bellabona Suite.</p>
        </div>
        <div className="flex gap-2">
            <span className="px-3 py-1 bg-white border rounded-md text-xs font-medium text-slate-600 shadow-sm">Last 7 Days</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value="$84,230" trend={12.5} icon={DollarSign} />
        <StatCard title="Active Users" value="2,420" trend={-2.4} icon={Users} />
        <StatCard title="Engagement Rate" value="18.2%" trend={5.8} icon={Activity} />
        <StatCard title="Click Through" value="3.42%" trend={1.2} icon={MousePointerClick} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl shadow-sm">
          <h3 className="text-lg font-bold text-secondary-900 mb-6">Traffic Overview</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d946ef" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#d946ef" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="value" stroke="#d946ef" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl shadow-sm">
          <h3 className="text-lg font-bold text-secondary-900 mb-6">Campaign Performance</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                    cursor={{fill: '#f1f5f9'}}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value2" fill="#86198f" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
