import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie } from 'recharts';
import { Download, Calendar, Zap, Leaf, DollarSign, ArrowUpRight, ArrowDownRight, Printer } from 'lucide-react';

// Mock Data
const ANNUAL_DATA = [
  { name: 'Jan', usage: 4000, solar: 2400 },
  { name: 'Feb', usage: 3500, solar: 2800 },
  { name: 'Mar', usage: 2000, solar: 4800 },
  { name: 'Apr', usage: 2780, solar: 5908 },
  { name: 'May', usage: 1890, solar: 6800 },
  { name: 'Jun', usage: 2390, solar: 7800 },
  { name: 'Jul', usage: 3490, solar: 8300 },
  { name: 'Aug', usage: 4000, solar: 7500 },
  { name: 'Sep', usage: 3200, solar: 6000 },
  { name: 'Oct', usage: 2800, solar: 4500 },
  { name: 'Nov', usage: 3600, solar: 3000 },
  { name: 'Dec', usage: 4200, solar: 2000 },
];

const CATEGORY_DATA = [
  { name: 'HVAC', value: 45, color: '#10b981' }, 
  { name: 'Lighting', value: 25, color: '#34d399' }, 
  { name: 'Machinery', value: 20, color: '#059669' }, 
  { name: 'Other', value: 10, color: '#064e3b' }, 
];

const ROOM_EFFICIENCY = [
  { name: 'Lab 3B', score: 98, trend: 'up' },
  { name: 'Dorm 304', score: 92, trend: 'up' },
  { name: 'Faculty Office', score: 85, trend: 'down' },
  { name: 'Lecture Hall A', score: 78, trend: 'down' },
  { name: 'Chemistry Lab', score: 72, trend: 'up' },
];

interface ReportingViewProps {
  isDark: boolean;
}

