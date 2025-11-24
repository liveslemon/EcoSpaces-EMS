import React from 'react';
import { Room } from '../types';
import { RoomWireframe } from '../components/RoomWireframe';
import { ArrowLeft, Users } from 'lucide-react';

interface RoomDetailViewProps {
  room: Room;
  onBack: () => void;
  onTogglePower: (roomId: string) => void;
  onToggleDevice: (roomId: string, device: 'lighting' | 'hvac' | 'appliances' | 'machinery') => void;
  isDark: boolean;
}

export const RoomDetailView: React.FC<RoomDetailViewProps> = ({ room, onBack, onTogglePower, onToggleDevice, isDark }) => {
  const isPowered = room.powerStatus === 'On';
  const isOccupied = room.occupancyStatus === 'Occupied';
  const isLab = room.category === 'Laboratories';

  // Calculations for Daily Usage (approximated from monthly / 30)
  const dailyTotal = (room.totalConsumption / 30).toFixed(1);
  const dailyLighting = (room.activeDevices.lighting / 30).toFixed(1);
  const dailyHvac = (room.activeDevices.hvac / 30).toFixed(1);
  const dailyAppliances = (room.activeDevices.other / 30).toFixed(1);
  const dailyMachinery = room.activeDevices.machinery ? (room.activeDevices.machinery / 30).toFixed(1) : '0.0';

  return (
    <div className="animate-fade-in pb-10 max-w-[1400px] mx-auto">
      
      {/* Breadcrumb Nav */}
      <div className="flex items-center gap-6 mb-8 text-2xl font-light">
          <button onClick={onBack} className="text-zinc-400 dark:text-gray-500 hover:text-zinc-900 dark:hover:text-white transition-colors">My spaces</button>
          <span className="text-zinc-900 dark:text-white font-medium border-b-2 border-zinc-900 dark:border-white pb-1">{room.category}</span>
          <span className="text-zinc-500 dark:text-gray-500">{room.name}</span>
      </div>

      <div className="flex justify-end mb-4 items-center gap-4">
           <button className="text-xs px-4 py-1.5 rounded-full border border-zinc-300 dark:border-white/20 text-zinc-600 dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition">
               More details
           </button>
      </div>

      {/* Main Content Layout - 3 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[600px]">
        
        {/* Left Col - Stats (3 cols wide) */}
        <div className="lg:col-span-3 flex flex-col gap-6">
            
            {/* Total Usage Today */}
            <div className="glass-card p-6 rounded-2xl relative overflow-hidden">
                 <h3 className="text-sm text-zinc-500 dark:text-gray-400 mb-1">Usage Today</h3>
                 <div className="flex items-baseline gap-2">
                    <p className="text-4xl font-light text-zinc-900 dark:text-white mb-2">{dailyTotal}</p>
                    <span className="text-sm text-zinc-500 dark:text-gray-500">kWh</span>
                 </div>
                 <div className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden mt-2">
                     <div className="h-full bg-emerald-500" style={{ width: '45%' }}></div>
                 </div>
            </div>

            {/* Manual Control */}
            <div className="glass-card p-6 rounded-2xl flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="text-sm text-zinc-600 dark:text-gray-300 mb-4">Manual Control</h3>
                    <div className="flex items-center justify-between bg-zinc-100 dark:bg-white/5 p-3 rounded-xl border border-zinc-200 dark:border-white/5">
                        <span className="text-sm text-zinc-500 dark:text-gray-400">Master Power</span>
                        <button 
                            onClick={() => onTogglePower(room.id)}
                            className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 relative ${isPowered ? 'bg-emerald-500' : 'bg-red-100 dark:bg-red-500/20 border border-red-200 dark:border-red-500/50'}`}
                        >
                            <div className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ${isPowered ? 'translate-x-6' : 'translate-x-0'} `}></div>
                        </button>
                    </div>
                </div>

                <div className="mt-6">
                    <p className="text-xs text-zinc-500 dark:text-gray-400 mb-1">Grid load is normal.</p>
                    <div className="flex justify-between items-center text-[10px] text-zinc-600 dark:text-gray-600 border-t border-zinc-200 dark:border-white/5 pt-3 mt-2">
                        <span>Analysis</span>
                        <span>Stable</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Center Col - Wireframe (6 cols wide) */}
        <div className="lg:col-span-6 relative">
            <RoomWireframe 
                category={room.category}
                status={room.occupancyStatus} 
                powerStatus={room.powerStatus}
                deviceStatus={room.deviceStatus}
                interactive={true}
                onToggleDevice={(device) => onToggleDevice(room.id, device)}
                isDark={isDark}
            />
            
            {/* Overlay Occupancy Indicator */}
            <div className="absolute top-6 left-6 flex items-center gap-3 pointer-events-none">
                 <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border ${isOccupied ? 'bg-emerald-100/80 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400' : 'bg-zinc-200/50 dark:bg-zinc-800/50 border-zinc-300 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400'}`}>
                    <Users size={14} />
                    <span className="text-xs font-medium uppercase tracking-wide">{room.occupancyStatus}</span>
                 </div>
            </div>
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-zinc-600 dark:text-gray-500 bg-white/50 dark:bg-black/50 px-3 py-1 rounded-full backdrop-blur pointer-events-none border border-white/20">
                Click icons in room to toggle devices
            </div>
        </div>

        {/* Right Col - Breakdown (3 cols wide) */}
        <div className="lg:col-span-3 flex flex-col gap-4 overflow-y-auto pr-1">
             {/* Lighting */}
             <div className={`glass-card p-6 rounded-2xl transition-all duration-300 ${room.deviceStatus.lighting && isPowered ? 'border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-900/5' : ''}`}>
                 <div className="flex justify-between items-start mb-2">
                     <h3 className="text-sm text-zinc-500 dark:text-gray-400">Lighting</h3>
                     <div className={`w-2 h-2 rounded-full ${room.deviceStatus.lighting && isPowered ? 'bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-zinc-300 dark:bg-zinc-700'}`}></div>
                 </div>
                 <p className="text-3xl font-light text-zinc-900 dark:text-white mb-1">
                    {isPowered && room.deviceStatus.lighting ? dailyLighting : 0}
                 </p>
                 <span className="text-xs text-zinc-500 dark:text-gray-500">kWh today</span>
             </div>

             {/* Air Conditioning */}
             <div className={`glass-card p-6 rounded-2xl transition-all duration-300 ${room.deviceStatus.hvac && isPowered ? 'border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-900/5' : ''}`}>
                 <div className="flex justify-between items-start mb-2">
                     <h3 className="text-sm text-zinc-500 dark:text-gray-400">Air Conditioning</h3>
                     <div className={`w-2 h-2 rounded-full ${room.deviceStatus.hvac && isPowered ? 'bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-zinc-300 dark:bg-zinc-700'}`}></div>
                 </div>
                 <p className="text-3xl font-light text-zinc-900 dark:text-white mb-1">
                    {isPowered && room.deviceStatus.hvac ? dailyHvac : 0}
                 </p>
                 <span className="text-xs text-zinc-500 dark:text-gray-500">kWh today</span>
             </div>

             {/* Heavy Machinery (Labs Only) */}
             {isLab && (
                <div className={`glass-card p-6 rounded-2xl transition-all duration-300 ${room.deviceStatus.machinery && isPowered ? 'border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-900/5' : ''}`}>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-sm text-zinc-500 dark:text-gray-400">Equipment</h3>
                        <div className={`w-2 h-2 rounded-full ${room.deviceStatus.machinery && isPowered ? 'bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-zinc-300 dark:bg-zinc-700'}`}></div>
                    </div>
                    <p className="text-3xl font-light text-zinc-900 dark:text-white mb-1">
                       {isPowered && room.deviceStatus.machinery ? dailyMachinery : 0}
                    </p>
                    <span className="text-xs text-zinc-500 dark:text-gray-500">kWh today</span>
                </div>
             )}

             {/* Appliances (Computer/Other) */}
             <div className={`glass-card p-6 rounded-2xl flex-1 transition-all duration-300 ${room.deviceStatus.appliances && isPowered ? 'border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-900/5' : ''}`}>
                 <div className="flex justify-between items-start mb-2">
                     <h3 className="text-sm text-zinc-500 dark:text-gray-400">{isLab ? 'Computers' : 'Appliances'}</h3>
                     <div className={`w-2 h-2 rounded-full ${room.deviceStatus.appliances && isPowered ? 'bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-zinc-300 dark:bg-zinc-700'}`}></div>
                 </div>
                 <p className="text-3xl font-light text-zinc-900 dark:text-white mb-1">
                    {isPowered && room.deviceStatus.appliances ? dailyAppliances : 0}
                 </p>
                 <span className="text-xs text-zinc-500 dark:text-gray-500">kWh today</span>
             </div>
        </div>

      </div>

      {/* Bottom Timeline */}
      <div className="mt-8 pt-8">
           <h3 className="text-lg font-light text-zinc-600 dark:text-gray-300 mb-6">Energy consumption / week</h3>
           
           <div className="w-full relative">
                <div className="flex justify-between text-xs text-zinc-500 dark:text-gray-500 mb-2 px-1">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
                
                {/* Dots visualization */}
                <div className="flex justify-between items-center gap-1">
                    <button className="text-zinc-400 dark:text-gray-600 hover:text-zinc-900 dark:hover:text-white transition-colors"><ArrowLeft size={14}/></button>
                    
                    <div className="flex-1 flex justify-between gap-1 px-4">
                        {[...Array(60)].map((_, i) => {
                            // Create a fade effect pattern
                            const opacity = Math.random() > 0.5 ? 'opacity-100' : 'opacity-30';
                            const active = i > 15 && i < 35; // Simulated active region
                            return (
                                <div 
                                    key={i} 
                                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${active ? 'bg-emerald-500 dark:bg-white' : 'bg-zinc-300 dark:bg-zinc-700'} ${opacity}`}
                                ></div>
                            )
                        })}
                    </div>

                    <button className="text-zinc-400 dark:text-gray-600 hover:text-zinc-900 dark:hover:text-white transition-colors rotate-180"><ArrowLeft size={14}/></button>
                </div>
           </div>
      </div>

    </div>
  );
};