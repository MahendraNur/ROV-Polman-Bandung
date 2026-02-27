// src/views/Dashboard.tsx
import React from 'react';
import { Compass } from '../components/widgets/Compass';
import { AttitudeIndicator } from '../components/widgets/AttitudeIndicator';
import { TelemetryData } from '../types/telemetry';

interface DashboardProps {
  telemetry: TelemetryData;
}

export const Dashboard: React.FC<DashboardProps> = ({ telemetry }) => {
  return (
    <div className="grid grid-cols-12 gap-6 animate-in fade-in duration-500">
      {/* Area Video */}
      <div className="col-span-8 bg-black rounded-xl border border-white/5 aspect-video flex items-center justify-center relative overflow-hidden shadow-2xl">
        <p className="text-slate-700 italic font-mono text-[10px] uppercase tracking-widest">Waiting for Gazebo Stream...</p>
      </div>

      {/* Kolom Widget Kanan */}
      <div className="col-span-4 space-y-6">
        <div className="bg-[#111827] p-5 rounded-xl border border-white/5 shadow-lg">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase mb-4 tracking-widest">Depth</h3>
          <div className="text-4xl font-light text-blue-400">
            {telemetry.depth} <span className="text-sm text-slate-600 font-normal">m</span>
          </div>
        </div>
        
        <Compass heading={telemetry.heading} />
        
        {/* Widget Baru Kita */}
        <AttitudeIndicator pitch={5} roll={-2} /> 
      </div>
    </div>
  );
};