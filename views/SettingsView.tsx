import React, { useState } from 'react';
import { Bell, Shield, Smartphone, Globe, Moon, Save, User, Wifi, Cpu, AlertTriangle, Check, Lock, LogOut, Key } from 'lucide-react';

type Tab = 'general' | 'notifications' | 'automation' | 'security' | 'devices';

export const SettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('general');

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <Section title="General Information" description="Update your system identity and location.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputGroup label="System Name" value="EcoSense Main Campus" />
              <InputGroup label="Admin Contact" value="admin@ecosense.edu" />
              <InputGroup label="Location" value="Building A, Floor 1-3" />
              <InputGroup label="Timezone" value="UTC -05:00" />
            </div>
            <div className="mt-6 border-t border-zinc-200 dark:border-white/5 pt-6">
                <h3 className="text-sm font-medium text-zinc-900 dark:text-white mb-4">Regional Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 dark:bg-black/20 border border-zinc-200 dark:border-white/5">
                         <span className="text-sm text-zinc-600 dark:text-gray-300">Currency</span>
                         <span className="text-sm font-mono text-zinc-900 dark:text-white">USD ($)</span>
                     </div>
                     <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 dark:bg-black/20 border border-zinc-200 dark:border-white/5">
                         <span className="text-sm text-zinc-600 dark:text-gray-300">Date Format</span>
                         <span className="text-sm font-mono text-zinc-900 dark:text-white">DD/MM/YYYY</span>
                     </div>
                </div>
            </div>
          </Section>
        );
      case 'notifications':
        return (
          <Section title="Notification Preferences" description="Manage how and when you receive alerts.">
             <div className="space-y-6">
                 <div>
                    <h3 className="text-sm font-medium text-zinc-900 dark:text-white mb-3">Alert Channels</h3>
                    <div className="space-y-3">
                        <ToggleRow label="Email Notifications" description="Receive daily digests and critical alerts via email." initial={true} />
                        <ToggleRow label="Push Notifications" description="Real-time alerts to your mobile device." initial={true} />
                        <ToggleRow label="SMS Alerts" description="Emergency critical alerts only." initial={false} />
                    </div>
                 </div>
                 <div className="border-t border-zinc-200 dark:border-white/5 pt-6">
                    <h3 className="text-sm font-medium text-zinc-900 dark:text-white mb-3">Thresholds</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputGroup label="High Usage Alert (> kWh)" value="5000" />
                        <InputGroup label="Quiet Hours (Start)" value="22:00" />
                    </div>
                 </div>
             </div>
          </Section>
        );
      case 'automation':
        return (
          <Section title="Automation Rules" description="Configure global energy saving rules.">
            <div className="space-y-4">
              <ToggleRow 
                label="Smart Occupancy Shutdown" 
                description="Automatically turn off devices when room is vacant for 15 mins."
                initial={true}
              />
              <ToggleRow 
                label="Daylight Harvesting" 
                description="Dim lights when natural light is sufficient."
                initial={true}
              />
              <ToggleRow 
                label="Peak Load Shedding" 
                description="Reduce HVAC power during grid peak hours (4PM - 7PM)."
                initial={false}
              />
               <ToggleRow 
                label="Weekend Power Saver" 
                description="Switch all non-essential buildings to low power mode on weekends."
                initial={true}
              />
            </div>
          </Section>
        );
      case 'security':
        return (
            <Section title="Security Settings" description="Manage access and authentication.">
                <div className="space-y-6">
                    <div>
                        <h3 className="text-sm font-medium text-zinc-900 dark:text-white mb-4">Authentication</h3>
                         <div className="space-y-3">
                             <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 dark:bg-black/20 border border-zinc-200 dark:border-white/5">
                                 <div className="flex items-center gap-3">
                                     <Key size={18} className="text-emerald-500" />
                                     <div>
                                         <p className="text-sm font-medium text-zinc-900 dark:text-gray-200">Password</p>
                                         <p className="text-xs text-zinc-500 dark:text-gray-500">Last changed 3 months ago</p>
                                     </div>
                                 </div>
                                 <button className="px-3 py-1.5 text-xs border border-zinc-300 dark:border-white/10 rounded-lg hover:bg-zinc-200 dark:hover:bg-white/5 text-zinc-700 dark:text-gray-300">Change</button>
                             </div>
                             <ToggleRow label="Two-Factor Authentication (2FA)" description="Require OTP for login." initial={true} />
                         </div>
                    </div>
                    
                    <div className="border-t border-zinc-200 dark:border-white/5 pt-6">
                         <h3 className="text-sm font-medium text-zinc-900 dark:text-white mb-4">Active Sessions</h3>
                         <div className="space-y-2">
                             <div className="flex items-center justify-between text-sm">
                                 <div className="flex items-center gap-2 text-zinc-700 dark:text-gray-300">
                                     <Globe size={14} />
                                     <span>Chrome on MacOS (Current)</span>
                                 </div>
                                 <span className="text-emerald-500 text-xs">Active now</span>
                             </div>
                             <div className="flex items-center justify-between text-sm">
                                 <div className="flex items-center gap-2 text-zinc-500 dark:text-gray-500">
                                     <Smartphone size={14} />
                                     <span>App on iPhone 13</span>
                                 </div>
                                 <span className="text-zinc-400 text-xs">2h ago</span>
                             </div>
                         </div>
                         <button className="mt-4 flex items-center gap-2 text-xs text-red-500 hover:text-red-400">
                             <LogOut size={12} /> Sign out all devices
                         </button>
                    </div>
                </div>
            </Section>
        );
      case 'devices':
        return (
          <Section title="Connected Devices" description="Status of IoT bridges and main controllers.">
            <div className="space-y-3">
              <DeviceRow name="Main Controller (L1)" status="Online" type="Hub" />
              <DeviceRow name="Sensor Array (West Wing)" status="Online" type="Sensor" />
              <DeviceRow name="HVAC Bridge #04" status="Maintenance" type="Bridge" warning />
              <DeviceRow name="Smart Meter #882" status="Online" type="Meter" />
              <DeviceRow name="Lighting Gateway Hall A" status="Offline" type="Gateway" warning />
            </div>
            <button className="w-full mt-4 py-3 border border-dashed border-zinc-300 dark:border-zinc-700 text-zinc-500 rounded-xl text-sm hover:border-emerald-500/50 hover:text-emerald-500 transition-colors flex items-center justify-center gap-2">
              <Wifi size={16} />
              Scan for New Devices
            </button>
          </Section>
        );
    }
  };

  return (
    <div className="animate-fade-in pb-10 max-w-5xl mx-auto space-y-8">
       {/* Header */}
       <div>
          <h1 className="text-3xl font-light text-zinc-900 dark:text-white mb-1">Settings</h1>
          <p className="text-zinc-500 dark:text-gray-400">Manage your preferences, devices, and system configurations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Sidebar Tabs - Responsive (Horizontal on mobile, vertical on desktop) */}
            <div className="flex overflow-x-auto pb-4 md:pb-0 gap-3 md:block md:space-y-2 no-scrollbar">
                <NavButton 
                  active={activeTab === 'general'} 
                  onClick={() => setActiveTab('general')} 
                  icon={<User size={18} />} 
                  label="General" 
                />
                <NavButton 
                  active={activeTab === 'notifications'} 
                  onClick={() => setActiveTab('notifications')} 
                  icon={<Bell size={18} />} 
                  label="Notifications" 
                />
                <NavButton 
                  active={activeTab === 'automation'} 
                  onClick={() => setActiveTab('automation')} 
                  icon={<Cpu size={18} />} 
                  label="Automation" 
                />
                <NavButton 
                  active={activeTab === 'security'} 
                  onClick={() => setActiveTab('security')} 
                  icon={<Shield size={18} />} 
                  label="Security" 
                />
                <NavButton 
                  active={activeTab === 'devices'} 
                  onClick={() => setActiveTab('devices')} 
                  icon={<Smartphone size={18} />} 
                  label="Devices" 
                />
            </div>

            {/* Content Area */}
            <div className="md:col-span-2 space-y-6">
                {renderContent()}
                
                {/* Save Button */}
                <div className="flex justify-end pt-4">
                    <button className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-emerald-500/20">
                        <Save size={16} />
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

