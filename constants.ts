
import { Room, DailyUsage, EnergyTrend, CategoryType, BuildingType } from './types';

// Helper to generate hostel rooms (4 floors, 4 rooms per floor)
const generateHostelRooms = (hostelNames: string[], category: CategoryType): Room[] => {
  return hostelNames.flatMap((name) => {
    return Array.from({ length: 16 }, (_, i) => {
      const floor = Math.floor(i / 4) + 1;
      const roomNum = floor * 100 + (i % 4) + 1; // Generates 101, 102, 103, 104, 201...
      const isOccupied = Math.random() > 0.4; // Random occupancy

      return {
        id: `${name.toLowerCase()}-${roomNum}`,
        name: `Room ${roomNum}`,
        category: category,
        building: `${name} Hall` as BuildingType,
        occupancyStatus: (isOccupied ? 'Occupied' : 'Vacant') as 'Occupied' | 'Vacant',
        occupancyRate: isOccupied ? 100 : 0,
        temperature: 22 + Math.floor(Math.random() * 4),
        totalConsumption: 120 + Math.floor(Math.random() * 40),
        availableEnergy: 90,
        powerStatus: 'On' as 'On',
        deviceStatus: { 
            lighting: isOccupied, 
            hvac: isOccupied, 
            appliances: true, 
            machinery: false 
        },
        activeDevices: { 
            lighting: isOccupied ? 25 : 0, 
            hvac: isOccupied ? 75 : 0, 
            fans: 15, 
            other: 25, 
            machinery: 0 
        },
        recommendations: []
      };
    });
  });
};

const MALE_HOSTEL_NAMES = ['EDC', 'Amethyst', 'Faith', 'POD', 'Cooperative', 'Kings', 'Veritas'];
const FEMALE_HOSTEL_NAMES = ['Pearl', 'Onyx', 'Sapphire', 'Ruby', 'Emerald', 'Topaz', 'Diamond', 'Crystal'];

