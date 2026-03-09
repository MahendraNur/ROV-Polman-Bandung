import React, { useState, useRef } from 'react';

export const Autonomous: React.FC = () => {
  const [interactionMode, setInteractionMode] = useState<'add' | 'view'>('view');
  
  // State goals sekarang menyimpan koordinat UI (pixel) dan simulasi koordinat ROS (meter)
  const [goals, setGoals] = useState<Array<{ id: number; uiX: number; uiY: number; rosX: number; rosY: number }>>([]);
  const [mapName, setMapName] = useState('polman_underwater_lab');

  const mapRef = useRef<HTMLDivElement>(null);

  // --- LOGIKA KLIK PETA (INTERAKTIF) ---
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Hanya bisa nambah titik kalau mode "Add Goal" aktif
    if (interactionMode !== 'add' || !mapRef.current) return;

    // Menghitung posisi klik relatif terhadap kotak peta
    const rect = mapRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Simulasi Konversi ke Koordinat ROS 2 (Anggap titik tengah peta adalah 0,0 meter)
    // Resolusi pura-puranya 0.05 meter/pixel
    const resolution = 0.05; 
    const rosX = ((x - rect.width / 2) * resolution).toFixed(2);
    const rosY = (-(y - rect.height / 2) * resolution).toFixed(2); // Y dibalik karena koordinat layar vs koordinat dunia ROS beda arah

    const newGoal = {
      id: Date.now(),
      uiX: x,
      uiY: y,
      rosX: parseFloat(rosX),
      rosY: parseFloat(rosY)
    };

    setGoals([...goals, newGoal]);
  };

  const removeGoal = (idToRemove: number) => {
    setGoals(goals.filter(goal => goal.id !== idToRemove));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* HEADER UTAMA */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-4 gap-4">
        <div>
          <h2 className="font-display font-black text-xl text-white uppercase tracking-wider flex items-center gap-3">
            <span className="bg-purple-600 p-2 rounded-lg shadow-[0_0_15px_rgba(147,51,234,0.4)]">📍</span>
            Goal Planning
          </h2>
          <p className="text-[11px] font-mono text-slate-400 mt-2 uppercase tracking-widest">
            Navigation Control System · NAV2 Integrated
          </p>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 bg-slate-800 text-white text-[10px] font-bold rounded border border-white/5 hover:bg-slate-700 transition-all uppercase">Export Goals</button>
           <button className="px-4 py-2 bg-blue-600 text-white text-[10px] font-bold rounded shadow-lg hover:bg-blue-500 transition-all uppercase">Import Goals</button>
        </div>
      </div>

      {/* MODUL GOAL PLANNING (INFO BOX) */}
      <div className="bg-blue-600/10 border border-blue-500/20 p-6 rounded-xl flex items-center gap-4">
        <div className="p-3 bg-blue-600 rounded-lg text-xl">🎯</div>
        <div>
          <h3 className="text-white font-bold text-sm">Goal Planning</h3>
          <p className="text-slate-400 text-xs mt-1">Click on the map to place navigation goals. Set waypoints for your robot's mission.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* PANEL KIRI: NAVIGATION MAP */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-[#111827] rounded-xl border border-white/5 p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
               <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-blue-600 rounded text-[10px]">🗺️</div>
                  <h3 className="text-[11px] font-bold text-white uppercase tracking-wider">Navigation Map</h3>
               </div>
               <span className="text-[9px] font-mono text-slate-500 italic">Interactive map for goal placement</span>
            </div>

            {/* Interaction Mode Buttons */}
            <div className="grid grid-cols-3 gap-2 mb-4">
               <button 
                  onClick={() => setInteractionMode('add')}
                  className={`py-2 rounded text-[10px] font-bold border transition-all ${
                    interactionMode === 'add' 
                    ? 'bg-purple-600 border-purple-500 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]' 
                    : 'bg-slate-800 border-white/5 text-slate-400 hover:border-purple-500/30 hover:text-purple-300'
                  }`}
               >
                  ✓ Add Goal
               </button>
               <button 
                  onClick={() => setInteractionMode('view')}
                  className={`py-2 rounded text-[10px] font-bold border transition-all ${
                    interactionMode === 'view' 
                    ? 'bg-purple-600 border-purple-500 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]' 
                    : 'bg-slate-800 border-white/5 text-slate-400 hover:border-purple-500/30 hover:text-purple-300'
                  }`}
               >
                  👁 View Only
               </button>
               <button 
                  onClick={() => setGoals([])}
                  className="py-2 rounded text-[10px] font-bold bg-red-900/20 border border-red-500/20 text-red-500 hover:bg-red-500/10 transition-all"
               >
                  🗑 Clear All
               </button>
            </div>

            {/* AREA KANVAS PETA (INTERAKTIF) */}
            <div 
              ref={mapRef}
              onClick={handleMapClick}
              className={`w-full aspect-video bg-[#0b0e11] rounded-lg border border-white/10 relative overflow-hidden transition-colors ${interactionMode === 'add' ? 'cursor-crosshair hover:border-purple-500/50' : 'cursor-grab'}`}
            >
               {/* Grid Pattern Background */}
               <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:30px_30px]"></div>
               
               {/* Sumbu X dan Y (Garis Tengah) */}
               <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 pointer-events-none"></div>
               <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/10 pointer-events-none"></div>

               {/* Legend Mock */}
               <div className="absolute top-4 left-4 bg-black/80 p-3 rounded border border-white/10 space-y-2 text-[9px] font-mono pointer-events-none z-20">
                  <div className="flex items-center gap-2"><div className="w-2 h-2 bg-slate-700 rounded-sm"></div> Obstacle</div>
                  <div className="flex items-center gap-2"><div className="w-2 h-2 bg-purple-500 rounded-sm shadow-[0_0_5px_#a855f7]"></div> Goal Point</div>
               </div>

               {/* RENDER PIN/MARKER GOALS DI ATAS PETA */}
               {goals.map((goal, idx) => (
                 <div
                   key={goal.id}
                   className="absolute text-2xl -translate-x-1/2 -translate-y-full hover:scale-125 transition-transform drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] z-10"
                   style={{ left: goal.uiX, top: goal.uiY }}
                   title={`Goal ${idx + 1}: ROS [${goal.rosX}m, ${goal.rosY}m]`}
                 >
                   📍
                   <span className="absolute top-1 right-0 bg-white text-purple-700 text-[9px] rounded-full w-4 h-4 flex items-center justify-center translate-x-1/2 -translate-y-1/2 font-black border-2 border-purple-600">
                     {idx + 1}
                   </span>
                 </div>
               ))}

               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center pointer-events-none">
                  <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest bg-black/50 px-3 py-1 rounded">
                    {interactionMode === 'add' ? 'Klik area peta untuk menambah waypoint' : 'Peta terkunci (View Only)'}
                  </p>
               </div>
            </div>

            {/* Map Stats Bottom */}
            <div className="grid grid-cols-4 gap-4 mt-6">
               {[
                 { label: 'Map Size', val: '20 x 15 m', icon: '📐' },
                 { label: 'Resolution', val: '0.050 m/px', icon: '💠' },
                 { label: 'Origin', val: 'Center {0, 0}', icon: '🧿' },
                 { label: 'Active Goals', val: `${goals.length} Points`, icon: '📍' },
               ].map((stat, i) => (
                 <div key={i} className="bg-black/20 p-3 rounded-lg border border-white/5">
                    <div className="text-[8px] text-slate-500 uppercase flex items-center gap-1.5 mb-1">
                       <span>{stat.icon}</span> {stat.label}
                    </div>
                    <div className="text-[10px] font-mono text-white font-bold">{stat.val}</div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* PANEL KANAN */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Planned Goals List */}
          <div className="bg-[#111827] p-6 rounded-xl border border-white/5 shadow-lg flex flex-col h-[400px]">
            <div className="flex justify-between items-center mb-6">
               <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-purple-600 rounded text-[10px]">📋</div>
                  <h3 className="text-[11px] font-bold text-white uppercase tracking-wider">Planned Goals</h3>
               </div>
               <span className="bg-purple-600/20 text-purple-400 px-2 py-0.5 rounded text-[10px] font-black border border-purple-500/30">
                 {goals.length} GOALS
               </span>
            </div>

            {/* DAFTAR KOORDINAT DINAMIS */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
              {goals.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center border-2 border-dashed border-white/5 rounded-xl p-4">
                   <div className="w-12 h-12 bg-purple-600/10 rounded-full flex items-center justify-center text-purple-500 mb-4 text-xl">📍</div>
                   <h4 className="text-xs font-bold text-white">No Goals Set</h4>
                   <p className="text-[9px] text-slate-500 mt-2">Activate "Add Goal" and click on the map.</p>
                </div>
              ) : (
                goals.map((goal, idx) => (
                  <div key={goal.id} className="bg-black/40 p-3 rounded-lg border border-white/10 flex justify-between items-center group hover:border-purple-500/50 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-purple-600/20 text-purple-400 text-[10px] font-bold flex items-center justify-center border border-purple-500/30">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-300">Waypoint {idx + 1}</div>
                        <div className="text-[9px] font-mono text-slate-500">
                          X: <span className="text-blue-400">{goal.rosX}</span> | Y: <span className="text-green-400">{goal.rosY}</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeGoal(goal.id)}
                      className="text-slate-600 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-all"
                      title="Hapus titik ini"
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/10">
               <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded text-[9px] font-bold text-white border border-white/5 transition-colors">Start Mission ▶️</button>
               <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded text-[9px] font-bold text-white border border-white/5 transition-colors">Export JSON 📥</button>
            </div>
          </div>

          {/* QUICK ACTIONS PANEL */}
          <div className="bg-[#111827] p-6 rounded-xl border border-white/5 shadow-lg">
            <div className="flex items-center gap-2 mb-6">
               <div className="p-1.5 bg-blue-600 rounded text-[10px]">⚡</div>
               <h3 className="text-[11px] font-bold text-white uppercase tracking-wider">Map Configuration</h3>
            </div>
            
            <div className="space-y-4">
               <div>
                  <label className="text-[9px] font-bold text-slate-500 uppercase block mb-2">Target Map Topic:</label>
                  <input 
                     type="text" 
                     value={mapName}
                     onChange={(e) => setMapName(e.target.value)}
                     className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-[11px] font-mono text-slate-300 focus:outline-none focus:border-purple-500"
                  />
               </div>

               <div className="grid grid-cols-2 gap-2">
                 <button className="bg-black/30 p-2.5 rounded-lg border border-white/5 hover:bg-blue-600/10 hover:border-blue-500/30 transition-all text-left">
                    <div className="text-[10px] font-bold text-white">🔄 Sync Map</div>
                 </button>
                 <button className="bg-black/30 p-2.5 rounded-lg border border-white/5 hover:bg-blue-600/10 hover:border-blue-500/30 transition-all text-left">
                    <div className="text-[10px] font-bold text-white">📡 Check ROS</div>
                 </button>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Autonomous;