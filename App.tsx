
import React, { useState, useEffect, useRef } from 'react';
import { Layout } from './components/Layout';
import { LandingView } from './views/LandingView';
import { GeneralDashboardView } from './views/GeneralDashboardView';
import { RoomDetailView } from './views/RoomDetailView';
import { ReportingView } from './views/ReportingView';
import { SettingsView } from './views/SettingsView';
import { LoginView } from './views/LoginView';
import { VerificationModal } from './components/VerificationModal';
import { MOCK_ROOMS } from './constants';
import { Room } from './types';

const App: React.FC = () => {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // App State
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'room-detail' | 'reporting' | 'settings'>('landing');
  const [rooms, setRooms] = useState<Room[]>(MOCK_ROOMS);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  
  // Theme State
  const [isDark, setIsDark] = useState(true);

  // Verification State
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const [verificationAction, setVerificationAction] = useState<{ title: string; action: () => void } | null>(null);

  // Apply theme class to html element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  // Auth Handlers
  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setSelectedRoomId(null);
    setCurrentView('landing');
  };

  // Navigation Handlers
  const handleSelectRoom = (roomId: string) => {
    setSelectedRoomId(roomId);
    setCurrentView('room-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToLanding = () => {
    setSelectedRoomId(null);
    setCurrentView('landing');
  };

  const handleNavigate = (view: 'landing' | 'dashboard' | 'reporting' | 'settings') => {
    if (view === 'landing') {
        setSelectedRoomId(null);
    }
    setCurrentView(view);
  };

  // Verification Logic Wrapper
  const requestVerification = (action: () => void, title: string = "Control Action") => {
      setVerificationAction({ action, title });
      setIsVerificationOpen(true);
  };

  const executeVerifiedAction = () => {
      if (verificationAction) {
          verificationAction.action();
          setVerificationAction(null);
      }
      setIsVerificationOpen(false);
  };

  // Protected Actions
  const handleTogglePower = (roomId: string) => {
      requestVerification(() => {
          setRooms(prevRooms => prevRooms.map(room => {
              if (room.id === roomId) {
                  return {
                      ...room,
                      powerStatus: room.powerStatus === 'On' ? 'Off' : 'On'
                  };
              }
              return room;
          }));
      }, "Toggle Master Power");
  };

  const handleToggleDevice = (roomId: string, device: 'lighting' | 'hvac' | 'appliances' | 'machinery') => {
    // Only verify for heavy machinery or global hvac changes to simulate critical actions
    const title = `Toggle ${device.charAt(0).toUpperCase() + device.slice(1)}`;
    
    requestVerification(() => {
        setRooms(prevRooms => prevRooms.map(room => {
            if (room.id === roomId) {
                return {
                    ...room,
                    deviceStatus: {
                        ...room.deviceStatus,
                        [device]: !room.deviceStatus[device]
                    }
                };
            }
            return room;
        }));
    }, title);
  };

  // --- RENDER ---

  if (!isAuthenticated) {
    return (
        <>
            <div className={`fixed inset-0 pointer-events-none transition-colors duration-500 z-0 ${isDark ? 'bg-[#0f1110]' : 'bg-slate-50'}`}></div>
            <div className="relative z-10">
                <LoginView onLogin={handleLogin} />
                <div className="absolute top-4 right-4 z-50">
                    <button 
                      onClick={toggleTheme}
                      className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-zinc-500 dark:text-gray-300"
                    >
                      {isDark ? 
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg> : 
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>}
                    </button>
                </div>
            </div>
        </>
    );
  }

  // Find the full room object if selected
  const selectedRoom: Room | undefined = rooms.find(r => r.id === selectedRoomId);

  // Helper to determine active navigation item (maps 'room-detail' to 'landing')
  const activeNavView = currentView === 'room-detail' ? 'landing' : currentView;

  return (
    <>
      <Layout 
        activeView={activeNavView} 
        onNavigate={handleNavigate}
        isDark={isDark}
        toggleTheme={toggleTheme}
        onLogout={handleLogout}
      >
        
        {currentView === 'landing' && (
          <LandingView onSelectRoom={handleSelectRoom} isDark={isDark} />
        )}
        
        {currentView === 'dashboard' && (
          <GeneralDashboardView rooms={rooms} isDark={isDark} />
        )}

        {currentView === 'reporting' && (
          <ReportingView isDark={isDark} />
        )}

        {currentView === 'settings' && (
          <SettingsView />
        )}

        {currentView === 'room-detail' && selectedRoom && (
          <RoomDetailView 
              room={selectedRoom} 
              onBack={handleBackToLanding} 
              onTogglePower={handleTogglePower}
              onToggleDevice={handleToggleDevice}
              isDark={isDark}
          />
        )}

        {/* Fallback if room detail is active but no room selected */}
        {currentView === 'room-detail' && !selectedRoom && (
           <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
               <div className="p-4 rounded-full bg-black/5 dark:bg-white/5">
                  <span className="text-4xl">⚡</span>
               </div>
               <h2 className="text-2xl font-light text-zinc-900 dark:text-white">Select a space to monitor</h2>
               <button 
                  onClick={() => setCurrentView('landing')}
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full transition-colors"
               >
                  View Spaces
               </button>
           </div>
        )}
      </Layout>

      {/* Verification Modal */}
      <VerificationModal 
          isOpen={isVerificationOpen}
          onClose={() => setIsVerificationOpen(false)}
          onVerify={executeVerifiedAction}
          actionTitle={verificationAction?.title}
      />
    </>
  );
};

export default App;
