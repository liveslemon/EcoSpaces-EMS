
import React from 'react';
import { LayoutDashboard, Building2, BarChart3, Settings, UserCircle, Hexagon, Sun, Moon, LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeView: 'landing' | 'dashboard' | 'reporting' | 'settings';
  onNavigate: (view: 'landing' | 'dashboard' | 'reporting' | 'settings') => void;
  isDark: boolean;
  toggleTheme: () => void;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeView, onNavigate, isDark, toggleTheme, onLogout }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-bg text-slate-900 dark:text-gray-200 flex flex-col font-sans selection:bg-neon-500/30 transition-colors duration-300 relative">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-40 w-full glass-card border-b border-zinc-200 dark:border-white/5 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => onNavigate('landing')}>
            <Hexagon className="w-8 h-8 text-emerald-500 fill-emerald-500/10 group-hover:rotate-180 transition-transform duration-500" />
            <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">EcoSense</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1 bg-zinc-100 dark:bg-white/5 rounded-full p-1 px-1.5 border border-zinc-200 dark:border-white/5">
            <NavItem 
              icon={<LayoutDashboard size={18} />} 
              label="Dashboard" 
              isActive={activeView === 'dashboard'} 
              onClick={() => onNavigate('dashboard')} 
            />
            <NavItem 
              icon={<Building2 size={18} />} 
              label="My Spaces" 
              isActive={activeView === 'landing'} 
              onClick={() => onNavigate('landing')} 
            />
            <NavItem 
              icon={<BarChart3 size={18} />} 
              label="Reporting" 
              isActive={activeView === 'reporting'}
              onClick={() => onNavigate('reporting')}
            />
            <NavItem 
              icon={<Settings size={18} />} 
              label="Settings" 
              isActive={activeView === 'settings'}
              onClick={() => onNavigate('settings')}
            />
          </div>
        </div>

        {/* User Profile & Theme */}
        <div className="flex items-center gap-2 md:gap-4">
            
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-zinc-500 dark:text-gray-300"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="h-6 w-px bg-zinc-200 dark:bg-white/10 mx-1 hidden md:block"></div>

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                  <p className="text-xs text-zinc-500 dark:text-gray-400">Account</p>
                  <p className="text-sm font-medium text-zinc-900 dark:text-white">Admin</p>
              </div>
              <div className="flex gap-1">
                  <button 
                    onClick={() => onNavigate('settings')}
                    className="p-2 rounded-full bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors border border-zinc-200 dark:border-white/5"
                    aria-label="User Settings"
                  >
                      <UserCircle className="w-6 h-6 text-zinc-400 dark:text-gray-300" />
                  </button>
                  <button 
                    onClick={onLogout}
                    className="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-500/10 text-zinc-400 hover:text-red-500 transition-colors"
                    title="Sign Out"
                  >
                      <LogOut size={20} />
                  </button>
              </div>
            </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 max-w-[1600px] mx-auto w-full mb-24 md:mb-0 relative z-0">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[45] glass-card border-t border-zinc-200 dark:border-white/10 px-6 py-3 flex justify-between items-center bg-white/90 dark:bg-[#0f1110]/90 backdrop-blur-xl">
        <MobileNavItem 
          icon={<LayoutDashboard size={22} />} 
          label="Dashboard" 
          isActive={activeView === 'dashboard'} 
          onClick={() => onNavigate('dashboard')} 
        />
        <MobileNavItem 
          icon={<Building2 size={22} />} 
          label="Spaces" 
          isActive={activeView === 'landing'} 
          onClick={() => onNavigate('landing')} 
        />
        <MobileNavItem 
          icon={<BarChart3 size={22} />} 
          label="Report" 
          isActive={activeView === 'reporting'}
          onClick={() => onNavigate('reporting')}
        />
        <MobileNavItem 
          icon={<Settings size={22} />} 
          label="Settings" 
          isActive={activeView === 'settings'}
          onClick={() => onNavigate('settings')}
        />
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, isActive = false, onClick }: { icon: React.ReactNode, label: string, isActive?: boolean, onClick?: () => void }) => {
  return (
    <button 
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
        ${isActive 
          ? 'bg-white dark:bg-white/10 text-zinc-900 dark:text-white shadow-sm dark:shadow-black/20' 
          : 'text-zinc-500 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5'}
      `}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

const MobileNavItem = ({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive?: boolean, onClick?: () => void }) => {
  return (
    <button 
      onClick={onClick} 
      className={`flex flex-col items-center gap-1 p-2 transition-colors duration-300 ${isActive ? 'text-emerald-500 dark:text-emerald-400' : 'text-zinc-400 dark:text-zinc-500'}`}
    >
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
};
