import React, { useState, useRef, useEffect } from 'react';
import { MapPanel } from '../components/autonomous-control/MapPanel';
import { DepthControl } from '../components/autonomous-control/DepthControl';
import { MissionPanel } from '../components/autonomous-control/MissionPanel';

export const AutonomousROS2: React.FC = () => {
  const [goals, setGoals] = useState<Array<{ id: number; uiX: number; uiY: number; rosX: number; rosY: number }>>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [targetDepth, setTargetDepth] = useState(-2.0);
  const [activeGoalId, setActiveGoalId] = useState<number | null>(null);

  const [rovPos, setRovPos] = useState({ rosX: 0, rosY: 0, yaw: 0 });
  const [rovPath, setRovPath] = useState<Array<{ rosX: number; rosY: number }>>([]);

  // ✅ SIMPAN PERINTAH X, Y, DAN ROTASI LEHER SAAT INI
  const [activeCommand, setActiveCommand] = useState<{x: number, y: number, z: number, qz: number, qw: number} | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const publishIntervalRef = useRef<number | null>(null);

  const goalsRef = useRef(goals);
  const depthRef = useRef(targetDepth);
  const activeGoalRef = useRef(activeGoalId);
  const rovPosRef = useRef(rovPos);
  const activeCommandRef = useRef(activeCommand);

  useEffect(() => { goalsRef.current = goals; }, [goals]);
  useEffect(() => { depthRef.current = targetDepth; }, [targetDepth]);
  useEffect(() => { activeGoalRef.current = activeGoalId; }, [activeGoalId]);
  useEffect(() => { rovPosRef.current = rovPos; }, [rovPos]);
  useEffect(() => { activeCommandRef.current = activeCommand; }, [activeCommand]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:9090');

    ws.onopen = () => {
      setIsConnected(true);
      ws.send(JSON.stringify({ op: 'advertise', topic: '/xr_rov/cmd_pose', type: 'geometry_msgs/msg/PoseStamped' }));
      ws.send(JSON.stringify({ op: 'subscribe', topic: '/xr_rov/odom', type: 'nav_msgs/msg/Odometry' }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.topic === '/xr_rov/odom') {
        const x = data.msg.pose.pose.position.x;
        const y = data.msg.pose.pose.position.y;
        const q = data.msg.pose.pose.orientation;
        
        const siny_cosp = 2 * (q.w * q.z + q.x * q.y);
        const cosy_cosp = 1 - 2 * (q.y * q.y + q.z * q.z);
        const yaw = Math.atan2(siny_cosp, cosy_cosp) * (180 / Math.PI);

        setRovPos({ rosX: x, rosY: y, yaw: yaw });

        setRovPath(prev => {
          const last = prev[prev.length - 1];
          if (!last || Math.hypot(last.rosX - x, last.rosY - y) > 0.1) {
            return [...prev, { rosX: x, rosY: y }];
          }
          return prev;
        });
      }
    };

    ws.onerror = () => setIsConnected(false);
    ws.onclose = () => setIsConnected(false);
    wsRef.current = ws;

    // --- 📡 OTAK NAVIGASI (MURNI GESER KEPITING/MUNDUR) ---
    publishIntervalRef.current = window.setInterval(() => {
      const cmd = activeCommandRef.current;
      const targetId = activeGoalRef.current;
      
      if (!cmd || targetId === null) return;

      const targetGoal = goalsRef.current.find(g => g.id === targetId);
      if (!targetGoal) return;

      const currentPos = rovPosRef.current;
      const dx = targetGoal.rosX - currentPos.rosX;
      const dy = targetGoal.rosY - currentPos.rosY;
      const distance = Math.hypot(dx, dy);
      
      // 🛑 REM OTOMATIS: Jarak < 50 cm
      if (distance < 0.5) {
        console.log("🏁 Sampai Tujuan! Rem otomatis.");
        haltROV();
        return;
      }

      // ✈️ KIRIM DATA KE GAZEBO
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({
          op: 'publish',
          topic: '/xr_rov/cmd_pose',
          msg: {
            header: { stamp: { sec: 0, nanosec: 0 }, frame_id: "odom" },
            pose: {
              position: { x: cmd.x, y: cmd.y, z: cmd.z },
              // 🔥 KUNCI MATI LEHERNYA! Pakai arah hadap yang direkam saat tombol SEND diklik
              orientation: { x: 0.0, y: 0.0, z: cmd.qz, w: cmd.qw }
            }
          }
        }));
      }
    }, 100); 

    return () => {
      ws.close();
      if (publishIntervalRef.current) window.clearInterval(publishIntervalRef.current);
    };
  }, []);

  const sendToROV = (id: number) => {
    if (!isConnected) { alert("ROS belum terkoneksi!"); return; }
    
    const targetGoal = goalsRef.current.find(g => g.id === id);
    const currentPos = rovPosRef.current;
    if (!targetGoal) return;

    // 🔒 REKAM ARAH HADAP SAAT INI (Detik ini juga)
    // Supaya dia tidak memutar badan ke arah manapun selain arah dia sekarang
    const currentYawRad = currentPos.yaw * (Math.PI / 180);
    const qz = Math.sin(currentYawRad / 2);
    const qw = Math.cos(currentYawRad / 2);

    setActiveGoalId(id); 
    setActiveCommand({
      x: targetGoal.rosX,
      y: targetGoal.rosY,
      z: depthRef.current,
      qz: qz, // Simpan arah lehernya
      qw: qw
    });
  };

  const haltROV = () => {
    setActiveGoalId(null); 
    setActiveCommand(null);

    const currentPos = rovPosRef.current;
    const currentYawRad = currentPos.yaw * (Math.PI / 180);
    const qz = Math.sin(currentYawRad / 2);
    const qw = Math.cos(currentYawRad / 2);
    
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        op: 'publish',
        topic: '/xr_rov/cmd_pose',
        msg: {
          header: { stamp: { sec: 0, nanosec: 0 }, frame_id: "odom" },
          pose: {
            position: { x: currentPos.rosX, y: currentPos.rosY, z: depthRef.current },
            orientation: { x: 0.0, y: 0.0, z: qz, w: qw }
          }
        }
      }));
    }
  };

  const handleAddGoal = (goal: any) => setGoals([...goals, goal]);
  const handleRemoveGoal = (id: number) => {
    if (activeGoalId === id) haltROV();
    setGoals(goals.filter(goal => goal.id !== id));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700 p-8 text-white relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-4 gap-4">
        <div>
          <h2 className="font-black text-xl text-blue-400 uppercase tracking-wider flex items-center gap-3">
            <span className="bg-blue-600/20 p-2 rounded-lg text-lg text-blue-400">✈️</span>
            Guided Dispatch Mode
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
        <div className="lg:col-span-8">
          <MapPanel goals={goals} rovPos={rovPos} rovPath={rovPath} onAddGoal={handleAddGoal} onClearGoals={() => { setGoals([]); haltROV(); }} />
        </div>
        <div className="lg:col-span-4">
          <div className="bg-[#111827] p-6 rounded-xl border border-white/5 shadow-lg flex flex-col h-full min-h-[400px]">
            <DepthControl targetDepth={targetDepth} setTargetDepth={setTargetDepth} />
            <MissionPanel goals={goals} removeGoal={handleRemoveGoal} activeGoalId={activeGoalId} sendToROV={sendToROV} haltROV={haltROV} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutonomousROS2;