import React, { useRef, useState, useEffect } from 'react';

interface MapPanelProps {
  goals: Array<{ id: number; rosX: number; rosY: number }>;
  activeGoalId: number | null;
  rovPos: { rosX: number; rosY: number; yaw: number };
  rovPath: Array<{ rosX: number; rosY: number }>;
  onMapClick: (rosX: number, rosY: number) => void;
}

export const MapPanel: React.FC<MapPanelProps> = ({ goals, activeGoalId, rovPos, rovPath, onMapClick }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const RESOLUTION = 0.05; 

  useEffect(() => {
    const update = () => {
      if (mapRef.current) setSize({ w: mapRef.current.clientWidth, h: mapRef.current.clientHeight });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // 🔥 RUMUS SINKRONISASI BARU (Y+ = Kanan)
  const toUI = (rosX: number, rosY: number) => {
    if (size.w === 0) return { x: 0, y: 0 };
    return {
      x: (rosY / RESOLUTION) + (size.w / 2),  // Dulu pakai minus, sekarang plus
      y: (-rosX / RESOLUTION) + (size.h / 2)
    };
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!mapRef.current) return;
    const rect = mapRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 🔥 DIBALIK: Kanan = Positif
    const rosX = (-(y - size.h / 2) * RESOLUTION);
    const rosY = ((x - size.w / 2) * RESOLUTION); // Dulu pakai minus, sekarang plus
    onMapClick(rosX, rosY);
  };

  return (
    <div ref={mapRef} onClick={handleClick} className="w-full h-full relative cursor-crosshair">
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
      
      {/* Garis Bantu Tengah */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5"></div>
      <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/5"></div>

      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <polyline 
          points={rovPath.map(p => `${toUI(p.rosX, p.rosY).x},${toUI(p.rosX, p.rosY).y}`).join(' ')} 
          fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="4"
        />
      </svg>

      {/* Target Pins */}
      {goals.map((g, idx) => (
        <div key={g.id} className="absolute -translate-x-1/2 -translate-y-full transition-all duration-300 z-20"
          style={{ left: toUI(g.rosX, g.rosY).x, top: toUI(g.rosX, g.rosY).y }}>
          <div className={`relative ${activeGoalId === g.id ? 'animate-bounce' : ''}`}>
             <span className="text-2xl drop-shadow-[0_0_10px_#ef4444]">📍</span>
             <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[9px] font-black rounded w-4 h-4 flex items-center justify-center border border-white">
               {idx + 1}
             </span>
          </div>
        </div>
      ))}

      {/* ROV Ikon (Sesuai gambar kamu, ada pesawatnya biar jelas hadap mana) */}
      <div className="absolute text-2xl -translate-x-1/2 -translate-y-1/2 z-50 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)] transition-all duration-300"
        style={{ 
          left: toUI(rovPos.rosX, rovPos.rosY).x, 
          top: toUI(rovPos.rosX, rovPos.rosY).y,
          transform: `translate(-50%, -50%) rotate(${-rovPos.yaw}deg)` 
        }}>
        🛩️
      </div>
    </div>
  );
};