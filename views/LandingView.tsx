
import React, { useState, useMemo } from 'react';
import { MOCK_ROOMS, WEEKLY_DATA } from '../constants';
import { CategoryType, Room } from '../types';
import { Users, Zap, ArrowRight, ChevronRight, Activity, Building, ArrowLeft } from 'lucide-react';
import { RoomWireframe } from '../components/RoomWireframe';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface LandingViewProps {
  onSelectRoom: (roomId: string) => void;
  isDark: boolean;
}

export const LandingView: React.FC<LandingViewProps> = ({ onSelectRoom, isDark }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('Classrooms');
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const [occupancyFilter, setOccupancyFilter] = useState<'All' | 'Occupied' | 'Vacant'>('All');

  const categories: CategoryType[] = ['Classrooms', 'Laboratories', 'Offices', 'Male Hostels', 'Female Hostels'];

  // Reset building selection when category changes
  const handleCategoryChange = (cat: CategoryType) => {
    setActiveCategory(cat);
    setSelectedBuilding(null);
    setOccupancyFilter('All');
  };

  // 1. Get rooms for the selected category
  const categoryRooms = useMemo(() => {
    return MOCK_ROOMS.filter(room => room.category === activeCategory);
  }, [activeCategory]);

  // 2. Identify available buildings for this category
  const availableBuildings = useMemo(() => {
    return Array.from(new Set(categoryRooms.map(r => r.building))).sort();
  }, [categoryRooms]);

  // 3. Filter rooms based on selection and occupancy filter
  const displayedRooms = useMemo(() => {
    if (!selectedBuilding) return [];
    
    return categoryRooms.filter(room => {
        const matchesBuilding = room.building === selectedBuilding;
        const matchesOccupancy = occupancyFilter === 'All' ? true : room.occupancyStatus === occupancyFilter;
        return matchesBuilding && matchesOccupancy;
    });
  }, [categoryRooms, selectedBuilding, occupancyFilter]);

  const getBuildingDescription = (building: string) => {
      switch(building) {
          case 'SST': return 'School of Science & Tech';
          case 'TYD': return 'TY Danjuma Building';
          default: 
            if (activeCategory === 'Male Hostels') return 'Men\'s Residence';
            if (activeCategory === 'Female Hostels') return 'Women\'s Residence';
            return 'Campus Building';
      }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-light text-zinc-900 dark:text-white mb-1">My Spaces</h1>
          <p className="text-zinc-500 dark:text-gray-400">Monitor and manage energy across PAU campus.</p>
        </div>

        <div className="flex p-1 bg-zinc-200 dark:bg-white/5 rounded-xl border border-zinc-200 dark:border-white/5 backdrop-blur-sm overflow-x-auto no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`
                px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap
                ${activeCategory === cat 
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-md' 
                  : 'text-zinc-500 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* VIEW: Building Selection (Level 1) */}
      {!selectedBuilding && (
          <div className="animate-fade-in">
             <h2 className="text-xl font-light text-zinc-900 dark:text-white mb-6">Select Building</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableBuildings.map(building => {
                    const roomCount = categoryRooms.filter(r => r.building === building).length;
                    const occupiedCount = categoryRooms.filter(r => r.building === building && r.occupancyStatus === 'Occupied').length;
                    
                    return (
                        <div 
                            key={building}
                            onClick={() => setSelectedBuilding(building)}
                            className="group glass-card p-8 rounded-3xl cursor-pointer hover:bg-white/50 dark:hover:bg-white/5 hover:border-emerald-500/30 transition-all duration-300 relative overflow-hidden"
                        >
                             <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Building size={100} className="text-emerald-500 transform group-hover:scale-110 transition-transform duration-500"/>
                             </div>

                             <div className="relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors">
                                    <Building size={24} className="text-emerald-500 dark:text-emerald-400" />
                                </div>
                                <h3 className="text-3xl font-light text-zinc-900 dark:text-white mb-2">{building}</h3>
                                <p className="text-sm text-zinc-500 dark:text-gray-400 mb-6">{getBuildingDescription(building)}</p>
                                
                                <div className="flex items-center gap-4 text-xs font-medium tracking-wide">
                                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                        {occupiedCount} Occupied
                                    </span>
                                    <span className="text-zinc-500 dark:text-gray-500">
                                        {roomCount} Total Spaces
                                    </span>
                                </div>
                             </div>
                        </div>
                    )
                })}
             </div>
          </div>
      )}

      {/* VIEW: Room Selection (Level 2) */}
      {selectedBuilding && (
          <div className="animate-fade-in">
              {/* Navigation Bar for Rooms */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-zinc-200 dark:border-white/5">
                  <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setSelectedBuilding(null)}
                        className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-white/10 text-zinc-500 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                      >
                          <ArrowLeft size={20} />
                      </button>
                      <h2 className="text-xl text-zinc-900 dark:text-white">
                          <span className="text-zinc-400 dark:text-gray-500 font-light">{selectedBuilding} / </span> 
                          Rooms
                      </h2>
                  </div>

                  {/* Occupancy Filter Tabs */}
                  <div className="flex bg-zinc-200 dark:bg-zinc-900/50 p-1 rounded-lg border border-zinc-200 dark:border-white/5">
                      {(['All', 'Occupied', 'Vacant'] as const).map(filter => (
                          <button
                            key={filter}
                            onClick={() => setOccupancyFilter(filter)}
                            className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${occupancyFilter === filter ? 'bg-emerald-600 text-white shadow-lg' : 'text-zinc-500 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white'}`}
                          >
                              {filter}
                          </button>
                      ))}
                  </div>
              </div>

              {/* Grid of Rooms */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedRooms.length > 0 ? (
                    displayedRooms.map(room => (
                    <RoomCard key={room.id} room={room} onClick={() => onSelectRoom(room.id)} isDark={isDark} />
                    ))
                ) : (
                    <div className="col-span-full py-12 text-center text-zinc-500 dark:text-gray-500">
                        No {occupancyFilter.toLowerCase()} rooms found in {selectedBuilding}.
                    </div>
                )}
              </div>
          </div>
      )}

      {/* Global Weekly Timeline (Footer Visual) */}
      <div className="mt-4 glass-card rounded-2xl p-5 relative">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-zinc-900 dark:text-white">Energy consumption / week</h3>
          <div className="flex gap-4">
             <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-semibold text-zinc-500 dark:text-gray-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Predicted
             </div>
             <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-semibold text-zinc-500 dark:text-gray-400">
                <span className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700"></span> Actual
             </div>
          </div>
        </div>
        
        <div className="h-[100px] w-full relative">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={WEEKLY_DATA} margin={{ top: 5, right: 0, left: 0, bottom: 0 }} barGap={6}>
                    <Tooltip 
                        cursor={{ fill: 'transparent' }}
                        contentStyle={{ 
                            backgroundColor: isDark ? '#18181b' : '#ffffff', 
                            borderColor: isDark ? '#27272a' : '#e2e8f0',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            color: isDark ? '#fff' : '#000',
                            fontSize: '11px',
                            padding: '6px 10px'
                        }}
                        itemStyle={{ padding: 0 }}
                    />
                    <XAxis 
                        dataKey="day" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: isDark ? '#71717a' : '#94a3b8', fontSize: 10, fontWeight: 600 }}
                        dy={5}
                        interval={0}
                    />
                    <Bar dataKey="predicted" fill="#10b981" radius={[10, 10, 10, 10]} barSize={8} />
                    <Bar dataKey="kwh" fill={isDark ? '#3f3f46' : '#cbd5e1'} radius={[10, 10, 10, 10]} barSize={8} />
                </BarChart>
             </ResponsiveContainer>
             
             <button className="absolute -right-6 top-1/2 -translate-y-1/2 p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors hidden xl:block">
                <ArrowRight size={20} className="text-zinc-400 dark:text-gray-400" />
            </button>
        </div>
      </div>
    </div>
  );
};

const RoomCard: React.FC<{ room: Room; onClick: () => void; isDark: boolean }> = ({ room, onClick, isDark }) => {
  return (
    <div 
        onClick={onClick}
        className="group glass-card rounded-3xl p-6 cursor-pointer hover:border-emerald-500/30 hover:shadow-[0_0_30px_-10px_rgba(16,185,129,0.15)] transition-all duration-300 flex flex-col justify-between min-h-[380px]"
    >
      {/* Top Meta */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex gap-2 mb-3">
              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase ${room.occupancyStatus === 'Occupied' ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-zinc-200 dark:bg-zinc-700/50 text-zinc-500 dark:text-zinc-400'}`}>
                {room.occupancyStatus}
              </span>
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                {room.building.split(' ')[0]}
              </span>
          </div>
          
          <h3 className="text-xl font-medium text-zinc-900 dark:text-white mb-1 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">{room.name}</h3>
          
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl font-light text-zinc-700 dark:text-gray-200">{room.occupancyRate}%</h2>
            <p className="text-xs text-zinc-500 dark:text-gray-400">Occupancy</p>
          </div>
        </div>
        <button className="w-8 h-8 rounded-full border border-zinc-200 dark:border-white/10 flex items-center justify-center group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-colors">
            <ChevronRight size={16} className="text-zinc-400 dark:text-gray-400 group-hover:text-white dark:group-hover:text-black" />
        </button>
      </div>

      {/* Visual */}
      <div className="flex-1 mb-6 relative">
         <RoomWireframe 
            category={room.category}
            status={room.occupancyStatus} 
            powerStatus={room.powerStatus} 
            deviceStatus={room.deviceStatus}
            interactive={false}
            isDark={isDark}
         />
      </div>

      {/* Bottom Metrics */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-200 dark:border-white/5">
         <div>
            <p className="text-xs text-zinc-500 dark:text-gray-500 mb-1">Consumption</p>
            <div className="flex items-center gap-1.5">
                <Zap size={14} className="text-emerald-500 dark:text-emerald-400" />
                <span className="text-lg font-medium text-zinc-900 dark:text-white">{room.totalConsumption}</span>
                <span className="text-[10px] text-zinc-500 dark:text-gray-500">kWh</span>
            </div>
         </div>
         <div>
            <p className="text-xs text-zinc-500 dark:text-gray-500 mb-1">Grid Status</p>
            <div className="flex items-center gap-1.5">
                <Activity size={14} className="text-zinc-400" />
                <span className="text-sm font-medium text-zinc-700 dark:text-gray-300">Stable</span>
            </div>
         </div>
      </div>
    </div>
  );
};