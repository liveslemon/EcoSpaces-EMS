
import React, { useState } from 'react';
import { Room } from '../types';
import { WEEKLY_DATA, HOURLY_DATA } from '../constants';
import { MoreHorizontal, ArrowUpRight, Zap, ArrowRight, X, Maximize2, TrendingUp, Cpu, Fan, Lightbulb, ShieldCheck, Activity, Wifi, AlertTriangle, Wrench, CheckCircle2, Power, AlertCircle, ClipboardList, List } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, AreaChart, Area, LineChart, Line, Legend, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';

interface GeneralDashboardViewProps {
  rooms: Room[];
  isDark: boolean;
}

export const GeneralDashboardView: React.FC<GeneralDashboardViewProps> = ({ rooms, isDark }) => {
  const [showConsumptionDetail, setShowConsumptionDetail] = useState(false);
  const [healthStatus, setHealthStatus] = useState<'healthy' | 'warning'>('healthy');
  
  // Calculate aggregate stats
  const activeRooms = rooms.filter(r => r.occupancyStatus === 'Occupied').length;
  const today = new Date();
  const dateString = today.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });

  // Chart Theme Helpers
  const chartTextColor = isDark ? "#71717a" : "#64748b";
  const tooltipStyle = isDark 
    ? { backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', color: '#fff', fontSize: '10px' }
    : { backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a', fontSize: '10px' };

  return (
    <div className="space-y-8 animate-fade-in pb-10 relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between px-1 gap-4">
         <h1 className="text-2xl font-normal text-zinc-900 dark:text-white">Overview</h1>
         <div className="flex items-center gap-4 md:gap-8 text-right self-end md:self-auto">
             <p className="text-lg md:text-2xl font-normal text-zinc-900 dark:text-white flex items-center gap-2">
               11:37 AM <span className="text-xs md:text-sm text-zinc-500 dark:text-gray-400 hidden sm:inline">Time</span>
             </p>
             <p className="text-lg md:text-2xl font-normal text-zinc-900 dark:text-white">{dateString}</p>
         </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* --- ROW 1 --- */}

        {/* 1. Total Consumption (Span 2) - CLICKABLE */}
        <div 
            onClick={() => setShowConsumptionDetail(true)}
            className="group glass-card rounded-[2rem] p-8 lg:col-span-2 flex flex-col justify-between min-h-[320px] cursor-pointer hover:border-emerald-500/30 transition-all relative"
        >
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 size={18} className="text-emerald-500 dark:text-emerald-400" />
            </div>

            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-normal text-zinc-900 dark:text-white group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">Total energy consumption</h3>
                <div className="text-xs border border-zinc-300 dark:border-zinc-700 rounded-full px-4 py-1.5 text-zinc-600 dark:text-gray-300 group-hover:bg-black/5 dark:group-hover:bg-white/5 transition-colors">
                    View Details
                </div>
            </div>

            {/* Graphs Container */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 mb-6 flex-1 items-end pointer-events-none">
                {/* Graph 1 */}
                <div className="flex flex-col justify-end h-32">
                    <span className="text-xs text-zinc-500 dark:text-gray-400 mb-2 flex items-center gap-1">Lighting <ArrowUpRight size={10}/></span>
                    <div className="flex items-end justify-between gap-1 h-full">
                        {[40, 60, 45, 70, 50, 80, 60, 90, 75, 100].map((h, i) => (
                            <div key={i} className="w-1.5 bg-zinc-400 dark:bg-zinc-700 rounded-full group-hover:bg-emerald-600 transition-colors" style={{ height: `${h}%` }}></div>
                        ))}
                    </div>
                </div>
                 {/* Graph 2 */}
                 <div className="flex flex-col justify-end h-32">
                    <span className="text-xs text-zinc-500 dark:text-gray-400 mb-2 flex items-center gap-1">Appliances <MoreHorizontal size={10}/></span>
                    <div className="flex items-end justify-between gap-1 h-full">
                         {[60, 50, 70, 40, 60, 50, 40, 30, 50, 40].map((h, i) => (
                            <div key={i} className="w-1.5 bg-zinc-300 dark:bg-zinc-800 rounded-full group-hover:bg-emerald-700 transition-colors" style={{ height: `${h}%` }}></div>
                        ))}
                    </div>
                </div>
                 {/* Graph 3 */}
                 <div className="flex flex-col justify-end h-32">
                    <span className="text-xs text-zinc-500 dark:text-gray-400 mb-2 flex items-center gap-1">HVAC <ArrowUpRight size={10} className="rotate-180"/></span>
                    <div className="flex items-end justify-between gap-1 h-full">
                         {[80, 70, 90, 60, 80, 95, 70, 85, 90, 80].map((h, i) => (
                            <div key={i} className="w-1.5 bg-zinc-500 dark:bg-white rounded-full group-hover:bg-emerald-400 transition-colors" style={{ height: `${h}%` }}></div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Numbers */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 border-t border-zinc-200 dark:border-white/5 pt-6">
                 <div>
                    <span className="text-2xl md:text-3xl font-light text-zinc-900 dark:text-white tracking-tight">52–71</span>
                    <p className="text-[10px] text-zinc-500 dark:text-gray-500 mt-1 uppercase tracking-wider">kWh/mo</p>
                 </div>
                 <div>
                    <span className="text-2xl md:text-3xl font-light text-zinc-900 dark:text-white tracking-tight">29–37</span>
                    <p className="text-[10px] text-zinc-500 dark:text-gray-500 mt-1 uppercase tracking-wider">kWh/mo</p>
                 </div>
                 <div>
                    <span className="text-2xl md:text-3xl font-light text-zinc-900 dark:text-white tracking-tight">49–85</span>
                    <p className="text-[10px] text-zinc-500 dark:text-gray-500 mt-1 uppercase tracking-wider">kWh/mo</p>
                 </div>
            </div>
        </div>

        {/* 2. System Health & Alerts (Span 1) - UPDATED */}
        <div className={`glass-card rounded-[2rem] p-6 lg:col-span-1 flex flex-col min-h-[320px] relative overflow-hidden transition-all duration-500 group border ${
            healthStatus === 'healthy' 
              ? 'border-zinc-200 dark:border-white/5 hover:shadow-emerald-500/10' 
              : 'border-amber-500/50 bg-amber-50/50 dark:bg-amber-900/10 hover:shadow-amber-500/20'
        }`}>
            {/* Invisible Toggle for Demo Purposes (Top Right) */}
            <button 
                onClick={(e) => { e.stopPropagation(); setHealthStatus(prev => prev === 'healthy' ? 'warning' : 'healthy'); }}
                className="absolute top-4 right-4 z-20 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-zinc-300 dark:text-zinc-700 hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors"
                title="Simulate Alert"
            >
                <Activity size={16} />
            </button>

            {/* 1. System Summary Line */}
            <div className="z-10 mb-4">
                <h3 className={`text-lg font-medium transition-colors duration-300 ${healthStatus === 'healthy' ? 'text-zinc-900 dark:text-white' : 'text-amber-700 dark:text-amber-400'}`}>
                    {healthStatus === 'healthy' ? 'System Healthy' : 'Attention Needed'}
                </h3>
                <p className={`text-sm transition-colors duration-300 ${healthStatus === 'healthy' ? 'text-zinc-500 dark:text-gray-400' : 'text-amber-600/80 dark:text-amber-500/80'}`}>
                    {healthStatus === 'healthy' ? 'All systems operational' : '1 hardware issue detected'}
                </p>
            </div>

            {/* 2. Primary Status Icon (Centerpiece) */}
            <div className="flex-1 flex items-center justify-center z-10 mb-6 relative min-h-[120px]">
                <div className={`absolute inset-0 blur-3xl rounded-full transform scale-125 transition-colors duration-500 ${
                    healthStatus === 'healthy' ? 'bg-emerald-500/10' : 'bg-amber-500/15'
                }`}></div>
                
                <div className="relative transform transition-transform duration-500 hover:scale-105">
                    {healthStatus === 'healthy' ? (
                        <ShieldCheck size={90} strokeWidth={1} className="text-emerald-500 dark:text-emerald-400 drop-shadow-xl transition-all duration-500" />
                    ) : (
                        <AlertTriangle size={90} strokeWidth={1} className="text-amber-500 dark:text-amber-400 drop-shadow-xl transition-all duration-500" />
                    )}
                    
                    {/* Pulse Indicator Badge */}
                    <div className={`absolute -bottom-2 -right-2 p-1.5 rounded-full border-2 shadow-sm transition-colors duration-500 ${
                        healthStatus === 'healthy' 
                            ? 'bg-white dark:bg-[#181a19] border-emerald-100 dark:border-emerald-900' 
                            : 'bg-white dark:bg-[#181a19] border-amber-100 dark:border-amber-900'
                    }`}>
                        <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${
                            healthStatus === 'healthy' ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}></div>
                    </div>
                </div>
            </div>

            {/* 3. Hardware Status Breakdown (Mini Grid) */}
            <div className="grid grid-cols-3 gap-2 mb-4 z-10">
                <StatusModule 
                    icon={<Cpu size={14}/>} 
                    label="Sensors" 
                    status={healthStatus === 'healthy' ? 'ok' : 'warning'} 
                />
                <StatusModule 
                    icon={<Zap size={14}/>} 
                    label="Solar" 
                    status="ok" 
                />
                <StatusModule 
                    icon={<Wifi size={14}/>} 
                    label="Network" 
                    status="ok" 
                />
            </div>

            {/* 3.5 Active Alerts Preview (Conditional) */}
            {healthStatus === 'warning' && (
                <div className="mb-4 z-10 animate-fade-in">
                    <div className="bg-amber-100/80 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700/30 rounded-xl p-3 flex items-start gap-3 backdrop-blur-sm">
                        <AlertTriangle size={16} className="text-amber-600 dark:text-amber-500 mt-0.5 shrink-0" />
                        <div>
                            <p className="text-xs font-semibold text-amber-800 dark:text-amber-400">Humidity Sensor Offline</p>
                            <p className="text-[10px] text-amber-700/70 dark:text-amber-500/70 mt-0.5">Zone B • 2 mins ago</p>
                        </div>
                    </div>
                </div>
            )}

            {/* 4. Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-3 z-10 mt-auto">
                <button className="py-2.5 rounded-xl bg-white/60 dark:bg-white/5 hover:bg-white/90 dark:hover:bg-white/10 border border-zinc-100 dark:border-white/5 text-zinc-600 dark:text-gray-300 text-xs font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm backdrop-blur-sm">
                    <Wrench size={14} />
                    Diagnostics
                </button>
                <button className="py-2.5 rounded-xl bg-white/60 dark:bg-white/5 hover:bg-white/90 dark:hover:bg-white/10 border border-zinc-100 dark:border-white/5 text-zinc-600 dark:text-gray-300 text-xs font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm backdrop-blur-sm">
                    <ClipboardList size={14} />
                    Logs
                </button>
            </div>
        </div>

        {/* 3. Recommendations (Span 1) */}
        <div className="glass-card rounded-[2rem] p-8 lg:col-span-1 flex flex-col min-h-[320px]">
             <div className="flex justify-between items-start mb-6">
                <h3 className="text-lg font-normal text-zinc-900 dark:text-white">Recommendations</h3>
                <MoreHorizontal className="text-zinc-500 dark:text-gray-500 cursor-pointer" />
            </div>
            <p className="text-sm text-zinc-500 dark:text-gray-500 mb-6">Personalized tips for optimizing energy</p>

            <div className="space-y-4">
                {/* Light Card */}
                <div className="bg-[#e4e4e7] dark:bg-[#e4e4e7] text-black rounded-2xl p-5 relative shadow-sm">
                     <p className="text-sm font-medium leading-snug mb-8">Sunny day ahead! We recommend maximizing solar energy usage b...</p>
                     <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Today recommendation</p>
                </div>

                {/* Dark Card */}
                <div className="bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5">
                    <p className="text-sm text-zinc-600 dark:text-gray-300 leading-snug mb-4">Run appliances after 8 PM to reduce grid load.</p>
                    <div className="flex justify-between items-center text-[10px] text-zinc-500 dark:text-gray-500">
                        <span>Analysis</span>
                        <span>5 min</span>
                    </div>
                </div>
            </div>
        </div>

        {/* --- ROW 2 --- */}

        {/* 4. Tracking / Predicted (Span 1) - Light */}
        <div className="rounded-[2rem] p-8 lg:col-span-1 bg-white border border-zinc-200 dark:border-none dark:bg-[#e4e4e7] text-black flex flex-col justify-between min-h-[250px] shadow-sm dark:shadow-none">
             <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium">Tracking</h3>
                <MoreHorizontal className="text-zinc-400 cursor-pointer" />
            </div>
            <div>
                <p className="text-sm text-zinc-500 mb-4">Predicted energy usage</p>
                <p className="text-5xl font-light tracking-tight mb-1">5.7</p>
                <p className="text-sm text-zinc-500">kWh</p>
            </div>
        </div>

        {/* 5. Detailed Report (Span 1) - FIXED */}
        <div className="glass-card rounded-[2rem] p-8 lg:col-span-1 flex flex-col min-h-[250px]">
             <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-normal text-zinc-900 dark:text-white">Detailed report</h3>
                <button className="text-xs px-3 py-1 rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-500 dark:text-gray-400 flex items-center gap-1 hover:bg-black/5 dark:hover:bg-white/5 transition">
                    Week <ArrowUpRight size={10} className="rotate-180" />
                </button>
            </div>
            <p className="text-xs text-zinc-500 dark:text-gray-500 mb-4">Weekly consumption trend</p>

            {/* Recharts Bar Chart - Adjusted for better fit */}
            <div className="flex-1 w-full min-h-[120px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={WEEKLY_DATA} margin={{ top: 10, right: 0, left: 0, bottom: 0 }} barSize={20}>
                        <Tooltip 
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            contentStyle={tooltipStyle}
                        />
                        <Bar dataKey="kwh" radius={[4, 4, 0, 0]}>
                            {WEEKLY_DATA.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.day === 'Wed' ? '#10b981' : (isDark ? '#71717a' : '#cbd5e1')} />
                            ))}
                        </Bar>
                        <XAxis 
                            dataKey="day" 
                            tick={{ fill: chartTextColor, fontSize: 10 }} 
                            tickLine={false} 
                            axisLine={false}
                            dy={10}
                            interval={0}
                        />
                         <YAxis hide />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* 6. Saved Energy / Green Usage (Span 2) - Light */}
        <div className="rounded-[2rem] p-8 lg:col-span-2 bg-white border border-zinc-200 dark:border-none dark:bg-[#e4e4e7] text-black flex flex-col justify-between min-h-[250px] shadow-sm dark:shadow-none">
             <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-medium">Saved energy</h3>
                    <p className="text-sm text-zinc-500 mt-1">Green energy usage</p>
                </div>
                <button className="text-xs border border-zinc-400/30 rounded-full px-4 py-1.5 text-zinc-600 hover:bg-black/5 transition-colors">Change</button>
            </div>

            <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12 mt-4">
                 <div className="mb-2">
                     <span className="text-5xl md:text-6xl font-light tracking-tight">47%</span>
                     <p className="text--[10px] text-zinc-500 mt-2 uppercase tracking-wider">11AM — 3PM</p>
                 </div>

                 {/* Timeline Visualization */}
                 <div className="flex-1 pb-4 relative">
                     <div className="absolute top-1/2 left-0 w-full border-t border-dashed border-zinc-400"></div>
                     <div className="flex justify-between items-center relative z-10">
                         {['11AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM'].map((time, i) => {
                             const isFilled = i > 0 && i < 6;
                             return (
                                 <div key={i} className="flex flex-col items-center gap-3">
                                     <div className={`w-3 h-3 rounded-full border border-zinc-900 ${isFilled ? 'bg-zinc-900' : 'bg-transparent'}`}></div>
                                     <span className="text-[9px] text-zinc-500 font-medium hidden sm:block">{time}</span>
                                 </div>
                             )
                         })}
                     </div>
                 </div>
            </div>
        </div>

      </div>

      {/* DETAILED CONSUMPTION OVERLAY */}
      {showConsumptionDetail && (
          <ConsumptionDetailOverlay onClose={() => setShowConsumptionDetail(false)} isDark={isDark} />
      )}
    </div>
  );
};