export const MOCK_ROOMS: Room[] = [
  // --- TYD Classrooms (Nigerian Cities) ---
  {
    id: 'tyd-1', name: 'Lagos Hall', category: 'Classrooms', building: 'TYD',
    occupancyStatus: 'Occupied', occupancyRate: 85, temperature: 24, totalConsumption: 327, availableEnergy: 83, powerStatus: 'On',
    deviceStatus: { lighting: true, hvac: true, appliances: true, machinery: false },
    activeDevices: { lighting: 52, hvac: 49, fans: 20, other: 15, machinery: 0 },
    recommendations: [{ id: '1', title: 'Optimize HVAC', description: 'Adjust temp by 2°C.', impact: 'High', timeSaved: 'Now' }]
  },
  {
    id: 'tyd-2', name: 'Abuja Hall', category: 'Classrooms', building: 'TYD',
    occupancyStatus: 'Vacant', occupancyRate: 0, temperature: 22, totalConsumption: 120, availableEnergy: 95, powerStatus: 'Off',
    deviceStatus: { lighting: false, hvac: false, appliances: false, machinery: false },
    activeDevices: { lighting: 0, hvac: 0, fans: 0, other: 0, machinery: 0 }, recommendations: []
  },
  {
    id: 'tyd-3', name: 'Kano Hall', category: 'Classrooms', building: 'TYD',
    occupancyStatus: 'Occupied', occupancyRate: 45, temperature: 23, totalConsumption: 210, availableEnergy: 88, powerStatus: 'On',
    deviceStatus: { lighting: true, hvac: true, appliances: false, machinery: false },
    activeDevices: { lighting: 40, hvac: 120, fans: 10, other: 40, machinery: 0 }, recommendations: []
  },
  {
    id: 'tyd-4', name: 'Ibadan Hall', category: 'Classrooms', building: 'TYD',
    occupancyStatus: 'Vacant', occupancyRate: 0, temperature: 24, totalConsumption: 95, availableEnergy: 99, powerStatus: 'Off',
    deviceStatus: { lighting: false, hvac: false, appliances: false, machinery: false },
    activeDevices: { lighting: 0, hvac: 0, fans: 0, other: 0, machinery: 0 }, recommendations: []
  },
  {
    id: 'tyd-5', name: 'Port Harcourt Hall', category: 'Classrooms', building: 'TYD',
    occupancyStatus: 'Occupied', occupancyRate: 92, temperature: 21, totalConsumption: 410, availableEnergy: 60, powerStatus: 'On',
    deviceStatus: { lighting: true, hvac: true, appliances: true, machinery: false },
    activeDevices: { lighting: 60, hvac: 150, fans: 30, other: 170, machinery: 0 }, recommendations: []
  },

  // --- SST Classrooms (Numbered 1-7) ---
  ...Array.from({ length: 7 }, (_, i) => ({
    id: `sst-c-${i + 1}`, name: `Classroom ${i + 1}`, category: 'Classrooms' as const, building: 'SST' as const,
    occupancyStatus: (i % 3 === 0 ? 'Occupied' : 'Vacant') as 'Occupied' | 'Vacant',
    occupancyRate: i % 3 === 0 ? 70 + i * 2 : 0,
    temperature: 23, totalConsumption: 150 + i * 20, availableEnergy: 80,
    powerStatus: (i % 3 === 0 ? 'On' : 'Off') as 'On' | 'Off',
    deviceStatus: { lighting: i % 3 === 0, hvac: i % 3 === 0, appliances: false, machinery: false },
    activeDevices: { lighting: 30, hvac: 60, fans: 10, other: 10, machinery: 0 },
    recommendations: []
  })),

  // --- SST Laboratories (1-4, EDS, Mech Eng) ---
  {
    id: 'sst-l-1', name: 'Lab 1', category: 'Laboratories', building: 'SST',
    occupancyStatus: 'Occupied', occupancyRate: 60, temperature: 22, totalConsumption: 850, availableEnergy: 70, powerStatus: 'On',
    deviceStatus: { lighting: true, hvac: true, appliances: true, machinery: true },
    activeDevices: { lighting: 80, hvac: 120, fans: 40, other: 110, machinery: 500 }, recommendations: []
  },
  {
    id: 'sst-l-2', name: 'Lab 2', category: 'Laboratories', building: 'SST',
    occupancyStatus: 'Vacant', occupancyRate: 0, temperature: 22, totalConsumption: 200, availableEnergy: 90, powerStatus: 'Off',
    deviceStatus: { lighting: false, hvac: false, appliances: false, machinery: false },
    activeDevices: { lighting: 0, hvac: 0, fans: 0, other: 0, machinery: 0 }, recommendations: []
  },
  {
    id: 'sst-l-3', name: 'Lab 3', category: 'Laboratories', building: 'SST',
    occupancyStatus: 'Vacant', occupancyRate: 0, temperature: 23, totalConsumption: 180, availableEnergy: 92, powerStatus: 'Off',
    deviceStatus: { lighting: false, hvac: false, appliances: false, machinery: false },
    activeDevices: { lighting: 0, hvac: 0, fans: 0, other: 0, machinery: 0 }, recommendations: []
  },
  {
    id: 'sst-l-4', name: 'Lab 4', category: 'Laboratories', building: 'SST',
    occupancyStatus: 'Occupied', occupancyRate: 30, temperature: 21, totalConsumption: 450, availableEnergy: 75, powerStatus: 'On',
    deviceStatus: { lighting: true, hvac: true, appliances: true, machinery: false },
    activeDevices: { lighting: 50, hvac: 100, fans: 20, other: 80, machinery: 200 }, recommendations: []
  },
  {
    id: 'sst-l-5', name: 'EDS Lab', category: 'Laboratories', building: 'SST',
    occupancyStatus: 'Occupied', occupancyRate: 85, temperature: 20, totalConsumption: 1200, availableEnergy: 50, powerStatus: 'On',
    deviceStatus: { lighting: true, hvac: true, appliances: true, machinery: true },
    activeDevices: { lighting: 100, hvac: 200, fans: 50, other: 150, machinery: 700 }, recommendations: []
  },
  {
    id: 'sst-l-6', name: 'Mech Eng Lab', category: 'Laboratories', building: 'SST',
    occupancyStatus: 'Occupied', occupancyRate: 40, temperature: 22, totalConsumption: 1500, availableEnergy: 40, powerStatus: 'On',
    deviceStatus: { lighting: true, hvac: true, appliances: true, machinery: true },
    activeDevices: { lighting: 120, hvac: 250, fans: 60, other: 170, machinery: 900 }, recommendations: []
  },

  // --- Male Hostels (Detailed Rooms) ---
  ...generateHostelRooms(MALE_HOSTEL_NAMES, 'Male Hostels'),

  // --- Female Hostels (Detailed Rooms) ---
  ...generateHostelRooms(FEMALE_HOSTEL_NAMES, 'Female Hostels'),

  // --- Offices (SST) ---
  {
    id: 'sst-o-1', name: 'Dean\'s Office', category: 'Offices', building: 'SST',
    occupancyStatus: 'Occupied', occupancyRate: 10, temperature: 21, totalConsumption: 110, availableEnergy: 85, powerStatus: 'On',
    deviceStatus: { lighting: true, hvac: true, appliances: true, machinery: false },
    activeDevices: { lighting: 30, hvac: 50, fans: 10, other: 20, machinery: 0 }, recommendations: []
  },
  {
    id: 'sst-o-2', name: 'HOD Comp. Sci.', category: 'Offices', building: 'SST',
    occupancyStatus: 'Occupied', occupancyRate: 100, temperature: 22, totalConsumption: 85, availableEnergy: 90, powerStatus: 'On',
    deviceStatus: { lighting: true, hvac: true, appliances: true, machinery: false },
    activeDevices: { lighting: 20, hvac: 35, fans: 5, other: 25, machinery: 0 }, recommendations: []
  },
  {
    id: 'sst-o-3', name: 'HOD Mech. Eng.', category: 'Offices', building: 'SST',
    occupancyStatus: 'Vacant', occupancyRate: 0, temperature: 24, totalConsumption: 20, availableEnergy: 98, powerStatus: 'Off',
    deviceStatus: { lighting: false, hvac: false, appliances: true, machinery: false },
    activeDevices: { lighting: 0, hvac: 0, fans: 0, other: 20, machinery: 0 }, recommendations: []
  },
  {
    id: 'sst-o-4', name: 'HOD Elec. Eng.', category: 'Offices', building: 'SST',
    occupancyStatus: 'Occupied', occupancyRate: 50, temperature: 22, totalConsumption: 75, availableEnergy: 92, powerStatus: 'On',
    deviceStatus: { lighting: true, hvac: true, appliances: true, machinery: false },
    activeDevices: { lighting: 20, hvac: 30, fans: 5, other: 20, machinery: 0 }, recommendations: []
  },
  {
    id: 'sst-o-5', name: 'Faculty Staff Room', category: 'Offices', building: 'SST',
    occupancyStatus: 'Occupied', occupancyRate: 80, temperature: 23, totalConsumption: 160, availableEnergy: 70, powerStatus: 'On',
    deviceStatus: { lighting: true, hvac: true, appliances: true, machinery: false },
    activeDevices: { lighting: 50, hvac: 70, fans: 10, other: 30, machinery: 0 }, recommendations: []
  },
  {
    id: 'sst-o-6', name: 'Admin Office 1', category: 'Offices', building: 'SST',
    occupancyStatus: 'Occupied', occupancyRate: 100, temperature: 22, totalConsumption: 95, availableEnergy: 88, powerStatus: 'On',
    deviceStatus: { lighting: true, hvac: true, appliances: true, machinery: false },
    activeDevices: { lighting: 25, hvac: 40, fans: 5, other: 25, machinery: 0 }, recommendations: []
  },
  {
    id: 'sst-o-7', name: 'Admin Office 2', category: 'Offices', building: 'SST',
    occupancyStatus: 'Vacant', occupancyRate: 0, temperature: 25, totalConsumption: 15, availableEnergy: 99, powerStatus: 'Off',
    deviceStatus: { lighting: false, hvac: false, appliances: true, machinery: false },
    activeDevices: { lighting: 0, hvac: 0, fans: 0, other: 15, machinery: 0 }, recommendations: []
  },
  {
    id: 'sst-o-8', name: 'Research Lab Office', category: 'Offices', building: 'SST',
    occupancyStatus: 'Occupied', occupancyRate: 40, temperature: 21, totalConsumption: 130, availableEnergy: 75, powerStatus: 'On',
    deviceStatus: { lighting: true, hvac: true, appliances: true, machinery: false },
    activeDevices: { lighting: 30, hvac: 60, fans: 10, other: 30, machinery: 0 }, recommendations: []
  },

  // --- Offices (TYD) ---
  {
    id: 'tyd-o-1', name: 'VC\'s Office', category: 'Offices', building: 'TYD',
    occupancyStatus: 'Occupied', occupancyRate: 20, temperature: 20, totalConsumption: 210, availableEnergy: 60, powerStatus: 'On',
    deviceStatus: { lighting: true, hvac: true, appliances: true, machinery: false },
    activeDevices: { lighting: 60, hvac: 100, fans: 10, other: 40, machinery: 0 }, recommendations: []
  },
  {
    id: 'tyd-o-2', name: 'Registrar Office', category: 'Offices', building: 'TYD',
    occupancyStatus: 'Occupied', occupancyRate: 100, temperature: 22, totalConsumption: 140, availableEnergy: 70, powerStatus: 'On',
    deviceStatus: { lighting: true, hvac: true, appliances: true, machinery: false },
    activeDevices: { lighting: 40, hvac: 60, fans: 10, other: 30, machinery: 0 }, recommendations: []
  },
  {
    id: 'tyd-o-3', name: 'Bursary', category: 'Offices', building: 'TYD',
    occupancyStatus: 'Occupied', occupancyRate: 90, temperature: 22, totalConsumption: 150, availableEnergy: 65, powerStatus: 'On',
    deviceStatus: { lighting: true, hvac: true, appliances: true, machinery: false },
    activeDevices: { lighting: 40, hvac: 70, fans: 10, other: 30, machinery: 0 }, recommendations: []
  },
  {
    id: 'tyd-o-4', name: 'Student Affairs', category: 'Offices', building: 'TYD',
    occupancyStatus: 'Occupied', occupancyRate: 85, temperature: 23, totalConsumption: 120, availableEnergy: 75, powerStatus: 'On',
    deviceStatus: { lighting: true, hvac: true, appliances: true, machinery: false },
    activeDevices: { lighting: 30, hvac: 50, fans: 10, other: 30, machinery: 0 }, recommendations: []
  },
  {
    id: 'tyd-o-5', name: 'Admissions', category: 'Offices', building: 'TYD',
    occupancyStatus: 'Vacant', occupancyRate: 0, temperature: 26, totalConsumption: 25, availableEnergy: 95, powerStatus: 'Off',
    deviceStatus: { lighting: false, hvac: false, appliances: true, machinery: false },
    activeDevices: { lighting: 0, hvac: 0, fans: 0, other: 25, machinery: 0 }, recommendations: []
  },
  {
    id: 'tyd-o-6', name: 'Exam Officer', category: 'Offices', building: 'TYD',
    occupancyStatus: 'Occupied', occupancyRate: 100, temperature: 22, totalConsumption: 90, availableEnergy: 85, powerStatus: 'On',
    deviceStatus: { lighting: true, hvac: true, appliances: true, machinery: false },
    activeDevices: { lighting: 25, hvac: 40, fans: 5, other: 20, machinery: 0 }, recommendations: []
  },
  {
    id: 'tyd-o-7', name: 'PAU Press', category: 'Offices', building: 'TYD',
    occupancyStatus: 'Occupied', occupancyRate: 60, temperature: 23, totalConsumption: 110, availableEnergy: 80, powerStatus: 'On',
    deviceStatus: { lighting: true, hvac: true, appliances: true, machinery: false },
    activeDevices: { lighting: 30, hvac: 50, fans: 10, other: 20, machinery: 0 }, recommendations: []
  },
  {
    id: 'tyd-o-8', name: 'Alumni Relations', category: 'Offices', building: 'TYD',
    occupancyStatus: 'Vacant', occupancyRate: 0, temperature: 25, totalConsumption: 20, availableEnergy: 98, powerStatus: 'Off',
    deviceStatus: { lighting: false, hvac: false, appliances: true, machinery: false },
    activeDevices: { lighting: 0, hvac: 0, fans: 0, other: 20, machinery: 0 }, recommendations: []
  },
  {
    id: 'tyd-o-9', name: 'Faculty Lounge', category: 'Offices', building: 'TYD',
    occupancyStatus: 'Occupied', occupancyRate: 30, temperature: 24, totalConsumption: 60, availableEnergy: 90, powerStatus: 'On',
    deviceStatus: { lighting: true, hvac: true, appliances: true, machinery: false },
    activeDevices: { lighting: 15, hvac: 25, fans: 5, other: 15, machinery: 0 }, recommendations: []
  },
  {
    id: 'tyd-o-10', name: 'Conference Room', category: 'Offices', building: 'TYD',
    occupancyStatus: 'Vacant', occupancyRate: 0, temperature: 24, totalConsumption: 15, availableEnergy: 99, powerStatus: 'Off',
    deviceStatus: { lighting: false, hvac: false, appliances: false, machinery: false },
    activeDevices: { lighting: 0, hvac: 0, fans: 0, other: 15, machinery: 0 }, recommendations: []
  }
];

export const WEEKLY_DATA: DailyUsage[] = [
  { day: 'Mon', kwh: 276, predicted: 245, trend: 'up' },
  { day: 'Tue', kwh: 282, predicted: 280, trend: 'up' },
  { day: 'Wed', kwh: 297, predicted: 290, trend: 'up' },
  { day: 'Thu', kwh: 269, predicted: 275, trend: 'down' },
  { day: 'Fri', kwh: 274, predicted: 260, trend: 'up' },
  { day: 'Sat', kwh: 175, predicted: 160, trend: 'down' },
  { day: 'Sun', kwh: 138, predicted: 140, trend: 'down' },
];

export const HOURLY_DATA: EnergyTrend[] = [
  { time: '10 AM', usage: 45, solar: 20 },
  { time: '11 AM', usage: 52, solar: 35 },
  { time: '12 PM', usage: 68, solar: 45 },
  { time: '1 PM', usage: 74, solar: 50 },
  { time: '2 PM', usage: 70, solar: 48 },
  { time: '3 PM', usage: 60, solar: 30 },
  { time: '4 PM', usage: 55, solar: 15 },
];