const Section: React.FC<{ title: string; description: string; children: React.ReactNode }> = ({ title, description, children }) => (
    <div className="glass-card p-6 rounded-2xl border border-zinc-200 dark:border-white/5 bg-white dark:bg-transparent">
        <div className="mb-6 border-b border-zinc-200 dark:border-white/5 pb-4">
            <h2 className="text-lg font-medium text-zinc-900 dark:text-white">{title}</h2>
            <p className="text-sm text-zinc-500 dark:text-gray-500">{description}</p>
        </div>
        {children}
    </div>
);

const NavButton: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; onClick: () => void }> = ({ icon, label, active, onClick }) => (
    <button 
      onClick={onClick}
      className={`flex-shrink-0 md:w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap
      ${active 
        ? 'bg-zinc-100 dark:bg-white/10 text-emerald-600 dark:text-white border border-zinc-200 dark:border-white/5 shadow-sm' 
        : 'text-zinc-500 dark:text-gray-400 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white'}`}
    >
        {icon}
        <span>{label}</span>
    </button>
);

const InputGroup: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div>
        <label className="block text-xs text-zinc-500 dark:text-gray-500 mb-1.5">{label}</label>
        <input 
            type="text" 
            defaultValue={value}
            className="w-full bg-zinc-50 dark:bg-black/20 border border-zinc-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
        />
    </div>
);

const ToggleRow: React.FC<{ label: string; description: string; initial: boolean }> = ({ label, description, initial }) => {
    const [isOn, setIsOn] = useState(initial);
    return (
        <div className="flex items-center justify-between py-2">
            <div className="pr-4">
                <p className="text-sm font-medium text-zinc-900 dark:text-gray-200">{label}</p>
                <p className="text-xs text-zinc-500 dark:text-gray-500">{description}</p>
            </div>
            <button 
                onClick={() => setIsOn(!isOn)}
                className={`w-11 h-6 rounded-full transition-colors relative ${isOn ? 'bg-emerald-500' : 'bg-zinc-300 dark:bg-zinc-700'}`}
            >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${isOn ? 'translate-x-5' : 'translate-x-0'} shadow-sm`}></div>
            </button>
        </div>
    )
}

const DeviceRow: React.FC<{ name: string; status: string; type: string; warning?: boolean }> = ({ name, status, type, warning }) => (
    <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 dark:bg-black/20 border border-zinc-200 dark:border-white/5">
        <div className="flex items-center gap-3">
            <div className={`p-2 rounded bg-white dark:bg-white/5 border border-zinc-100 dark:border-transparent ${warning ? 'text-yellow-500' : 'text-emerald-500'}`}>
                {type === 'Hub' ? <Wifi size={16} /> : <Cpu size={16} />}
            </div>
            <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-gray-200">{name}</p>
                <p className="text-xs text-zinc-500 dark:text-gray-500">{type}</p>
            </div>
        </div>
        <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${warning ? 'bg-yellow-500 animate-pulse' : 'bg-emerald-500'}`}></div>
            <span className={`text-xs ${warning ? 'text-yellow-600 dark:text-yellow-500' : 'text-emerald-600 dark:text-emerald-500'}`}>{status}</span>
        </div>
    </div>
);