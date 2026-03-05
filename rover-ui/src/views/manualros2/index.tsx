import React, { useState, useEffect, useRef } from 'react';
import * as ROSLIB from 'roslib';

export const ManualROS2: React.FC = () => {
  const [connStatus, setConnStatus] = useState("Menunggu Koneksi... ⏳");
  const ros = useRef<ROSLIB.Ros | null>(null);

  // State dan Ref untuk menyimpan nilai murni dari 6 Thruster
  const [thrusters, setThrusters] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const thrustersRef = useRef<number[]>([0, 0, 0, 0, 0, 0]);

  // Label penjelasan untuk masing-masing Thruster
  const thrusterInfo = [
    { name: "Thruster 1", desc: "Depan Kanan (Horizontal)" },
    { name: "Thruster 2", desc: "Depan Kiri (Horizontal)" },
    { name: "Thruster 3", desc: "Belakang Kanan (Horizontal)" },
    { name: "Thruster 4", desc: "Belakang Kiri (Horizontal)" },
    { name: "Thruster 5", desc: "Vertikal Kanan (Atas/Bawah)" },
    { name: "Thruster 6", desc: "Vertikal Kiri (Atas/Bawah)" }
  ];

  // --- 1. KONEKSI KE ROSBRIDGE ---
  useEffect(() => {
    ros.current = new ROSLIB.Ros({ url: 'ws://localhost:9090' });

    ros.current.on('connection', () => setConnStatus("Terhubung ke ROS2 Gazebo 🟢"));
    ros.current.on('error', () => setConnStatus("Error Koneksi 🔴"));
    ros.current.on('close', () => setConnStatus("Terputus 🔴"));

    return () => { if (ros.current) ros.current.close(); };
  }, []);

  // --- 2. FUNGSI PUBLISH KE ROS2 ---
  const sendThrusterCommand = (thrusterIndex: number, thrustValue: number) => {
    if (!ros.current) return;
    const thrusterTopic = new ROSLIB.Topic({
      ros: ros.current,
      name: `/bluerov2/cmd_thruster${thrusterIndex + 1}`,
      messageType: 'std_msgs/msg/Float64' 
    });
    
    // Kirim nilai murni langsung ke topik thruster terkait
    thrusterTopic.publish({ data: thrustValue } as any);
  };

  // --- 3. CONTROL LOOP (KIRIM DATA TERUS-MENERUS) ---
  // Ini fungsi yang mencegah baling-baling ROV berhenti sendiri
  useEffect(() => {
    const interval = setInterval(() => {
      if (ros.current && ros.current.isConnected) {
        // Tembak nilai dari ke-6 slider secara berulang setiap 100ms
        thrustersRef.current.forEach((val, index) => {
          sendThrusterCommand(index, val);
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // --- 4. HANDLER SLIDER UI ---
  const handleSliderChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    
    const newThrusters = [...thrusters];
    newThrusters[index] = val;
    
    setThrusters(newThrusters);         // Update layar UI
    thrustersRef.current = newThrusters; // Update memori untuk dikirim terus-menerus
  };

  const resetAllThrusters = () => {
    const neutral = [0, 0, 0, 0, 0, 0];
    setThrusters(neutral);
    thrustersRef.current = neutral;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700 p-8 text-white">
      {/* HEADER */}
      <div className="flex justify-between items-end border-b border-white/10 pb-4">
        <div>
          <h2 className="font-black text-xl text-blue-400 uppercase tracking-wider flex items-center gap-3">
            <span className="bg-blue-600/20 text-blue-400 p-2 rounded-lg">⚙️</span>
            Manual Override (Direct Thrusters)
          </h2>
          <p className="text-sm font-mono mt-2">{connStatus}</p>
        </div>
        <button 
          onClick={resetAllThrusters}
          className="bg-red-500/20 text-red-500 hover:bg-red-500/40 border border-red-500/50 px-6 py-2 rounded font-bold transition-all uppercase text-sm tracking-widest"
        >
          🛑 EMERGENCY STOP ALL
        </button>
      </div>

      {/* THRUSTER CONTROL MATRIX */}
      <div className="bg-[#111827] p-8 rounded-xl border border-white/5 shadow-2xl">
        <h3 className="text-slate-400 font-bold mb-8 uppercase tracking-widest text-xs border-b border-white/5 pb-2">
          Direct Thruster Control Matrix
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {thrusters.map((value, index) => (
            <div key={index} className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="flex flex-col">
                    <label className="text-[11px] font-bold text-slate-300 uppercase">
                      {thrusterInfo[index].name}
                    </label>
                    <span className="text-[9px] font-mono text-blue-500/70 uppercase">
                      {thrusterInfo[index].desc}
                    </span>
                  </div>
                  <button 
                    onClick={() => {
                      const newThrusters = [...thrusters];
                      newThrusters[index] = 0;
                      setThrusters(newThrusters);
                      thrustersRef.current = newThrusters;
                    }}
                    className="ml-2 bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white rounded px-1.5 py-0.5 text-[10px] transition-colors"
                    title="Reset ke Nol"
                  >
                    ↺
                  </button>
                </div>
                <div className="w-16 bg-black/60 border border-white/10 rounded px-2 py-1 text-xs font-mono text-center text-blue-400">
                  {value.toFixed(1)}
                </div>
              </div>
              <input 
                type="range" min="-50.0" max="50.0" step="0.5" 
                value={value} 
                onChange={(e) => handleSliderChange(index, e)}
                onDoubleClick={() => {
                  const newThrusters = [...thrusters];
                  newThrusters[index] = 0;
                  setThrusters(newThrusters);
                  thrustersRef.current = newThrusters;
                }}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500" 
                title="Klik ganda untuk reset ke 0"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManualROS2;