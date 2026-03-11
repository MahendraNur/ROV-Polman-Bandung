import React from 'react';
import { NavLink } from 'react-router-dom';
import { menuGroups } from '../types/menu';
import { Power, Settings as SettingsIcon, Bug } from 'lucide-react';

interface SidebarProps {
  isDarkMode: boolean;
}

const Sidebar = ({ isDarkMode }: SidebarProps) => {
  if (!menuGroups) return <aside className="w-64 shrink-0 bg-[#1a1c1e] h-screen" />;

  const bg = isDarkMode ? 'bg-[#1a1c1e]' : 'bg-white';
  const text = isDarkMode ? 'text-gray-400' : 'text-gray-700';
  const border = isDarkMode ? 'border-gray-800' : 'border-gray-200';

  return (
    <aside className={`w-64 shrink-0 h-screen ${bg} ${text} flex flex-col border-r ${border} z-20`}>
      {/* Header Logo persis BlueOS */}
      <div className={`p-4 flex items-center gap-3 border-b ${border} bg-[#16181a]`}>
        <div className="bg-blue-600 p-2 rounded shadow-lg">
          <span className="font-bold text-white text-xl font-mono">B</span>
        </div>
        <div>
          <h1 className="font-bold text-white text-lg leading-none">BlueOS</h1>
          <span className="text-[10px] text-blue-400 font-bold uppercase tracking-tighter">Polman Edition</span>
        </div>
      </div>

      {/* Menu List yang sekarang sudah lengkap */}
      <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
        {menuGroups.map((group, idx) => (
          <div key={idx} className="mb-4">
            <p className="px-6 text-[9px] font-black text-gray-500 tracking-[1.5px] mb-3 uppercase">
              {group.title}
            </p>
            {group.items.map((item, itemIdx) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={itemIdx}
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center justify-between px-6 py-2 transition-all group
                    ${isActive 
                      ? 'bg-blue-600/10 text-blue-500 border-r-4 border-blue-600' 
                      : 'hover:bg-gray-800/50 hover:text-white'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} className="group-hover:scale-110 transition-transform" />
                    <span className="text-[13px] font-medium">{item.title}</span>
                  </div>
                  {item.status && (
                    <span className="text-[8px] bg-blue-600/20 text-blue-400 px-1.5 py-0.5 rounded-sm font-bold uppercase">
                      {item.status}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer (Quick Actions & CPU Stats) */}
      <div className={`bg-[#141517] border-t ${border}`}>
        <div className={`flex justify-around py-2 border-b ${border}`}>
          <button className="p-2 hover:text-red-500 transition-colors"><Power size={18} /></button>
          <button className="p-2 hover:text-blue-500 transition-colors"><SettingsIcon size={18} /></button>
          <button className="p-2 hover:text-yellow-500 transition-colors"><Bug size={18} /></button>
        </div>
        <div className="p-4">
          <div className="flex justify-between text-[10px] font-bold mb-1">
            <span className="text-gray-500 uppercase">CPU Usage</span>
            <span className="text-white">29 %</span>
          </div>
          <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full w-[29%]"></div>
          </div>
          <p className="text-[9px] text-gray-600 mt-2 italic">v1.1.0-beta</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;