// Sub-component for Hardware Status Module
const StatusModule = ({ icon, label, status }: { icon: React.ReactNode, label: string, status: 'ok' | 'warning' | 'error' }) => {
    const statusStyles = {
        ok: { dot: 'bg-emerald-500', text: 'text-emerald-500', icon: 'text-emerald-500' },
        warning: { dot: 'bg-amber-500', text: 'text-amber-500', icon: 'text-amber-500' },
        error: { dot: 'bg-red-500', text: 'text-red-500', icon: 'text-red-500' },
    };
    const style = statusStyles[status];

    return (
        <div className="flex flex-col items-center justify-center gap-2 p-2.5 rounded-xl bg-white/40 dark:bg-white/5 border border-zinc-100 dark:border-white/5 backdrop-blur-sm transition-all duration-300">
            <div className={`${style.icon} opacity-90`}>{icon}</div>
            <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></div>
                <span className="text-[9px] font-semibold uppercase text-zinc-500 dark:text-gray-400 tracking-wider">{label}</span>
            </div>
        </div>
    )
}

const DETAILED_HOURLY_DATA = [
    { time: '6 AM', hvac: 15, lighting: 5, appliances: 8 },
    { time: '9 AM', hvac: 25, lighting: 12, appliances: 15 },
    { time: '12 PM', hvac: 45, lighting: 8, appliances: 22 },
    { time: '3 PM', hvac: 38, lighting: 6, appliances: 25 },
    { time: '6 PM', hvac: 30, lighting: 35, appliances: 20 },
    { time: '9 PM', hvac: 20, lighting: 25, appliances: 28 },
    { time: '12 AM', hvac: 15, lighting: 10, appliances: 12 },
];

