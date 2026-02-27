export interface TelemetryData {
  depth: number;
  heading: number;
  voltage: number;
  status: 'CONNECTED' | 'DISCONNECTED';
  mode: string;
  pitch: number; // Tambahkan ini
  roll: number;  // Tambahkan ini
}