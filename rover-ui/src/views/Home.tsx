import React from 'react';
import { useNavigate } from 'react-router-dom';
// Pastikan path ke MenuCard ini sesuai dengan folder kamu
import { MenuCard } from '../components/MenuCard';

// Gabungan menu yang sudah DIBERSIHKAN dari duplikat hasil merge
const menus = [
  // 🎮 KELOMPOK SIMULASI & KONTROL
  { 
    path: '/manual', 
    title: 'Manual Simulation (MAVLink)', 
    desc: 'Override and control vehicle movements via ArduSub SITL.', 
    icon: '🎮'
  },
  { 
    path: '/manualros2', 
    title: 'Manual Simulation (ROS 2)', 
    desc: 'Direct Thruster Control Matrix within Gazebo ROS 2 environment.', 
    icon: '⚙️'
  },
  { 
    path: '/autonomous', 
    title: 'Autonomous Simulation (ROS 2)', 
    desc: 'Point & Go tactical navigation map via ROS 2 Bridge.', 
    icon: '🛰️'
  },
  { 
    path: '/mission', // Ubah huruf kecil agar sesuai dengan App.tsx
    title: 'Mission Control', 
    desc: 'Create, manage, and execute navigation missions with real-time updates.', 
    icon: '🎯' 
  },

  // 📊 KELOMPOK MONITORING & TELEMETRI
  { 
    path: '/live',     
    title: 'Live Telemetry',      
    desc: 'Real-time sensor data and video stream.', 
    icon: '📊' 
  },
  { 
    path: '/video',    
    title: 'Video Streams',       
    desc: 'Configure all video input devices.',       
    icon: '📹' 
  },
  { 
    path: '/ping',       
    title: 'Ping Sonar Devices',   
    desc: 'Manage detected Ping family sonar devices.', 
    icon: '📡' 
  },

  // 🔧 KELOMPOK PENGATURAN & SISTEM
  { 
    path: '/setup',    
    title: 'Vehicle Setup',       
    desc: 'Sensor calibrations and motor tests.',    
    icon: '🔧' // Pakai icon kunci inggris agar beda dengan ROS 2
  },
  { 
    path: '/params',   
    title: 'Autopilot Parameters',
    desc: 'Modify vehicle parameters in real-time.', 
    icon: '📑' 
  },
  { 
    path: '/simulation', 
    title: 'Autopilot Firmware',  
    desc: 'Update and manage flight controller firmware.', 
    icon: '🚀' 
  },
  { 
    path: '/browser',    
    title: 'Log Browser',          
    desc: 'Browse Telemetry (.tlog) and Binary (.bin) logs.', 
    icon: '📁' 
  },
  { 
    path: '/system-info', 
    title: 'System Information', 
    desc: 'Monitor system, processes, and kernel.', 
    icon: '🖥️' 
  },
  { 
    path: '/blueos',      
    title: 'BlueOS Version',      
    desc: 'Manage system firmware and updates.', 
    icon: '📦' 
  },
];

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="font-display font-black text-xl text-white uppercase tracking-wider">
          ROV Ground Station
        </h2>
        <p className="text-[11px] font-mono text-slate-400 mt-1 uppercase tracking-widest">
          Main Control Menu
        </p>
      </div>
      
      {/* Grid Menu Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {menus.map((m) => (
          <MenuCard 
            key={m.path} 
            icon={m.icon} 
            title={m.title} 
            description={m.desc} 
            onClick={() => navigate(m.path)} 
          />
        ))}
      </div>
    </div>
  );
};

export default Home;