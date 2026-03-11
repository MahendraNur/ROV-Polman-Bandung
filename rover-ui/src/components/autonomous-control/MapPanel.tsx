import React, { useRef, useState, useEffect } from 'react';

interface MapPanelProps {
  goals: Array<{ id: number; uiX: number; uiY: number; rosX: number; rosY: number }>;
  rovPos: { rosX: number; rosY: number; yaw: number }; 
  rovPath: Array<{ rosX: number; rosY: number }>;      
  onAddGoal: (goal: any) => void;
  onClearGoals: () => void;
}

export const MapPanel: React.FC<MapPanelProps> = ({ goals, rovPos, rovPath, onAddGoal, onClearGoals }) => {
  const [interactionMode, setInteractionMode] = useState<'add' | 'view'>('view');
  const [mapSize, setMapSize] = useState({ w: 0, h: 0 });
  const mapRef = useRef<HTMLDivElement>(null);

  const RESOLUTION = 0.05; 

  useEffect(() => {
    const updateSize = () => {
      if (mapRef.current) setMapSize({ w: mapRef.current.clientWidth, h: mapRef.current.clientHeight });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const toUI = (rosX: number, rosY: number) => {
    return {
      x: (-rosY / RESOLUTION) + (mapSize.w / 2), 
      y: (-rosX / RESOLUTION) + (mapSize.h / 2) 
    };
  };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (interactionMode !== 'add' || !mapRef.current) return;

    const rect = mapRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 🔥 FIX SUMBU: Kiri Layar = Kiri Gazebo (Y Positif)
    const rosX = (-(y - rect.height / 2) * RESOLUTION).toFixed(2);
    const rosY = (-(x - rect.width / 2) * RESOLUTION).toFixed(2); 

    onAddGoal({ id: Date.now(), uiX: x, uiY: y, rosX: parseFloat(rosX), rosY: parseFloat(rosY) });
  };

  const svgPoints = rovPath.map(p => `${toUI(p.rosX, p.rosY).x},${toUI(p.rosX, p.rosY).y}`).join(' ');

  return (
    <div className="bg-[#111827] rounded-xl border border-white/5 p-6 shadow-2xl h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-600 rounded text-[10px]">🗺️</div>
          <h3 className="text-[11px] font-bold text-white uppercase tracking-wider">Navigation Map</h3>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <button onClick={() => setInteractionMode('add')} className={`py-2 rounded text-[10px] font-bold border transition-all ${interactionMode === 'add' ? 'bg-purple-600 border-purple-500 text-white' : 'bg-slate-800 border-white/5 text-slate-400'}`}>✓ Add Goal</button>
        <button onClick={() => setInteractionMode('view')} className={`py-2 rounded text-[10px] font-bold border transition-all ${interactionMode === 'view' ? 'bg-purple-600 border-purple-500 text-white' : 'bg-slate-800 border-white/5 text-slate-400'}`}>👁 View Only</button>
        <button onClick={onClearGoals} className="py-2 rounded text-[10px] font-bold bg-red-900/20 border border-red-500/20 text-red-500 hover:bg-red-500/10">🗑 Clear All</button>
      </div>

      <div ref={mapRef} onClick={handleMapClick} className={`w-full flex-1 aspect-video min-h-[400px] bg-[#0b0e11] rounded-lg border border-white/10 relative overflow-hidden transition-colors ${interactionMode === 'add' ? 'cursor-crosshair' : 'cursor-grab'}`}>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:30px_30px]"></div>
        
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <polyline points={svgPoints} fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="4 4" className="drop-shadow-[0_0_3px_rgba(34,197,94,0.8)]" />
        </svg>

        {mapSize.w > 0 && (
          <div 
            className="absolute text-2xl -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-300 pointer-events-none drop-shadow-[0_0_15px_rgba(56,189,248,0.8)]"
            style={{ 
              left: toUI(rovPos.rosX, rovPos.rosY).x, 
              top: toUI(rovPos.rosX, rovPos.rosY).y,
              transform: `translate(-50%, -50%) rotate(${-rovPos.yaw}deg)` 
            }}
          >
            🛩️
          </div>
        )}

        {goals.map((goal, idx) => (
          <div key={goal.id} className="absolute text-2xl -translate-x-1/2 -translate-y-full z-20" style={{ left: toUI(goal.rosX, goal.rosY).x, top: toUI(goal.rosX, goal.rosY).y }}>
            📍<span className="absolute top-1 right-0 bg-white text-purple-700 text-[9px] rounded-full w-4 h-4 flex items-center justify-center translate-x-1/2 -translate-y-1/2 font-black border-2 border-purple-600">{idx + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
};