export const ReportingView: React.FC<ReportingViewProps> = ({ isDark }) => {
  const chartTextColor = isDark ? "#71717a" : "#64748b";
  const tooltipStyle = isDark 
    ? { backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', color: '#fff' }
    : { backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' };

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light text-zinc-900 dark:text-white mb-1">System Report</h1>
          <p className="text-zinc-500 dark:text-gray-400">Comprehensive energy analysis and audit logs.</p>
        </div>
        <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-gray-300 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white transition-colors">
                <Calendar size={16} />
                <span className="text-sm">Last 12 Months</span>
             </button>
             <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 transition-all">
                <Download size={16} />
                <span className="text-sm font-medium">Export CSV</span>
             </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KpiCard 
             title="Total Energy Saved" 
             value="12.4 MWh" 
             subtext="+8.2% vs last year"
             icon={<Zap size={20} className="text-emerald-500" />}
             trend="up"
          />
          <KpiCard 
             title="Carbon Offset" 
             value="4.2 Tons" 
             subtext="Equivalent to 210 trees"
             icon={<Leaf size={20} className="text-emerald-500" />}
             trend="up"
          />
          <KpiCard 
             title="Cost Efficiency" 
             value="$8,240" 
             subtext="Projected savings this year"
             icon={<DollarSign size={20} className="text-emerald-500" />}
             trend="up"
          />
      </div>

      {/* Main Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Graph (Span 2) */}
          <div className="lg:col-span-2 glass-card rounded-2xl p-6 md:p-8 min-h-[400px]">
              <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-zinc-900 dark:text-white">Consumption vs Generation</h3>
                  <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          <span className="text-xs text-zinc-500 dark:text-gray-400">Solar Gen</span>
                      </div>
                      <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-zinc-600 dark:bg-zinc-500"></span>
                          <span className="text-xs text-zinc-500 dark:text-gray-400">Grid Usage</span>
                      </div>
                  </div>
              </div>
              
              <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={ANNUAL_DATA}>
                          <defs>
                              <linearGradient id="colorSolar" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                              </linearGradient>
                              <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#52525b" stopOpacity={0.3}/>
                                  <stop offset="95%" stopColor="#52525b" stopOpacity={0}/>
                              </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "rgba(128,128,128,0.1)" : "rgba(0,0,0,0.05)"} />
                          <XAxis 
                              dataKey="name" 
                              tick={{ fill: chartTextColor, fontSize: 12 }} 
                              tickLine={false} 
                              axisLine={false} 
                              dy={10}
                          />
                          <YAxis 
                              tick={{ fill: chartTextColor, fontSize: 12 }} 
                              tickLine={false} 
                              axisLine={false}
                              tickFormatter={(value) => `${value / 1000}k`}
                          />
                          <Tooltip 
                              contentStyle={tooltipStyle}
                              itemStyle={{ color: isDark ? '#e4e4e7' : '#0f172a' }}
                          />
                          <Area 
                              type="monotone" 
                              dataKey="solar" 
                              stroke="#10b981" 
                              strokeWidth={2}
                              fillOpacity={1} 
                              fill="url(#colorSolar)" 
                          />
                          <Area 
                              type="monotone" 
                              dataKey="usage" 
                              stroke="#71717a" 
                              strokeWidth={2}
                              fillOpacity={1} 
                              fill="url(#colorUsage)" 
                          />
                      </AreaChart>
                  </ResponsiveContainer>
              </div>
          </div>

          {/* Side Stats (Span 1) */}
          <div className="flex flex-col gap-6">
              {/* Category Breakdown */}
              <div className="glass-card rounded-2xl p-6 flex-1">
                  <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-4">Usage by Device</h3>
                  <div className="flex items-center justify-center h-[200px] relative">
                      <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                              <Pie
                                  data={CATEGORY_DATA}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={60}
                                  outerRadius={80}
                                  paddingAngle={5}
                                  dataKey="value"
                              >
                                  {CATEGORY_DATA.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0.1)" />
                                  ))}
                              </Pie>
                              <Tooltip contentStyle={tooltipStyle} />
                          </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                          <span className="text-2xl font-bold text-zinc-900 dark:text-white">45%</span>
                          <span className="text-xs text-emerald-500 uppercase tracking-wide">HVAC</span>
                      </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                      {CATEGORY_DATA.map((cat) => (
                          <div key={cat.name} className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }}></span>
                              <span className="text-xs text-zinc-500 dark:text-gray-400">{cat.name}</span>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </div>

      {/* Bottom Table Section */}
      <div className="glass-card rounded-2xl p-6 md:p-8">
           <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-zinc-900 dark:text-white">Efficiency Leaderboard</h3>
              <button className="text-xs text-zinc-500 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white flex items-center gap-1">
                  View Full Audit Log <Printer size={12} />
              </button>
           </div>
           
           <div className="overflow-x-auto">
               <table className="w-full text-left text-sm">
                   <thead>
                       <tr className="border-b border-zinc-200 dark:border-white/5 text-zinc-500 dark:text-gray-500">
                           <th className="pb-4 font-medium pl-2">Room Name</th>
                           <th className="pb-4 font-medium">Efficiency Score</th>
                           <th className="pb-4 font-medium">Status</th>
                           <th className="pb-4 font-medium text-right pr-2">Weekly Trend</th>
                       </tr>
                   </thead>
                   <tbody className="divide-y divide-zinc-100 dark:divide-white/5">
                       {ROOM_EFFICIENCY.map((room) => (
                           <tr key={room.name} className="group hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors">
                               <td className="py-4 pl-2 font-medium text-zinc-700 dark:text-gray-300 group-hover:text-zinc-900 dark:group-hover:text-white">{room.name}</td>
                               <td className="py-4">
                                   <div className="flex items-center gap-3">
                                       <span className="text-zinc-900 dark:text-white font-mono">{room.score}/100</span>
                                       <div className="w-24 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                                           <div 
                                              className={`h-full rounded-full ${room.score > 90 ? 'bg-emerald-500' : room.score > 75 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                                              style={{ width: `${room.score}%` }}
                                           ></div>
                                       </div>
                                   </div>
                               </td>
                               <td className="py-4">
                                   {room.score > 80 
                                      ? <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">Optimized</span>
                                      : <span className="px-2 py-0.5 rounded text-[10px] bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20">Attention</span>
                                   }
                               </td>
                               <td className="py-4 text-right pr-2">
                                   <div className={`inline-flex items-center gap-1 ${room.trend === 'up' ? 'text-emerald-500 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
                                       {room.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                       <span>{Math.floor(Math.random() * 10) + 1}%</span>
                                   </div>
                               </td>
                           </tr>
                       ))}
                   </tbody>
               </table>
           </div>
      </div>
    </div>
  );
};

const KpiCard: React.FC<{ title: string; value: string; subtext: string; icon: React.ReactNode; trend: 'up' | 'down' }> = ({ title, value, subtext, icon, trend }) => {
    return (
        <div className="glass-card p-6 rounded-2xl border border-zinc-200 dark:border-white/5 hover:border-emerald-500/20 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                    {icon}
                </div>
                {trend === 'up' && <div className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 bg-emerald-500/10 px-2 py-0.5 rounded">+12%</div>}
            </div>
            <div>
                <p className="text-sm text-zinc-500 dark:text-gray-400 mb-1">{title}</p>
                <h3 className="text-3xl font-light text-zinc-900 dark:text-white mb-2">{value}</h3>
                <p className="text-xs text-zinc-500 dark:text-gray-500">{subtext}</p>
            </div>
        </div>
    )
}