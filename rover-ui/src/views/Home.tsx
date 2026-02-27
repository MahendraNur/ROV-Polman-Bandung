import { MenuCard } from '../components/MenuCard';

export const Home = () => {
  const menus = [
    { title: "Autopilot Firmware", desc: "Update flight controller firmware.", icon: "🚀" },
    { title: "Autopilot Parameters", desc: "View and modify vehicle parameters.", icon: "📑" },
    { title: "System Information", desc: "CPU, memory, and network status.", icon: "📊" },
    { title: "Video Streams", desc: "Manage your video devices.", icon: "📹" },
    { title: "Vehicle Setup", desc: "Sensor calibrations and motors mapping.", icon: "⚙️" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-500">
      {menus.map((m, i) => (
        <MenuCard key={i} title={m.title} description={m.desc} icon={m.icon} />
      ))}
    </div>
  );
};