const ConsumptionDetailOverlay: React.FC<{ onClose: () => void; isDark: boolean }> = ({ onClose, isDark }) => {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity" onClick={onClose}></div>
            
            {/* Modal Card - Added max-h and flex-col to ensure scrolling inside */}
            <div className="relative bg-white dark:bg-[#0f1110] border border-zinc-200 dark:border-white/10 w-full max-w-4xl rounded-[2rem] shadow-2xl animate-scale-in flex flex-col max-h-[85vh]">
                
                {/* Content Wrapper with Scroll */}
                <div className="overflow-y-auto p-6 md:p-8 w-full">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-light text-zinc-900 dark:text-white mb-1">Energy Analytics</h2>
                            <p className="text-zinc-500 dark:text-gray-400 text-sm">Detailed breakdown of total consumption across all sectors.</p>
                        </div>
                        <button 
                            onClick={onClose} 
                            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-zinc-500 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Main Graph */}
                    <div className="mb-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                            <div className="flex gap-4">
                                <div>
                                    <span className="text-3xl font-light text-zinc-900 dark:text-white">342.5 kWh</span>
                                    <div className="flex items-center gap-2 text-emerald-500 text-sm mt-1">
                                        <TrendingUp size={14} />
                                        <span>+12% vs last week</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg self-start md:self-auto">
                                {['Day', 'Week', 'Month'].map(t => (
                                    <button key={t} className={`px-4 py-1.5 text-xs rounded-md ${t === 'Day' ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-500 dark:text-gray-500 hover:text-zinc-700 dark:hover:text-gray-300'}`}>
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="h-[250px] w-full bg-zinc-50 dark:bg-zinc-900/20 rounded-xl border border-zinc-200 dark:border-white/5 p-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={DETAILED_HOURLY_DATA}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "rgba(128,128,128,0.1)" : "rgba(0,0,0,0.05)"} />
                                    <XAxis dataKey="time" tick={{ fill: isDark ? '#71717a' : '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fill: isDark ? '#71717a' : '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <Tooltip 
                                        contentStyle={isDark 
                                            ? { backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }
                                            : { backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }
                                        }
                                        itemStyle={{ fontSize: '12px' }}
                                        labelStyle={{ color: isDark ? '#fff' : '#000', marginBottom: '5px', fontWeight: 'bold' }}
                                    />
                                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />
                                    
                                    <Line type="monotone" dataKey="hvac" name="HVAC" stroke="#10b981" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                                    <Line type="monotone" dataKey="lighting" name="Lighting" stroke="#34d399" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                                    <Line type="monotone" dataKey="appliances" name="Appliances" stroke="#0d9488" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Breakdown Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <DetailedMetricCard 
                            title="HVAC Systems" 
                            value="142 kWh" 
                            percentage={45} 
                            color="bg-emerald-500" 
                            icon={<Fan size={18} />}
                        />
                        <DetailedMetricCard 
                            title="Lighting" 
                            value="85 kWh" 
                            percentage={25} 
                            color="bg-emerald-400" 
                            icon={<Lightbulb size={18} />}
                        />
                        <DetailedMetricCard 
                            title="Appliances & Tech" 
                            value="115.5 kWh" 
                            percentage={30} 
                            color="bg-teal-600" 
                            icon={<Cpu size={18} />}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

const DetailedMetricCard: React.FC<{ title: string, value: string, percentage: number, color: string, icon: React.ReactNode }> = ({ title, value, percentage, color, icon }) => {
    return (
        <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 p-5 rounded-2xl flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white dark:bg-white/5 rounded-lg text-zinc-500 dark:text-gray-300 shadow-sm dark:shadow-none">
                        {icon}
                    </div>
                    <div>
                        <h4 className="text-sm font-medium text-zinc-900 dark:text-gray-200">{title}</h4>
                        <p className="text-xs text-zinc-500 dark:text-gray-500">{percentage}% of total</p>
                    </div>
                </div>
            </div>
            <div>
                 <div className="flex justify-between items-end mb-2">
                    <span className="text-xl font-light text-zinc-900 dark:text-white">{value}</span>
                 </div>
                 <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                     <div className={`h-full ${color}`} style={{ width: `${percentage}%` }}></div>
                 </div>
            </div>
        </div>
    )
}
