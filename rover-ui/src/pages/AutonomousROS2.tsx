import React, { useState, useEffect, useRef } from 'react';
import { MapPanel } from '../components/autonomous-control/MapPanel';
import { DepthControl } from '../components/autonomous-control/DepthControl';

const AutonomousROS2: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [goals, setGoals] = useState<Array<{ id: number; rosX: number; rosY: number }>>([]);
  const [activeGoalId, setActiveGoalId] = useState<number | null>(null);
  const [targetDepth, setTargetDepth] = useState(-2.0);

  const [rovPos, setRovPos] = useState({ rosX: 0, rosY: 0, yaw: 0 });
  const [rovPath, setRovPath] = useState<Array<{ rosX: number; rosY: number }>>([]);

  const ws = useRef<WebSocket | null>(null);
  const goalsRef = useRef(goals);
  const rovPosRef = useRef(rovPos);
  const activeGoalIdRef = useRef(activeGoalId);
  const depthRef = useRef(targetDepth);

  useEffect(() => { goalsRef.current = goals; }, [goals]);
  useEffect(() => { rovPosRef.current = rovPos; }, [rovPos]);
  useEffect(() => { activeGoalIdRef.current = activeGoalId; }, [activeGoalId]);
  useEffect(() => { depthRef.current = targetDepth; }, [targetDepth]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:9090');
    
    socket.onopen = () => {
      setIsConnected(true);
      socket.send(JSON.stringify({ op: 'advertise', topic: '/xr_rov/cmd_pose', type: 'geometry_msgs/msg/PoseStamped' }));
      socket.send(JSON.stringify({ op: 'subscribe', topic: '/xr_rov/odom', type: 'nav_msgs/msg/Odometry' }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.topic === '/xr_rov/odom') {
        const p = data.msg.pose.pose.position;
        const q = data.msg.pose.pose.orientation;
        const yaw = Math.atan2(2 * (q.w * q.z + q.x * q.y), 1 - 2 * (q.y * q.y + q.z * q.z)) * (180 / Math.PI);
        
        setRovPos({ rosX: p.x, rosY: p.y, yaw });
        setRovPath(prev => [...prev.slice(-50), { rosX: p.x, rosY: p.y }]);
      }
    };

    socket.onclose = () => setIsConnected(false);
    ws.current = socket;

    // 📡 LOOP 10Hz: Misi Autonomous MURNI HOLONOMIC
    const timer = setInterval(() => {
      if (!ws.current || ws.current.readyState !== WebSocket.OPEN || activeGoalIdRef.current === null) return;

      const target = goalsRef.current.find(g => g.id === activeGoalIdRef.current);
      if (!target) return;

      const dist = Math.hypot(target.rosX - rovPosRef.current.rosX, target.rosY - rovPosRef.current.rosY);
      
      // Auto-stop jika sisa jarak < 0.3 meter (Lebih presisi)
      if (dist < 0.3) {
        console.log("🏁 Target Reached!");
        setActiveGoalId(null);
        return;
      }

      // 🔥 FIX SAKTI: Jangan pakai rovPosRef.current.q! 
      // Kita gembok orientasinya ke arah default (depan).
      ws.current.send(JSON.stringify({
        op: 'publish',
        topic: '/xr_rov/cmd_pose',
        msg: {
          header: { frame_id: 'odom' },
          pose: {
            position: { x: target.rosX, y: target.rosY, z: depthRef.current },
            orientation: { x: 0, y: 0, z: 0, w: 1 } 
          }
        }
      }));
    }, 100);

    return () => {
      socket.close();
      clearInterval(timer);
    };
  }, []);

  const addGoal = (rosX: number, rosY: number) => {
    setGoals(prev => [...prev, { id: Date.now(), rosX, rosY }]);
  };

  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen bg-[#0b111a] text-white">
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <h1 className="text-xl font-black text-blue-500 uppercase tracking-tighter">Autonomous Mission Control</h1>
        <div className={`px-3 py-1 rounded-full text-[10px] font-bold ${isConnected ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
          {isConnected ? '● BRIDGE ONLINE' : '○ BRIDGE OFFLINE'}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 flex-1">
        {/* PANEL PETA */}
        <div className="col-span-8 bg-black/20 rounded-xl border border-white/5 overflow-hidden relative min-h-[500px]">
          <MapPanel 
            goals={goals} 
            rovPos={rovPos} 
            rovPath={rovPath} 
            activeGoalId={activeGoalId}
            onMapClick={addGoal} 
          />
        </div>

        {/* PANEL TARGET DISPATCHER */}
        <div className="col-span-4 flex flex-col gap-4">
          <DepthControl targetDepth={targetDepth} setTargetDepth={setTargetDepth} />
          
          <div className="flex-1 bg-slate-900/50 rounded-xl border border-white/5 p-4 flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <h3 className="text-[10px] font-bold uppercase text-slate-400">Target Dispatcher</h3>
              <button onClick={() => {setGoals([]); setActiveGoalId(null);}} className="text-[10px] text-red-400 hover:underline">Clear All</button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-2">
              {goals.length === 0 && <div className="text-center py-10 text-slate-600 text-xs italic">Klik di peta untuk menambah target...</div>}
              {goals.map((g, index) => (
                <div key={g.id} className={`p-3 rounded-lg border flex items-center justify-between transition-all ${activeGoalId === g.id ? 'bg-blue-600/20 border-blue-500/50' : 'bg-white/5 border-white/5'}`}>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-blue-400">WAYPOINT {index + 1}</span>
                    <span className="text-[9px] font-mono text-slate-400">X: {g.rosX.toFixed(2)} | Y: {g.rosY.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    {activeGoalId === g.id ? (
                      <button onClick={() => setActiveGoalId(null)} className="px-3 py-1 bg-red-500 text-white text-[10px] font-bold rounded shadow-lg shadow-red-500/20">STOP</button>
                    ) : (
                      <button onClick={() => setActiveGoalId(g.id)} className="px-3 py-1 bg-green-600 text-white text-[10px] font-bold rounded hover:bg-green-500">START</button>
                    )}
                    <button onClick={() => setGoals(goals.filter(item => item.id !== g.id))} className="text-slate-500 hover:text-white">✕</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutonomousROS2;