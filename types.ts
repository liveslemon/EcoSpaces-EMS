
export type CategoryType = 'Classrooms' | 'Offices' | 'Laboratories' | 'Male Hostels' | 'Female Hostels';

export type BuildingType = 
  | 'SST' 
  | 'TYD' 
  | 'EDC Hall' | 'Amethyst Hall' | 'Faith Hall' | 'POD Hall' | 'Cooperative Hall' | 'Kings Hall' | 'Veritas Hall'
  | 'Pearl Hall' | 'Onyx Hall' | 'Sapphire Hall' | 'Ruby Hall' | 'Emerald Hall' | 'Topaz Hall' | 'Diamond Hall' | 'Crystal Hall'
  | 'Admin Block';

export interface Room {
  id: string;
  name: string;
  category: CategoryType;
  building: BuildingType; 
  occupancyStatus: 'Occupied' | 'Vacant';
  occupancyRate: number; // percentage
  temperature: number;
  totalConsumption: number; // kWh (Monthly)
  availableEnergy: number; // percentage (Deprecated/Legacy, unused in UI now)
  powerStatus: 'On' | 'Off'; // Master control
  deviceStatus: {
    lighting: boolean;
    hvac: boolean;
    appliances: boolean;
    machinery?: boolean; // New: For Labs
  };
  activeDevices: {
    lighting: number; // kWh
    hvac: number; // kWh
    fans: number; // kWh
    other: number; // kWh (Appliances)
    machinery?: number; // kWh (Heavy equipment)
  };
  recommendations: Recommendation[];
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  impact: string; // e.g., "High Impact"
  timeSaved: string; // e.g., "5 min"
}

export interface DailyUsage {
  day: string;
  kwh: number;
  predicted: number;
  trend: 'up' | 'down';
}

export interface EnergyTrend {
  time: string;
  usage: number; // kWh
  solar: number; // kWh
}