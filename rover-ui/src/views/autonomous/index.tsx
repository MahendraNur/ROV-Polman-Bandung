import React, { useState, useRef, useEffect } from 'react';

export const Autonomous: React.FC = () => {
  const [interactionMode, setInteractionMode] = useState<'add' | 'view'>('view');
  const [goals, setGoals] = useState<Array<{ id: number; uiX: number; uiY: number; rosX: number; rosY: number }>>([]);
  
  const [isConnected, setIsConnected] = useState(false);
  const [isMissionRunning, setIsMissionRunning] = useState(false);
  const [targetDepth, setTargetDepth] = useState(-2.0);

  const mapRef = useRef<HTMLDivElement>(null);
  
  // KITA PAKAI NATIVE WEBSOCKET (Sama persis kaya tes Console!)
  const wsRef = useRef<WebSocket | null>(null);
  const publishIntervalRef = useRef<number | null>(null);

  // --- 1. INISIALISASI KONEKSI WEBSOCKET MURNI ---
  useEffect(() => {
    // Buka koneksi langsung ke ROSbridge
    const ws = new WebSocket('ws://localhost:9090');

    ws.onopen = () => {
      console.log('✅ Pintu ROSbridge Terbuka (Native)!');
      setIsConnected(true);

      // Langsung kirim surat izin (Advertise) PoseStamped
      const advertiseMsg = {
        op: 'advertise',
        topic: '/xr_rov/cmd_pose',
        type: 'geometry_msgs/msg/PoseStamped'
      };
      ws.send(JSON.stringify(advertiseMsg));
      console.log('✅ Izin PoseStamped dikirim ke ROSbridge!');
    };

    ws.onerror = (error) => {
      console.error('❌ Error koneksi WebSocket:', error);
      setIsConnected(false);
    };

    ws.onclose = () => {
      console.log('🔌 Koneksi terputus.');
      setIsConnected(false);
    };

    // Simpan ke referensi agar bisa dipakai fungsi startMission
    wsRef.current = ws;

    return () => {
      ws.close();
      if (publishIntervalRef.current) {
        window.clearInterval(publishIntervalRef.current);
      }
    };
  }, []);

  // --- 2. LOGIKA KLIK PETA ---
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (interactionMode !== 'add' || !mapRef.current) return;

    const rect = mapRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const resolution = 0.05; 
    const rosX = ((x - rect.width / 2) * resolution).toFixed(2);
    const rosY = (-(y - rect.height / 2) * resolution).toFixed(2);

    const newGoal = {
      id: Date.now(),
      uiX: x, uiY: y,
      rosX: parseFloat(rosX), rosY: parseFloat(rosY)
    };

    setGoals([...goals, newGoal]);
  };

  const removeGoal = (idToRemove: number) => {
    setGoals(goals.filter(goal => goal.id !== idToRemove));
  };

  // --- 3. LOGIKA KENDALI MISI ---
  const startMission = () => {
    if (goals.length === 0) {
      alert("Tambahkan waypoint di peta terlebih dahulu!");
      return;
    }
    if (!isConnected || !wsRef.current) {
      alert("ROS belum terkoneksi! Pastikan rosbridge berjalan.");
      return;
    }

    setIsMissionRunning(true);
    console.log("🚀 Misi Dimulai: Menembak data langsung ke socket...");

    publishIntervalRef.current = window.setInterval(() => {
      const currentGoal = goals[0]; 

      // Format payload 100% sama dengan tes Console yang berhasil
      const payload = {
        op: 'publish',
        topic: '/xr_rov/cmd_pose',
        msg: {
          header: {
            stamp: { sec: 0, nanosec: 0 },
            frame_id: "map"
          },
          pose: {
            position: {
              x: currentGoal.rosX,
              y: currentGoal.rosY,
              z: targetDepth 
            },
            orientation: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 }
          }
        }
      };

      // Tembak data langsung (pasti tembus karena ga ada roslib yang ngehalangin)
      if (wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify(payload));
      }
      
    }, 100); 
  };

  const stopMission = () => {
    setIsMissionRunning(false);
    if (publishIntervalRef.current) {
      window.clearInterval(publishIntervalRef.current);
    }
    console.log("⏹️ Misi Dihentikan.");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-4 gap-4">
        <div>
          <h2 className="font-display font-black text-xl text-white uppercase tracking-wider flex items-center gap-3">
            <span className="bg-purple-600 p-2 rounded-lg shadow-[0_0_15px_rgba(147,51,234,0.4)]">📍</span>
            Autonomous Navigation
          </h2>
          <div className="flex items-center gap-2 mt-2">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-red-500'}`}></div>
            <p className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">
              ROS 2 Bridge: {isConnected ? 'CONNECTED' : 'DISCONNECTED'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-[#111827] rounded-xl border border-white/5 p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
               <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-blue-600 rounded text-[10px]">🗺️</div>
                  <h3 className="text-[11px] font-bold text-white uppercase tracking-wider">Navigation Map</h3>
               </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
               <button onClick={() => setInteractionMode('add')} className={`py-2 rounded text-[10px] font-bold border transition-all ${interactionMode === 'add' ? 'bg-purple-600 border-purple-500 text-white' : 'bg-slate-800 border-white/5 text-slate-400'}`}>✓ Add Goal</button>
               <button onClick={() => setInteractionMode('view')} className={`py-2 rounded text-[10px] font-bold border transition-all ${interactionMode === 'view' ? 'bg-purple-600 border-purple-500 text-white' : 'bg-slate-800 border-white/5 text-slate-400'}`}>👁 View Only</button>
               <button onClick={() => setGoals([])} className="py-2 rounded text-[10px] font-bold bg-red-900/20 border border-red-500/20 text-red-500 hover:bg-red-500/10">🗑 Clear All</button>
            </div>

            <div ref={mapRef} onClick={handleMapClick} className={`w-full aspect-video bg-[#0b0e11] rounded-lg border border-white/10 relative overflow-hidden transition-colors ${interactionMode === 'add' ? 'cursor-crosshair' : 'cursor-grab'}`}>
               <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:30px_30px]"></div>
               <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 pointer-events-none"></div>
               <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/10 pointer-events-none"></div>

               {goals.map((goal, idx) => (
                 <div key={goal.id} className="absolute text-2xl -translate-x-1/2 -translate-y-full z-10" style={{ left: goal.uiX, top: goal.uiY }}>
                   📍<span className="absolute top-1 right-0 bg-white text-purple-700 text-[9px] rounded-full w-4 h-4 flex items-center justify-center translate-x-1/2 -translate-y-1/2 font-black border-2 border-purple-600">{idx + 1}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#111827] p-6 rounded-xl border border-white/5 shadow-lg flex flex-col h-full">
            
            <div className="mb-6 p-4 bg-black/40 rounded-lg border border-blue-500/20">
              <label className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block mb-2">
                Target Depth (Z): <span className="text-white font-mono">{targetDepth.toFixed(1)} m</span>
              </label>
              <input type="range" min="-10" max="0" step="0.5" value={targetDepth} onChange={(e) => setTargetDepth(parseFloat(e.target.value))} className="w-full accent-blue-500" />
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-2 mb-6">
              {goals.map((goal, idx) => (
                <div key={goal.id} className="bg-black/40 p-3 rounded-lg border border-white/10 flex justify-between items-center group">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-purple-600/20 text-purple-400 text-[10px] font-bold flex items-center justify-center border border-purple-500/30">{idx + 1}</div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-300">Waypoint {idx + 1}</div>
                      <div className="text-[9px] font-mono text-slate-500">X: <span className="text-blue-400">{goal.rosX}</span> | Y: <span className="text-green-400">{goal.rosY}</span></div>
                    </div>
                  </div>
                  <button onClick={() => removeGoal(goal.id)} className="text-slate-600 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-all">✕</button>
                </div>
              ))}
            </div>

            <div className="mt-auto border-t border-white/10 pt-4">
              {!isMissionRunning ? (
                <button onClick={startMission} className="w-full p-4 bg-green-600 hover:bg-green-500 rounded-lg text-xs font-bold text-white shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all uppercase tracking-widest">▶️ Start Mission</button>
              ) : (
                <button onClick={stopMission} className="w-full p-4 bg-red-600 hover:bg-red-500 rounded-lg text-xs font-bold text-white shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all uppercase tracking-widest animate-pulse">⏹️ Stop (Emergency)</button>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Autonomous;