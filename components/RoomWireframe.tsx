import React from 'react';
import { CategoryType } from '../types';

interface RoomWireframeProps {
  status: 'Occupied' | 'Vacant';
  powerStatus: 'On' | 'Off';
  category?: CategoryType;
  deviceStatus?: {
    lighting: boolean;
    hvac: boolean;
    appliances: boolean;
    machinery?: boolean;
  };
  onToggleDevice?: (device: 'lighting' | 'hvac' | 'appliances' | 'machinery') => void;
  interactive?: boolean;
  isDark: boolean;
}

export const RoomWireframe: React.FC<RoomWireframeProps> = ({
  status,
  powerStatus,
  category = 'Classrooms',
  deviceStatus = { lighting: true, hvac: true, appliances: true, machinery: false },
  onToggleDevice,
  interactive = false,
  isDark
}) => {
  const isPowered = powerStatus === 'On';
  const isOccupied = status === 'Occupied';

  // --- THEME COLORS ---
  const theme = isDark ? {
      wallGrad1: "#18181b", wallGrad2: "#000",
      floorGrad1: "#09090b", floorGrad2: "#18181b",
      stroke: "#27272a",
      strokeHighlight: "#3f3f46",
      furnitureFill: "#18181b",
      furnitureStroke: "#3f3f46",
      deviceOff: "#27272a",
      screenOff: "#09090b",
      text: "#52525b"
  } : {
      wallGrad1: "#f1f5f9", wallGrad2: "#cbd5e1",
      floorGrad1: "#ffffff", floorGrad2: "#f8fafc",
      stroke: "#cbd5e1",
      strokeHighlight: "#94a3b8",
      furnitureFill: "#ffffff",
      furnitureStroke: "#cbd5e1",
      deviceOff: "#e2e8f0",
      screenOff: "#1e293b",
      text: "#94a3b8"
  };

  const colorNeon = isPowered ? "#4ade80" : (isDark ? "#1f2937" : "#cbd5e1"); 
  const colorStroke = isPowered ? colorNeon : theme.stroke;
  
  // Helper for clickable areas
  const interactProps = (device: 'lighting' | 'hvac' | 'appliances' | 'machinery') => interactive && isPowered ? {
    onClick: (e: React.MouseEvent) => { e.stopPropagation(); onToggleDevice?.(device); },
    className: "cursor-pointer hover:opacity-80 transition-opacity",
    style: { pointerEvents: 'all' as const }
  } : {};

  // --- COMMON ELEMENTS ---

  // Standard Room Shell (Walls + Floor)
  const RoomShell = () => (
    <>
      <defs>
        <linearGradient id={`wall-grad-${category}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={theme.wallGrad1} stopOpacity="0.5" />
          <stop offset="100%" stopColor={theme.wallGrad2} stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id={`floor-grad-${category}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={theme.floorGrad1} stopOpacity="0.8" />
          <stop offset="100%" stopColor={theme.floorGrad2} stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id={`screen-grad-${category}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={isPowered ? "#4ade80" : "#111"} stopOpacity="0.2" />
            <stop offset="100%" stopColor={isPowered ? "#4ade80" : "#111"} stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Back Wall */}
      <rect x="100" y="50" width="600" height="350" fill={`url(#wall-grad-${category})`} />
      
      {/* Floor */}
      <path d="M 0 600 L 100 400 L 700 400 L 800 600 Z" fill={`url(#floor-grad-${category})`} />

      {/* Ceiling / Perspective Lines */}
      <path d="M 0 0 L 100 50" stroke={theme.stroke} strokeWidth="1" />
      <path d="M 800 0 L 700 50" stroke={theme.stroke} strokeWidth="1" />
      <path d="M 0 600 L 100 400" stroke={theme.stroke} strokeWidth="1" />
      <path d="M 800 600 L 700 400" stroke={theme.stroke} strokeWidth="1" />
      
      {/* Inner Frame */}
      <rect x="100" y="50" width="600" height="350" fill="none" stroke={theme.stroke} strokeWidth="2" />
    </>
  );

  // Ceiling Lights (Common to all)
  const CeilingLights = () => (
    <g {...interactProps('lighting')}>
        {/* Light Row 1 */}
        <path d="M 150 20 L 650 20 L 580 50 L 220 50 Z" fill={isPowered && deviceStatus.lighting ? colorNeon : theme.furnitureFill} opacity={isPowered && deviceStatus.lighting ? "0.2" : "1"} />
        <path d="M 220 50 L 580 50" stroke={isPowered && deviceStatus.lighting ? colorNeon : theme.strokeHighlight} strokeWidth="2" />
        
        {/* Glow effect */}
        {isPowered && deviceStatus.lighting && (
            <path d="M 220 50 L 580 50 L 650 400 L 150 400 Z" fill={`url(#screen-grad-${category})`} opacity="0.3" style={{pointerEvents: 'none'}} />
        )}
    </g>
  );

  // HVAC Unit (Common to all, placed on wall)
  const HVACUnit = () => (
    <g transform="translate(620, 70)" {...interactProps('hvac')}>
        <rect x="0" y="0" width="60" height="30" fill={theme.furnitureFill} stroke={isPowered ? theme.strokeHighlight : theme.stroke} strokeWidth="2" />
        <line x1="5" y1="10" x2="55" y2="10" stroke={isPowered && deviceStatus.hvac ? colorNeon : theme.stroke} strokeWidth="2" />
        <line x1="5" y1="20" x2="55" y2="20" stroke={isPowered && deviceStatus.hvac ? colorNeon : theme.stroke} strokeWidth="2" />
        {isPowered && deviceStatus.hvac && (
             <path d="M 10 30 L 0 60 M 30 30 L 30 65 M 50 30 L 60 60" stroke={colorNeon} strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
        )}
    </g>
  );

  // --- SPECIFIC LAYOUTS ---

  const ClassroomLayout = () => (
    <>
      {/* WHITEBOARD / SCREEN (Back Wall) */}
      <g transform="translate(250, 120)" {...interactProps('appliances')}>
          <rect x="0" y="0" width="300" height="140" fill={theme.screenOff} stroke={theme.strokeHighlight} strokeWidth="4" />
          {isPowered && deviceStatus.appliances && (
            <>
              <rect x="5" y="5" width="290" height="130" fill={`url(#screen-grad-${category})`} />
              <path d="M 100 60 L 130 90 L 200 40" fill="none" stroke={colorNeon} strokeWidth="2" opacity="0.5"/>
              <text x="150" y="110" textAnchor="middle" fill={colorNeon} fontSize="12" opacity="0.7" fontFamily="monospace">LECTURE MODE</text>
            </>
          )}
      </g>

      {/* TEACHER DESK (Front Right) */}
      <g transform="translate(550, 300)">
           <path d="M 0 0 L 120 0 L 140 40 L 0 40 Z" fill={theme.furnitureFill} stroke={theme.furnitureStroke} />
           <path d="M 0 40 L 0 100" stroke={theme.furnitureStroke} strokeWidth="2" />
           <path d="M 140 40 L 140 100" stroke={theme.furnitureStroke} strokeWidth="2" />
      </g>

      {/* STUDENT DESKS (Rows) */}
      <g transform="translate(100, 350)">
          {/* Row 1 */}
          <path d="M 0 0 L 200 0 L 220 30 L -10 30 Z" fill={theme.furnitureFill} stroke={theme.stroke} />
          <path d="M 250 0 L 450 0 L 470 30 L 240 30 Z" fill={theme.furnitureFill} stroke={theme.stroke} />
          
          {/* Row 2 */}
          <g transform="translate(-20, 60)">
             <path d="M 0 0 L 200 0 L 220 30 L -10 30 Z" fill={theme.furnitureFill} stroke={theme.stroke} />
             <path d="M 250 0 L 450 0 L 470 30 L 240 30 Z" fill={theme.furnitureFill} stroke={theme.stroke} />
          </g>
      </g>
      
      {/* Occupancy Avatars */}
      {isOccupied && (
          <g opacity="0.6">
              <circle cx="200" cy="340" r="15" fill={theme.strokeHighlight} />
              <circle cx="450" cy="340" r="15" fill={theme.strokeHighlight} />
              <circle cx="180" cy="400" r="15" fill={theme.strokeHighlight} />
          </g>
      )}
    </>
  );

  const OfficeLayout = () => (
    <>
      {/* WINDOW (Back Wall) */}
      <rect x="200" y="100" width="150" height="150" fill={theme.floorGrad1} stroke={theme.stroke} strokeWidth="2" />
      <line x1="275" y1="100" x2="275" y2="250" stroke={theme.stroke} strokeWidth="2" />
      <line x1="200" y1="175" x2="350" y2="175" stroke={theme.stroke} strokeWidth="2" />

      {/* SHELVING (Left) */}
      <g transform="translate(120, 150)">
         <rect x="0" y="0" width="60" height="200" fill={theme.furnitureFill} stroke={theme.stroke} />
         <line x1="0" y1="50" x2="60" y2="50" stroke={theme.stroke} />
         <line x1="0" y1="100" x2="60" y2="100" stroke={theme.stroke} />
         <line x1="0" y1="150" x2="60" y2="150" stroke={theme.stroke} />
      </g>

      {/* DESK (Right Center) */}
      <g transform="translate(400, 320)">
         <path d="M 0 0 L 200 0 L 240 60 L -20 60 Z" fill={theme.furnitureFill} stroke={theme.furnitureStroke} />
         <path d="M -20 60 L -20 150" stroke={theme.furnitureStroke} strokeWidth="2" />
         <path d="M 240 60 L 240 150" stroke={theme.furnitureStroke} strokeWidth="2" />
         <path d="M 200 60 L 200 150" stroke={theme.furnitureStroke} strokeWidth="1" />

         {/* Computer Monitor */}
         <g transform="translate(80, -40)" {...interactProps('appliances')}>
            <rect x="0" y="0" width="70" height="45" rx="2" fill={theme.screenOff} stroke={theme.strokeHighlight} />
            <rect x="30" y="45" width="10" height="10" fill={theme.deviceOff} />
            <rect x="20" y="55" width="30" height="2" fill={theme.deviceOff} />
            {isPowered && deviceStatus.appliances && (
                <>
                 <rect x="3" y="3" width="64" height="39" fill={`url(#screen-grad-${category})`} />
                 <line x1="10" y1="10" x2="50" y2="10" stroke={colorNeon} opacity="0.5" />
                 <line x1="10" y1="20" x2="40" y2="20" stroke={colorNeon} opacity="0.3" />
                </>
            )}
         </g>
      </g>
      
      {/* Chair */}
      <g transform="translate(450, 400)">
          <path d="M 0 0 L 40 0 L 40 40 L 0 40 Z" fill={theme.deviceOff} />
          <path d="M 5 -40 L 35 -40 L 35 0 L 5 0 Z" fill={theme.deviceOff} />
      </g>
    </>
  );

  const LabLayout = () => (
    <>
        {/* SAFETY HOOD / CABINETS (Back Wall) */}
        <g transform="translate(150, 150)">
             <rect x="0" y="0" width="100" height="200" fill={theme.furnitureFill} stroke={theme.stroke} />
             <rect x="10" y="20" width="80" height="60" fill={theme.floorGrad1} stroke={theme.stroke} />
             <rect x="0" y="120" width="100" height="2" fill={theme.stroke} />
        </g>
        <g transform="translate(550, 150)">
             <rect x="0" y="0" width="100" height="200" fill={theme.furnitureFill} stroke={theme.stroke} />
        </g>

        {/* MACHINERY (Back Center) */}
        <g transform="translate(300, 180)" {...interactProps('machinery')}>
            <rect x="0" y="0" width="200" height="150" fill={theme.furnitureFill} stroke={isPowered && deviceStatus.machinery ? colorNeon : theme.furnitureStroke} strokeWidth="2" />
            
            {/* Control Panel */}
            <rect x="140" y="20" width="40" height="60" fill={theme.screenOff} stroke={theme.stroke} />
            {isPowered && deviceStatus.machinery && (
                <>
                    <circle cx="160" cy="40" r="5" fill={colorNeon} className="animate-pulse" />
                    <line x1="20" y1="130" x2="180" y2="130" stroke={colorNeon} strokeWidth="1" strokeDasharray="5 5" />
                    <text x="30" y="80" fontSize="10" fill={colorNeon} opacity="0.5" fontFamily="monospace">RUNNING</text>
                </>
            )}
        </g>

        {/* LAB BENCHES (Center Island) */}
        <g transform="translate(200, 400)">
             <path d="M 0 0 L 400 0 L 440 60 L -40 60 Z" fill={theme.deviceOff} stroke={theme.furnitureStroke} />
             <path d="M -40 60 L -40 120" stroke={theme.furnitureStroke} strokeWidth="3" />
             <path d="M 440 60 L 440 120" stroke={theme.furnitureStroke} strokeWidth="3" />
             
             {/* Equipment on desk */}
             <g transform="translate(50, -20)" {...interactProps('appliances')}>
                <path d="M 0 20 L 10 0 L 30 0 L 40 20 Z" fill="none" stroke={isPowered && deviceStatus.appliances ? colorNeon : theme.strokeHighlight} strokeWidth="1" />
                <rect x="15" y="-5" width="10" height="25" fill={theme.furnitureFill} stroke={theme.strokeHighlight} />
             </g>
        </g>
    </>
  );

  const HostelLayout = () => (
    <>
        {/* WARDROBE (Back Left Corner) */}
        <g transform="translate(120, 150)">
            <rect x="0" y="0" width="80" height="200" fill={theme.furnitureFill} stroke={theme.stroke} />
            <line x1="40" y1="0" x2="40" y2="200" stroke={theme.stroke} />
            <circle cx="35" cy="100" r="2" fill={theme.strokeHighlight} />
            <circle cx="45" cy="100" r="2" fill={theme.strokeHighlight} />
        </g>

        {/* BED (Left Side) */}
        <g transform="translate(120, 400)">
            <path d="M 0 0 L 150 0 L 180 100 L 0 100 Z" fill={theme.furnitureFill} stroke={theme.stroke} />
            <rect x="0" y="100" width="180" height="20" fill={theme.stroke} />
            {/* Pillow */}
            <path d="M 10 10 L 50 10 L 60 30 L 0 30 Z" fill={theme.stroke} opacity="0.8" />
            {isOccupied && <path d="M 10 40 Q 80 20 160 60" stroke={theme.strokeHighlight} fill="none" />}
        </g>

        {/* STUDY DESK (Right Side) */}
        <g transform="translate(500, 350)">
             <path d="M 0 0 L 150 0 L 170 40 L -10 40 Z" fill={theme.furnitureFill} stroke={theme.furnitureStroke} />
             <path d="M -10 40 L -10 100" stroke={theme.furnitureStroke} strokeWidth="2" />
             <path d="M 170 40 L 170 100" stroke={theme.furnitureStroke} strokeWidth="2" />
             
             {/* Laptop */}
             <g transform="translate(40, -15)" {...interactProps('appliances')}>
                <path d="M 0 15 L 40 15 L 50 25 L -10 25 Z" fill={theme.deviceOff} />
                <path d="M 0 15 L 0 -10 L 40 -10 L 40 15" fill={theme.screenOff} stroke={theme.strokeHighlight} />
                {isPowered && deviceStatus.appliances && (
                    <rect x="3" y="-7" width="34" height="19" fill={colorNeon} opacity="0.3" />
                )}
             </g>
        </g>

        {/* CEILING FAN */}
        <g transform="translate(400, 80)" {...interactProps('appliances')}>
             <circle cx="0" cy="0" r="5" fill={theme.deviceOff} />
             {isPowered && deviceStatus.appliances && (
                 <g className="animate-spin" style={{transformBox: 'fill-box', transformOrigin: 'center', animationDuration: '2s'}}>
                    <line x1="0" y1="0" x2="60" y2="0" stroke={theme.strokeHighlight} strokeWidth="4" />
                    <line x1="0" y1="0" x2="-60" y2="0" stroke={theme.strokeHighlight} strokeWidth="4" />
                    <line x1="0" y1="0" x2="0" y2="60" stroke={theme.strokeHighlight} strokeWidth="4" />
                    <line x1="0" y1="0" x2="0" y2="-60" stroke={theme.strokeHighlight} strokeWidth="4" />
                 </g>
             )}
              {(!isPowered || !deviceStatus.appliances) && (
                 <g>
                    <line x1="0" y1="0" x2="60" y2="0" stroke={theme.stroke} strokeWidth="4" />
                    <line x1="0" y1="0" x2="-60" y2="0" stroke={theme.stroke} strokeWidth="4" />
                 </g>
             )}
        </g>
    </>
  );

  const renderLayout = () => {
      switch (category) {
          case 'Laboratories': return <LabLayout />;
          case 'Male Hostels':
          case 'Female Hostels': return <HostelLayout />;
          case 'Offices': return <OfficeLayout />;
          case 'Classrooms':
          default: return <ClassroomLayout />;
      }
  };

  return (
    <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 800 600" 
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full transition-all duration-300"
    >
      <RoomShell />
      <CeilingLights />
      <HVACUnit />
      {renderLayout()}
    </svg>
  );
};