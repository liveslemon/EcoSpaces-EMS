import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, LineChart, Line, YAxis, CartesianGrid, AreaChart, Area } from 'recharts';

interface BarData {
  day: string;
  kwh: number;
}

export const ConsumptionBarChart: React.FC<{ data: BarData[] }> = ({ data }) => {
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barSize={12}>
          <Tooltip 
            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
            contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', color: '#fff' }}
          />
          <Bar 
            dataKey="kwh" 
            fill="#e4e4e7" 
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
          />
          <XAxis 
            dataKey="day" 
            tick={{ fill: '#71717a', fontSize: 12 }} 
            tickLine={false} 
            axisLine={false} 
            dy={10}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const MiniSparkline: React.FC<{ data: any[], color?: string }> = ({ data, color = "#10b981" }) => {
    return (
        <div className="h-[60px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                            <stop offset="95%" stopColor={color} stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <Area 
                        type="monotone" 
                        dataKey="kwh" 
                        stroke={color} 
                        fill={`url(#gradient-${color})`} 
                        strokeWidth={2}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

interface TrendData {
    time: string;
    usage: number;
}

export const UsageLineChart: React.FC<{ data: TrendData[] }> = ({ data }) => {
    return (
      <div className="h-[120px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="time" tick={{ fill: '#71717a', fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip 
                     contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', color: '#fff' }}
                />
                <Line 
                    type="stepAfter" 
                    dataKey="usage" 
                    stroke="#10b981" 
                    strokeWidth={2} 
                    dot={{ fill: '#10b981', r: 4, strokeWidth: 0 }} 
                    activeDot={{ r: 6, fill: '#fff' }}
                />
            </LineChart>
        </ResponsiveContainer>
      </div>
    );
}